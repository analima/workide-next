import { useCallback, useEffect, useState } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import {
  Acoes,
  NomeTitulo,
  Avaliacao,
  Button,
  Content,
  FotoPerfil,
  ContentImg,
  ContentCapa,
  ContentInfo,
  ContentInfo3,
  ContentOtherInfo,
  LinkToScroll,
  ContentSpinnerLoading,
  ContainerMedalhas,
  BannerVoluntario,
} from './style';

import Estrela from '../../../../assets/estrela.svg';
import CoracaoOff from '../../../../assets/coracao-off.svg';
import Coracao from '../../../../assets/coracao.svg';
import { GiShare } from 'react-icons/gi';
import { AZUL } from '../../../../styles/variaveis';
import { ModalRecomendacao } from '../../../../components/ModalRecomendacao';
import { pessoas_api } from '../../../../services/pessoas_api';
import { ID_TOKEN, useAuth } from '../../../../contexts/auth';
import { useHistory } from 'react-router';
import { AvatarCadastroIncompleto } from '../../../../components/AvatarCadastroIncompleto';

import { oportunidades_api } from '../../../../services/oportunidades_api';
import { IProvider } from '../../../../interfaces/IProvider';
import { Skeleton } from '../../../../components/Skeleton';
import { SeloMembro } from '../../../../components/SeloMembro';
import { AvatarErroGeral } from '../../../../components/AvatarErroGeral';
import { FiXCircle } from 'react-icons/fi';
import { Spacer } from '../../../../components/Spacer';
import CapaDefault from '@public/capa-default.png';
import { UploadCapaPhoto } from '../UploadCapaPhoto';
import { Spinner } from '../../../../components/Spinner';
import { MedalhasFornecedor } from '../../../../components/MedalhasFornecedor';
import { consultas_api } from '../../../../services/consultas_api';
import Image from 'next/image';
import { useRouter } from 'next/router';

type PropsPage = {
  imageLoaded: boolean;
  dataProps: IProvider;
  getProvider: () => void;
};

type ConsultaRankingType = {
  idUsuario: number;
  ranking: number;
  notaMedia: number;
  pontuacao: number;
};

