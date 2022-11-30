import { useCallback, useEffect, useState } from 'react';

import { Alert, Col, Container, Row } from 'react-bootstrap';
import {
  Info,
  Acoes,
  NomeTitulo,
  Ranking,
  Avaliacao,
  Button,
  FotoPerfil,
  Frame,
  SobreDrescricao,
  ContentImg,
} from './style';
import Content from './style';
import Estrela from '../../../../assets/estrela.svg';
import CoracaoOff from '../../../../assets/coracao-off.svg';
import Coracao from '../../../../assets/coracao.svg';
import { Card } from '../../../../components/Card';
import { GiShare } from 'react-icons/gi';
import { AZUL } from '../../../../styles/variaveis';
import { ModalRecomendacao } from '../../../../components/ModalRecomendacao';
import { pessoas_api } from '../../../../services/pessoas_api';
import { useAuth } from '../../../../contexts/auth';
import { useHistory } from 'react-router';
import { AvatarCadastroIncompleto } from '../../../../components/AvatarCadastroIncompleto';
import { MedalhasFornecedor } from '../../../../components/MedalhasFornecedor';

import { oportunidades_api } from '../../../../services/oportunidades_api';
import { IProvider } from '../../../../interfaces/IProvider';
import { consultas_api } from '../../../../services/consultas_api';
import OutrasInformacoes from '../OutrasInformacoes';
import { Spacer } from '../../../../components/Spacer';
import { Skeleton } from '../../../../components/Skeleton';
import { SeloMembro } from '../../../../components/SeloMembro';
import { AvatarErroGeral } from '../../../../components/AvatarErroGeral';
import { FiXCircle } from 'react-icons/fi';
import { nivel_experiencia } from '../../../../utils/nivelExperiencia';

type ConsultaRankingType = {
  idUsuario: number;
  ranking: number;
  notaMedia: number;
  pontuacao: number;
};

type PropsPage = {
  imageLoaded: boolean;
  dataProps: IProvider;
};

