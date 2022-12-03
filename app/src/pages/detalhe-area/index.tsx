import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { hotjar } from 'react-hotjar';
import DetalhesArea from 'src/components/DetalhesArea';
import { TIME_REVALIDATE } from 'src/const';
import { version } from '../../../package.json';

interface IProps {
  appVersion: string;
}
export default function DetalheArea({ appVersion }: IProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/detalhe-area');
    if (typeof window !== 'undefined') {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <Head>
        <title>
          freelas town - Conectando pessoas incríveis com projetos apaixonantes
        </title>

        <meta name="description" content="Pagina de detalhes da area" />
      </Head>
      {!isLoading && <DetalhesArea versao={appVersion} />}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const appVersion = version;

  return {
    props: {
      appVersion,
    },
    revalidate: TIME_REVALIDATE,
  };
};
