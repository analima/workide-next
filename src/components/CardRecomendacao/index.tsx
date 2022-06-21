import { useState, useEffect } from 'react';

import {
  CardRecomendacao,
  RecomendacaoTexto,
  RecomendacaoRodape,
  ContentRecomendacao,
  NenhumaRecomendacaoContent,
  ContentLabel,
  Carrousel,
  ArrowSlider,
} from './styles';
import { pessoas_api } from '../../services/pessoas_api';

interface IProps {
  id: number;
}

interface IRecomendacao {
  id: string;
  emailRecomendador: string;
  recomendador: string;
  empresa?: string;
  recomendacao: string;
  habilidadesLike?: string;
  habilidadesDislike?: string;
  fixa?: boolean;
}

export function CardRecomendation({ id }: IProps) {
  const [recomendacoes, setRecomendacoes] = useState<IRecomendacao[]>([]);

  useEffect(() => {
    const load = async () => {
      const {
        data: { data: recommendations },
      }: { data: { data: IRecomendacao[] } } = await pessoas_api.get(
        `/pessoas/${id}/recomendacoes`,
      );
      const recommendationsFiltered = recommendations.filter(r => r.fixa);
      setRecomendacoes(recommendationsFiltered);
    };
    load();
  }, [id]);

  const settingsSlider = {
    speed: 700,
    dots: true,
    infinite: recomendacoes.length > 1,
    autoplaySpeed: 3000,
    slidesToShow: 1.6,
    className: 'container-slider',
    initialSlide: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowSlider />,
    prevArrow: <ArrowSlider />,

    responsive: [
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
    <>
      {recomendacoes.length > 0 ? (
        <Carrousel {...settingsSlider}>
          {recomendacoes.map(recomendacao => (
            <div key={recomendacao.id}>
              <CardRecomendacao>
                <ContentRecomendacao>
                  <div>
                    <RecomendacaoTexto>
                      "{recomendacao.recomendacao}"
                    </RecomendacaoTexto>
                  </div>

                  <ContentLabel>
                    {recomendacao
                      .habilidadesLike!.split('|')
                      .map((habilidade, index) => (
                        <label key={index}>{habilidade}</label>
                      ))}
                  </ContentLabel>

                  <RecomendacaoRodape>
                    <ul>
                      <li>
                        {recomendacao.recomendador} ({recomendacao.empresa})
                      </li>
                    </ul>
                  </RecomendacaoRodape>
                </ContentRecomendacao>
              </CardRecomendacao>
            </div>
          ))}
        </Carrousel>
      ) : (
        <NenhumaRecomendacaoContent>
          <span>Não há recomendações recebidas.</span>
        </NenhumaRecomendacaoContent>
      )}
    </>
  );
}
