import { Load } from './style';

interface IProps {
  type?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  size?: string;
}
export function Spinner({ type, size }: IProps) {
  return (
    <Load
      size={size}
      className={`spinner-border text-${type}`}
      role="status"
    ></Load>
  );
}
