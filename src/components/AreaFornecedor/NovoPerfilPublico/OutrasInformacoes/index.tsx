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
import Image from 'next/image'
import { consultas_api } from '../../../../services/consultas_api';
import { AZUL, PRETO_10 } from '../../../../styles/variaveis';
import { IGraduacao } from '../../../../interfaces/IProvider';
import {
  InfoSection,
  Container,
  Wrapper,
  Ranking,
  Carrousel,
  ArrowSlider,
  Frame,
  TitleVideoNotFound,
} from './style';
import Content from './style';
import { Card } from '../../../../components/Card';
import { useAuth } from '../../../../contexts/auth';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { MedalhasFornecedor } from '../../../../components/MedalhasFornecedor';
import { nivel_experiencia } from '../../../../utils/nivelExperiencia';
import { Label } from '../../../../components/Label';
import HabilidadesPercebidas from '../HabilidadesPercebidas';
import { CardAvaliacao } from '../../../../components/CardAvaliacao';
import { IServicoInfo } from '../../../../interfaces/IServicoInfo';
import { ofertas_api } from '../../../../services/ofertas_api';
import { VitrineServico } from '../../../../components/VitrineServico';
import { Skeleton } from '../../../../components/Skeleton';
import { CardRecomendation } from '../../../../components/CardRecomendacao';

type ConsultaRankingType = {
  idUsuario: number;
  ranking: number;
  notaMedia: number;
  pontuacao: number;
};

interface Props {
  data: IProvider;
  imageLoaded: boolean;
}

