import { useState, useEffect } from 'react';
import { formatDate } from '../../helpers/DateHelper';
import { oportunidades_api } from '../../services/oportunidades_api';
import {
  Avaliacao,
  AvaliacaoTexto,
  ContainerCardUsuario,
  Content,
  Carrousel,
  ArrowSlider,
} from './styles';
import { IEvaluation } from '../../interfaces/IProvider';
import PlaceholderImg from '../../assets/placeholderImg.png';
import { PRETO_10 } from '../../styles/variaveis';
import { Titulo } from '../Titulo';

interface IProps {
  id: number;
}

export function CardComentario({ id }: IProps) {
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
          const evaluation = evaluationsGotInApiRequest.filter(
            (item: any) => item.descricao !== null,
          );
          setEvaluations(evaluation.reverse());
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllConsumerEvaluations();
  }, [id]);

  const settingsSlider = {
    speed: 700,
    slidesToShow: evaluations.length >= 3 ? 2.2 : evaluations.length,
    className: 'container-slider',
    initialSlide: 0,
    infinite: true,
    slidesToScroll: 1,
    nextArrow: <ArrowSlider />,
    prevArrow: <ArrowSlider />,

    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.8,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1.4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Content>
      {evaluations.length > 0 ? (
        <Carrousel size={evaluations.length} {...settingsSlider}>
          {evaluations?.map((obj, index) => (
            <Avaliacao key={index}>
              <AvaliacaoTexto>&ldquo;{obj?.descricao}&rdquo;</AvaliacaoTexto>

              <ContainerCardUsuario>
                <div>
                  {obj?.projeto?.pessoaConsumidor?.arquivo?.url ? (
                    <img
                      src={obj?.projeto?.pessoaConsumidor?.arquivo?.url}
                      alt={obj?.projeto?.pessoaConsumidor?.nomeTratamento}
                    />
                  ) : (
                    <img
                      src={PlaceholderImg}
                      alt={obj?.projeto?.pessoaConsumidor?.nomeTratamento}
                    />
                  )}

                  <span>{obj?.projeto?.pessoaConsumidor?.nomeTratamento}</span>
                </div>
                <span>Publicado em: {formatDate(obj?.dataHoraCriacao)}</span>
              </ContainerCardUsuario>
            </Avaliacao>
          ))}
        </Carrousel>
      ) : (
        <Titulo
          cor={PRETO_10}
          titulo="Nenhum comentário encontrado para este fornecedor"
          tamanho={14}
        />
      )}
    </Content>
  );
}
