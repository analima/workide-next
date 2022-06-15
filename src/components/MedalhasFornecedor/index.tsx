import React, { useEffect, useCallback, useState } from 'react';
import { geral_api } from '../../services/geral_api';
import { oportunidades_api } from '../../services/oportunidades_api';
import { pessoas_api } from '../../services/pessoas_api';
import { Medalha } from '../Medalha';
import { Medalhas } from './styles';

interface IProps {
  id: number;
}

export function MedalhasFornecedor({ id }: IProps) {
  const [hasFeedbackMedal, setHasFeedbackMedal] = useState(false);
  const [hasPrimeiroProjetoMedal, setHasPrimeiroProjetoMedal] = useState(false);
  const [hasFundadorMedal, setHasFundadorMedal] = useState(false);
  const [hasVerificadoMedal, setHasVerificadoMedal] = useState(false);

  async function userHasFeedback(id_usuario: number): Promise<boolean> {
    if (!id_usuario) return false;
    const { data: feedbacks } = await geral_api.get(`/feedbacks/${id_usuario}`);
    if (feedbacks && feedbacks.length > 0) {
      return true;
    }
    return false;
  }

  const userHasProject = useCallback(
    async function () {
      const { data: projetos } = await oportunidades_api.get(
        `/projetos/count?idPessoaFornecedor=${id}`,
      );
      if (projetos > 0) {
        return true;
      }
      return false;
    },
    [id],
  );

  const handleMedals = useCallback(async () => {
    try {
      if (id) {
        const responsePessoa = await pessoas_api.get(`/pessoas/${id}`);
        setHasFundadorMedal(responsePessoa.data?.fundador);
        setHasVerificadoMedal(responsePessoa.data?.moderacao);

        const feedback = await userHasFeedback(responsePessoa.data?.id_usuario);
        feedback ? setHasFeedbackMedal(true) : setHasFeedbackMedal(false);

        const projetos = await userHasProject();
        projetos
          ? setHasPrimeiroProjetoMedal(true)
          : setHasPrimeiroProjetoMedal(false);
      }
    } catch (error: any) {
      console.error(error.response);
    }
  }, [id, userHasProject]);

  useEffect(() => {
    handleMedals();
  }, [handleMedals]);

  return (
    <Medalhas>
      <Medalha chave="pessoa-verificada" isActive={hasVerificadoMedal} />
      <Medalha chave="fundador" isActive={hasFundadorMedal} />
      <Medalha chave="primeiro-projeto" isActive={hasPrimeiroProjetoMedal} />
      <Medalha chave="feedback" isActive={hasFeedbackMedal} />
      {/* <Medalha chave="recomendacao-prata" /> */}
      {/* <Medalha chave="indicacao-bronze" /> */}
    </Medalhas>
  );
}
