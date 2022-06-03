import { Layout } from '../Layout';
import { Content } from './style';
import { CadastroComplementarProvider } from '../../../hooks/detalheFornecedor';
import { CadastroComplementarContent } from './CadastroComplementarContent';

export function Detalhes() {
  return (
    <>
      <Layout titulo="Meu Perfil">
        <Content>
            <CadastroComplementarProvider>
              <CadastroComplementarContent />
            </CadastroComplementarProvider>
        </Content>
      </Layout>
    </>
  );
}
