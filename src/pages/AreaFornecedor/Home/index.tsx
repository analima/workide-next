import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Layout } from '../Layout';
import { Dashboard } from './Dashboard';
import { Spacer } from '../../../components/Spacer';
import { BotaoCaptar, Subtitulo } from './style';
import { Perfil } from './Perfil';

import { MinhaReputacao } from './MinhaReputacao';
import { MinhaVitrine } from './MinhaVitrine';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';

export function Home() {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('fornecedor/home');
  }, []);

  return (
    <Layout titulo="Bem-vindo!">
      <Helmet>
        <title>Gyan - Home do fornecedor</title>
      </Helmet>
      <Spacer size={40} />
      <Subtitulo>
        <h3>Vamos Começar?</h3>
        <BotaoCaptar href="/fornecedor/captar-projetos">
          BUSCAR OPORTUNIDADES
        </BotaoCaptar>
      </Subtitulo>

      <Spacer size={40} />

      <Row>
        <Col lg={7}>
          <Dashboard />
        </Col>
        <Col lg={5}>
          <Perfil />
        </Col>
      </Row>

      <Spacer size={40} />

      <Row>
        <Col lg={12}>
          <MinhaVitrine />
        </Col>
      </Row>

      <Spacer size={40} />

      <Row>
        <Col lg={12}>
          <MinhaReputacao />
        </Col>
      </Row>
    </Layout>
  );
}
