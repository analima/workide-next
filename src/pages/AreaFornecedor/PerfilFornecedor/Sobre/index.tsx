import { useCallback, useEffect, useState } from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import {
  Info,
  Acoes,
  NomeTitulo,
  Ranking,
  Avaliacao,
  Button,
  Content,
  FotoPerfil,
  Frame,
  GhostButton,
  Medalhas,
  SobreDrescricao,
} from './style';

import { ReactComponent as EstrelaOff } from '../../../../assets/estrela-off.svg';
import { ReactComponent as Estrela } from '../../../../assets/estrela.svg';
import { ReactComponent as CoracaoOff } from '../../../../assets/coracao-off.svg';
import { Card } from '../../../../components/Card';
import { FiShare2 } from 'react-icons/fi';
import { AZUL } from '../../../../styles/variaveis';
import { Medalha } from '../../../../components/Medalha';
import { ModalRecomendacao } from '../../../../components/ModalRecomendacao';
import { arquivos_api } from '../../../../services/arquivos_api';
import { pessoas_api } from '../../../../services/pessoas_api';
import { consultas_api } from '../../../../services/consultas_api';
import { useAuth } from '../../../../contexts/auth';
import { geral_api } from '../../../../services/geral_api';
import { AvatarCadastroIncompleto } from '../../../../components/AvatarCadastroIncompleto';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { AvatarErroGeral } from '../../../../components/AvatarErroGeral';

type PerfilFornecedorProps = {
  dataProps: {
    nome: string;
    id_usuario: number;
    resumo_profissional: string;
    url_video_apresentacao: string | null;
    usuario: UserProps;
    id_arquivo?: string | null;
    tipo: string;
    id: number;
  };
  isPreview?: boolean;
};

type UserProps = {
  id: number;
  email: string;
  tipo: string;
};

