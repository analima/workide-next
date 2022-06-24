import EstrelaOff from '../../../../../assets/estrela-off.svg';
import Estrela from '../../../../../assets/estrela.svg';
import { Titulo } from '../../../../../components/Titulo';
import { LARANJA } from '../../../../../styles/variaveis';
import { oportunidades_api } from '../../../../../services/oportunidades_api';

import {
  Resumo,
  Avaliacao,
  Detalhes,
  Detalhe,
  Estrelas,
  Barra,
  Quantidade,
} from './style';
import Content from './style';
import { useState, useEffect } from 'react';

interface IProps {
  idPessoa?: number;
}

export default function Pontuacao({ idPessoa }: IProps) {
  const [pontuacao, setPontuacao] = useState<Array<number>>();
  const [notaMedia, setNotaMedia] = useState<number>();
  const [totalAvaliacoes, setTotalAvaliacoes] = useState<number>(0);

  useEffect(() => {
    const getNotes = async () => {
      try {
        if (idPessoa) {
          const { data } = await oportunidades_api.get(
            `/projetos/avaliacoes-fornecedor/${idPessoa}/count`,
          );
          setPontuacao(data.quantidadeNotas);
          setNotaMedia(data.media);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getNotes();
  }, [idPessoa]);

  useEffect(() => {
    const somaAvaliacoes = () => {
      if (pontuacao)
        setTotalAvaliacoes(
          pontuacao[5] +
            pontuacao[1] +
            pontuacao[2] +
            pontuacao[3] +
            pontuacao[4],
        );
    };
    somaAvaliacoes();
  }, [pontuacao]);

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
    <Content>
      {pontuacao ? (
        <>
          <Resumo>
            <Avaliacao>
              <span>
                {(notaMedia || 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <small>de 5,00</small>
            </Avaliacao>
            <Detalhes>
              <Detalhe>
                <Estrelas>{handleShowStars(5)}</Estrelas>
                <Barra porcentagem={(pontuacao[5] / totalAvaliacoes) * 100}>
                  <div>
                    <span>{pontuacao[5]}</span>
                  </div>
                </Barra>
              </Detalhe>
              <Detalhe>
                <Estrelas>{handleShowStars(4)}</Estrelas>
                <Barra porcentagem={(pontuacao[4] / totalAvaliacoes) * 100}>
                  <div>
                    <span>{pontuacao[4]}</span>
                  </div>
                </Barra>
              </Detalhe>
              <Detalhe>
                <Estrelas>{handleShowStars(3)}</Estrelas>
                <Barra porcentagem={(pontuacao[3] / totalAvaliacoes) * 100}>
                  <div>
                    <span>{pontuacao[3]}</span>
                  </div>
                </Barra>
              </Detalhe>
              <Detalhe>
                <Estrelas>{handleShowStars(2)}</Estrelas>
                <Barra porcentagem={(pontuacao[2] / totalAvaliacoes) * 100}>
                  <div>
                    <span>{pontuacao[2]}</span>
                  </div>
                </Barra>
              </Detalhe>
              <Detalhe>
                <Estrelas>{handleShowStars(1)}</Estrelas>
                <Barra porcentagem={(pontuacao[1] / totalAvaliacoes) * 100}>
                  <div>
                    <span>{pontuacao[1]}</span>
                  </div>
                </Barra>
              </Detalhe>
            </Detalhes>
          </Resumo>
          <Quantidade>Você já recebeu {totalAvaliacoes} avaliações</Quantidade>
        </>
      ) : (
        <Titulo
          titulo="Não há avaliações recebidas"
          tamanho={18}
          cor={LARANJA}
        />
      )}
    </Content>
  );
}
