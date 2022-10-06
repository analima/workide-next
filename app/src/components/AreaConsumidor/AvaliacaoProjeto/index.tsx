import Content from './style';
import AvaliacaoProjetoContent from './AvaliacaoProjetoContent';
import { AvaliacaoProjetoConsumidorProvider } from '../../../hooks/avaliacaoProjetoConsumidor';
import Layout from '../Layout';
import { useLocation } from 'react-router-dom';
import { Spacer } from '../../Spacer';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';

export default function AvaliacaoProjeto() {
  const location = useLocation();
  const { state }: { state: any } = location;

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/consumidor/avaliacao-projeto');
  }, []);

  return (
    <Content>
      <Helmet>
        <title>freelas town - Envie uma avaliação</title>
      </Helmet>
      <Layout titulo="Avaliação do Projeto" activeMenu>
        <Spacer size={24} />
        <AvaliacaoProjetoConsumidorProvider>
          <AvaliacaoProjetoContent
            idProjeto={state.idProjeto}
            idFornecedor={state.idFornecedor}
          />
        </AvaliacaoProjetoConsumidorProvider>
      </Layout>
    </Content>
  );
}