export function Sobre({ dataProps, getProvider, imageLoaded }: PropsPage) {
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [idFornecedores, setIdFornecedores] = useState<number[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [link, setLink] = useState('');
  const { user, refreshUserData } = useAuth();
  const router = useRouter();
  const [showAvatarCadastroIncompleto, setShowAvatarCadastroIncompleto] =
    useState(false);
  const [fotoId, setFotoId] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [loadingCapa, setLoadingCapa] = useState(false);
  const [linkUrlAmbiente, setLinkUrlAmbiente] = useState<string>('');
  const [showDenuncedAvatar, setShowDenuncedAvatar] = useState(false);
  const [formError, setFormError] = useState('');
  const [sizePage, setSizePage] = useState(0);
  const [projectsCount, setProjectsCount] = useState();
  const [consultaRanking, setConsultaRanking] = useState(0);
  const handleResize = (e: any) => {
    setSizePage(window.innerWidth);
  };

  useEffect(() => {
    setSizePage(window.innerWidth);
    window.addEventListener('resize', handleResize);
  }, []);

  function handleShowDenuncedAvatar() {
    setShowDenuncedAvatar(!showDenuncedAvatar);
  }

  function checkDenuncedUser() {
    return user.denuncias.length;
  }

  useEffect(() => {
    if (!dataProps.id) return;
    const load = async () => {
      if (user.id_pessoa) {
        const newIdToken = localStorage.getItem(ID_TOKEN);

        if (newIdToken) {
          const { data: countConcluido } = await oportunidades_api.get(
            `/projetos/count?idPessoaFornecedor=${dataProps.id}&status=CONCLUIDO`,
          );
          const { data: countIniciado } = await oportunidades_api.get(
            `/projetos/count?idPessoaFornecedor=${dataProps.id}&status=INICIADO`,
          );
          const { data: countAguardandoInicio } = await oportunidades_api.get(
            `/projetos/count?idPessoaFornecedor=${dataProps.id}&status=AGUARDANDO_INICIO`,
          );
          const { data: countConcluidoParcialmente } =
            await oportunidades_api.get(
              `/projetos/count?idPessoaFornecedor=${dataProps.id}&status=CONCLUIDO_PARCIALMENTE`,
            );
          setProjectsCount(
            countConcluido +
              countIniciado +
              countAguardandoInicio +
              countConcluidoParcialmente,
          );
          consultas_api
            .get<ConsultaRankingType>(
              `/consulta/fornecedores/${user.id_usuario}/ranking`,
            )
            .then(({ data }) => {
              setConsultaRanking(data.ranking);
            });
        }
      }
    };
    if (dataProps && dataProps.id) {
      load();
    }
  }, [dataProps, user]);

  const handleLinkShare = useCallback(() => {
    const urlAtual = window.location.href;
    const posicaoBarra = urlAtual.indexOf('/', 8);
    setLinkUrlAmbiente(urlAtual.slice(0, posicaoBarra));
  }, [setLinkUrlAmbiente]);

  useEffect(() => {
    handleLinkShare();
  }, [handleLinkShare]);

  function handleShowAvatarCadastroIncompleto() {
    setShowAvatarCadastroIncompleto(!showAvatarCadastroIncompleto);
  }

  useEffect(() => {
    if (user.id_pessoa) {
      const newIdToken = localStorage.getItem(ID_TOKEN);

      if (newIdToken) {
        try {
          if (!user.id_pessoa) return;
          oportunidades_api
            .get(`/projetos/fornecedores-contratados`)
            .then(({ data }) => {
              setIdFornecedores(data);
            });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [user, user.id_pessoa]);

  useEffect(() => {
    const load = async () => {
      if (user.id_pessoa) {
        const newIdToken = localStorage.getItem(ID_TOKEN);

        if (newIdToken) {
          const { data } = await pessoas_api.get(`/fornecedores/favoritos`);
          setIsFavorite(
            data.findIndex((f: any) => {
              if (f && dataProps) {
                return f.id === dataProps.id;
              } else {
                return false;
              }
            }) !== -1,
          );
        }
      }
    };
    if (dataProps !== undefined) {
      load();
    }
  }, [dataProps, user]);

  const handleFavorite = useCallback(() => {
    const load = async () => {
      if (!isFavorite) {
        await pessoas_api.post(`/fornecedores/${dataProps.id}/favoritos`);
        setIsFavorite(true);
      } else {
        await pessoas_api.delete(`/fornecedores/${dataProps.id}/favoritos`);
        setIsFavorite(false);
      }
    };
    load();
  }, [setIsFavorite, dataProps, isFavorite]);

  const handleOpenShareLink = useCallback(() => {
    const handleLink = `${linkUrlAmbiente}/fornecedor/perfil-publico/${
      dataProps?.id
    }-${(dataProps?.nome_tratamento).replace(/ /g, '-')}`;
    setLink(handleLink);
    setShowRecommendationModal(true);
  }, [dataProps?.id, dataProps?.nome_tratamento, linkUrlAmbiente]);

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  const handleSave = useCallback(async () => {
    setLoadingCapa(true);
    let pessoaRequestBody = {
      id_capa: fotoId,
      nome: dataProps.nome,
    };
    try {
      await pessoas_api.put('/pessoas/', pessoaRequestBody);
    } catch (error: any) {
      setFormError(error.response.data.message);
      window.scrollTo(0, 0);
      setLoadingCapa(false);
      return;
    }
    setTimeout(() => {
      getProvider();
      setLoadingCapa(false);
    }, 1000);
  }, [dataProps.nome, fotoId, getProvider]);

  return (
    <Content>
      <AvatarErroGeral
        mensagem="Ops, parece que há uma denuncia procedente para o seu usuário. Por esse motivo você não pode realizar essa ação"
        mostrar={showDenuncedAvatar}
        esconderAvatar={handleShowDenuncedAvatar}
      />
      <AvatarCadastroIncompleto
        mostrar={showAvatarCadastroIncompleto}
        esconderAvatar={handleShowAvatarCadastroIncompleto}
        porcentagem={user.percentageRegisterConsumer || 33}
        isConsumer={true}
      />
      <ModalRecomendacao
        showModal={showRecommendationModal}
        setShowModal={setShowRecommendationModal}
        link={link}
      />

      {formError && (
        <Row>
          <Col lg={12}>
            <Alert variant="danger">
              {formError}
              <FiXCircle
                className="fechar"
                onClick={() => setFormError('')}
                size={20}
                color="#c53030"
              />
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col lg={12}>
          <ContentCapa>
            {imageLoaded ? (
              <Skeleton width="100%" height="100%" />
            ) : (
              <>
                {loadingCapa ? (
                  <ContentSpinnerLoading CapaDefault={CapaDefault.src}>
                    <Spinner type="primary" size="24" />
                  </ContentSpinnerLoading>
                ) : (
                  <div className="capa">
                    <Image
                      src={dataProps?.capa ? dataProps.capa.url : CapaDefault}
                      className="coracao"
                      layout="fill"
                      alt="off"
                    />
                  </div>
                )}
              </>
            )}
            {!imageLoaded && (
              <Acoes>
                <GiShare
                  size={32}
                  color={AZUL}
                  onClick={() => {
                    handleOpenShareLink();
                  }}
                />

                {(user ? user.id_pessoa : 0) !== dataProps.id ? (
                  <div>
                    {user && user.id_pessoa ? (
                      <>
                        {!isFavorite && (
                          <Image
                            src={CoracaoOff}
                            onClick={handleFavorite}
                            className="coracao"
                            width={20}
                            height={20}
                            alt="off"
                          />
                        )}
                        {isFavorite && (
                          <Image
                            src={Coracao}
                            onClick={handleFavorite}
                            className="coracao"
                            width={20}
                            height={20}
                            alt="off"
                          />
                        )}
                      </>
                    ) : (
                      <Image
                        src={CoracaoOff}
                        onClick={() => {
                          router.push('/login');
                        }}
                        className="coracao"
                        width={20}
                        height={20}
                        alt="off"
                      />
                    )}
                  </div>
                ) : (
                  <UploadCapaPhoto
                    fotoId={fotoId}
                    setFotoId={setFotoId}
                    fotoUrl={fotoUrl}
                    setFotoUrl={setFotoUrl}
                    handleSave={handleSave}
                  />
                )}
              </Acoes>
            )}
          </ContentCapa>
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          {!imageLoaded && (
            <ContentInfo>
              <ContentImg>
                <FotoPerfil
                  alt={dataProps?.nome_tratamento}
                  src={dataProps?.arquivo ? dataProps?.arquivo.url : ''}
                />
                {dataProps?.is_membro && <SeloMembro id={dataProps.id} />}
                {dataProps?.voluntariado && <BannerVoluntario />}
                {sizePage > 578 && (
                  <ContainerMedalhas>
                    <MedalhasFornecedor id={dataProps?.id} />
                  </ContainerMedalhas>
                )}
              </ContentImg>

              <ContentOtherInfo>
                <section>
                  {sizePage <= 578 && <MedalhasFornecedor id={dataProps?.id} />}
                  <NomeTitulo>{dataProps?.nome_tratamento}</NomeTitulo>
                  <span>
                    {dataProps?.profissoes &&
                      dataProps?.profissoes[0]?.descricao}
                  </span>

                  {consultaRanking !== 0 && (
                    <>
                      {sizePage > 578 && <br />}
                      <span className="informacoes">
                        Ranking: {consultaRanking}
                      </span>
                    </>
                  )}
                  {projectsCount && (
                    <span className="informacoes">
                      {sizePage > 578 && <br />}
                      Número de projetos: {projectsCount}
                    </span>
                  )}

                  {dataProps?.ranking && (
                    <Avaliacao>
                      <span className="nota">
                        {Number(dataProps?.ranking.notaMedia)}
                      </span>
                      <Image
                        src={Estrela}
                        height={22}
                        width={22}
                        alt="estrela"
                        key={0}
                      />
                    </Avaliacao>
                  )}
                </section>

                <section>
                  <Button
                    isActive
                    onClick={() => {
                      if (user?.id_usuario === dataProps?.id_usuario) {
                        setFormError(
                          'Você não pode solicitar um orçamento para você mesmo!',
                        );
                        window.scrollTo(0, 0);
                        return;
                      }
                      if (!user.id_pessoa) {
                        router.push('/cadastro-basico');
                        return;
                      }
                      if (
                        user.percentageRegisterConsumer &&
                        user.percentageRegisterConsumer < 66
                      ) {
                        handleShowAvatarCadastroIncompleto();
                        return;
                      }
                      if (checkDenuncedUser()) {
                        handleShowDenuncedAvatar();
                        return;
                      }
                      router.push(
                        `/contratante/projetos/exclusivo/${dataProps?.id_usuario}`,
                        {
                          pathname: `/contratante/projetos/exclusivo/${dataProps?.id_usuario}`,
                          query: {
                            id_fornecedor: dataProps?.id,
                          },
                        },
                      );
                    }}
                  >
                    {idFornecedores.includes(dataProps?.id)
                      ? 'RECONTRATAR'
                      : 'SOLICITAR PROPOSTA'}
                  </Button>
                </section>
              </ContentOtherInfo>
            </ContentInfo>
          )}
        </Col>
      </Row>

      {sizePage > 578 && (
        <Row>
          <Spacer size={15} />
          <Col lg={12}>
            {!imageLoaded ? (
              <ContentInfo3>
                <LinkToScroll
                  activeClass="active"
                  to="professional"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                >
                  Profissional
                </LinkToScroll>

                <LinkToScroll
                  activeClass="active"
                  to="portfolio"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                >
                  Portfólio
                </LinkToScroll>

                <LinkToScroll
                  activeClass="active"
                  to="interest"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={200}
                >
                  Áreas de interesse
                </LinkToScroll>

                <LinkToScroll
                  activeClass="active"
                  to="training"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                >
                  Capacitação
                </LinkToScroll>

                <LinkToScroll
                  activeClass="active"
                  to="causes"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={100}
                >
                  Causas sociais
                </LinkToScroll>
              </ContentInfo3>
            ) : (
              <>
                <Spacer size={10} />
                <Skeleton width="100%" height="36px" />
              </>
            )}
          </Col>
        </Row>
      )}
    </Content>
  );
}
