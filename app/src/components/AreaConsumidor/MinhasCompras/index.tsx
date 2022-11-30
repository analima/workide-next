import { MinhasComprasConsumidorProvider } from '../../../hooks/minhasComprasConsumidor';
import MinhasComprasContent from './MinhasComprasContent';
import { InformacoesFinanceirasProvider } from '../../../hooks/informacoesFinanceiras';
import Content from './style';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';
import { IS_EMPTY } from 'src/const';

export default function MinhasComprasConsumidor() {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || IS_EMPTY,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/contratante/minhas-compras');
  }, []);
  return (
    <Content>
      <Helmet>
        <title>freelas town - Minhas compras de consumidor</title>
      </Helmet>
      <MinhasComprasConsumidorProvider>
        <InformacoesFinanceirasProvider>
          <MinhasComprasContent />
        </InformacoesFinanceirasProvider>
      </MinhasComprasConsumidorProvider>
    </Content>
  );
}
