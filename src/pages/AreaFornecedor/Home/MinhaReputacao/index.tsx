import { useState, useEffect } from 'react';

import { Card } from '../../../../components/Card';
import { Titulo } from '../../../../components/Titulo';
import {
  Content,
  CardReputacao,
  CardRecomendacao,
  Recomendacao,
  Subtitulo,
  RecomendacaoRodape,
  RecomendacaoTexto,
  BtnSolicitarRecomendacao,
  ContainerAvaliation,
  NenhumaAvaliacaoContent,
  ContentRecomendacao,
} from './style';
import { Pontuacao } from './Pontuacao';
import { AvaliacoesFornecedor } from '../../../../components/AvaliacoesFornecedor';

import { useAuth } from '../../../../contexts/auth';
import { pessoas_api } from '../../../../services/pessoas_api';

import { ModalRecomendacao } from './ModalRecomendacao';

import { LARANJA } from '../../../../styles/variaveis';
import { HabilidadesPercebidas } from '../../PerfilPublico/Reputacao/HabilidadesPercebidas';

interface IProps {
  pontuacao?: boolean;
}

interface IRegraDePlanos {
  areasESubareasDeAtuacao: number;
  favoritarProjetos: number;
  id: number;
  idPlano: number;
  ilimitadoAreasESubareasDeAtuacao: boolean;
  ilimitadoFavoritarProjetos: boolean;
  ilimitadoHabilidadesECompetencias: boolean;
  ilimitadoProjetosSimultaneos: boolean;
  ilimitadoServicosPacotesECases: boolean;
  ilimitadoServicosVoluntarios: boolean;
  numeroHabilidadesECompetencias: number;
  prazoDeRecebimento: number;
  projetosSimultaneos: number;
  seloAssinatura: boolean;
  servicosPacotesECases: number;
  servicosVoluntarios: number;
  taxaAdministracao: string;
  limiteRecomendacao: number;
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

export function MinhaReputacao({ pontuacao }: IProps) {
  const [showModal, setModalShow] = useState(false);
  const [regraDePlanos, setRegraDePlanos] = useState<IRegraDePlanos | null>(
    null,
  );
  const { user } = useAuth();
  const [recomendacoes, setRecomendacoes] = useState<IRecomendacao[]>([]);

  useEffect(() => {
    const load = async () => {
      const {
        data: { data: recommendations },
      }: { data: { data: IRecomendacao[] } } = await pessoas_api.get(
        `/pessoas/${user.id_pessoa}/recomendacoes`,
      );
      const recommendationsFiltered = recommendations.filter(r => r.fixa);
      setRecomendacoes(recommendationsFiltered);
    };
    load();
  }, [user]);

  useEffect(() => {
    if (user.id_pessoa) {
      pessoas_api
        .get(`pessoas/${user.id_pessoa}/regras-plano`)
        .then(planosResponse => {
          setRegraDePlanos(planosResponse.data);
        });
    }
  }, [user.id_pessoa]);

  return (
    <Content>
      <ModalRecomendacao showModal={showModal} setModalShow={setModalShow} />

      <Card>
        <Titulo titulo="Minha Reputação" />
        {pontuacao === false ? null : (
          <ContainerAvaliation>
            <CardReputacao className="ponctuation">
              <Subtitulo>Pontuação</Subtitulo>
              <Pontuacao />
            </CardReputacao>
            <CardReputacao className="skills">
              <Subtitulo>Habilidades Percebidas</Subtitulo>
              <HabilidadesPercebidas idPessoa={user.id_pessoa || 0} />
            </CardReputacao>
          </ContainerAvaliation>
        )}
        <CardReputacao>
          <Subtitulo>Avaliações</Subtitulo>
          <AvaliacoesFornecedor id={user?.id_pessoa || 0} />
        </CardReputacao>

        <CardRecomendacao>
          <div className="header-recomendacao">
            <Subtitulo>Recomendações</Subtitulo>
          </div>
          {recomendacoes && recomendacoes.length > 0 ? (
            recomendacoes.map((recomendacao, index) => (
              <Recomendacao key={index}>
                <RecomendacaoTexto>
                  <p>&ldquo;{recomendacao.recomendacao}&rdquo;</p>
                </RecomendacaoTexto>

                <RecomendacaoRodape>
                  <span>- {recomendacao.recomendador}</span>
                </RecomendacaoRodape>
              </Recomendacao>
            ))
          ) : (
            <NenhumaAvaliacaoContent>
              <Titulo
                titulo="Não há recomendações recebidas."
                tamanho={18}
                cor={LARANJA}
              />
            </NenhumaAvaliacaoContent>
          )}
          <ContentRecomendacao>
            {regraDePlanos !== null && <span></span>}
            {(user.percentageRegisterProvider &&
              user.percentageRegisterProvider >= 80) ||
            user.moderacao === true ||
            (recomendacoes && recomendacoes.length === 0) ? (
              <BtnSolicitarRecomendacao to="/minhas-recomendacoes">
                GERENCIAR RECOMENDAÇÕES
              </BtnSolicitarRecomendacao>
            ) : null}
          </ContentRecomendacao>
        </CardRecomendacao>
      </Card>
    </Content>
  );
}
