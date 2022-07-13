import Head from 'next/head';
import { useEffect, useState } from 'react';
import { hotjar } from 'react-hotjar';
import PageOng from 'src/components/PageOng';

const Ongs: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/ongs');
    if (typeof window !== 'undefined') {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <Head>
        <title>
          Gyan - Conectando pessoas incríveis com projetos apaixonantes
        </title>

        <meta name="description" content="Pagina de ongs" />
      </Head>
      {!isLoading && <PageOng />}
    </>
  );
};

export default Ongs;
