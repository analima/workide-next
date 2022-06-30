import { PropostaFornecedorProvider } from '../../../hooks/propostaFornecedor';
import PropostaContent from './components/ProjectContent';
import Content from './style';

export default function ProjectProvider() {
  return (
    <Content>
      <PropostaFornecedorProvider>
        <PropostaContent />
      </PropostaFornecedorProvider>
    </Content>
  );
}
