import { CarrinhoConsumidorProvider } from '../../../hooks/carrinhoConsumidor';
import Layout from '../Layout';
import CarrinhoContent from './CarrinhoContent';
import Content from './style';
import { useLocation } from 'react-router-dom';
import { IServicoInfo } from '../../../interfaces/IServicoInfo';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';

interface IStateProps {
  pacoteId: number;
  servicoInfo: IServicoInfo;
}

export default function Carrinho() {
  const location = useLocation<IStateProps>();
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('carrinho');
  }, []);
  return (
    <Content>
      <Helmet>
        <title>Freelas.town - Carrinho consumidor</title>
      </Helmet>
      <Layout titulo="" activeMenu>
        <CarrinhoConsumidorProvider>
          <CarrinhoContent
            pacoteId={location.state?.pacoteId}
            servicoInfo={location.state?.servicoInfo}
          />
        </CarrinhoConsumidorProvider>
      </Layout>
    </Content>
  );
}
