import { ContainerAvaliacao } from './styles';
import { ReactComponent as EstrelaOff } from '../../assets/estrela-off.svg';
import { ReactComponent as Estrela } from '../../assets/estrela.svg';

interface IProps {
  notaMedia: number;
}

export function AvaliacaoFornecedor({ notaMedia }: IProps) {
  function handleShowStars(numberOfStars: number) {
    const stars = [];
    for (let i = 1; i <= 5; i += 1) {
      if (i <= numberOfStars) {
        if (numberOfStars === 0)
          stars.push(
            <EstrelaOff className="estrela" key={i + Math.random()} />,
          );
        else
          stars.push(<Estrela className="estrela" key={i + Math.random()} />);
      } else {
        stars.push(<EstrelaOff className="estrela" key={i + Math.random()} />);
      }
    }
    return stars;
  }

  return (
    <ContainerAvaliacao>
      <span>{notaMedia?.toFixed(2)}</span>
      {handleShowStars(notaMedia || 0)}
    </ContainerAvaliacao>
  );
}
