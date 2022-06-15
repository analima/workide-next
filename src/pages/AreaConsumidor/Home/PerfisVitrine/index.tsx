import { useEffect, useState } from 'react';
import { Card } from '../../../../components/Card';
import { Spacer } from '../../../../components/Spacer';
import { Titulo } from '../../../../components/Titulo';
import { pessoas_api } from '../../../../services/pessoas_api';
import { PRETO_10 } from '../../../../styles/variaveis';
import { Content, ContentSkeleton, ErrorMessage } from './style';
import { useAuth } from '../../../../contexts/auth';
import { consultas_api } from '../../../../services/consultas_api';
import { Vitrine } from '../../../../components/Vitrine';
import { Skeleton } from '../../../../components/Skeleton';
import { ArrowSlider, Carrousel } from '../../../../components/Vitrine/style';
import { oportunidades_api } from '../../../../services/oportunidades_api';

type PessoaProp = {
  urlArquivo: string;
  tratamento: string;
  ranking: number;
  notaMedia: number;
  profissoes: string[];
  categoriasEspecialidades: string[];
  id: number;
  nome: string;
  idUsuario: number;
  numProjetos: number;
  inVoluntariado: boolean;
  areasInteresse: {
    descricao: string;
  }[];
};

type RecontantractProps = {
  recontract?: boolean;
};

type PessoaRecontratcProp = {
  arquivo: {
    url: string;
  };
  nome_tratamento: string;
  ranking: number;
  notaMedia: number;
  profissoes: string[];
  categoriasEspecialidades: string[];
  id: number;
  nome: string;
  idUsuario: number;
  numProjetos: number;
  inVoluntariado: boolean;
  areasInteresse: {
    descricao: string;
  }[];
};

export function PerfisVitrine({ recontract }: RecontantractProps) {
  const [profiles, setProfiles] = useState<PessoaProp[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [idFornecedores, setIdFornecedores] = useState<number[]>([]);
  const [profilesRecontract, setProfilesRecontract] = useState<
    PessoaRecontratcProp[]
  >([]);

  useEffect(() => {
    if (idFornecedores.length === 0) return;

    async function handleFornecedores() {
      let dataProfile: any = [];

      await pessoas_api
        .post('/pessoas/list', {
          ids: idFornecedores,
        })
        .then(async ({ data }) => {
          let favorites = data;

          for (let index = 0; index < favorites.length; index++) {
            const favorite = favorites[index];
            const {
              data: { ranking, notaMedia },
            } = await consultas_api.get(
              `/consulta/fornecedores/${favorite?.id_usuario}/ranking`,
            );
            dataProfile.push({
              urlArquivo: favorite.arquivo?.url,
              tratamento: favorite.nome_tratamento,
              ranking,
              numProjetos: favorite.numProjetos,
              inVoluntariado: favorite.voluntariado,
              areasInteresse:
                favorite.subareasInteresse.length > 0
                  ? favorite.subareasInteresse
                      .filter(
                        (area: any, index: number, self: any) =>
                          index ===
                          self.findIndex(
                            (t: any) =>
                              t.areaInteresse.descricao ===
                              area.areaInteresse.descricao,
                          ),
                      )
                      .map((area: any) => ({
                        subarea: area.subarea,
                        descricao: area.areaInteresse.descricao,
                      }))
                  : [],

              id: favorite.id,
              nome: favorite.nome,
              idUsuario: favorite.id_usuario,
              notaMedia: notaMedia,
              profissoes: favorite.profissoes.map(
                (profissao: any) => profissao.descricao,
              ),
              categoriasEspecialidades: favorite.categoriaEspecialidades.map(
                (categoria: any) => categoria.descricao,
              ),
            });
          }
          setProfilesRecontract(dataProfile);
          setLoading(false);
        });
    }
    handleFornecedores();
  }, [idFornecedores]);

  useEffect(() => {
    try {
      oportunidades_api
        .get(`/projetos/fornecedores-contratados`)
        .then(({ data }) => {
          setIdFornecedores(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [user.id_pessoa]);

  useEffect(() => {
    setLoading(true);
    let dataProfile: any = [];
    pessoas_api.get(`/fornecedores/favoritos`).then(async res => {
      let favorites = res.data;

      for (let index = 0; index < favorites.length; index++) {
        const favorite = favorites[index];
        const {
          data: { ranking, notaMedia },
        } = await consultas_api.get(
          `/consulta/fornecedores/${favorite?.id_usuario}/ranking`,
        );

        dataProfile.push({
          urlArquivo: favorite?.arquivo?.url,
          tratamento: favorite.nome_tratamento,
          ranking,
          numProjetos: favorite.numProjetos,
          inVoluntariado: favorite.voluntariado,
          areasInteresse:
            favorite.subareasInteresse.length > 0
              ? favorite.subareasInteresse
                  .filter(
                    (area: any, index: number, self: any) =>
                      index ===
                      self.findIndex(
                        (t: any) =>
                          t.areaInteresse.descricao ===
                          area.areaInteresse.descricao,
                      ),
                  )
                  .map((area: any) => ({
                    subarea: area.subarea,
                    descricao: area.areaInteresse.descricao,
                  }))
              : [],

          id: favorite.id,
          nome: favorite.nome,
          idUsuario: favorite.id_usuario,
          notaMedia: notaMedia,
          profissoes: favorite.profissoes.map(
            (profissao: any) => profissao.descricao,
          ),
          categoriasEspecialidades: favorite.categoriaEspecialidades.map(
            (categoria: any) => categoria.descricao,
          ),
        });
      }
      setProfiles(dataProfile);
      setLoading(false);
    });
  }, [user]);

  const settingsSlider = {
    dots: true,
    speed: 500,
    className: 'container-slider',
    slidesToShow: 3.6,
    initialSlide: 0,
    slidesToScroll: 1,
    nextArrow: <ArrowSlider />,
    prevArrow: <ArrowSlider />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3.3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3.2,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },

      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Content>
      <Card>
        <div className="header">
          {!recontract ? (
            <Titulo
              titulo="Meus Perfis Favoritos"
              cor={PRETO_10}
              negrito={false}
            />
          ) : (
            <Titulo
              titulo="Profissionais com quem já trabalhei"
              cor={PRETO_10}
              negrito={false}
            />
          )}
        </div>
        <Spacer size={40} />

        {loading ? (
          <Carrousel numeroCompoenentes={3.4} {...settingsSlider}>
            <ContentSkeleton>
              <Skeleton width="100%" height="100%" />
            </ContentSkeleton>
            <ContentSkeleton>
              <Skeleton width="100%" height="100%" />
            </ContentSkeleton>
            <ContentSkeleton>
              <Skeleton width="100%" height="100%" />
            </ContentSkeleton>
            <ContentSkeleton>
              <Skeleton width="100%" height="100%" />
            </ContentSkeleton>
          </Carrousel>
        ) : (
          <>
            {profiles.length !== 0 ? (
              <Vitrine
                dataVitrine={recontract ? profilesRecontract : profiles}
                isEmptyPeople={false}
                recontract={recontract}
              />
            ) : (
              <>
                {!recontract ? (
                  <ErrorMessage>Nenhum perfil favorito encontrado</ErrorMessage>
                ) : (
                  <ErrorMessage>Nenhum perfil encontrado</ErrorMessage>
                )}
              </>
            )}
          </>
        )}
      </Card>
    </Content>
  );
}
