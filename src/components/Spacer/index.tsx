import { Content } from './style';

interface SpacerInterface {
  size: number;
}

export function Spacer({ size }: SpacerInterface) {
  return <Content altura={size}></Content>;
}
