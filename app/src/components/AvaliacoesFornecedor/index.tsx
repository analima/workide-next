import { useState, useEffect } from 'react';
import { formatDate } from '../../helpers/DateHelper';
import { oportunidades_api } from '../../services/oportunidades_api';
import EstrelaOff  from '../../assets/estrela-off.svg';
import Estrela  from '../../assets/estrela.svg';
import Image from 'next/image'
import {
  Avaliacao,
  AvaliacaoTitulo,
  AvaliacaoTexto,
  AvaliacaoRodape,
  AvaliacaoCliente,
  NenhumaAvaliacaoContent,
  ContainerCardUsuario,
} from './styles';
import { Titulo } from '../Titulo';
import { LARANJA } from '../../styles/variaveis';
import { IEvaluation } from '../../interfaces/IProvider';

interface IProps {
  id: number;
}

export function AvaliacoesFornecedor({ id }: IProps) {
  const [evaluations, setEvaluations] = useState<IEvaluation[]>(
    [] as IEvaluation[],
  );

  useEffect(() => {
    const getAllConsumerEvaluations = async () => {
      try {
        if (id) {
          const {
            data: { values: evaluations },
          } = await oportunidades_api.get(
            `/projetos/avaliacoes-fornecedor/${id}?limit=5&order=dataHoraCriacao=DESC`,
          );
          setEvaluations(evaluations);
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
  return (
    <>
      {evaluations && !!evaluations.length ? (
        evaluations.map((obj, index) => {
          return (
            obj?.descricao?.length && (
              <Avaliacao key={index}>
                <AvaliacaoTitulo>{obj?.projeto.nome}</AvaliacaoTitulo>
                <AvaliacaoTexto>&ldquo;{obj?.descricao}&ldquo;</AvaliacaoTexto>
                <AvaliacaoRodape>
                  <span>Publicado em: {formatDate(obj?.dataHoraCriacao)}</span>
                  <ContainerCardUsuario>
                    <AvaliacaoCliente>
                      <Image
                        src={obj?.projeto?.pessoaConsumidor?.arquivo?.url}
                        alt={obj?.projeto?.pessoaConsumidor?.nomeTratamento}
                      />
                    </AvaliacaoCliente>
                    <div>
                      <span>
                        {obj?.projeto?.pessoaConsumidor?.nomeTratamento}
                      </span>
                      <div>{handleShowStars(obj.nota)}</div>
                    </div>
                  </ContainerCardUsuario>
                </AvaliacaoRodape>
              </Avaliacao>
            )
          );
        })
      ) : (
        <NenhumaAvaliacaoContent>
          <Titulo
            titulo="Não há avaliações recebidas"
            tamanho={18}
            cor={LARANJA}
          />
        </NenhumaAvaliacaoContent>
      )}
    </>
  );
}
