import { PropostaConsumidorProvider } from '../../../hooks/propostaConsumidor';
import { ProjetoAndamentoContent } from './ProjetoAndamentoContent';
import { Content } from './style';

export function ProjetoAndamento() {
  return (
    <Content>
      <PropostaConsumidorProvider>
        <ProjetoAndamentoContent />
      </PropostaConsumidorProvider>
    </Content>
  );
}
