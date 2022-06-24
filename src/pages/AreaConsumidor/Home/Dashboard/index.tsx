import { useEffect, useState } from 'react';
import Content from './style';

import { Card } from '../../../../components/Card';
import { Titulo } from '../../../../components/Titulo';
import { oportunidades_api } from '../../../../services/oportunidades_api';

export default function Dashboard() {
  const [projetosCriados, setProjetosCriados] = useState(0);
  const [projetosEmAndamento, setProjetosEmAndamento] = useState(0);
  const [projetosConcluidos, setProjetosConcluidos] = useState(0);
  const [avaliacoesRecebida, setAvaliacoesRecebida] = useState(0);

  useEffect(() => {
    const countProjetos = async () => {
      const { data: projetosCriadosData } = await oportunidades_api.get(
        '/projetos?limit=1',
      );
      setProjetosCriados(projetosCriadosData.total);

      const { data: projetosEmAndamentoData } = await oportunidades_api.get(
        '/projetos?limit=1&filter=status.codigo=INICIADO',
      );
      setProjetosEmAndamento(projetosEmAndamentoData.total);

      const { data: projetosConcluidosData } = await oportunidades_api.get(
        '/projetos?limit=1&filter=status.codigo=CONCLUIDO',
      );
      setProjetosConcluidos(projetosConcluidosData.total);
      const { data: avaliacoesRecebidaData } = await oportunidades_api.get(
        `/projetos/avaliacoes-consumidor`,
      );
      setAvaliacoesRecebida(avaliacoesRecebidaData.total);
    };

    countProjetos();
  }, []);

  return (
    <Content>
      <Card>
        <Titulo titulo="Dashboard" negrito={false} />
        <ul>
          <li>
            <span>Projetos criados</span> <span>{projetosCriados}</span>
          </li>
          <li>
            <span>Projetos em andamento</span>{' '}
            <span>{projetosEmAndamento}</span>
          </li>
          <li>
            <span>Projetos concluídos</span> <span>{projetosConcluidos}</span>
          </li>
          <li>
            <span>Avaliações recebidas</span> <span>{avaliacoesRecebida}</span>
          </li>
        </ul>
      </Card>
    </Content>
  );
}
