import { ContainerAvaliacao } from './styles';
import ReactStars from 'react-stars';
import { LARANJA } from '../../styles/variaveis';

interface IProps {
  notaMedia: number;
}

export function AvaliacaoFornecedor({ notaMedia }: IProps) {
  return (
    <ContainerAvaliacao>
      <span>{notaMedia?.toFixed(2)}</span>
      <div>
        <ReactStars
          value={notaMedia}
          count={5}
          size={22}
          edit={false}
          color2={LARANJA}
        />
      </div>
    </ContainerAvaliacao>
  );
}
