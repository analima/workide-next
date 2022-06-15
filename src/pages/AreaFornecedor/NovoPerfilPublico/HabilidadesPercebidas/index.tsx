import ReactWordcloud from 'react-wordcloud';

import { Content } from './style';

import { useCallback, useEffect, useState } from 'react';
import { pessoas_api } from '../../../../services/pessoas_api';

interface IHabilidade {
  text: string;
  value: number;
}

interface Props {
  idPessoa: number;
}

export function HabilidadesPercebidas({ idPessoa }: Props) {
  const [habilidadesPercebidas, setHabilidadesPercebidas] = useState('');
  const [habilidadesComportamentais, setHabilidadesComportamentais] =
    useState('');
  const [habilidadesTecnicas, setHabilidadesTecnicas] = useState('');
  const [habilidades, setHabilidades] = useState<Array<IHabilidade>>(
    [] as Array<IHabilidade>,
  );

  const options = {
    rotations: 0,
    rotationAngles: [-180, 0] as [number, number],
    fontFamily: 'Renner',
    fontSizes: [30, 50] as [number, number],
    colors: ['#008FE5', '#00C09E', '#FA7C49'],
    enableTooltip: false,
  };

  function handleGenerateRandomValue() {
    return Math.floor(Math.random() * 1000 + 1);
  }

  const handleFormatSkills = useCallback(() => {
    const arrayHabilidades: Array<IHabilidade> = [];
    let habilidade: IHabilidade;
    const arrayHabilidadesPercebidas = habilidadesPercebidas.split('|');
    const arrayHabilidadesTecnicas = habilidadesTecnicas.split('|');
    const arrayHabilidadesComportamentais =
      habilidadesComportamentais.split('|');
    arrayHabilidadesPercebidas.forEach(item => {
      habilidade = {
        text: item,
        value: handleGenerateRandomValue(),
      };
      arrayHabilidades.push(habilidade);
    });
    arrayHabilidadesTecnicas.forEach(item => {
      habilidade = {
        text: item,
        value: handleGenerateRandomValue(),
      };
      arrayHabilidades.push(habilidade);
    });
    arrayHabilidadesComportamentais.forEach(item => {
      habilidade = {
        text: item,
        value: handleGenerateRandomValue(),
      };
      arrayHabilidades.push(habilidade);
    });

    setHabilidades(arrayHabilidades);
  }, [habilidadesComportamentais, habilidadesPercebidas, habilidadesTecnicas]);

  useEffect(() => {
    async function handleGetSkills() {
      if (idPessoa) {
        const response = await pessoas_api.get(`/pessoas/${idPessoa}`);
        if (response.data.habilidadesPercebidas)
          setHabilidadesPercebidas(response.data.habilidadesPercebidas);
        if (response.data.habilidades_comportamentais)
          setHabilidadesComportamentais(
            response.data.habilidades_comportamentais,
          );
        if (response.data.habilidades_tecnicas)
          setHabilidadesTecnicas(response.data.habilidades_tecnicas);
        handleFormatSkills();
      }
    }
    handleGetSkills();
  }, [idPessoa, handleFormatSkills]);

  return (
    <Content>
      {!habilidades[0]?.text.length ? (
        <ReactWordcloud options={options} words={habilidades} />
      ) : (
        <span>
          Essa nuvem de palavras é formada pelas recomendações e avaliações
          recebidas.
        </span>
      )}
    </Content>
  );
}
