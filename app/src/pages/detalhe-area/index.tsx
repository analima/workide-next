import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
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
      <Helmet>
        <title>
          Gyan - Conectando pessoas incríveis com projetos apaixonantes
        </title>
      </Helmet>
      {!isLoading ? <DetalhesArea /> : <p>aguarde</p>}
    </>
  );
};

export default DetalheArea;
