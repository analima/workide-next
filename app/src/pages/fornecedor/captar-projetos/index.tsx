import { Helmet } from 'react-helmet';
import { CaptarProjetoFornecedorProvider } from '../../../hooks/captarProjetoFornecedor';
import Content from '../../../styles/fornecedor/captar-projetos/style';
import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';
import CaptarProjetoContent from '../../../components/AreaFornecedor/CaptarProjeto/CaptarProjetoContent';
import { SEO } from 'src/components/SEO';
import { GetStaticProps } from 'next';

export default function CaptarProjeto() {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/AreaFornecedor/CaptarProjeto');
  }, []);

  return (
    <>
      <SEO title="Buscar oportunidades" />
      <Content>
        <CaptarProjetoFornecedorProvider>
          <CaptarProjetoContent />
        </CaptarProjetoFornecedorProvider>
      </Content>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 86400,
  };
};
