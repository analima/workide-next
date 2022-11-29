import { useEffect, useState } from 'react';

import Content from './style';
import { Titulo } from '../../../../components/Titulo';
import { UserProfileCard } from '../../../../components/UserProfileCard';

import { useAuth } from '../../../../contexts/auth';
import { pessoas_api } from '../../../../services/pessoas_api';
import { geral_api } from '../../../../services/geral_api';
import { consultas_api } from '../../../../services/consultas_api';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { IS_EMPTY } from 'src/const';

type ConsultaRankingType = {
  idUsuario: number;
  ranking: number;
  notaMedia: number;
  pontuacao: number;
};

type AreaType = {
  id: number;
  descricao: string;
  subareas: {
    id: number;
    descricao: string;
  }[];
};

type SubAreaPessoaType = {
  id_pessoa: number;
  id_subarea_interesse: number;
};

export default function Perfil() {
  const { user } = useAuth();

  const [consultaRanking, setConsultaRanking] = useState<ConsultaRankingType>(
    {} as ConsultaRankingType,
  );
  const [minhasAreasDeInteresse, setMinhasAreasDeInteresse] = useState<
    string[]
  >([]);
  const [projectsCount, setProjectsCount] = useState(0);

  useEffect(() => {
    if (user.id_usuario) {
      consultas_api
        .get<ConsultaRankingType>(
          `/consulta/fornecedores/${user.id_usuario}/ranking`,
        )
        .then(res => {
          setConsultaRanking(res.data);
        });
    }
  }, [user.id_usuario]);

  useEffect(() => {
    const loadAreasDeInteresse = async () => {
      const { data: areas } = await geral_api.get<AreaType[]>('/areas');

      const { data: minhasSubareas } = await pessoas_api.get<
        SubAreaPessoaType[]
      >(`/pessoas/${user.id_pessoa}/subareas-interesse`);

      const minhasAreas = areas.filter(area =>
        area.subareas.some(subarea =>
          minhasSubareas
            .map(ms => ms.id_subarea_interesse)
            .includes(subarea.id),
        ),
      );
      setMinhasAreasDeInteresse(minhasAreas.map(area => area.descricao));
    };

    loadAreasDeInteresse();
  }, [user.id_pessoa]);

  useEffect(() => {
    const load = async () => {
      const { data: countConcluido } = await oportunidades_api.get(
        `/projetos/count?idPessoaFornecedor=${user.id}&status=CONCLUIDO`,
      );
      const { data: countIniciado } = await oportunidades_api.get(
        `/projetos/count?idPessoaFornecedor=${user.id}&status=INICIADO`,
      );
      setProjectsCount(countConcluido + countIniciado);
    };
    if (user) {
      load();
    }
  }, [user]);

  return (
    <Content>
      <Titulo titulo="Perfil" tamanho={48} />

      <UserProfileCard
        dataVitrine={{
          nome: user.nome_tratamento || '',
          notaMedia: user.ranking?.notaMedia || IS_EMPTY,
          resumo_profissional: user.resumo_profissional,
          imagem: user.url_avatar || '',
          ranking: consultaRanking.ranking,
          estrelas: consultaRanking.notaMedia,
          medalhas: '',
          projetos: projectsCount,
          profissao:
            user.profissoes?.map(profissao => profissao.descricao) || null,
          areas_interesse: minhasAreasDeInteresse,
        }}
        percentageRegister={user.percentageRegisterProvider || IS_EMPTY}
      />
    </Content>
  );
}
