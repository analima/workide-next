import ReactWordcloud from 'react-wordcloud';

import { Content } from './style';

import { useAuth } from '../../contexts/auth';
import { useEffect, useState } from 'react';
import { Titulo } from '../Titulo';
import { LARANJA } from '../../styles/variaveis';

interface IHabilidade {
  text: string;
  value: number;
}

export function PerceivedSkills() {
  const { user } = useAuth();
  const [habilidades, setHabilidades] = useState<Array<IHabilidade>>(
    [] as Array<IHabilidade>,
  );

  const options = {
    rotations: 0,
    rotationAngles: [-180, 0] as [number, number],
    fontFamily: 'Ubunto',
    fontSizes: [30, 50] as [number, number],
    colors: ['#008FE5', '#00C09E', '#FA7C49'],
    enableTooltip: false,
  };

  function handleGenerateRandomValue() {
    return Math.floor(Math.random() * 1000 + 1);
  }

  useEffect(() => {
    const arrayHabilidades: Array<IHabilidade> = [];
    let habilidade: IHabilidade;
    const arrayHabilidadesPercebidas =
      user.habilidadesPercebidas?.split('|') || [];
    const arrayHabilidadesTecnicas =
      user.habilidades_tecnicas?.split('|') || [];
    const arrayHabilidadesComportamentais =
      user.habilidades_comportamentais?.split('|') || [];
    arrayHabilidadesPercebidas.forEach((item: any) => {
      habilidade = {
        text: item,
        value: handleGenerateRandomValue(),
      };
      arrayHabilidades.push(habilidade);
    });
    arrayHabilidadesTecnicas.forEach((item: any) => {
      habilidade = {
        text: item,
        value: handleGenerateRandomValue(),
      };
      arrayHabilidades.push(habilidade);
    });
    arrayHabilidadesComportamentais.forEach((item: any) => {
      habilidade = {
        text: item,
        value: handleGenerateRandomValue(),
      };
      arrayHabilidades.push(habilidade);
    });

    setHabilidades(arrayHabilidades);
  }, [
    user.habilidadesPercebidas,
    user.habilidades_comportamentais,
    user.habilidades_tecnicas,
  ]);

  return (
    <Content>
      {habilidades.length > 0 ? (
        <>
          <ReactWordcloud options={options} words={habilidades} />
          {habilidades.length && (
            <span>
              Essa nuvem de palavras é formada pelas recomendações e avaliações
              recebidas.
            </span>
          )}
        </>
      ) : (
        <Titulo
          titulo="Não há recomendações recebidas"
          tamanho={18}
          cor={LARANJA}
        />
      )}
    </Content>
  );
}
