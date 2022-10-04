import { Helmet } from 'react-helmet';
import { CaptarProjetoFornecedorProvider } from '../../../hooks/captarProjetoFornecedor';
import Content from '../../../styles/fornecedor/captar-projetos/style';
import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';
import CaptarProjetoContent from '../../../components/AreaFornecedor/CaptarProjeto/CaptarProjetoContent';

export default function CaptarProjeto() {
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
        <title>Freelas.town - Buscar oportunidades</title>
      </Helmet>

      <CaptarProjetoFornecedorProvider>
        <CaptarProjetoContent />
      </CaptarProjetoFornecedorProvider>
    </Content>
  );
}
