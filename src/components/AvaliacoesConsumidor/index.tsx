import { useEffect, useState } from 'react';
import Image from 'next/image'
import { oportunidades_api } from '../../services/oportunidades_api';
import { formatDate } from '../../helpers/DateHelper';
import EstrelaOff  from '../../assets/estrela-off.svg';
import Estrela from '../../assets/estrela.svg';

import {
  Avaliacao,
  AvaliacaoTitulo,
  AvaliacaoTexto,
  AvaliacaoRodape,
  AvaliacaoCliente,
  NenhumaAvaliacaoContent,
} from './styles';
import { Titulo } from '../Titulo';
import { LARANJA } from '../../styles/variaveis';
import { IEvaluation } from '../../interfaces/IProvider';

export function AvaliacoesConsumidor({ id }: { id: number }) {
  const [evaluations, setEvaluations] = useState<IEvaluation[]>(
    [] as IEvaluation[],
  );
  const [evaluationsAux, setEvaluationsAux] = useState<IEvaluation[]>(
    [] as IEvaluation[],
  );

  useEffect(() => {
    const getAllConsumerEvaluations = async () => {
      try {
        const {
          data: { values: evaluationsGotInApiRequest },
        } = await oportunidades_api.get(
          `/projetos/avaliacoes-consumidor/${id}`,
        );
        const checkEvaluations = evaluationsGotInApiRequest.filter(
          (item: IEvaluation) => item.descricao !== '',
        );
        setEvaluations(checkEvaluations);
        if (evaluations.length > 5) {
          const evaluationsReverse: IEvaluation[] = evaluations.reverse();
          setEvaluationsAux(evaluationsReverse.slice(0, 5));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllConsumerEvaluations();
  }, [evaluations, id]);

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
    <>
      {evaluations?.length > 0 ? (
        evaluations.length > 5 ? (
          evaluationsAux.map((obj, index) => {
            return (
              <Avaliacao key={index}>
                <AvaliacaoTitulo>{obj.projeto.nome}</AvaliacaoTitulo>
                <AvaliacaoTexto>&ldquo;{obj.descricao}&ldquo;</AvaliacaoTexto>
                <AvaliacaoRodape>
                  <span>Publicado em: {formatDate(obj?.dataHoraCriacao)}</span>
                  <AvaliacaoCliente>
                    <Image
                      src={obj?.projeto?.pessoaFornecedor?.arquivo?.url}
                      alt={obj?.projeto?.pessoaFornecedor?.nomeTratamento}
                    />
                    <div>
                      <span>{obj.projeto.pessoaFornecedor.nomeTratamento}</span>
                      <div>
                        {generateStarsComponentWithEvaluationGrade(obj.nota)}
                      </div>
                    </div>
                  </AvaliacaoCliente>
                </AvaliacaoRodape>
              </Avaliacao>
            );
          })
        ) : (
          evaluations?.reverse().map((obj, index) => {
            return (
              <Avaliacao key={index}>
                <AvaliacaoTitulo>{obj.projeto.nome}</AvaliacaoTitulo>
                <AvaliacaoTexto>&ldquo;{obj.descricao}&ldquo;</AvaliacaoTexto>
                <AvaliacaoRodape>
                  <span>Publicado em: {formatDate(obj?.dataHoraCriacao)}</span>
                  <AvaliacaoCliente>
                    <Image
                      src={obj?.projeto?.pessoaFornecedor?.arquivo?.url}
                      alt={obj?.projeto?.pessoaFornecedor?.nomeTratamento}
                    />
                    <div>
                      <span>{obj.projeto.pessoaFornecedor.nomeTratamento}</span>
                      <div>
                        {generateStarsComponentWithEvaluationGrade(obj.nota)}
                      </div>
                    </div>
                  </AvaliacaoCliente>
                </AvaliacaoRodape>
              </Avaliacao>
            );
          })
        )
      ) : (
        <NenhumaAvaliacaoContent>
          <Titulo
            titulo="Nenhuma avaliação cadastrada até o momento"
            tamanho={22}
            cor={LARANJA}
            negrito
          />
        </NenhumaAvaliacaoContent>
      )}
    </>
  );
}
