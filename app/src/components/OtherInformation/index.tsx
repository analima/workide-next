import { AZUL_60, CINZA_30, LARANJA } from '../../styles/variaveis';

import { Content, CardInformation, Information, InfoSection } from './style';

import { Titulo } from '../Titulo';
import { Badges } from '../Badge';
import { Card } from '../Card';
import { useEffect, useState } from 'react';

type ProfissoesProps = {
  id: number;
  descricao: string;
  ativo: boolean;
};

type CapacitacaoProps = {
  id: number;
  descricao: string;
  local?: string;
  carga_horaria?: number;
  sentido?: string;
  tipo?: string;
  situacao?: string;
  graduacao?: {
    descricao: string;
  };
  orgao_certificador?: string;
};

type UserProps = {
  id: number;
  email: string;
  tipo: string;
};

type PerfilFornecedorProps = {
  data: {
    profissoes: ProfissoesProps[];
    usuario: UserProps;
    cursos: CapacitacaoProps[];
    pos_graduacoes: CapacitacaoProps[];
    graduacoes: CapacitacaoProps[];
    certificacoes: CapacitacaoProps[];
    habilidades_tecnicas: string | null;
    habilidades_comportamentais: string | null;
    areas_atuacao: string | null;
  };
};

export function OtherInformation({ data }: PerfilFornecedorProps) {
  const [skillDeclared, setSkillDeclared] = useState<string[]>([]);
  const [areasOfExpertise, setAreasOfExpertise] = useState<string[]>([]);

  useEffect(() => {
    handleData();

    function handleData() {
      if (data.habilidades_tecnicas) {
        const skillsBehavior = data.habilidades_comportamentais?.split('|');
        const skillsTechniques = data.habilidades_tecnicas?.split('|');
        const arrayAreasOfExpertise = data.areas_atuacao?.split('|');

        var skillsDeclared: Array<string> = [];
        if (skillsBehavior && skillsTechniques)
          skillsDeclared = [...skillsBehavior, ...skillsTechniques];
        if (arrayAreasOfExpertise) setAreasOfExpertise(arrayAreasOfExpertise);
        setSkillDeclared(skillsDeclared);
      }
    }
  }, [data]);

  return (
    <Content>
      <Card>
        <Titulo
          cor={AZUL_60}
          tamanho={32}
          negrito={false}
          titulo="Outras Informações"
        />
        {data.profissoes ? (
          <CardInformation>
            <Information>
              {data.profissoes.map(profissao => (
                <div key={profissao.id} className="content-information">
                  <Titulo cor={LARANJA} tamanho={25} titulo="Profissão" />
                  <span>{profissao.descricao}</span>
                </div>
              ))}

              <div className="content-information">
                <span>Esse profissional atua como</span>
                {data.profissoes?.length ? (
                  <Titulo
                    cor={AZUL_60}
                    tamanho={20}
                    titulo={data.profissoes[0].descricao}
                  />
                ) : (
                  <Titulo cor={AZUL_60} tamanho={20} titulo="Não informado" />
                )}
              </div>
              <div className="content-information">
                <Titulo cor={LARANJA} tamanho={25} titulo="Áreas de atuação" />
                <div className="badges">
                  {areasOfExpertise.map(obj => (
                    <Badges
                      color={AZUL_60}
                      colorBorda={AZUL_60}
                      text={obj}
                      key={obj}
                    />
                  ))}
                </div>
              </div>
              <div className="content-information">
                <Titulo
                  cor={LARANJA}
                  tamanho={25}
                  titulo="Subáreas de Interesse"
                />
                <div className="badges">
                  {areasOfExpertise.map(obj => (
                    <Badges
                      color={AZUL_60}
                      key={obj}
                      colorBorda={AZUL_60}
                      text={obj}
                    />
                  ))}
                </div>
              </div>
            </Information>

            <Information>
              <Titulo cor={LARANJA} tamanho={25} titulo="Capacitação" />
              <InfoSection>
                {data.cursos.map(curso => (
                  <div key={curso.id} className="info-curso">
                    <strong>Curso</strong>
                    <span>{curso.descricao}</span>
                  </div>
                ))}

                {data.graduacoes.map(graduacao => (
                  <div key={graduacao.id} className="info-curso">
                    <strong>Graduação</strong>
                    <span>{graduacao.graduacao?.descricao}</span>
                    <span>Situação: {graduacao.situacao}</span>
                  </div>
                ))}

                {data.pos_graduacoes.map(pos => (
                  <div key={pos.id} className="info-curso">
                    <strong>Graduação</strong>
                    <span>{pos.descricao}</span>
                    <span>Local: {pos.local}</span>
                    <span>Senntido: {pos.sentido}</span>
                  </div>
                ))}
              </InfoSection>

              <Titulo cor={LARANJA} tamanho={25} titulo="Certificações" />

              <InfoSection>
                {data.certificacoes.map(certificacao => (
                  <div key={certificacao.id} className="info-certifications">
                    <span>
                      {certificacao.descricao}:{' '}
                      {certificacao.orgao_certificador}
                    </span>
                  </div>
                ))}
              </InfoSection>
            </Information>

            <Information>
              <Titulo
                cor={LARANJA}
                tamanho={25}
                titulo="Habilidades Declaradas"
              />
              <div className="info-skills">
                {skillDeclared.map((item: any) => (
                  <Badges
                    color={CINZA_30}
                    key={item}
                    colorBorda={CINZA_30}
                    text={item}
                  />
                ))}
              </div>
            </Information>
          </CardInformation>
        ) : (
          <CardInformation>
            <Titulo
              cor={LARANJA}
              tamanho={25}
              titulo="Carregando informações..."
            />
          </CardInformation>
        )}
      </Card>
    </Content>
  );
}
