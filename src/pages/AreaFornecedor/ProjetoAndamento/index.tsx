import { PropostaFornecedorProvider } from '../../../hooks/propostaFornecedor';
import { ProjetoAndamentoContent } from './ProjetoAndamentoContent';
import { Content } from './style';
import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';

export function ProjetoAndamento() {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/fornecedor/projeto/andamento');
  }, []);
  return (
    <Content>
      <PropostaFornecedorProvider>
        <ProjetoAndamentoContent />
      </PropostaFornecedorProvider>
    </Content>
  );
}
