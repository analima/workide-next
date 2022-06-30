import { PropostaConsumidorProvider } from '../../../hooks/propostaConsumidor';
import PropostaContent from './components/ProjectContent';
import Content from './style';

export default function ProjectConsumer() {
  return (
    <Content>
      <PropostaConsumidorProvider>
        <PropostaContent />
      </PropostaConsumidorProvider>
    </Content>
  );
}