export default function Sobre({ dataProps, imageLoaded }: PropsPage) {
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [idFornecedores, setIdFornecedores] = useState<number[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [link, setLink] = useState('');
  const { user, refreshUserData } = useAuth();
  const history = useHistory();
  const [showAvatarCadastroIncompleto, setShowAvatarCadastroIncompleto] =
    useState(false);
  const [projectsCount, setProjectsCount] = useState(0);
  const [consultaRanking, setConsultaRanking] = useState<ConsultaRankingType>(
    {} as ConsultaRankingType,
  );
  const [linkUrlAmbiente, setLinkUrlAmbiente] = useState<string>('');
  const [showDenuncedAvatar, setShowDenuncedAvatar] = useState(false);
  const [formError, setFormError] = useState('');

  function handleShowDenuncedAvatar() {
    setShowDenuncedAvatar(!showDenuncedAvatar);
  }

  function checkDenuncedUser() {
    const denunciaProcedente = user.denuncias.find(obj => obj.procede === true);
    return denunciaProcedente ? true : false;
  }

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
  }, [user, user.id_pessoa]);

  useEffect(() => {
    const load = async () => {
      if (!user.id_pessoa) return;

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
    if (!user.id_pessoa) return;

    const load = async () => {
      const { data: count } = await oportunidades_api.get(
        `/projetos/count?idPessoaFornecedor=${dataProps.id}`,
      );
      setProjectsCount(count);
    };
    if (dataProps && dataProps.id) {
      load();
    }
  }, [dataProps, user]);

  useEffect(() => {
    if (dataProps?.id_usuario) {
      consultas_api
        .get<ConsultaRankingType>(
          `/consulta/fornecedores/${dataProps?.id_usuario}/ranking`,
        )
        .then(res => {
          setConsultaRanking(res.data);
        });
    }
  }, [dataProps?.id_usuario]);

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

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
      <Card>
        <Container>
          <Row>
            <Col lg={12}>
              <ModalRecomendacao
                showModal={showRecommendationModal}
                setShowModal={setShowRecommendationModal}
                link={link}
              />
            </Col>
          </Row>
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
            <Col lg={3} className="d-flex justify-content-center">
              {!dataProps?.url_video_apresentacao ? (
                <>
                  {imageLoaded ? (
                    <Skeleton width="280px" height="280px" />
                  ) : (
                    <ContentImg>
                      <FotoPerfil
                        alt={dataProps?.nome_tratamento}
                        src={dataProps?.arquivo ? dataProps?.arquivo.url : ''}
                      />
                      {dataProps?.is_membro && <SeloMembro id={dataProps.id} />}
                    </ContentImg>
                  )}
                </>
              ) : (
                <ContentImg>
                  <Frame
                    src={`https://www.youtube.com/embed/${
                      dataProps?.url_video_apresentacao.split('=')[1]
                    }`}
                    title={dataProps?.nome_tratamento}
                  />
                  {dataProps?.is_membro && (
                    <SeloMembro id={dataProps.id} isViewVideo />
                  )}
                </ContentImg>
              )}
            </Col>

            <Col lg={8} style={{ paddingLeft: '32px' }}>
              <Row>
                <Col lg={12}>
                  <Info>
                    <NomeTitulo>{dataProps?.nome_tratamento}</NomeTitulo>

                    {consultaRanking && (
                      <Ranking>Ranking: {consultaRanking.ranking}</Ranking>
                    )}
                  </Info>
                </Col>
              </Row>

              {dataProps?.ranking && (
                <Row>
                  <Col lg={12}>
                    <Avaliacao>
                      <span>{Number(dataProps?.ranking.notaMedia)}</span>
                      <Estrela className="estrela" key={0} />
                    </Avaliacao>
                  </Col>
                </Row>
              )}

              <Row>
                <Col lg={12}>
                  <MedalhasFornecedor id={dataProps?.id} />
                </Col>
              </Row>

              <Row>
                <Col lg={12}>
                  <span className="text-grey">
                    N° de projetos: {projectsCount}{' '}
                  </span>
                  <span className="text-grey">
                    (Este profissional está cadastrado como{' '}
                    {dataProps?.tipo === 'PF'
                      ? 'Pessoa Física'
                      : 'Pessoa Jurídica'}
                    )
                  </span>
                </Col>
              </Row>

              <Spacer size={10} />

              <Row>
                <Col lg={12}>
                  <span className="text-grey">
                    #{nivel_experiencia[dataProps.nivel_experiencia] as string}
                  </span>
                </Col>
              </Row>

              <Row>
                <Col lg={12}>
                  <SobreDrescricao>
                    {dataProps?.resumo_profissional}
                  </SobreDrescricao>
                </Col>
              </Row>
            </Col>
            <Col lg={1}>
              <Acoes>
                <GiShare
                  size={50}
                  color={AZUL}
                  onClick={() => {
                    handleOpenShareLink();
                  }}
                />
                {(user ? user.id_pessoa : 0) !== dataProps.id && (
                  <div>
                    {user && user.id_pessoa ? (
                      <>
                        {!isFavorite && (
                          <CoracaoOff
                            onClick={handleFavorite}
                            className="coracao"
                          />
                        )}
                        {isFavorite && (
                          <Coracao
                            onClick={handleFavorite}
                            className="coracao"
                          />
                        )}
                      </>
                    ) : (
                      <CoracaoOff
                        onClick={() => {
                          history.push('/login');
                        }}
                        className="coracao"
                      />
                    )}
                  </div>
                )}
              </Acoes>
            </Col>
          </Row>
          <Row className="d-flex justify-content-end">
            <Col lg={3}>
              <Button
                isActive
                onClick={() => {
                  if (user?.id_usuario === dataProps?.id_usuario) {
                    setFormError(
                      'Você não pode enviar um orçamento para você mesmo!',
                    );
                    window.scrollTo(0, 0);
                    return;
                  }
                  if (!user.id_pessoa) {
                    history.push('/cadastro-basico');
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
                  history.push(
                    `/contratante/projetos/exclusivo/${dataProps?.id_usuario}`,
                    {
                      id_fornecedor: dataProps?.id,
                    },
                  );
                }}
              >
                {idFornecedores.includes(dataProps?.id)
                  ? 'RECONTRATAR'
                  : 'SOLICITAR ORÇAMENTO'}
              </Button>
            </Col>
          </Row>
          <Spacer size={40} />
          <Row>
            <Col lg={12}>
              <OutrasInformacoes data={dataProps} />
            </Col>
          </Row>
        </Container>
      </Card>
    </Content>
  );
}
