import { Container } from './style';

interface TooltipProp {
  handleShow?: () => void;
 }

export function Tooltip({ handleShow }: TooltipProp) {

  return (
    // eslint-disable-next-line
    <Container><div><a href="/">Editar</a><a onClick={handleShow}>Excluir</a><a href="/">Compartilhar</a></div></Container>
  )
}
