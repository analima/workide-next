import { Content } from './style';
import { AvaliacaoProjetoContent } from './AvaliacaoProjetoContent';
import { AvaliacaoProjetoFornecedorProvider } from '../../../hooks/avaliacaoProjetoFornecedor';
import { Layout } from '../Layout';
import { useLocation } from 'react-router-dom';
import { Spacer } from '../../../components/Spacer';

export function AvaliacaoProjeto() {
  const location = useLocation();
  const { state }: { state: any } = location;
  return (
    <Content>
      <Layout titulo="Avaliação do Projeto">
        <Spacer size={24} />
        <AvaliacaoProjetoFornecedorProvider>
          <AvaliacaoProjetoContent
            idProjeto={state.idProjeto}
            idConsumidor={state.idConsumidor}
          />
        </AvaliacaoProjetoFornecedorProvider>
      </Layout>
    </Content>
  );
}
