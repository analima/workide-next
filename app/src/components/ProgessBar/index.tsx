import { AZUL_60 } from '../../styles/variaveis';
import { Titulo } from '../Titulo';
import {
  BarStyled,
  ContainerStyled,
  DataStyled,
  ProgressBarStyled,
  TypographyStyled,
} from './style';

type Props = {
  percentage: number | string | undefined;
  title: string;
  date: string;
};

export const ProgressBar = ({
  percentage,
  title,
  date,
}: Props): JSX.Element => {
  const dateCurrency = new Date(date);

  return (
    <ContainerStyled>
      <Titulo titulo={title} cor={AZUL_60} tamanho={20} />
      <DataStyled>
        Iniciado em: {dateCurrency.toLocaleDateString('pt-br')}
      </DataStyled>
      <ProgressBarStyled>
        <BarStyled percentage={percentage}>
          <TypographyStyled>{percentage}%</TypographyStyled>
        </BarStyled>
      </ProgressBarStyled>
    </ContainerStyled>
  );
};
