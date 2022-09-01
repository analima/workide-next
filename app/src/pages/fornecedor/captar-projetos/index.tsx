import { Helmet } from 'react-helmet';
import { CaptarProjetoFornecedorProvider } from '../../../hooks/captarProjetoFornecedor';
import Content from '../../../styles/fornecedor/captar-projetos/style';
import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';
import { useState } from 'react';
import CaptarProjetoContent from '../../../components/AreaFornecedor/CaptarProjeto/CaptarProjetoContent';
const CaptarProjeto: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
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
        <title>Gyan - Buscar oportunidades</title>
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
