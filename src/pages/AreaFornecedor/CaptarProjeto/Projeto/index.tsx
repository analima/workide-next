import { Col, Row } from 'react-bootstrap';
import { Titulo } from '../../../../components/Titulo';
import {
  AZUL,
  CINZA_30,
  CINZA_40,
  LARANJA,
  VERDE,
} from '../../../../styles/variaveis';
import { ReactComponent as Exclusivo } from '../../../../assets/exclusive.svg';
import { ModalDenuncia } from '../../../ModalDenuncia';
import { ReactComponent as IconeVoluntario } from '../../../../assets/icon-voluntare.svg';
import { ReactComponent as EstrelaOff } from '../../../../assets/estrela-off.svg';
import { ReactComponent as Estrela } from '../../../../assets/estrela.svg';
import userPhoto from '../../../../assets/user.png';

import {
  Content,
  ContainerProjeto,
  ProjetoHeader,
  ProjetoBody,
  ProjetoFooter,
  Descricao,
  Consumidor,
  FotoPerfil,
  Info,
  Avaliacao,
  Button,
  AnuncioComErro,
  TituloContainer,
  DataPublicacao,
  FaixaPrecoContainer,
  FaixaPrecoLabel,
  ValorServico,
  ContainerInfo,
  ContentButton,
  ContentFaixa,
  FaixaProBono,
  HeaderContent,
  HeaderSecondary,
  Compartilhar,
  ContentFooter,
  ContentTrash,
} from './style';

import { Card } from '../../../../components/Card';
import { Label } from '../../../../components/Label';
import {
  ProjectType,
  useCaptarProjetoFornecedor,
} from '../../../../hooks/captarProjetoFornecedor';

