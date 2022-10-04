import { MinhasComprasFornecedorProvider } from '../../../hooks/minhasComprasFornecedor';
import MinhasComprasContent from './MinhasComprasContent';
import { InformacoesFinanceirasProvider } from '../../../hooks/informacoesFinanceiras';
import Content from './style';
import { Helmet } from 'react-helmet';

export default function MinhasCompras() {
  return (
    <Content>
      <Helmet>
        <title>Freelas.town - Minhas compras de fornecedor</title>
      </Helmet>
      <MinhasComprasFornecedorProvider>
        <InformacoesFinanceirasProvider>
          <MinhasComprasContent />
        </InformacoesFinanceirasProvider>
      </MinhasComprasFornecedorProvider>
    </Content>
  );
}
