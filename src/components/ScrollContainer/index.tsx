import { Container } from './style';

interface IScrollContainer {
  children: React.ReactNode;
  height: number;
}

export function ScrollContainer({ children, height }: IScrollContainer) {
  return <Container height={height}>{children}</Container>;
}
