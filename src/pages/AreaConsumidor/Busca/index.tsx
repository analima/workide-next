import { Helmet } from 'react-helmet';

import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';
import { BuscaFornecedorOfertaProvider } from '../../../hooks/buscaConsumidor';
import  ContentBusca  from './ContentBusca';
import Content from './style';

export default function Busca() {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/fornecedor/captar-projetos');
  }, []);
  return (
    <Content>
      <Helmet>
        <title>Gyan - Buscar oportunidades</title>
      </Helmet>
      <BuscaFornecedorOfertaProvider>
        <ContentBusca />
      </BuscaFornecedorOfertaProvider>
    </Content>
  );
}
