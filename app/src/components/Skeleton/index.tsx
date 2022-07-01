import { LoadingSkeleton } from './style';

interface IProps {
  width: string;
  height: string;
  radius?: string;
}
export function Skeleton({ width, height, radius = '6px' }: IProps) {
  return <LoadingSkeleton width={width} height={height} radius={radius} />;
}
