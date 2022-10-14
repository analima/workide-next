import { Helmet } from 'react-helmet';
import { CaptarProjetoFornecedorProvider } from '../../../hooks/captarProjetoFornecedor';
import Content from '../../../styles/fornecedor/captar-projetos/style';
import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';
import CaptarProjetoContent from '../../../components/AreaFornecedor/CaptarProjeto/CaptarProjetoContent';
import { SEO } from 'src/components/SEO';
import { GetStaticProps } from 'next';
import { version } from '../../../../package.json';

interface IProps {
  appVersion: string;
}

export default function CaptarProjeto({ appVersion }: IProps) {
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
          <CaptarProjetoContent versao={appVersion} />
        </CaptarProjetoFornecedorProvider>
      </Content>
    </>
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
