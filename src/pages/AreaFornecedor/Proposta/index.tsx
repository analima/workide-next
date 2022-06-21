import { Helmet } from 'react-helmet';
import { PropostaFornecedorProvider } from '../../../hooks/propostaFornecedor';
import { PropostaContent } from './PropostaContent';
import { Content } from './style';
import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';

export function Proposta() {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/fornecedor/proposta/');
  }, []);

  return (
    <Content>
      <Helmet>
        <title>Gyan - Enviar uma proposta</title>
      </Helmet>
      <PropostaFornecedorProvider>
        <PropostaContent />
      </PropostaFornecedorProvider>
    </Content>
  );
}
