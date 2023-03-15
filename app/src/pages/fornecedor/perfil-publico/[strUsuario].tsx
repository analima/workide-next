import { GetStaticProps } from 'next';
import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';
import { NovoPerfilPublico } from 'src/components/AreaFornecedor/NovoPerfilPublico';
import { SEO } from 'src/components/SEO';
import { TIME_REVALIDATE } from 'src/const';
import packageInfo from '../../../../package.json';

interface IProps {
  appVersion: string;
}
export default function NovoPerfilPublicos({ appVersion }: IProps) {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/fornecedor/perfil');
  }, []);

  return (
    <>
      <SEO title="Perfil" />
      <NovoPerfilPublico versao={appVersion} />;
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async () => {
  const appVersion = packageInfo.version;

  return {
    props: {
      appVersion,
    },
    revalidate: TIME_REVALIDATE,
  };
};
