import Head from 'next/head';
import { useEffect, useState } from 'react';
import { hotjar } from 'react-hotjar';
import DetalhesArea from 'src/components/DetalhesArea';

const DetalheArea: React.FC = () => {
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
          Freelas.town - Conectando pessoas incríveis com projetos apaixonantes
        </title>

        <meta name="description" content="Pagina de detalhes da area" />
      </Head>
      {!isLoading && <DetalhesArea />}
    </>
  );
};

export default DetalheArea;
