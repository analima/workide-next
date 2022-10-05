import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';
import { BuscaFornecedorOfertaProvider } from '../../../hooks/buscaConsumidor';
import ContentBusca from '../../../components/AreaConsumidor/Busca/ContentBusca';
import Content from '../../../components/AreaConsumidor/Busca/style';
import { GetStaticProps } from 'next';
import { SEO } from 'src/components/SEO';

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
      <SEO title="Buscar oportunidades" />
      <BuscaFornecedorOfertaProvider>
        <ContentBusca />
      </BuscaFornecedorOfertaProvider>
    </Content>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 86400,
  };
};
