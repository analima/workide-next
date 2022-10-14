import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';
import Layout from 'src/components/AreaConsumidor/Layout';
import Extrato from 'src/Containers/Extrato';
import { ID_TOKEN } from 'src/contexts/auth';
import { version } from '../../../../package.json';

interface IProps {
  appVersion: string;
}
export default function Extratos({ appVersion }: IProps) {
  const router = useRouter();
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/contratante/extrato');
  }, []);

  return (
    <>
      {localStorage.getItem(ID_TOKEN) ? (
        <Layout
          versao={appVersion}
          titulo=""
          activeMenu={true}
          maisSolucoesIsNotVisible={true}
        >
          <Extrato type="consumer" />;
        </Layout>
      ) : (
        router.push('/contratante/home')
      )}
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
