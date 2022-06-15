import { Content } from './style';

interface ICard {
  children: React.ReactNode;
  padding?: string;
  id?: string;
}

export function Card({ children, padding, id }: ICard) {
  return (
    <Content id={id} padding={padding}>
      {children}
    </Content>
  );
}
