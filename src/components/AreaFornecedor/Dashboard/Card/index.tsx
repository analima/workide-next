import Content from './style';

interface ContadorProps {
  valor: number | string;
  descricao: string;
}

export default function Card({ valor, descricao }: ContadorProps) {
  return (
    <Content>
      <div className="valor">{valor}</div>
      <div className="descricao">{descricao}</div>
    </Content>
  );
}