export default function OutrasInformacoes({ data, imageLoaded }: Props) {
  const { user } = useAuth();
  const [verMaisSubareas, setVerMaisSubareas] = useState(false);
  const [verMaisCapacitacao, setVerMaisCapacitacao] = useState(false);
  const [vitrineData, setVitrineData] = useState([] as IServicoInfo[]);
  const [projectsCount, setProjectsCount] = useState(0);
  const [sizePage, setSizePage] = useState(2.5);

  const [consultaRanking, setConsultaRanking] = useState<ConsultaRankingType>(
    {} as ConsultaRankingType,
  );

  useEffect(() => {
    if (data?.id_usuario) {
      consultas_api
        .get<ConsultaRankingType>(
          `/consulta/fornecedores/${data?.id_usuario}/ranking`,
        )
        .then(res => {
          setConsultaRanking(res.data);
        });
    }
  }, [data?.id_usuario]);

  useEffect(() => {
    if (!user.id_pessoa) return;

    const load = async () => {
      const { data: count } = await oportunidades_api.get(
        `/projetos/count?idPessoaFornecedor=${data.id}`,
      );
      setProjectsCount(count);
    };
    if (data && data.id) {
      load();
    }
  }, [data, user]);

  useEffect(() => {
    async function handleData() {
      const response = await ofertas_api.get(
        `/servicos?filter=id_pessoa=${data.id}`,
      );
      setVitrineData(response.data.data);
    }
    handleData();
  }, [data.id]);

  const settingsSlider = {
    speed: 500,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow:
      data.causasSociais?.length > 3 ? 3 : data.causasSociais?.length,
    className: 'container-slider',
    initialSlide: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowSlider />,
    prevArrow: <ArrowSlider />,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow:
            data.causasSociais?.length > 3 ? 3.5 : data.causasSociais?.length,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow:
            data.causasSociais?.length > 3 ? 3 : data.causasSociais?.length,

          slidesToScroll: 2,
        },
      },
    ],
  };

  const handleResize = () => {
    if (window.innerWidth > 1200) {
      setSizePage(2.5);
    } else if (window.innerWidth < 1200) {
      setSizePage(1.8);
    } else if (window.innerWidth < 991) {
      setSizePage(2.5);
    } else if (window.innerWidth < 768) {
      setSizePage(1.8);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <Content>
      <Container>
        {!imageLoaded ? (
          <Row>
            <Col lg={5} className="mb-4">
              <Card>
                <Wrapper>
                  <Titulo
                    titulo="Apresentação"
                    cor={AZUL}
                    negrito
                    tamanho={16}
                  />
                  {consultaRanking && (
                    <Ranking>Ranking: {consultaRanking.ranking}</Ranking>
                  )}
                  <span>
                    {data?.endereco?.municipio?.nome},{' '}
                    {data?.endereco?.municipio?.uf} - Brasil
                  </span>
                  <span>{data.resumo_profissional}</span>

                  <span>
                    idiomas:{' '}
                    {data?.idiomas?.map(
                      language => `${language.idioma.descricao} -
                  ${language.nivel}. `,
                    )}
                  </span>

                  <span>N° de projetos: {projectsCount}</span>

                  <span>Medalhas conquistadas:</span>
                  <MedalhasFornecedor id={data?.id} />
                </Wrapper>
              </Card>

              <Spacer size={16} />

              <Card id="professional">
                <Wrapper>
                  <Titulo
                    titulo="Profissional"
                    cor={AZUL}
                    negrito
                    tamanho={16}
                  />
                  <span>
                    Estou cadastrado como{' '}
                    {data.tipo === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                  </span>
                  <span>
                    Me considero um profissional{' '}
                    <span className="nivel-experiencia">
                      {nivel_experiencia[data.nivel_experiencia] as string}
                    </span>
                  </span>

                  <span>
                    Atuo como{' '}
                    {data?.categoriaEspecialidades
                      ?.map(c => c.descricao)
                      ?.join(', ')}
                  </span>

                  <span>
                    {data?.profissoes?.length !== 0 &&
                    data?.profissoes?.length === 1
                      ? 'Minha profissão é '
                      : 'Minhas profissões são '}
                    {data?.profissoes &&
                      data?.profissoes.map(p => p.descricao).join(', ')}
                  </span>
                </Wrapper>
              </Card>

              <Spacer size={16} />
              <Card id="interest">
                <Wrapper>
                  <Titulo
                    titulo="Áreas de interesse"
                    cor={AZUL}
                    negrito
                    tamanho={16}
                  />

                  {data.subareasInteresse && (
                    <div className="label-content">
                      {data.subareasInteresse
                        .slice(
                          0,
                          verMaisSubareas ? data.subareasInteresse.length : 10,
                        )
                        ?.map(area => (
                          <Label
                            cor={PRETO_10}
                            negrito
                            label={area.descricao}
                            key={area.id}
                          />
                        ))}
                    </div>
                  )}

                  <span
                    className="ver-subarea"
                    onClick={() => setVerMaisSubareas(!verMaisSubareas)}
                  >
                    {verMaisSubareas ? 'Ver menos' : 'Ver mais'}
                  </span>
                </Wrapper>
              </Card>

              <Spacer size={16} />
              <Card id="training">
                <Wrapper>
                  <Titulo
                    titulo="Capacitação"
                    cor={AZUL}
                    negrito
                    tamanho={16}
                  />

                  <InfoSection>
                    {data?.cursos
                      ?.slice(0, verMaisCapacitacao ? data?.cursos.length : 1)
                      ?.map((curso: ICursoPessoa, index: number) => (
                        <div key={index} className="info-curso">
                          <strong>Curso</strong>
                          <span>{curso.descricao}</span>
                        </div>
                      ))}

                    {data?.graduacoes && (
                      <>
                        {data?.graduacoes
                          ?.slice(
                            0,
                            verMaisCapacitacao ? data?.graduacoes.length : 1,
                          )
                          ?.map((graduacao: IGraduacao, index: number) => (
                            <div key={index} className="info-curso">
                              <strong>Graduação</strong>
                              <span>{graduacao.descricao}</span>
                            </div>
                          ))}
                      </>
                    )}

                    {data?.posGraduacoes
                      ?.slice(
                        0,
                        verMaisCapacitacao ? data?.posGraduacoes.length : 1,
                      )

                      .map((pos: IPosGraduacao, index: number) => (
                        <div key={index} className="info-curso">
                          <strong>Pós-Graduação</strong>
                          <span>{pos.descricao}</span>
                        </div>
                      ))}
                  </InfoSection>

                  <span
                    className="ver-subarea"
                    onClick={() => setVerMaisCapacitacao(!verMaisCapacitacao)}
                  >
                    {verMaisCapacitacao ? 'Ver menos' : 'Ver mais'}
                  </span>
                </Wrapper>
              </Card>

              <Spacer size={16} />
              <Card id="causes">
                <Wrapper>
                  <Titulo
                    titulo="Causas sociais"
                    cor={AZUL}
                    negrito
                    tamanho={16}
                  />

                  <Carrousel {...settingsSlider}>
                    {data.causasSociais
                      ?.sort(function (a: any, b: any) {
                        if (a.id < b.id) {
                          return 1;
                        }
                        if (a.id > b.id) {
                          return -1;
                        }
                        return 0;
                      })
                      ?.map(item => (
                        <li key={item.id}>
                          <Image src={item.url} alt={item.descricao} />
                        </li>
                      ))}
                  </Carrousel>
                </Wrapper>
              </Card>
            </Col>

            <Col lg={7}>
              <Card>
                <Wrapper>
                  <Titulo titulo="Vídeo" cor={AZUL} negrito tamanho={16} />

                  {data?.url_video_apresentacao ? (
                    <Frame
                      frameBorder="0"
                      allowFullScreen
                      src={`https://www.youtube.com/embed/${
                        data?.url_video_apresentacao.split('=')[1]
                      }?controls=0`}
                      title={data?.nome_tratamento}
                    />
                  ) : (
                    <TitleVideoNotFound>
                      {!user || data.id !== user.id_pessoa
                        ? data?.nome_tratamento
                        : 'Você'}{' '}
                      ainda não possui vídeo de apresentação.
                    </TitleVideoNotFound>
                  )}
                </Wrapper>
              </Card>
              <Spacer size={20} />

              <Card>
                <Wrapper>
                  <Titulo
                    titulo="Minhas Habilidades"
                    cor={AZUL}
                    negrito
                    tamanho={16}
                  />

                  <HabilidadesPercebidas idPessoa={data.id} />
                </Wrapper>
              </Card>

              <Spacer size={20} />
              <Card>
                <Wrapper>
                  <Titulo titulo="Vitrine" cor={AZUL} negrito tamanho={16} />
                  <VitrineServico
                    numberCard={sizePage}
                    vitrineData={vitrineData}
                  />
                </Wrapper>
              </Card>
              <Spacer size={20} />

              <Card>
                <Wrapper>
                  <Titulo
                    titulo="Recomendações"
                    cor={AZUL}
                    negrito
                    tamanho={16}
                  />
                  <CardRecomendation id={data.id} />
                </Wrapper>
              </Card>

              <Spacer size={20} />

              <Card>
                <Wrapper>
                  <Titulo titulo="Avaliações" cor={AZUL} negrito tamanho={16} />
                  <CardAvaliacao id={data.id} />
                </Wrapper>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col lg={5}>
              <Skeleton width="100%" height="400px" />
            </Col>
            <Col lg={7}>
              <Skeleton width="100%" height="400px" />
            </Col>
          </Row>
        )}
      </Container>
    </Content>
  );
}