import { ReactComponent as Coracao } from '../../../../assets/coracao.svg';
import { ReactComponent as CoracaoOff } from '../../../../assets/coracao-off.svg';
import { useCallback, useEffect, useState } from 'react';
import { pessoas_api } from '../../../../services/pessoas_api';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { useLimitacoesPlanos } from '../../../../contexts/planLimitations';
import { AvatarRegrasPlano } from '../../../../components/AvatarRegrasPlano';
import { format, formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { useHistory } from 'react-router-dom';
import { Skeleton } from '../../../../components/Skeleton';
import { useAuth } from '../../../../contexts/auth';
import { AvatarCadastroIncompleto } from '../../../../components/AvatarCadastroIncompleto';
import { ModalInformation } from '../../../../components/ModalInformation';
import { FiTrash2 } from 'react-icons/fi';
import { GiShare } from 'react-icons/gi';
import { ModalRecomendacao } from '../../../../components/ModalRecomendacao';
import { Spinner } from '../../../../components/Spinner';

type PessoaType = {
  id: number;
  id_arquivo: string;
  nome: string;
  nome_tratamento: string;
  idPessoaConsumidor: number;
  arquivo: {
    id: string;
    url: string;
  };
};

type ProjetoProps = {
  tipo: 'exclusivo' | 'normal';
  projeto: ProjectType;
  totalFavoritos?: number;
};

export function Projeto({ tipo, projeto, totalFavoritos = 0 }: ProjetoProps) {
  const { user } = useAuth();
  const { projetosFavoritos, obterProjetosFavoritos } =
    useCaptarProjetoFornecedor();
  const [consumidor, setConsumidor] = useState<PessoaType>({} as PessoaType);
  const history = useHistory();
  const [projetoFavorito, setProjetoFavorito] = useState(false);
  const [linkDenuncia, setLinkDenuncia] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAvatarRegrasPlano, setShowAvatarRegrasPlano] = useState(false);
  const [showAvatarCadastroIncompleto, setShowAvatarCadastroIncompleto] =
    useState(false);
  const [proposalAmount, setProposalAmount] = useState(0);

  const { limitacoesPlano } = useLimitacoesPlanos();
  const [notaMedia, setNotaMedia] = useState<number>(0);
  const [showModalInformation, setShowModalInformation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [linkUrlAmbiente, setLinkUrlAmbiente] = useState<string>('');
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [link, setLink] = useState('');

  const handleShowAvatarRegrasPlano = useCallback(() => {
    setShowAvatarRegrasPlano(!showAvatarRegrasPlano);
  }, [showAvatarRegrasPlano]);

  const handleLinkDenuncia = useCallback(() => {
    const urlAtual = window.location.href;
    const posicaoBarra = urlAtual.indexOf('/f');
    setLinkDenuncia(
      `${urlAtual.slice(0, posicaoBarra)}/detalhes-projeto/${projeto.id}`,
    );
  }, [setLinkDenuncia, projeto.id]);

  const exibePrecos = (projeto: ProjectType): string => {
    const precoMinimoStr = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 2,
    }).format(projeto.precoMinimo);

    const precoMaximoStr = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 2,
    }).format(projeto.precoMaximo);
    if (projeto.precoMinimo === projeto.precoMaximo) {
      return precoMinimoStr;
    }
    return `${precoMinimoStr} - ${precoMaximoStr}`;
  };

  const handleFavoritar = useCallback(async () => {
    if (!user.id_pessoa) {
      history.push('/cadastro-basico');
      return;
    }

    const response = await oportunidades_api.get('/projetos/favoritos');
    const numeroFavoritos = response.data.length;

    if (numeroFavoritos >= limitacoesPlano.favoritarProjetos) {
      handleShowAvatarRegrasPlano();
      return;
    }
    oportunidades_api
      .post(`/projetos/${projeto.id}/favoritos`)
      .then(() => {
        obterProjetosFavoritos();
      })
      .catch(error => {
        console.error(error.response);
      });
  }, [
    user.id_pessoa,
    limitacoesPlano.favoritarProjetos,
    projeto.id,
    history,
    handleShowAvatarRegrasPlano,
    obterProjetosFavoritos,
  ]);

  const handleDesfavoritar = useCallback(async () => {
    await oportunidades_api.delete(`/projetos/${projeto.id}/favoritos`);
    obterProjetosFavoritos();
  }, [projeto.id, obterProjetosFavoritos]);

  useEffect(() => {
    setProjetoFavorito(
      projetosFavoritos.map(fav => fav.id).includes(projeto.id),
    );
  }, [projetosFavoritos, projeto.id]);

  const obterNotaMedia = useCallback((id:any) => {
    if (id) {
      oportunidades_api
        .get(`/projetos/avaliacoes-consumidor/${id}/count`)
        .then(({ data }) => {
          if (data.media) {
            setNotaMedia(data.media);
          } else {
            setNotaMedia(0);
          }
        });
    }
  }, []);

  useEffect(() => {
    pessoas_api
      .get<PessoaType>(`/pessoas/${projeto.idPessoaConsumidor}`)
      .then(res => {
        setConsumidor(res.data);
        obterNotaMedia(res.data?.id);
      });
  }, [projeto.idPessoaConsumidor, obterNotaMedia]);

  function handleShowStars(numberOfStars: number) {
    const stars = [];
    for (let i = 1; i <= 5; i += 1) {
      if (i <= numberOfStars) {
        if (numberOfStars === 0)
          stars.push(
            <EstrelaOff className="estrela" key={i + Math.random()} />,
          );
        else
          stars.push(<Estrela className="estrela" key={i + Math.random()} />);
      } else {
        stars.push(<EstrelaOff className="estrela" key={i + Math.random()} />);
      }
    }
    return stars;
  }

  function handleShowAvatarCadastroIncompleto() {
    setShowAvatarCadastroIncompleto(!showAvatarCadastroIncompleto);
  }
  // const handleExcluirProjeto = useCallback(
  //   (id_projeto: number) => {
  //     setLoading(true);
  //     try {
  //       oportunidades_api
  //         .delete(
  //           `/projetos/${id_projeto}/fornecedor-selecionado/${user.id_pessoa}`,
  //         )
  //         .then(() => {
  //           setShowModalInformation(true);
  //         });

  //       setTimeout(() => {
  //         setLoading(false);
  //         setShowModalInformation(false);
  //         obterProjetosExclusivos();
  //       }, 1500);
  //     } catch (error) {
  //       console.error(error);
  //       setLoading(false);
  //     }
  //   },
  //   [user.id_pessoa, obterProjetosExclusivos],
  // );

  useEffect(() => {
    oportunidades_api
      .get(`/projetos/${projeto.id}/propostas/count`)
      .then(({ data }) => {
        setProposalAmount(data);
      });
  }, [projeto.id]);

  const handleLinkShare = useCallback(() => {
    const urlAtual = window.location.href;
    const posicaoBarra = urlAtual.indexOf('/', 8);
    setLinkUrlAmbiente(urlAtual.slice(0, posicaoBarra));
  }, [setLinkUrlAmbiente]);

  useEffect(() => {
    handleLinkShare();
  }, [handleLinkShare]);

  const handleOpenShareLink = useCallback(() => {
    const handleLink = `${linkUrlAmbiente}/detalhes-projeto/${projeto.id}`;
    setLink(handleLink);
    setShowRecommendationModal(true);
  }, [linkUrlAmbiente, projeto.id]);

  return (
    <Content>
      <AvatarRegrasPlano
        mostrar={showAvatarRegrasPlano}
        esconderAvatar={handleShowAvatarRegrasPlano}
        premium={limitacoesPlano.idPlano === 4}
      />

      <AvatarCadastroIncompleto
        mostrar={showAvatarCadastroIncompleto}
        esconderAvatar={handleShowAvatarCadastroIncompleto}
        porcentagem={user.percentageRegisterConsumer || 33}
        isConsumer={false}
      />

      <ModalRecomendacao
        showModal={showRecommendationModal}
        setShowModal={setShowRecommendationModal}
        link={link}
      />
      <Card>
        <ContainerProjeto>
          <ProjetoHeader>
            <HeaderContent>
              <TituloContainer>
                {tipo === 'normal' &&
                  (projetoFavorito ? (
                    <Coracao onClick={handleDesfavoritar} />
                  ) : (
                    <CoracaoOff onClick={handleFavoritar} />
                  ))}

                {tipo === 'exclusivo' && (
                  <Exclusivo className="icon-exclusivo" />
                )}
                <HeaderSecondary>
                  <h1>{projeto.nome}</h1>
                  <DataPublicacao>
                    Publicado há{' '}
                    {formatDistance(
                      new Date(projeto.dataHoraCriacao),
                      new Date(),
                      {
                        locale: pt,
                      },
                    )}
                  </DataPublicacao>
                  {projeto.dataHoraUltimaAtualizacao && (
                    <DataPublicacao>
                      Última atualização em {''}
                      {format(
                        new Date(projeto.dataHoraUltimaAtualizacao),
                        "dd/MM/yyyy ' às ' HH:mm:ss",
                      )}
                    </DataPublicacao>
                  )}
                </HeaderSecondary>
              </TituloContainer>

              {projeto.proBono ? (
                <FaixaProBono>
                  <IconeVoluntario />
                  <div className="voluntariado">
                    {projeto.escopo === 'ABERTO' && (
                      <FaixaPrecoLabel right>Por hora</FaixaPrecoLabel>
                    )}
                    <span>VOLUNTÁRIO</span>
                    {projeto.escopo === 'ABERTO' && (
                      <p>Quantidade de horas: {projeto.totalHoras}h </p>
                    )}
                  </div>
                </FaixaProBono>
              ) : (
                <FaixaPrecoContainer>
                  <ContentFaixa escopo={projeto.escopo}>
                    <FaixaPrecoLabel>Faixa de preço</FaixaPrecoLabel>
                    {projeto.escopo === 'ABERTO' && (
                      <FaixaPrecoLabel right>Por hora</FaixaPrecoLabel>
                    )}
                  </ContentFaixa>

                  <ValorServico>
                    <h1>{exibePrecos(projeto)}</h1>
                  </ValorServico>
                  {projeto.escopo === 'ABERTO' && (
                    <p>Quantidade de horas: {projeto.totalHoras}h</p>
                  )}
                </FaixaPrecoContainer>
              )}
            </HeaderContent>
          </ProjetoHeader>

          <ProjetoBody>
            <Row>
              <Col lg={12}>
                <Descricao>{projeto.descricao}</Descricao>
              </Col>
            </Row>

            <Row>
              <Col lg={10}>
                {projeto?.subareas?.map(subarea => (
                  <Label key={subarea} label={subarea} cor={VERDE} />
                ))}
              </Col>
            </Row>
          </ProjetoBody>

          <ProjetoFooter>
            <ContainerInfo>
              <Col lg={6}>
                <Consumidor>
                  {consumidor.arquivo?.url ? (
                    <FotoPerfil
                      src={consumidor.arquivo?.url || userPhoto}
                      alt={consumidor.nome_tratamento}
                    />
                  ) : (
                    <Skeleton width="45px" height="45px" radius="50%" />
                  )}
                  <Info>
                    <Titulo
                      titulo={consumidor.nome_tratamento}
                      tamanho={20}
                      cor={CINZA_40}
                    />
                    <Avaliacao>
                      <span>{notaMedia?.toFixed(2)}</span>
                      {handleShowStars(notaMedia)}
                    </Avaliacao>
                  </Info>
                </Consumidor>
              </Col>
              <Col
                lg={6}
                className="d-flex justify-content-end align-items-center"
              >
                <p>
                  Esse projeto recebeu {proposalAmount} proposta
                  {proposalAmount > 1 ? 's' : ''}
                </p>
              </Col>

              <ContentFooter>
                <AnuncioComErro
                  onClick={() => {
                    if (!user.id_pessoa) {
                      history.push('/cadastro-basico');

                      return;
                    }

                    handleLinkDenuncia();
                    setShowModal(true);
                  }}
                >
                  Tem algo de errado com esse anúncio?
                </AnuncioComErro>

                <ModalDenuncia
                  showModal={showModal}
                  setShowModal={setShowModal}
                  url={linkDenuncia}
                  idPessoaDenunciado={consumidor.id}
                />
                <ContentButton>
                  <Compartilhar onClick={() => handleOpenShareLink()}>
                    <GiShare color={AZUL} size={24} />
                    COMPARTILHAR
                  </Compartilhar>
                  <Button
                    isMesmoUsuario={
                      projeto.idPessoaConsumidor === user.id ? false : true
                    }
                    disabled={projeto.idPessoaConsumidor === user.id}
                    onClick={() => {
                      if (!user.id_pessoa) {
                        history.push('/cadastro-basico');
                        return;
                      }

                      history.push(`/detalhes-projeto/${projeto.id}`, {
                        tipo: tipo === 'exclusivo',
                      });
                    }}
                  >
                    MAIS DETALHES
                  </Button>
                </ContentButton>
              </ContentFooter>

              {/* {tipo === 'exclusivo' && (
                <ContentTrash>
                  <span>
                    {!loading ? (
                      <FiTrash2
                        size={24}
                        color={CINZA_30}
                        onClick={() => handleExcluirProjeto(projeto.id)}
                      />
                    ) : (
                      <Spinner />
                    )}
                  </span>
                </ContentTrash>
              )} */}
            </ContainerInfo>
          </ProjetoFooter>
        </ContainerProjeto>
      </Card>

      <ModalInformation
        showModal={showModalInformation}
        setShowModal={setShowModalInformation}
        title="Você foi removido do projeto"
        color={LARANJA}
      />
    </Content>
  );
}
