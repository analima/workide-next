import { PropostaConsumidorProvider } from '../../../hooks/propostaConsumidor';
import PropostaContent from './PropostaContent';
import Content from './style';

export default function Proposta() {
  return (
    <Content>
      <PropostaConsumidorProvider>
        <PropostaContent />
      </PropostaConsumidorProvider>
    </Content>
  );
}
