import { useState, useEffect } from 'react';
import { formatDate } from '../../helpers/DateHelper';
import { oportunidades_api } from '../../services/oportunidades_api';
import Estrela from '../../assets/estrela.svg';
import Image from 'next/image';
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

  return (
    <>
      {evaluations.length > 0 ? (
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
                      <div>
                        <Estrela className="estrela" key={0} />
                      </div>
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
