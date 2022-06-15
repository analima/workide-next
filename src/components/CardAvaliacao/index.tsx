import { useState, useEffect } from 'react';
import { formatDate } from '../../helpers/DateHelper';
import { oportunidades_api } from '../../services/oportunidades_api';
import { ReactComponent as EstrelaOff } from '../../assets/estrela-off.svg';
import { ReactComponent as Estrela } from '../../assets/estrela.svg';
import PlaceholderImg from '../../assets/placeholderImg.png';

import {
  Avaliacao,
  AvaliacaoTitulo,
  AvaliacaoTexto,
  AvaliacaoRodape,
  AvaliacaoCliente,
  NenhumaAvaliacaoContent,
  ContainerCardUsuario,
  ContentLabel,
  ContentNota,
  Carrousel,
  ArrowSlider,
} from './styles';
import { Titulo } from '../Titulo';
import { LARANJA } from '../../styles/variaveis';
import { IEvaluation } from '../../interfaces/IProvider';

interface IProps {
  id: number;
}

export function CardAvaliacao({ id }: IProps) {
  const [evaluations, setEvaluations] = useState<IEvaluation[]>(
    [] as IEvaluation[],
  );

  useEffect(() => {
    const getAllConsumerEvaluations = async () => {
      try {
        if (id) {
          const {
            data: { values: evaluationsGotInApiRequest },
          } = await oportunidades_api.get(
            `/projetos/avaliacoes-fornecedor/${id}`,
          );
          setEvaluations(evaluationsGotInApiRequest);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllConsumerEvaluations();
  }, [id]);

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

  const settingsSlider = {
    speed: 700,
    dots: true,
    autoplaySpeed: 3000,
    slidesToShow: 1.4,
    className: 'container-slider',
    initialSlide: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowSlider />,
    prevArrow: <ArrowSlider />,

    responsive: [
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Carrousel {...settingsSlider}>
      {evaluations &&
        evaluations?.map((obj, index) => {
          return evaluations?.length ? (
            <div key={index}>
              <Avaliacao>
                <AvaliacaoTitulo>{obj?.projeto.nome}</AvaliacaoTitulo>
                <AvaliacaoTexto>"{obj?.descricao}"</AvaliacaoTexto>
                <ContentLabel>
                  {obj?.habilidadesPercebidas
                    .split('|')
                    .map((habilidade, index) => (
                      <label key={index}>{habilidade}</label>
                    ))}
                </ContentLabel>

                <AvaliacaoRodape>
                  <ContainerCardUsuario>
                    <AvaliacaoCliente>
                      <img
                        src={
                          obj?.projeto?.pessoaConsumidor?.arquivo?.url ||
                          PlaceholderImg
                        }
                        alt={obj?.projeto?.pessoaConsumidor?.nomeTratamento}
                      />
                    </AvaliacaoCliente>
                    <div>
                      <span>
                        {obj?.projeto?.pessoaConsumidor?.nomeTratamento}
                      </span>
                      <ContentNota>
                        <span>{obj.nota}</span>
                        {handleShowStars(obj.nota)}
                      </ContentNota>
                    </div>
                  </ContainerCardUsuario>
                  <span>Publicado em: {formatDate(obj?.dataHoraCriacao)}</span>
                </AvaliacaoRodape>
              </Avaliacao>
            </div>
          ) : (
            <NenhumaAvaliacaoContent>
              <Titulo
                titulo="Não há avaliações recebidas"
                tamanho={18}
                cor={LARANJA}
              />
            </NenhumaAvaliacaoContent>
          );
        })}
    </Carrousel>
  );
}
