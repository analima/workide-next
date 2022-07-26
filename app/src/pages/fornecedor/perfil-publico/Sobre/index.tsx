import { useCallback, useEffect, useState } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';

import {
  Acoes,
  NomeTitulo,
  Avaliacao,
  Button,
  FotoPerfil,
  ContentImg,
  CapaProps,
  ContentCapa,
  ContentInfo,
  ContentInfo3,
  ContentOtherInfo,
  LinkToScroll,
  ContentSpinnerLoading,
} from './style';
import Content from './style';
import Image from 'next/image'
import EstrelaOff from '../../../../assets/estrela-off.svg';
import Estrela from '../../../../assets/estrela.svg';
import CoracaoOff from '../../../../assets/coracao-off.svg';
import Coracao from '../../../../assets/coracao.svg';
import { GiShare } from 'react-icons/gi';
import { AZUL } from '../../../../styles/variaveis';
import { ModalRecomendacao } from '../../../../components/ModalRecomendacao';
import { pessoas_api } from '../../../../services/pessoas_api';
import { useAuth } from '../../../../contexts/auth';
import { useHistory } from 'react-router';
import { AvatarCadastroIncompleto } from '../../../../components/AvatarCadastroIncompleto';

import { oportunidades_api } from '../../../../services/oportunidades_api';
import { IProvider } from '../../../../interfaces/IProvider';
import { Skeleton } from '../../../../components/Skeleton';
import { SeloMembro } from '../../../../components/SeloMembro';
import { AvatarErroGeral } from '../../../../components/AvatarErroGeral';
import { FiXCircle } from 'react-icons/fi';
import { Spacer } from '../../../../components/Spacer';
import CapaDefault from '../../../../assets/capa-default.png';
import UploadCapaPhoto from '../UploadCapaPhoto';
import { Spinner } from '../../../../components/Spinner';
import { IPessoa } from 'src/interfaces/IPessoa';

type PropsPage = {
  imageLoaded: boolean;
  dataProps: IProvider;
  getProvider: () => void;
};

export default function Sobre({ dataProps, getProvider, imageLoaded }: PropsPage) {
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [idFornecedores, setIdFornecedores] = useState<number[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [link, setLink] = useState('');
  let { user, refreshUserData } = useAuth();
  if (!user) {
    user = {} as IPessoa;
  }
  const history = useHistory();
  const [showAvatarCadastroIncompleto, setShowAvatarCadastroIncompleto] =
    useState(false);
  const [fotoId, setFotoId] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [loadingCapa, setLoadingCapa] = useState(false);
  const [linkUrlAmbiente, setLinkUrlAmbiente] = useState<string>('');
  const [showDenuncedAvatar, setShowDenuncedAvatar] = useState(false);
  const [formError, setFormError] = useState('');

  function handleShowDenuncedAvatar() {
    setShowDenuncedAvatar(!showDenuncedAvatar);
  }

  function checkDenuncedUser() {
    return user.denuncias.length;
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

  // useEffect(() => {
  //   refreshUserData();
  // }, [refreshUserData]);

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
                  <ContentSpinnerLoading CapaDefault={CapaDefault as any}>
                    <Spinner type="primary" size="24" />
                  </ContentSpinnerLoading>
                ) : (
                  <Image
                    src={dataProps?.capa ? dataProps.capa.url : CapaDefault}
                    alt="capa"
                    className="capa-img"
                  />
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
              </ContentImg>
              <ContentOtherInfo>
                <section>
                  <NomeTitulo>{dataProps?.nome_tratamento}</NomeTitulo>
                  <span>
                    {dataProps?.profissoes &&
                      dataProps?.profissoes[0]?.descricao}
                  </span>

                  {dataProps?.ranking && (
                    <Avaliacao>
                      <span className="nota">
                        {Number(dataProps?.ranking.notaMedia)}
                      </span>
                      {handleShowStars(Number(dataProps?.ranking.notaMedia))}
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
                        `/consumidor/projetos/exclusivo/${dataProps?.id_usuario}`,
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
                </section>
              </ContentOtherInfo>
            </ContentInfo>
          )}
        </Col>
      </Row>
      <Row>
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
    </Content>
  );
}
