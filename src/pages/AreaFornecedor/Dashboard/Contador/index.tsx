import Content from './style';

interface ContadorProps {
  titulo: string;
  valor: number | string;
  Icone: any;
  destaque?: boolean;
  isCursorPointer?: boolean;
}

export default function Contador({
  titulo,
  valor,
  Icone,
  destaque = false,
  isCursorPointer = true,
}: ContadorProps) {
  return (
    <Content destaque={destaque} isCursorPointer={isCursorPointer}>
      <div className="cabecalho">
        <span>{valor}</span>
        <Icone />
      </div>
      <div className="titulo">{titulo}</div>
    </Content>
  );
}
