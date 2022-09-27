import { Content } from './style';

interface ICard {
  children: React.ReactNode;
  padding?: string;
  id?: string;
  isShadow?: boolean;
}

export function Card({ children, padding, id, isShadow = true }: ICard) {
  return (
    <Content id={id} padding={padding} isShadow={isShadow}>
      {children}
    </Content>
  );
}
