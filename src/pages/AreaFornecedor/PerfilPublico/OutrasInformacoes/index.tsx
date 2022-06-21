/* eslint-disable no-loop-func */
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Spacer } from '../../../../components/Spacer';
import { Titulo } from '../../../../components/Titulo';
import {
  ICursoPessoa,
  IPosGraduacao,
  IProvider,
} from '../../../../interfaces/IProvider';
import { consultas_api } from '../../../../services/consultas_api';
import { CINZA_40, LARANJA, PRETO_10 } from '../../../../styles/variaveis';
import { IGraduacao } from '../../../../interfaces/IProvider';
import {
  Content,
  InformacaoContainer,
  LabelContainer,
  InfoSection,
  Profissoes,
  LabelDefault,
  LabelDefaultContainer,
  Container,
  GrayParagraph,
  GrayParagraphSmall,
  ActiveMoreInfos,
  ContainerLanguages,
} from './style';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';
import { pessoas_api } from '../../../../services/pessoas_api';

type AreaAtuacaoProps = {
  id: number;
  descricao: string;
};

interface IAreaInteresse {
  id: number;
  descricao: string;
  dataHoraCriacao: string;
  subareasInteresse: ISubareaInteresse[];
}

interface ISubareaInteresse {
  id: number;
  descricao: string;
}

interface IAllIdioma {
  descricao: string;
  id: number;
}

interface IIdiomasProps {
  idioma: IAllIdioma;
  nivel: string;
}

