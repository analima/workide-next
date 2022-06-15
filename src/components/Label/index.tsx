import { Content } from './style';

interface ILabelProps {
  negrito?: boolean;
  label: string;
  cor?: string;
}

export function Label({ label, cor, negrito = false }: ILabelProps) {
  return (
    <Content cor={cor} negrito={negrito}>
      {label}
    </Content>
  );
}
