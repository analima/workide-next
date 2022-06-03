import { Helmet } from 'react-helmet';
import { CaptarProjetoFornecedorProvider } from '../../../hooks/captarProjetoFornecedor';
import  CaptarProjetoContent  from './CaptarProjetoContent';
import { Content } from './style';
import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';

 const CaptarProjeto: React.FC = () => {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/AreaFornecedor/CaptarProjeto');
  }, []);
  return (
    <Content>
      <Helmet>
        <title>Gyan - Buscar oportunidades</title>
      </Helmet>
      <CaptarProjetoFornecedorProvider>
        <CaptarProjetoContent />
      </CaptarProjetoFornecedorProvider>
    </Content>
  );
}

export default CaptarProjeto;