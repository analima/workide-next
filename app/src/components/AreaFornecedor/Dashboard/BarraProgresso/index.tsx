import Content from './style';

interface BarraProgressoProps {
  titulo: string;
  porcentagem: number;
}

export default function BarraProgresso({ titulo, porcentagem }: BarraProgressoProps) {
  return (
    <Content porcentagem={porcentagem}>
      <div className="barra">
        <div className="progresso"></div>
      </div>
      <span>{titulo}</span>
    </Content>
  );
}
