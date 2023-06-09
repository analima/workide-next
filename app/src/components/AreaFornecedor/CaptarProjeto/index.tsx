import { Helmet } from 'react-helmet';
import { CaptarProjetoFornecedorProvider } from '../../../hooks/captarProjetoFornecedor';
import CaptarProjetoContent from './CaptarProjetoContent';
import Content from './style';
import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';
import { useState } from 'react';
import { IS_EMPTY } from 'src/const';

const CaptarProjeto: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || IS_EMPTY,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/AreaFornecedor/CaptarProjeto');
    if (typeof window !== 'undefined') {
      setIsLoading(false);
    }
  }, []);

  return (
    <Content>
      <Helmet>
        <title>freelas town - Buscar oportunidades</title>
      </Helmet>

      {!isLoading ? (
        <CaptarProjetoFornecedorProvider>
          <CaptarProjetoContent />
        </CaptarProjetoFornecedorProvider>
      ) : (
        <p>aguarde</p>
      )}
    </Content>
  );
};

export default CaptarProjeto;