export function Sobre({ dataProps, isPreview = false }: PerfilFornecedorProps) {
  const { user, refreshUserData } = useAuth();
  const [hasFundadorMedal, setHasFundadorMedal] = useState(false);
  const [hasVerificadoMedal, setHasVerificadoMedal] = useState(false);
  const [hasFeedbackMedal, setHasFeedbackMedal] = useState(false);
  const [showRecomendacaoModal, setShowRecomendacaoModal] = useState(false);
  const [evaluation, setEvaluation] = useState(0);
  const [ranking, setRanking] = useState(0);
  const [titleSendMessage, setTitleSendMessage] = useState(true);
  const [img, setImg] = useState('');
  const [link, setLink] = useState('');
  const [showAvatarCadastroIncompleto, setShowAvatarCadastroIncompleto] =
    useState(false);
  const [numeroProjetos, setNumeroProjetos] = useState<number>(0);
  const [linkUrlAmbiente, setLinkUrlAmbiente] = useState<string>();
  const [showDenuncedAvatar, setShowDenuncedAvatar] = useState(false);

  function handleShowDenuncedAvatar() {
    setShowDenuncedAvatar(!showDenuncedAvatar);
  }

  function checkDenuncedUser() {
    const denunciaProcedente = user.denuncias.find(obj => obj.procede === true);
    return denunciaProcedente ? true : false;
  }

  const handleLinkShare = useCallback(() => {
    const urlAtual = window.location.href;
    const posicaoBarra = urlAtual.indexOf('/', 7);
    setLinkUrlAmbiente(urlAtual.slice(0, posicaoBarra));
  }, [setLinkUrlAmbiente]);

  useEffect(() => {
    handleLinkShare();
  }, [handleLinkShare]);

  function handleShowAvatarCadastroIncompleto() {
    setShowAvatarCadastroIncompleto(!showAvatarCadastroIncompleto);
  }

  useEffect(() => {
    if (dataProps) {
      consultas_api
        .get(`/consulta/fornecedores/${dataProps?.id_usuario}/ranking`)
        .then(res => {
          setEvaluation(res.data?.notaMedia);
          setRanking(res.data?.ranking);
        });
    }

    async function handleImg() {
      const { data } = await arquivos_api.get(
        `arquivos/${dataProps?.id_arquivo}`,
      );
      setImg(data.url);
    }
    handleImg();
  }, [dataProps]);

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

  const userHasFeedback = useCallback(async () => {
    if (!user.id_usuario) return false;
    const { data: feedbacks } = await geral_api.get(
      `/feedbacks/${user.id_usuario}`,
    );
    if (feedbacks && feedbacks.length > 0) {
      return true;
    }
    return false;
  }, [user.id_usuario]);

  const handleMedals = useCallback(async () => {
    if (user.id_usuario) {
      const { data: pessoa } = await pessoas_api.get(
        `/pessoas?id_usuario=${user.id_usuario}`,
      );
      const feedback = await userHasFeedback();
      feedback ? setHasFeedbackMedal(true) : setHasFeedbackMedal(false);

      pessoa.fundador === true
        ? setHasFundadorMedal(true)
        : setHasFundadorMedal(false);
      pessoa.moderacao === true
        ? setHasVerificadoMedal(true)
        : setHasVerificadoMedal(false);
    }
  }, [user.id_usuario, userHasFeedback]);

  useEffect(() => {
    handleMedals();
  }, [handleMedals]);

  const handleOpenShareLink = useCallback(
    (event: any) => {
      const handleLink = `${linkUrlAmbiente}/fornecedor/perfil-publico/${
        dataProps?.usuario.id
      }-${(dataProps?.nome).replace(/ /g, '-')}`;
      setLink(handleLink);
      setShowRecomendacaoModal(true);
    },
    [dataProps?.nome, dataProps?.usuario.id, linkUrlAmbiente],
  );

  useEffect(() => {
    if (user.id_pessoa) {
      const obterNumeroProjetos = async () => {
        const { data: projetos } = await oportunidades_api.get(
          `/projetos/count?idPessoaFornecedor=${user.id_pessoa}&status=INICIADO`,
        );
        setNumeroProjetos(projetos);
      };
      obterNumeroProjetos();
    }
  }, [user.id_pessoa]);

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
                showModal={showRecomendacaoModal}
                setShowModal={setShowRecomendacaoModal}
                link={link}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={3} className="d-flex justify-content-center">
              {dataProps?.url_video_apresentacao ? (
                <Frame
                  src={`https://www.youtube.com/embed/${
                    dataProps?.url_video_apresentacao.split('=')[1]
                  }`}
                  title={dataProps?.nome}
                />
              ) : (
                <FotoPerfil alt={dataProps?.nome} src={img} />
              )}
            </Col>

            <Col lg={8} style={{ paddingLeft: '32px' }}>
              <Row>
                <Col lg={12}>
                  <Info>
                    <NomeTitulo>{dataProps?.nome}</NomeTitulo>
                    <Ranking>Ranking: {ranking}</Ranking>
                  </Info>
                </Col>
              </Row>

              <Row>
                <Col lg={12}>
                  <Avaliacao>
                    <span>{evaluation}</span>
                    {handleShowStars(evaluation)}
                  </Avaliacao>
                </Col>
              </Row>

              <Row>
                <Col lg={12}>
                  <Medalhas>
                    <Medalha
                      chave="pessoa-verificada"
                      isActive={hasVerificadoMedal}
                    />
                    <Medalha chave="fundador" isActive={hasFundadorMedal} />
                    <Medalha chave="feedback" isActive={hasFeedbackMedal} />
                    <Medalha chave="recomendacao-prata" />
                    {/* <Medalha chave="indicacao-bronze" /> */}
                    <Medalha
                      chave="primeiro-projeto"
                      isActive={numeroProjetos > 0 ? true : false}
                    />
                  </Medalhas>
                </Col>
              </Row>

              <Row>
                <Col lg={12}>
                  <span>N° de projetos: {numeroProjetos} </span>
                  <span>
                    (Este profissional está cadastrado como{' '}
                    {dataProps?.tipo === 'PF'
                      ? 'Pessoa Física'
                      : 'Pessoa Jurídica'}
                    )
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
                <FiShare2
                  size={40}
                  color={AZUL}
                  onClick={handleOpenShareLink}
                />
                <CoracaoOff className="coracao" />
              </Acoes>
            </Col>
          </Row>
          <Row className="d-flex justify-content-end">
            <Col lg={3}>
              {isPreview ? (
                <GhostButton disabled>
                  <p
                    onMouseOver={() => setTitleSendMessage(!titleSendMessage)}
                    onMouseOut={() => setTitleSendMessage(!titleSendMessage)}
                  >
                    SOLICITAR ORÇAMENTO
                  </p>
                </GhostButton>
              ) : (
                <Button
                  isActive
                  onClick={() => {
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
                  }}
                >
                  SOLICITAR ORÇAMENTO
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </Card>
    </Content>
  );
}
