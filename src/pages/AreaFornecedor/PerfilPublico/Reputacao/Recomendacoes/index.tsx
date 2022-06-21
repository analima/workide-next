import {
  Recomendacao,
  Content,
  RecomendacaoTexto,
  RecomendacaoRodape,
  NenhumaRecomendacaoContent,
} from './style';

import { useAuth } from '../../../../../contexts/auth';
import { Titulo } from '../../../../../components/Titulo';
import { LARANJA } from '../../../../../styles/variaveis';
import { useEffect, useState } from 'react';
import { pessoas_api } from '../../../../../services/pessoas_api';

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

export function Recomendacoes({ idPessoa }: { idPessoa?: number }) {
  const { user } = useAuth();
  const [recomendacoes, setRecomendacoes] = useState<IRecomendacao[]>([]);

  useEffect(() => {
    if (!user.id_pessoa) return;

    const load = async () => {
      const {
        data: { data: recommendations },
      }: { data: { data: IRecomendacao[] } } = await pessoas_api.get(
        `/pessoas/recomendacoes/${idPessoa ? idPessoa : user.id_pessoa}`,
      );
      const recommendationsFiltered = recommendations.filter(r => r.fixa);
      setRecomendacoes(recommendationsFiltered);
    };
    load();
  }, [user, idPessoa]);

  return (
    <Content>
      {recomendacoes && recomendacoes.length > 0 ? (
        recomendacoes.map((recomendacao, index) => (
          <Recomendacao key={recomendacao.id}>
            <RecomendacaoTexto>{recomendacao.recomendacao}</RecomendacaoTexto>
            <RecomendacaoRodape>
              <ul>
                <li>{recomendacao.recomendador}</li>
              </ul>
            </RecomendacaoRodape>
          </Recomendacao>
        ))
      ) : (
        <NenhumaRecomendacaoContent>
          <Titulo
            titulo="Não há recomendações recebidas."
            tamanho={24}
            cor={LARANJA}
          />
        </NenhumaRecomendacaoContent>
      )}
    </Content>
  );
}
