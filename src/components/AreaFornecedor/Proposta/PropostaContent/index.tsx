import { Col, Row } from 'react-bootstrap';
import { DadosProjeto } from '../../../../components/DadosProjeto';
import { EtapasProjeto } from '../../../../components/EtapasProjeto';
import Layout from '../../Layout';
import Content from './style';

import Enviar from '../Enviar';
import Contratante from '../Contratante';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import {
  ProjetoProps,
  usePropostaFornecedor,
} from '../../../../hooks/propostaFornecedor';

interface EtapasProps {
  status: {
    codigo: string;
    descricao: string;
  };
  dataOcorrencia: string;
}

export default function PropostaContent() {
  const [etapasProjeto, setEtapasProjeto] = useState<EtapasProps>(
    {} as EtapasProps,
  );
  const location = useLocation();
  const id_projeto = location.pathname.split('/')[3];

  const { setProject, project } = usePropostaFornecedor();

  useEffect(() => {
    oportunidades_api
      .get<ProjetoProps>(`/projetos/${id_projeto}`)
      .then(({ data }) => {
        setProject({
          id: data.id,
          nome: data.nome,
          descricao: data.descricao,
          subareas: data.subareas,
          niveisExperiencia: data.niveisExperiencia,
          prazoConclusao: data.prazoConclusao,
          dataInicioEstimada: data.dataInicioEstimada,
          habilidadesComportamentais: data.habilidadesComportamentais,
          habilidadesTecnicas: data.habilidadesTecnicas,
          precoMaximo: data.precoMaximo,
          precoMinimo: data.precoMinimo,
          dataHoraCriacao: data.dataHoraCriacao,
          proBono: data.proBono,
          permitePerguntas: data.permitePerguntas,
          exclusivo: data.exclusivo,
          arquivos: data.arquivos,
          idPessoaConsumidor: data.idPessoaConsumidor,
          propostaAceita: data.propostaAceita,
          status: data.status,
          origemServico: data.origemServico,
          pessoaConsumidor: data.pessoaConsumidor as any,
          pessoaFornecedor: data.pessoaFornecedor as any,
          desistencia: data.desistencia,
          escopo: data.escopo,
          totalHoras: data.totalHoras,
        });

        setEtapasProjeto({
          status: {
            codigo: 'CRIADO',
            descricao: 'Projeto criado',
          },
          dataOcorrencia: data.dataHoraCriacao,
        });
      });
  }, [id_projeto, setProject]);

  return (
    <Content>
      <Layout titulo={project.nome}>
        <Row>
          <Col lg={4} className="mt-4">
            <EtapasProjeto etapasProjeto={etapasProjeto} />
          </Col>
          <Col lg={8} className="mt-4">
            <DadosProjeto projeto={project} />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={12}>
            <Enviar />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={12}>
            <Contratante />
          </Col>
        </Row>
      </Layout>
    </Content>
  );
}
