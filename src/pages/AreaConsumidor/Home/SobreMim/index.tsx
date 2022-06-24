import { Card } from '../../../../components/Card';
import EstrelaOff from '../../../../assets/estrela-off.svg';
import Estrela from '../../../../assets/estrela.svg';
import {
  Avaliacao,
  CardReputacao,
  AvaliacaoTitulo,
  AvaliacaoTexto,
  AvaliacaoRodape,
  AvaliacaoCliente,
  NenhumaAvaliacaoContent,
} from './style';
import Content from './style';
import Image from 'next/image'
import { Titulo } from '../../../../components/Titulo';
import { LARANJA, PRETO_10 } from '../../../../styles/variaveis';
import { useEffect, useState } from 'react';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { formatDate } from '../../../../helpers/DateHelper';
import { IEvaluation } from '../../../../interfaces/IProvider';

export default function SobreMim() {
  const [evaluations, setEvaluations] = useState<IEvaluation[]>(
    [] as IEvaluation[],
  );

  useEffect(() => {
    const getAllConsumerEvaluations = async () => {
      try {
        const {
          data: { values: evaluationsGotInApiRequest },
        } = await oportunidades_api.get(
          '/projetos/avaliacoes-consumidor?limit=5&order=dataHoraCriacao=DESC',
        );
        setEvaluations(evaluationsGotInApiRequest);
      } catch (error) {
        console.log(error);
      }
    };
    getAllConsumerEvaluations();
  }, []);

  const generateStarsComponentWithEvaluationGrade = (numberOfStars: number) => {
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
  };

  return (
    <Content>
      <Card>
        <Titulo
          titulo="O que estão dizendo sobre mim"
          cor={PRETO_10}
          negrito={false}
        />

        <CardReputacao>
          {evaluations?.reverse().map((obj, index) => {
            return (
              obj?.descricao?.length && (
                <Avaliacao key={index}>
                  <AvaliacaoTitulo>{obj.projeto.nome}</AvaliacaoTitulo>
                  <AvaliacaoTexto>&ldquo;{obj.descricao}&ldquo;</AvaliacaoTexto>
                  <AvaliacaoRodape>
                    <span>
                      Publicado em: {formatDate(obj?.dataHoraCriacao)}
                    </span>
                    <AvaliacaoCliente>
                      <Image
                        src={obj.projeto.pessoaFornecedor.arquivo.url}
                        alt={obj.projeto.pessoaFornecedor.nomeTratamento}
                      />
                      <div>
                        <span>
                          {obj.projeto.pessoaFornecedor.nomeTratamento}
                        </span>
                        <div>
                          {generateStarsComponentWithEvaluationGrade(obj.nota)}
                        </div>
                      </div>
                    </AvaliacaoCliente>
                  </AvaliacaoRodape>
                </Avaliacao>
              )
            );
          })}
          {(!evaluations.length ||
            (evaluations[0]?.descricao?.length === undefined &&
              evaluations.length === 1)) && (
            <NenhumaAvaliacaoContent>
              <Titulo
                titulo="Nenhuma avaliação cadastrada até o momento"
                tamanho={22}
                cor={LARANJA}
                negrito
              />
            </NenhumaAvaliacaoContent>
          )}
        </CardReputacao>
      </Card>
    </Content>
  );
}
