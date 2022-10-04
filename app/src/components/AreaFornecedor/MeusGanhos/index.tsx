import Layout from '../Layout';
import { Spacer } from '../../../components/Spacer';
import Ganhos from './Ganhos';
import { useEffect } from 'react';
import { GhostButton, FiltrosContainer, Filtro } from './style';
import ContentButton from './style';
import { Titulo } from '../../../components/Titulo';
import { PRETO_10 } from '../../../styles/variaveis';
import { useHistory } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import DetalhesDosGanhos from './DetalhesGanhos';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';

export default function MeusGanhos() {
  const history = useHistory();
  const [filtro, setFiltro] = useState<string>('');

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/fornecedor/meus-ganhos');
  }, []);

  return (
    <Layout titulo="Meus Ganhos">
      <Helmet>
        <title>Freelas.town - Histórico de ganhos do fornecedor</title>
      </Helmet>
      <Titulo
        titulo="Aqui você pode acompanhar como está seu desempenho na plataforma, o que
        tem para acelerar e o que ja recebeu."
        tamanho={18}
        cor={PRETO_10}
      />
      <FiltrosContainer>
        <p>Ver por:</p>
        <Filtro
          checked={filtro === ''}
          onClick={() => {
            setFiltro('');
          }}
        >
          Total
        </Filtro>
        <Filtro
          checked={filtro === 'semana'}
          onClick={() => {
            setFiltro('semana');
          }}
        >
          Semana
        </Filtro>
        <Filtro
          checked={filtro === 'mes'}
          onClick={() => {
            setFiltro('mes');
          }}
        >
          Mês
        </Filtro>
      </FiltrosContainer>
      <Spacer size={30} />
      <Row>
        <Col lg={9}>
          <Ganhos filtro={filtro} />
        </Col>
        <Col lg={3}>
          <DetalhesDosGanhos />
        </Col>
      </Row>
      <Spacer size={30} />
      <ContentButton>
        <GhostButton onClick={() => history.goBack()}>VOLTAR</GhostButton>
      </ContentButton>
    </Layout>
  );
}
