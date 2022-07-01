import { ProgressBar } from 'react-bootstrap';
import Lampada from '../../assets/lampada.svg';
import Image from 'next/image'
import { Content } from './style';

interface BarraProgressoInterface {
  porcentagem: number;
}

export function BarraProgresso({ porcentagem }: BarraProgressoInterface) {
  if (porcentagem > 100) {
    porcentagem = 100;
  };

  return (
    <Content>
      <ProgressBar now={porcentagem} label={`${porcentagem}%`} />
      <div className="icone-barra">
        <Image src={Lampada} alt="Lâmpada" />
      </div>
    </Content>
  );
}
