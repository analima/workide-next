import React, { useCallback, useEffect, useState } from 'react';
import CoracaoOn from '../../assets/coracao.svg';
import CoracaoOff from '../../assets/coracao-off.svg';
import { AvaliacaoFornecedor } from '../AvaliacaoFornecedor';
import {
  Content,
  Body,
  Footer,
  Info,
  Foto,
  FotoPerfil,
  AreasInteresse,
  Area,
  Favorito,
  ContentAvatar,
  Dialogo,
  AvatarContainer,
  BannerVoluntario,
  ArrowSlider,
  TextoMenor,
  InformacoesProfissionais,
  ContainerItensFooter,
  ContainerItemVitrine,
  Carrousel,
  NameTitulo,
  TextoCategoria,
  ContainerRecontratar,
} from './style';
import { Titulo } from '../Titulo';
import { LARANJA } from '../../styles/variaveis';
import { pessoas_api } from '../../services/pessoas_api';
import { useAuth } from '../../contexts/auth';
import Carol from '../../assets/carol-full.svg';
import Avatar from '../../components/CadastroComplementar/Apresentacao/style';
import { useHistory } from 'react-router';
import { useRouter } from 'next/router';
import { ModalLoading } from '../ModalLoading';
import { Button } from '../Form/Button';
import { oportunidades_api } from 'src/services/oportunidades_api';

export interface IVitrine {
  nome: string;
  imagem: string;
  avaliacao: number;
  estrelas: number;
  medalhas: string;
  ranking: number;
  projetos: number;
  profissao: string;
  areas_interesse: string[];
  favorito?: boolean;
  exibir_favorito?: boolean;
}

interface IDataVitrine {
  dataVitrine: any[];
  isEmptyPeople: boolean | undefined;
  recontract?: boolean;
}

interface IItemVitrineProps {
  item: PessoaProp;
  publico?: boolean;
  setShowAvatar?: (showAvatar: boolean) => void;
  recontract?: boolean;
}

type PessoaProp = {
  urlArquivo: string;
  tratamento: string;
  ranking: number;
  notaMedia: number;
  profissoes: string[];
  categoriasEspecialidades: string[];
  nivelExperiencia: string;
  id: number;
  nome: string;
  idUsuario: number;
  numProjetos: number;
  inVoluntariado: boolean;
  areasInteresse: AreaProp[];
};

type AreaProp = {
  descricao: string;
};

