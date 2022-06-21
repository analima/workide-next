import { Col, Row } from 'react-bootstrap';
import { Layout } from '../Layout';
import { Dashboard } from './Dashboard';
import { Spacer } from '../../../components/Spacer';
import { BotaoCaptar, Subtitulo } from './style';
import { Perfil } from './Perfil';

import { SobreMim } from './SobreMim';
import { ServicosFavoritos } from './ServicosFavoritos';
import { MeusProjetos } from './MeusProjetos';
import { PerfisVitrine } from './PerfisVitrine';
import { useHistory } from 'react-router';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../../contexts/auth';
import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';

export function Home() {
  const history = useHistory();
  const { refreshUserData } = useAuth();
  const handleRedirect = () => {
    history.push('/consumidor/busca');
  };

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/consumidor/home');
  }, []);

  return (
    <Layout titulo="Bem-vindo!" activeMenu={true}>
      <Helmet>
        <title>Gyan - Home do consumidor</title>
      </Helmet>
      <Spacer size={40} />
      <Subtitulo>
        <h3>Vamos Começar?</h3>
        <BotaoCaptar onClick={handleRedirect}>BUSCAR SOLUÇÕES</BotaoCaptar>
      </Subtitulo>

      <Spacer size={40} />

      <Row>
        <Col lg={7}>
          <Dashboard />
        </Col>
        <Col lg={5}>
          <Perfil isConsumidor={true} />
        </Col>
      </Row>

      <Spacer size={40} />

      <Row>
        <Col lg={12}>
          <MeusProjetos />
        </Col>
      </Row>

      <Spacer size={40} />

      <Row>
        <Col lg={12}>
          <PerfisVitrine />
        </Col>
      </Row>

      <Spacer size={40} />

      <Row>
        <Col lg={12}>
          <ServicosFavoritos />
        </Col>
      </Row>

      <Spacer size={40} />

      <Row>
        <Col lg={12}>
          <PerfisVitrine recontract={true} />
        </Col>
      </Row>
      <Spacer size={40} />

      <Row>
        <Col lg={12}>
          <SobreMim />
        </Col>
      </Row>
    </Layout>
  );
}
