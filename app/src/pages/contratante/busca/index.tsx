import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';
import { BuscaFornecedorOfertaProvider } from '../../../hooks/buscaConsumidor';
import ContentBusca from '../../../components/AreaConsumidor/Busca/ContentBusca';
import Content from '../../../components/AreaConsumidor/Busca/style';
import { GetStaticProps } from 'next';
import { SEO } from 'src/components/SEO';
import { version } from '../../../../package.json';

interface IProps {
  appVersion: string;
}

export default function Busca({ appVersion }: IProps) {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/contratante/busca');
  }, []);
  return (
    <Content>
      <SEO title="Buscar oportunidades" />
      <BuscaFornecedorOfertaProvider>
        <ContentBusca versao={appVersion} />
      </BuscaFornecedorOfertaProvider>
    </Content>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const appVersion = version;

  return {
    props: {
      appVersion,
    },
    revalidate: 86400,
  };
};
