import { useEffect } from 'react';
import { Menu } from '../../Menu';
import { Rodape } from '../../Rodape';
import { ContainerConfirmacao } from './style';
import Confirmacao from '../Confirmacao';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';

export function ConfirmacaoCadastroBasico() {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/confirmacao');
  }, []);
  return (
    <ContainerConfirmacao>
      <Helmet>
        <title>Freelas.town - Por favor, confirme seu e-mail</title>
      </Helmet>
      <Menu />
      <Confirmacao />
      <Rodape />
    </ContainerConfirmacao>
  );
}
