import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Titulo } from '../../../../components/Titulo';
import {
  AZUL,
  CINZA_30,
  CINZA_40,
  LARANJA,
  VERDE,
} from '../../../../styles/variaveis';
import Exclusivo from '../../../../assets/exclusive.svg';
import ModalDenuncia from '../../../ModalDenuncia';
import IconeVoluntario from '../../../../assets/icon-voluntare.svg';
import Estrela from '../../../../assets/estrela.svg';
import userPhoto from '../../../../assets/user.png';

import {
  ContainerProjeto,
  ProjetoHeader,
  ProjetoBody,
  ProjetoFooter,
  Descricao,
  Consumidor,
  AtividadesRequeridas,
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
  ContentTrash,
  TextoPublicacao,
  ContentLabels,
  ContainerName,
} from './style';
import Content from './style';
import { Card } from '../../../../components/Card';
import { Label } from '../../../../components/Label';
import {
  ProjectType,
  useCaptarProjetoFornecedor,
} from '../../../../hooks/captarProjetoFornecedor';

import { useCallback, useEffect, useState } from 'react';
import { pessoas_api } from '../../../../services/pessoas_api';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import {
  PlanLimits,
  useLimitacoesPlanos,
} from '../../../../contexts/planLimitations';
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
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Medalha } from 'src/components/Medalha';

type PessoaType = {
  id: number;
  id_arquivo: string;
  nome: string;
  nome_tratamento: string;
  idPessoaConsumidor: number;
  moderacao: boolean;
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

export default function Projeto({
  tipo,
  projeto,
  totalFavoritos = 0,
}: ProjetoProps) {
  const { user } = useAuth();
  let { limitacoesPlano } = useLimitacoesPlanos();
  if (!limitacoesPlano) {
    limitacoesPlano = {} as PlanLimits;
  }
  const router = useRouter();

  const { projetosFavoritos, obterProjetosFavoritos, obterProjetosExclusivos } =
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
      router.push('/login');
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
    router,
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

  const obterNotaMedia = useCallback((id: any) => {
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

  function handleShowAvatarCadastroIncompleto() {
    setShowAvatarCadastroIncompleto(!showAvatarCadastroIncompleto);
  }
  const handleExcluirProjeto = useCallback(
    (id_projeto: number) => {
      setLoading(true);
      try {
        oportunidades_api
          .delete(
            `/projetos/${id_projeto}/fornecedor-selecionado/${user.id_pessoa}`,
          )
          .then(() => {
            setShowModalInformation(true);
          });

        setTimeout(() => {
          setLoading(false);
          setShowModalInformation(false);
          obterProjetosExclusivos();
        }, 1500);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
    [user.id_pessoa, obterProjetosExclusivos],
  );

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
                    <AiFillHeart
                      size={64}
                      onClick={handleDesfavoritar}
                      color={LARANJA}
                    />
                  ) : (
                    <AiOutlineHeart
                      size={64}
                      onClick={handleFavoritar}
                      color={LARANJA}
                    />
                  ))}

                {tipo === 'exclusivo' && (
                  <Image
                    src={Exclusivo}
                    width={80}
                    height={80}
                    alt="icon-exclusivo"
                  />
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

                  <p>
                    Esse projeto recebeu {proposalAmount} proposta
                    {proposalAmount > 1 ? 's' : ''}
                  </p>

                  <TextoPublicacao>
                    <span>
                      Publicado há{' '}
                      {formatDistance(
                        new Date(projeto.dataHoraCriacao),
                        new Date(),
                        {
                          locale: pt,
                        },
                      )}
                    </span>
                    {projeto.dataHoraUltimaAtualizacao && (
                      <span>
                        Última atualização em {''}
                        {format(
                          new Date(projeto.dataHoraUltimaAtualizacao),
                          "dd/MM/yyyy ' às ' HH:mm:ss",
                        )}
                      </span>
                    )}
                  </TextoPublicacao>
                </HeaderSecondary>
              </TituloContainer>

              {projeto.proBono ? (
                <FaixaProBono>
                  <div className="icone-voluntario">
                    <Image
                      width={76}
                      height={51}
                      className="icone-voluntario"
                      src={IconeVoluntario}
                      alt="icone-voluntario"
                    />
                  </div>
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
              <Col lg={12}>
                <AtividadesRequeridas>
                  <strong className="atividades-requeridas">
                    Atividades Requeridades:{' '}
                  </strong>
                  {projeto.descricaoEscopo}
                </AtividadesRequeridas>
              </Col>
            </Row>

            <ContentLabels>
              <div className="labels">
                <span>Áreas: </span>
                {projeto?.subareas?.map(subarea => (
                  <Label key={subarea} label={subarea} cor={VERDE} />
                ))}
              </div>

              <div className="niveis">
                <span>Nível de experiência: </span>
                {typeof projeto?.niveisExperiencia !== 'string' ? (
                  <>
                    {projeto?.niveisExperiencia?.map(nivel => (
                      <Label key={nivel} label={nivel} cor={VERDE} />
                    ))}
                  </>
                ) : (
                  <>
                    {projeto?.niveisExperiencia.split('|').map(nivel => (
                      <Label key={nivel} label={nivel} cor={VERDE} />
                    ))}
                  </>
                )}
              </div>
            </ContentLabels>
          </ProjetoBody>

          <ProjetoFooter>
            <ContainerInfo>
              <Consumidor>
                {consumidor.arquivo?.url ? (
                  <div style={{ margin: '0px 10px' }}>
                    <Image
                      style={{ borderRadius: '100%' }}
                      src={consumidor.arquivo?.url || userPhoto}
                      width={45}
                      height={45}
                      alt={consumidor.nome_tratamento}
                    />
                  </div>
                ) : (
                  <Skeleton width="45px" height="45px" radius="50%" />
                )}
                <Info>
                  <ContainerName>
                    <Titulo
                      titulo={consumidor.nome_tratamento}
                      tamanho={20}
                      cor={CINZA_40}
                    />
                    {consumidor.moderacao && (
                      <Medalha chave="pessoa-verificada" isActive={true} />
                    )}
                  </ContainerName>
                  <Avaliacao>
                    <span>{notaMedia?.toFixed(2)}</span>
                    <Image
                      src={Estrela}
                      height={22}
                      width={22}
                      alt="estrela"
                      key={0}
                    />
                  </Avaliacao>
                </Info>
              </Consumidor>
              <ContentButton>
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
                      router.push('/cadastro-basico');
                      return;
                    }

                    router.push({
                      pathname: `/detalhes-projeto/${projeto.id}`,
                      query: { tipo: tipo === 'exclusivo' },
                    });
                  }}
                >
                  MAIS DETALHES
                </Button>
                <ModalDenuncia
                  showModal={showModal}
                  setShowModal={setShowModal}
                  url={linkDenuncia}
                  idPessoaDenunciado={consumidor.id}
                />
              </ContentButton>

              {tipo === 'exclusivo' && (
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
              )}
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
