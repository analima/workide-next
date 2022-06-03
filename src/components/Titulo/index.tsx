import { Content } from './style';

interface ITitulo {
  titulo?: string;
  cor?: string;
  tamanho?: number;
  negrito?: boolean;
}

export function Titulo({ titulo, cor, tamanho, negrito }: ITitulo) {
  return (
    <Content color={cor} size={tamanho} bold={negrito}>
      {titulo}
    </Content>
  );
}
