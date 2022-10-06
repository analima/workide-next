import { Col, Container, Row } from 'react-bootstrap';
import { Spacer } from '../../../components/Spacer';
import { Titulo } from '../../../components/Titulo';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Content,
  ContainerAvatarMeet,
  ContainerImageAvatar,
  ContainerToggleAvatar,
  ParagraphAvatarMeet,
  TituloGradiente,
  WrapperToggleAvatar,
} from './style';
import Avatar from './style';
import { useGAEventsTracker } from '../../../hooks/useGAEventsTracker';
import AndreToggleImage from '../../../assets/andre.svg';
import ThaisToggleImage from '../../../assets/thais.svg';
import AntonioToggleImage from '../../../assets/antonio.svg';
import CarolToggleImage from '../../../assets/carol.svg';
import CarolImage from '../../../assets/carol-full.svg';
import AntonioImage from '../../../assets/antonio-full.svg';
import ThaisImage from '../../../assets/thais-full.svg';
import AndreImage from '../../../assets/andre-full.svg';
import { Template } from '../../../components/Template';
import { AZUL, CINZA_40, LARANJA } from '../../../styles/variaveis';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/auth';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';
import { selecionarRotaHome } from 'src/utils/selecionarRotaHome';

export default function Aprensetacao() {
  const [selectedAvatar, setSelectedAvatar] = useState<
    'CAROL' | 'THAIS' | 'ANTONIO' | 'ANDRE'
  >('CAROL');
  const { user } = useAuth();
  const GAEventsTracker = useGAEventsTracker('Home Publica tela cadastro');
  const history = useHistory();

  const avatares = {
    CAROL: {
      description:
        'Olá, eu sou a Carol. Meu sonho é poder ajudar as pessoas. Sempre estou em busca de ser a minha melhor versão, posso te dar várias dicas para seu aperfeiçoamento pessoal e profissional.',
    },
    THAIS: {
      description:
        'Olá eu sou a Thais!Adoro me aventurar em novos desafios. Não vejo a hora de receber seus feedbacks com sugestões e críticas. Meu objetivo é melhorar sua jornada de trabalho através de uma boa experiência dentro da nossa plataforma.',
    },
    ANTONIO: {
      description:
        'Olá eu sou o António! Minhas maiores paixões são aprender e ensinar. Estarei te esperando na etapa de cadastro, sempre disponível para tirar suas dúvidas. Até logo!',
    },
    ANDRE: {
      description:
        'Olá, eu sou o André! Meu objetivo é proteger nossos usuários. Espero te ajudar no entendimento das regras que foram criadas para sua segurança e facilidade.',
    },
  };

  useEffect(() => {
    const load = async () => {
      const percentageRegister = user.percentageRegisterProvider || 0;
      if (percentageRegister > 20 && percentageRegister < 40) {
        history.push('/cadastro-complementar', { cadastroCompleto: false });
      } else if (percentageRegister >= 40) {
        history.push(selecionarRotaHome(user?.tipoPerfil));
      }
    };
    load();
  }, [user?.tipoPerfil, user.percentageRegisterProvider, history]);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/apresentacao');
  }, []);

  return (
    <Template hiddenBackground hiddenCenterMenu={true}>
      <Helmet>
        <title>freelas town - Apresentação</title>
      </Helmet>
      <Content>
        <Container fluid={true}>
          <Row className="d-flex justify-content-center">
            <Col lg={9}>
              <Row>
                <Col className="d-flex justify-content-center" lg={12}>
                  <TituloGradiente>Seu e-mail foi confirmado.</TituloGradiente>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-center" lg={12}>
                  <Titulo
                    titulo="Estamos muito felizes que esteja por aqui!"
                    cor={LARANJA}
                    tamanho={32}
                    negrito={false}
                  />
                </Col>
              </Row>
              <Spacer size={4} />
              <Row>
                <Col className="d-flex justify-content-center" lg={12}>
                  <Titulo
                    titulo="Vamos apoiá-lo (la) em todas etapas da sua jornada aqui conosco."
                    tamanho={20}
                    negrito
                    cor={AZUL}
                  />
                </Col>
              </Row>
              <Spacer size={4} />
              <Row>
                <Col className="d-flex justify-content-center" lg={12}>
                  <Titulo
                    titulo="Antes de tudo, queremos nos apresentar:"
                    tamanho={16}
                    cor={CINZA_40}
                    negrito={false}
                  />
                </Col>
              </Row>

              <Spacer size={30} />

              {selectedAvatar && selectedAvatar.length && (
                <Row>
                  <Col lg={12}>
                    <ContainerAvatarMeet>
                      <ContainerImageAvatar>
                        {selectedAvatar === 'CAROL' && (
                          <CarolImage className="image-avatar" />
                        )}
                        {selectedAvatar === 'ANTONIO' && (
                          <AntonioImage className="image-avatar" />
                        )}
                        {selectedAvatar === 'THAIS' && (
                          <ThaisImage className="image-avatar" />
                        )}
                        {selectedAvatar === 'ANDRE' && (
                          <AndreImage className="image-avatar" />
                        )}
                      </ContainerImageAvatar>

                      <ParagraphAvatarMeet>
                        {avatares[selectedAvatar].description}
                      </ParagraphAvatarMeet>
                    </ContainerAvatarMeet>
                  </Col>
                </Row>
              )}

              <Row>
                <WrapperToggleAvatar>
                  <ContainerToggleAvatar
                    isSelectedAvatar={selectedAvatar === 'CAROL'}
                    onClick={() => setSelectedAvatar('CAROL')}
                  >
                    <CarolToggleImage />
                  </ContainerToggleAvatar>
                  <ContainerToggleAvatar
                    isSelectedAvatar={selectedAvatar === 'THAIS'}
                    onClick={() => setSelectedAvatar('THAIS')}
                  >
                    <ThaisToggleImage />
                  </ContainerToggleAvatar>
                  <ContainerToggleAvatar
                    isSelectedAvatar={selectedAvatar === 'ANDRE'}
                    onClick={() => setSelectedAvatar('ANDRE')}
                  >
                    <AndreToggleImage />
                  </ContainerToggleAvatar>
                  <ContainerToggleAvatar
                    isSelectedAvatar={selectedAvatar === 'ANTONIO'}
                    onClick={() => setSelectedAvatar('ANTONIO')}
                  >
                    <AntonioToggleImage />
                  </ContainerToggleAvatar>
                </WrapperToggleAvatar>
              </Row>
              <Spacer size={50} />
            </Col>
            <Col lg={12}>
              <Button
                style={{
                  float: 'right',
                  marginTop: '-110px',
                  marginRight: '110px',
                }}
                onClick={() => {
                  history.push('/cadastro-complementar');
                  GAEventsTracker('Apresentacao', 'Concluindo apresentacao');
                }}
              >
                ADOREI! VAMOS COMEÇAR
              </Button>
            </Col>
          </Row>
        </Container>
      </Content>
    </Template>
  );
}
