import { Titulo } from './style';

interface TituloFormInterface {
  titulo: string;
}
export function TituloForm({ titulo }: TituloFormInterface) {
  return <Titulo>{titulo}</Titulo>;
}