export function ItemVitrine({
  item,
  publico,
  setShowAvatar,
  recontract,
}: IItemVitrineProps) {
  const [favoriteItem, setFavoriteItem] = useState<Array<Number>>([]);
  const [showModalLoadding, setShowModalLoadding] = useState(false);
  const [numeroProjetos, setNumeroProjetos] = useState(0);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const { data: favorites } = await pessoas_api.get(
          `/fornecedores/favoritos`,
        );
        const favoriteIds = [];
        for (let favorite of favorites) {
          favoriteIds.push(favorite?.id);
        }
        setFavoriteItem(favoriteIds);
      } catch (error: any) {
        console.error(error.response?.data || error);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const handleOpenPerson = useCallback(
    (idPessoa: number) => {
      if (publico && setShowAvatar) {
        setShowAvatar(true);
        return;
      }
      router.push({
        pathname: `/fornecedor/perfil-publico/${idPessoa}`,
        query: {},
      });
    },
    [publico, router, setShowAvatar],
  );

  const handleFavorite = (event: React.MouseEvent, idPessoa: number) => {
    event.stopPropagation();
    const load = async () => {
      setShowModalLoadding(true);
      const check = favoriteItem.find(item => item === idPessoa);
      if (favoriteItem.length > 0) {
        if (!check) {
          setFavoriteItem([...favoriteItem, idPessoa]);
          await pessoas_api.post(`/fornecedores/${idPessoa}/favoritos`);

          setShowModalLoadding(false);
        } else {
          setFavoriteItem(favoriteItem.filter(elm => elm !== idPessoa));
          await pessoas_api.delete(`/fornecedores/${idPessoa}/favoritos`);

          setShowModalLoadding(false);
        }
      } else {
        setFavoriteItem([idPessoa]);
        pessoas_api.post(`/fornecedores/${idPessoa}/favoritos`);
        setShowModalLoadding(false);
      }
    };
    load();
  };

  const countProjects = useCallback(async () => {
    try {
      const { data: countConcluido } = await oportunidades_api.get(
        `/projetos/count?idPessoaFornecedor=${item.id}&status=CONCLUIDO`,
      );
      const { data: countIniciado } = await oportunidades_api.get(
        `/projetos/count?idPessoaFornecedor=${item.id}&status=INICIADO`,
      );

      const { data: countAguardandoInicio } = await oportunidades_api.get(
        `/projetos/count?idPessoaFornecedor=${item.id}&status=AGUARDANDO_INICIO`,
      );

      const { data: countConcluidoParcialmente } = await oportunidades_api.get(
        `/projetos/count?idPessoaFornecedor=${item.id}&status=CONCLUIDO_PARCIALMENTE`,
      );
      setNumeroProjetos(
        countConcluido +
          countIniciado +
          countAguardandoInicio +
          countConcluidoParcialmente,
      );
    } catch (error: any) {
      console.error(error.response);
    }
  }, [item.id]);

  useEffect(() => {
    countProjects();
  }, [countProjects]);

  return (
    <>
      <ModalLoading
        showModal={showModalLoadding}
        setShowModal={setShowModalLoadding}
      />

      <ContainerItemVitrine onClick={() => handleOpenPerson(item.id)}>
        <Body>
          <FotoPerfil>
            <Foto
              width={96}
              height={96}
              layout="intrinsic"
              objectFit="cover"
              className="image"
              src={item.urlArquivo}
              alt={item.nome}
            />
            {item.inVoluntariado && <BannerVoluntario />}
          </FotoPerfil>
          <Info>
            <NameTitulo>{item.tratamento}</NameTitulo>
            {item?.notaMedia ? (
              <AvaliacaoFornecedor notaMedia={item.notaMedia} />
            ) : (
              <AvaliacaoFornecedor notaMedia={0} />
            )}
            <TextoMenor>Ranking: {item.ranking}</TextoMenor>
            <TextoMenor>Nº de projetos {numeroProjetos}</TextoMenor>
            <TextoMenor>#{item.nivelExperiencia}</TextoMenor>
          </Info>
        </Body>

        <TextoCategoria>{item?.categoriasEspecialidades[0]}</TextoCategoria>
        <InformacoesProfissionais>
          <span>{item.profissoes && item.profissoes[0]}</span>
          {item.profissoes && item.profissoes.length > 1 && (
            <div className="maisProfissoes">
              <span>+ {item.profissoes?.length - 1} profissões</span>
            </div>
          )}
        </InformacoesProfissionais>

        <Footer>
          {item.areasInteresse && (
            <>
              <Titulo
                titulo="Áreas de Atuação"
                cor={LARANJA}
                tamanho={16}
                negrito={false}
              />
              <AreasInteresse>
                {item.areasInteresse.map((area: AreaProp) => (
                  <Area key={area.descricao}>
                    <span>{area.descricao}</span>
                  </Area>
                ))}
              </AreasInteresse>
            </>
          )}
        </Footer>

        {user && (
          <ContainerItensFooter>
            {user?.id !== item.id && (
              <Favorito
                isLogado={user?.id ? true : false}
                onClick={event => {
                  if (user.id) handleFavorite(event, item.id);
                }}
              >
                {favoriteItem.find(element => element === item.id) ? (
                  <CoracaoOn />
                ) : (
                  <CoracaoOff />
                )}
              </Favorito>
            )}
          </ContainerItensFooter>
        )}
      </ContainerItemVitrine>

      {recontract && (
        <ContainerRecontratar>
          <Button
            label="RECONTRATAR"
            onClick={() =>
              router.push(`/consumidor/projetos/exclusivo/${item.idUsuario}`)
            }
          />
        </ContainerRecontratar>
      )}
    </>
  );
}

export function Vitrine({
  dataVitrine,
  isEmptyPeople,
  recontract,
}: IDataVitrine) {
  const people = dataVitrine;
  const settingsSlider = {
    dots: true,
    speed: 500,
    className: 'container-slider',
    slidesToShow: people?.length <= 3 ? people?.length : 3.6,
    initialSlide: 0,
    slidesToScroll: 1,
    nextArrow: <ArrowSlider />,
    prevArrow: <ArrowSlider />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: people?.length <= 3.6 ? people?.length : 3.3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: people?.length <= 3 ? people?.length : 3.2,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: people?.length <= 3 ? people?.length : 2.4,
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
      {!isEmptyPeople && (
        <Carrousel
          recontract={recontract}
          numeroCompoenentes={people?.length}
          {...settingsSlider}
        >
          {people.map((item: PessoaProp, index: number) => (
            <div key={index}>
              <ItemVitrine item={item} recontract={recontract} />
            </div>
          ))}
        </Carrousel>
      )}
      {isEmptyPeople && (
        <AvatarContainer>
          <Avatar>
            <Carol />
          </Avatar>
          <Dialogo>
            <ContentAvatar>
              <p>
                Opa.. Parece que não encontramos nessa categoria uma solução pro
                seu problema agora. Minha dica é: se seu problema for bem
                específico você pode: <br />
                1. Fazer uma nova busca com outros termos <br />
                2. Publicar um novo projeto
              </p>
            </ContentAvatar>
          </Dialogo>
        </AvatarContainer>
      )}
    </Content>
  );
}
