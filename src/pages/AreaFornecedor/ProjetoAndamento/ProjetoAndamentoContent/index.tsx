import { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useHistory, useLocation } from 'react-router-dom';
import { DadosProjeto } from '../../../../components/DadosProjeto';
import { EtapasProjeto } from '../../../../components/EtapasProjeto';
import { Button } from '../../../../components/Form/Button';
import { useQuery } from '../../../../hooks/geral';
import {
  EtapasProps,
  usePropostaFornecedor,
} from '../../../../hooks/propostaFornecedor';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import Layout from '../../Layout';
import Contratante from '../Contratante';
import Detalhes from '../Detalhes';
import Content from './style';

export default function ProjetoAndamentoContent() {
  const location = useLocation();
  const { state }: { state: any } = location;
  const { project, setProject, etapas, setEtapas } = usePropostaFornecedor();
  const [idProjeto, setIdProjeto] = useState<number | string>(state?.id);
  const query = useQuery();
  const history = useHistory();

  useEffect(() => {
    if (state && state.id) {
      setIdProjeto(state.id);
      return;
    }

    setIdProjeto(Number(query.get('id_projeto')));
    return;
  }, [location, state, query]);

  const getProjeto = useCallback(async () => {
    oportunidades_api.get(`/projetos/${idProjeto}`).then(({ data }) => {
      setProject({
        id: data.id,
        nome: data.nome,
        descricao: data.descricao,
        subareas: data.subareas,
        niveisExperiencia: data.niveisExperiencia,
        prazoConclusao: data.prazoConclusao,
        dataInicioEstimada: data.dataInicioEstimada,
        dataHoraCriacao: data.dataHoraCriacao,
        habilidadesComportamentais: data.habilidadesComportamentais,
        habilidadesTecnicas: data.habilidadesTecnicas,
        precoMaximo: data.precoMaximo,
        precoMinimo: data.precoMinimo,
        proBono: data.proBono,
        permitePerguntas: data.permitePerguntas,
        exclusivo: data.exclusivo,
        arquivos: data.arquivos,
        idPessoaConsumidor: data.idPessoaConsumidor,
        status: data.status,
        propostaAceita: data.propostaAceita,
        origemServico: data.origemServico,
        pessoaConsumidor: data.pessoaConsumidor as any,
        pessoaFornecedor: data.pessoaFornecedor as any,
        desistencia: data.desistencia,
        escopo: data.escopo,
        totalHoras: data.totalHoras,
      });
    });
  }, [idProjeto, setProject]);

  useEffect(() => {
    getProjeto();
  }, [getProjeto]);

  useEffect(() => {
    oportunidades_api
      .get<EtapasProps[]>(`/projetos/${idProjeto}/hist-status`)
      .then(({ data }) => {
        setEtapas(data);
      });
  }, [project.propostaAceita, idProjeto, setEtapas]);

  return (
    <Content>
      <Helmet>
        <title>Gyan - Andamento do projeto {project.nome || ''}</title>
      </Helmet>
      <Layout titulo={project.nome}>
        {project.propostaAceita && (
          <Row className="mt-4">
            <Col lg={12}>
              <Detalhes getProjeto={getProjeto} />
            </Col>
          </Row>
        )}
        <Row className="mt-4">
          <Col lg={4}>
            <EtapasProjeto etapas={etapas} />
          </Col>

          <Col lg={8}>
            <DadosProjeto
              projeto={project}
              valor={project.propostaAceita?.valor || 0}
            />
          </Col>
        </Row>

        {project.idPessoaConsumidor && (
          <Row className="mt-4">
            <Col lg={12}>
              <Contratante idPessoaConsumidor={project.idPessoaConsumidor} />
            </Col>
          </Row>
        )}

        <Row className="mt-5 text-end">
          <Col lg={12}>
            <Button
              onClick={() => history.goBack()}
              label="VOLTAR"
              color="ghost"
            />
          </Col>
        </Row>
      </Layout>
    </Content>
  );
}
