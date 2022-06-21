import { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useHistory, useLocation } from 'react-router';
import { DadosProjeto } from '../../../../components/DadosProjeto';
import { EtapasProjeto } from '../../../../components/EtapasProjeto';
import { useQuery } from '../../../../hooks/geral';
import {
  EtapasProps,
  ProjetoProps,
  usePropostaConsumidor,
} from '../../../../hooks/propostaConsumidor';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { PRETO_10 } from '../../../../styles/variaveis';
import { Layout } from '../../Layout';
import { Contratado } from '../Contratado';
import { Detalhes } from '../Detalhes';
import { HistoricoOrcamento } from '../HistoricoOrcamento';
import { Content, Button } from './style';
import { hotjar } from 'react-hotjar';

export function ProjetoAndamentoContent() {
  const { setDadosProjetos, dadosProjetos, setEtapas, etapas } =
    usePropostaConsumidor();
  const location = useLocation();
  const { state }: { state: any } = location;
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
    oportunidades_api
      .get<ProjetoProps>(`/projetos/${idProjeto}`)
      .then(({ data }) => {
        setDadosProjetos({
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
          idPessoaFornecedor: data.idPessoaFornecedor,
          idPessoaConsumidor: data.idPessoaConsumidor,
          status: data.status,
          propostaAceita: data.propostaAceita,
          origemServico: data.origemServico,
          desistencia: data.desistencia,
          escopo: data.escopo,
          totalHoras: data.totalHoras,
        });
      });
  }, [setDadosProjetos, idProjeto]);

  useEffect(() => {
    getProjeto();
  }, [getProjeto]);

  useEffect(() => {
    oportunidades_api
      .get<EtapasProps[]>(`/projetos/${idProjeto}/hist-status`)
      .then(({ data }) => {
        setEtapas(data);
      });
  }, [setEtapas, idProjeto]);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/consumidor/projeto/andamento');
  }, []);

  return (
    <Content>
      <Helmet>
        <title>Gyan - Andamento do projeto {dadosProjetos.nome || ''}</title>
      </Helmet>
      <Layout
        titulo={dadosProjetos?.nome}
        subtitulo="Acompanhamento do projeto"
        activeMenu
      >
        {dadosProjetos.propostaAceita && (
          <Row className="mt-4">
            <Col lg={12}>
              <Detalhes getProjeto={getProjeto} />
            </Col>
          </Row>
        )}

        <Row className="mt-4">
          <Col lg={4} className="mt-4">
            <EtapasProjeto etapas={etapas} cor={PRETO_10} />
          </Col>
          <Col lg={8} className="mt-4">
            <DadosProjeto
              projeto={dadosProjetos}
              cor={PRETO_10}
              valor={dadosProjetos.propostaAceita?.valor || 0}
            />
          </Col>
        </Row>

        {dadosProjetos.idPessoaFornecedor && (
          <Row className="mt-4">
            <Col lg={12}>
              <Contratado id_fornecedor={dadosProjetos.idPessoaFornecedor} />
            </Col>
          </Row>
        )}
        {!dadosProjetos.propostaAceita && (
          <Row className="mt-4">
            <Col lg={12}>
              <HistoricoOrcamento id_projeto={dadosProjetos.id} />
            </Col>
          </Row>
        )}

        <Row className="mt-5 text-end">
          <Col lg={12}>
            <Button onClick={() => history.goBack()}>VOLTAR</Button>
          </Col>
        </Row>
      </Layout>
    </Content>
  );
}
