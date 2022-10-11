import {
  LabelNota,
  LabelRank,
  FotoPerfil,
  Button,
  ContainerAcoes,
  MobileCenter,
  ContainerNameUser,
  Sobre,
} from './style';
import Content from './style';
import EstrelaOff from '../../../../assets/estrela-off.svg';
import Estrela from '../../../../assets/estrela.svg';
import { useHistory } from 'react-router-dom';
import { Titulo } from '../../../Titulo';
import { Col, Container, Row } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import { geral_api } from '../../../../services/geral_api';
import { consultas_api } from '../../../../services/consultas_api';
import { useAuth } from '../../../../contexts/auth';
import { AvatarCadastroIncompleto } from '../../../AvatarCadastroIncompleto';
import Image from 'next/image';
import UserDefaultImageProfile from '../../../../assets/user.png';
import { IProvider } from '../../../../interfaces/IProvider';
import { AvatarErroGeral } from '../../../AvatarErroGeral';

interface PerfilProps {
  idUsuario: number;
  publico?: boolean;
  onChange?: (pessoa: IProvider) => void;
  provider?: IProvider;
}

export default function Perfil({
  idUsuario,
  onChange,
  publico = false,
  provider,
}: PerfilProps) {
  const { user } = useAuth();

  const [dataProvider, setDataProvider] = useState<IProvider>(
    provider ? provider : ({} as IProvider),
  );
  const [erro, setErro] = useState(false);
  const [ranking, setRanking] = useState(0);
  const [evaluation, setEvaluation] = useState(0);
  const [showDenuncedAvatar, setShowDenuncedAvatar] = useState(false);

  function handleShowDenuncedAvatar() {
    setShowDenuncedAvatar(!showDenuncedAvatar);
  }

  function checkDenuncedUser() {
    const denunciaProcedente = user.denuncias.find(obj => obj.procede === true);
    return denunciaProcedente ? true : false;
  }

  const [showAvatarCadastroIncompleto, setShowAvatarCadastroIncompleto] =
    useState(false);

  function handleShowAvatarCadastroIncompleto() {
    setShowAvatarCadastroIncompleto(!showAvatarCadastroIncompleto);
  }

  const findPersonByUserId = async (id: number) => {
    try {
      const { data: pessoa } = await geral_api.get(`/pessoas/${id}`);
      setErro(false);
      setDataProvider(pessoa);
    } catch (err) {
      setErro(true);
      findPersonByPersonId(id);
    }
  };

  const findPersonByPersonId = async (id: number) => {
    try {
      const { data: pessoa } = await geral_api.get('/pessoas/' + id);
      setErro(false);
      setDataProvider(pessoa);
    } catch (error) {
      setErro(true);
    }
  };

  useEffect(() => {
    if (idUsuario) {
      findPersonByUserId(idUsuario);
    }
    // eslint-disable-next-line
  }, [idUsuario]);

  const history = useHistory();

  const linkTo = useCallback(
    (path: any) => {
      if (publico) {
        history.push('/login');
      } else {
        if (path === '/contratante/projetos/exclusivo/' + idUsuario) {
          history.push(path, { id_fornecedor: dataProvider.id });
        } else {
          history.push(path);
        }
      }
    },

    // eslint-disable-next-line
    [publico, history, idUsuario],
  );

  useEffect(() => {
    if (dataProvider.id_usuario) {
      consultas_api
        .get(`/consulta/fornecedores/${dataProvider.id_usuario}/ranking`)
        .then(res => setRanking(res.data.ranking));
    }
  }, [dataProvider.id_usuario]);

  useEffect(() => {
    setEvaluation(
      Number(dataProvider.ranking ? dataProvider.ranking.notaMedia : 0),
    );
  }, [dataProvider.ranking]);

  useEffect(() => {
    if (onChange) {
      onChange(dataProvider);
    }
  }, [onChange, dataProvider]);

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

  return (
    <>
      {!erro ? (
        <Content>
          <AvatarErroGeral
            mensagem="Ops, parece que há uma denuncia procedente para o seu usuário. Por esse motivo você não pode realizar essa ação"
            mostrar={showDenuncedAvatar}
            esconderAvatar={handleShowDenuncedAvatar}
          />
          <AvatarCadastroIncompleto
            mostrar={showAvatarCadastroIncompleto}
            esconderAvatar={handleShowAvatarCadastroIncompleto}
            porcentagem={user && (user.percentageRegisterConsumer || 33)}
            isConsumer={true}
          />

          <Container>
            <Row>
              <Col lg={2}>
                <MobileCenter>
                  {dataProvider.url_video_apresentacao ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${
                        dataProvider.url_video_apresentacao.split('=')[1]
                      }`}
                      title="Video"
                    />
                  ) : (
                    <FotoPerfil>
                      <Image
                        src={
                          dataProvider.arquivo?.url || UserDefaultImageProfile
                        }
                        alt="Perfil"
                      />
                    </FotoPerfil>
                  )}
                </MobileCenter>
              </Col>
              <Col lg={10}>
                <div className="content-infos">
                  <Row>
                    <Col lg={10}>
                      <ContainerNameUser
                        onClick={() => {
                          history.push(
                            '/fornecedor/perfil-publico/' + dataProvider.id,
                          );
                        }}
                        data-testid="container__name-user"
                      >
                        <Titulo
                          titulo={
                            dataProvider.nome_tratamento || 'Nome não informado'
                          }
                          tamanho={24}
                        />
                      </ContainerNameUser>
                    </Col>
                    <Col lg={2}>
                      <MobileCenter>
                        <LabelRank>Ranking: {ranking}</LabelRank>
                      </MobileCenter>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <MobileCenter>
                        <LabelNota>{evaluation}</LabelNota>
                        {handleShowStars(
                          Number(
                            dataProvider.ranking
                              ? dataProvider.ranking.notaMedia
                              : 0,
                          ),
                        )}
                      </MobileCenter>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <Sobre>
                        {dataProvider.resumo_profissional ||
                          'Descrição não informada'}
                      </Sobre>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            {idUsuario !== user.id_pessoa && (
              <ContainerAcoes>
                <Button
                  onClick={() => {
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
                    if (!checkDenuncedUser()) {
                      handleShowDenuncedAvatar();
                      return;
                    }
                    linkTo('/contratante/projetos/exclusivo/' + idUsuario);
                  }}
                >
                  SOLICITAR ORÇAMENTO
                </Button>
              </ContainerAcoes>
            )}
          </Container>
        </Content>
      ) : (
        <Content>
          <Container>
            <Titulo titulo="Fornecedor não encontrado" />
          </Container>
        </Content>
      )}
    </>
  );
}