export function OutrasInformacoes({ data }: { data: IProvider }) {
  const [skillDeclared, setSkillDeclared] = useState<string[]>([]);
  const [areaAtuacao, setAreaAtaucao] = useState<AreaAtuacaoProps>();
  const [areaInteresse, setAreaInteresse] = useState<IAreaInteresse[]>([]);
  const [showMoreInfos, setShowMoreInfos] = useState(false);
  const [allLanguages, setAllLanguages] = useState<Array<IIdiomasProps>>(
    [] as Array<IIdiomasProps>,
  );

  useEffect(() => {
    const getLanguages = async () => {
      if (data.id) {
        const languages = await pessoas_api.get(`/pessoas/${data.id}/idiomas`);
        setAllLanguages(languages.data);
      }
    };
    getLanguages();
  }, [data.id]);
  useEffect(() => {
    handleData();

    function handleData() {
      if (data?.habilidades_tecnicas) {
        const skillsBehavior = data.habilidades_comportamentais?.split('|');
        const skillsTechniques = data.habilidades_tecnicas?.split('|');

        var skillsDeclared: Array<string> = [];
        if (skillsBehavior && skillsTechniques)
          skillsDeclared = [...skillsBehavior, ...skillsTechniques];
        setSkillDeclared(skillsDeclared);
      }
    }
  }, [data]);

  useEffect(() => {
    async function getAreaAtuacao() {
      if (data.id) {
        const especialidade = await consultas_api.get(
          `/pessoas/${data?.id}/categorias-especialidade`,
        );
        setAreaAtaucao(especialidade?.data[0]?.categoria_especialidade);
      }
    }
    getAreaAtuacao();
  }, [data.id]);

  useEffect(() => {
    const load = async () => {
      if (data && data.subareasInteresse) {
        let areas: IAreaInteresse[] = [];
        let areasInteresse = data.subareasInteresse.map(subareas => {
          return subareas.areaInteresse;
        });
        areasInteresse = areasInteresse.filter((area, index) => {
          const areasDuplicated = areasInteresse.filter(a => a.id === area.id);
          for (let areaDuplicated of areasDuplicated) {
            let indexArea = areasInteresse.findIndex(
              a => a.id === areaDuplicated.id,
            );
            if (indexArea !== index) {
              return false;
            }
          }
          return true;
        });

        for (let area of areasInteresse) {
          let subareas = data.subareasInteresse.filter(
            a => a.id_area_interesse === area.id,
          );

          areas.push({
            id: area.id,
            dataHoraCriacao: area.dataHoraCriacao,
            descricao: area.descricao,
            subareasInteresse: subareas.map(a => {
              return {
                id: a.id,
                descricao: a.descricao,
              };
            }),
          });
        }

        setAreaInteresse(areas);
      }
    };
    load();
  }, [data]);

  return (
    <Content>
      <Container>
        <Row>
          <Col lg={12}>
            <ActiveMoreInfos onClick={() => setShowMoreInfos(!showMoreInfos)}>
              <Titulo
                titulo="Outras informações profissionais"
                negrito={false}
                tamanho={30}
                cor={PRETO_10}
              />
              {showMoreInfos ? (
                <IoIosArrowDropup size={25} color={PRETO_10} />
              ) : (
                <IoIosArrowDropdown size={25} color={PRETO_10} />
              )}
            </ActiveMoreInfos>
          </Col>
        </Row>
        {showMoreInfos && (
          <>
            {data.profissoes ? (
              <>
                <Spacer size={20} />

                <Row>
                  <Col lg={4}>
                    <InformacaoContainer>
                      <Row>
                        <Col lg={12}>
                          <Titulo
                            titulo="Profissão"
                            tamanho={24}
                            cor={LARANJA}
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col lg={12}>
                          <Profissoes>
                            <GrayParagraph>
                              {data?.profissoes?.map((profissao, index) => (
                                <>
                                  {profissao.descricao}
                                  {data?.profissoes.length > 1 &&
                                    data?.profissoes.length - 1 !== index && (
                                      <>,</>
                                    )}{' '}
                                </>
                              ))}
                            </GrayParagraph>
                          </Profissoes>
                          <Spacer size={40} />

                          <Titulo
                            titulo="Esse profissional atua como"
                            tamanho={16}
                            cor={CINZA_40}
                          />

                          <Spacer size={5} />

                          {areaAtuacao ? (
                            <GrayParagraph>
                              {areaAtuacao?.descricao}
                            </GrayParagraph>
                          ) : (
                            <GrayParagraph>Não informado</GrayParagraph>
                          )}
                        </Col>
                      </Row>

                      <Spacer size={40} />

                      <Row>
                        <Col lg={12}>
                          <Titulo
                            titulo="Áreas de Interesse"
                            tamanho={24}
                            cor={LARANJA}
                          />
                        </Col>
                      </Row>

                      <Spacer size={35} />

                      <Row>
                        <Col lg={12}>
                          <LabelContainer>
                            {areaInteresse.map((area: IAreaInteresse) => (
                              <div key={area.id}>
                                <Titulo
                                  titulo={area.descricao}
                                  tamanho={15}
                                  cor={CINZA_40}
                                />

                                <Spacer size={20} />

                                {area.subareasInteresse.map(
                                  (subarea: ISubareaInteresse) => (
                                    <GrayParagraphSmall key={subarea.id}>
                                      {subarea?.descricao}
                                    </GrayParagraphSmall>
                                  ),
                                )}
                                <Spacer size={20} />
                              </div>
                            ))}
                          </LabelContainer>
                        </Col>
                      </Row>
                    </InformacaoContainer>
                  </Col>

                  <Col lg={4}>
                    <InformacaoContainer>
                      <Titulo cor={LARANJA} tamanho={25} titulo="Capacitação" />
                      <InfoSection>
                        {data?.cursos?.map(
                          (curso: ICursoPessoa, index: number) => (
                            <div key={index} className="info-curso">
                              <strong>Curso</strong>
                              <span>{curso.descricao}</span>
                            </div>
                          ),
                        )}

                        {data?.graduacoes && (
                          <>
                            {data?.graduacoes?.map(
                              (graduacao: IGraduacao, index: number) => (
                                <div key={index} className="info-curso">
                                  <strong>Graduação</strong>
                                  <span>{graduacao.descricao}</span>
                                </div>
                              ),
                            )}
                          </>
                        )}

                        {data?.posGraduacoes?.map(
                          (pos: IPosGraduacao, index: number) => (
                            <div key={index} className="info-curso">
                              <strong>Pós-Graduação</strong>
                              <span>{pos.descricao}</span>
                            </div>
                          ),
                        )}
                      </InfoSection>
                      {allLanguages && allLanguages?.length > 0 && (
                        <>
                          <Titulo cor={LARANJA} tamanho={25} titulo="Idiomas" />
                          <InfoSection>
                            {allLanguages?.map(
                              (language: IIdiomasProps, index: number) => {
                                return (
                                  <ContainerLanguages key={index}>
                                    <span>
                                      {language.idioma.descricao} -{' '}
                                      {language.nivel}.
                                    </span>
                                  </ContainerLanguages>
                                );
                              },
                            )}
                          </InfoSection>
                        </>
                      )}

                      {data?.certificacoes &&
                        data?.certificacoes.length > 0 && (
                          <Titulo
                            cor={LARANJA}
                            tamanho={25}
                            titulo="Certificações"
                          />
                        )}
                      <InfoSection height={100}>
                        {data?.certificacoes?.map(
                          (certificacao, index: number) => (
                            <div key={index} className="info-certifications">
                              <span>
                                {certificacao.descricao} -{' '}
                                {certificacao.orgao_certificador}
                              </span>
                            </div>
                          ),
                        )}
                      </InfoSection>
                    </InformacaoContainer>
                  </Col>

                  <Col lg={4}>
                    <InformacaoContainer>
                      <Row>
                        <Col lg={12}>
                          <Titulo
                            titulo="Habilidades Declaradas"
                            tamanho={24}
                            cor={LARANJA}
                          />
                        </Col>
                      </Row>

                      <Spacer size={20} />

                      <Row>
                        <Col lg={12}>
                          <LabelDefaultContainer>
                            {skillDeclared.map((item: any) => (
                              <LabelDefault key={item.id}>{item}</LabelDefault>
                            ))}
                          </LabelDefaultContainer>
                        </Col>
                      </Row>
                    </InformacaoContainer>
                  </Col>
                </Row>
              </>
            ) : (
              <Titulo
                cor={LARANJA}
                tamanho={25}
                titulo="Carregando informações..."
              />
            )}
          </>
        )}
      </Container>
    </Content>
  );
}
