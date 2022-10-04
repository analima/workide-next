import { MinhasComprasConsumidorProvider } from '../../../hooks/minhasComprasConsumidor';
import MinhasComprasContent from './MinhasComprasContent';
import { InformacoesFinanceirasProvider } from '../../../hooks/informacoesFinanceiras';
import Content from './style';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';

export default function MinhasComprasConsumidor() {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/consumidor/minhas-compras');
  }, []);
  return (
    <Content>
      <Helmet>
        <title>Freelas.town - Minhas compras de consumidor</title>
      </Helmet>
      <MinhasComprasConsumidorProvider>
        <InformacoesFinanceirasProvider>
          <MinhasComprasContent />
        </InformacoesFinanceirasProvider>
      </MinhasComprasConsumidorProvider>
    </Content>
  );
}
