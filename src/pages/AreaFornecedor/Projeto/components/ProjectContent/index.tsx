import { Col, Row } from 'react-bootstrap';
import { DadosProjeto } from '../../../../../components/DadosProjeto';
import { EtapasProjeto } from '../../../../../components/EtapasProjeto';
import { Layout } from '../../../Layout';
import { Content } from './style';

import { CardProposal } from '../CardProposal';
import { Spacer } from '../../../../../components/Spacer';
import { UserCard } from '../../../../../components/UserCard';
import { Titulo } from '../../../../../components/Titulo';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { oportunidades_api } from '../../../../../services/oportunidades_api';
import { pessoas_api } from '../../../../../services/pessoas_api';
import { arquivos_api } from '../../../../../services/arquivos_api';
import { usePropostaFornecedor } from '../../../../../hooks/propostaFornecedor';
import { Helmet } from 'react-helmet';
import { PRETO_10 } from '../../../../../styles/variaveis';
import { useQuery } from '../../../../../hooks/geral';
import { hotjar } from 'react-hotjar';

interface EtapasProps {
  id: number;
  idProjeto: number;
  status: {
    codigo: string;
    descricao: string;
  };
  dataOcorrencia: string;
  usuarioOcorrencia: string;
}

interface DetalhesPropostaProps {
  dataInicioEstimada: string;
  descricao: string;
  entregaveis: {
    id: number;
    descricao: string;
    status: string;
  }[];
  id: number;
  idPessoaFornecedor: number;
  idProjeto: number;
  parcelas: number;
  prazoConclusao: number;
  requisitos: {
    id: number;
    descricao: string;
    status: string;
  }[];
  condicoesGerais: string[];
  status: {
    codigo: string;
    descricao: string;
  };
  valor: number;
  arquivos: IAnexos[];
  totalHoras: number;
}

interface IAnexos {
  id: string;
  url: string;
}

interface PropostaProps {
  id: number;
  nome: string;
  descricao: string;
  subareas: {
    id: number;
    descricao: string;
    areaInteresse: {
      id: number;
      descricao: string;
    };
  }[];
  niveisExperiencia: string;
  prazoConclusao: number;
  dataHoraCriacao: string;
  dataInicioEstimada: string;
  precoMaximo: number;
  precoMinimo: number;
  proBono: boolean;
  permitePerguntas: boolean;
  exclusivo: boolean;
  habilidadesComportamentais: string;
  habilidadesTecnicas: string;
  arquivos: IAnexos[];
  idPessoaConsumidor: number;
}

interface ConsumidorProps {
  nome: string;
  nome_tratamento: string;
  resumo_profissional: string;
  id_arquivo: string;
  id: number;
  id_usuario: number;
  ativo: boolean;
}

export function PropostaContent() {
  const { setIdProposta, idProposta } = usePropostaFornecedor();
  const [etapas, setEtapas] = useState<EtapasProps[]>([] as EtapasProps[]);
  const [detalhesProposta, setDetalhesProposta] =
    useState<DetalhesPropostaProps>({} as DetalhesPropostaProps);
  const location = useLocation();
  const [project, setProject] = useState<PropostaProps>({} as PropostaProps);
  const [dadosConsumidor, setDadosConsumidor] = useState<ConsumidorProps>(
    {} as ConsumidorProps,
  );
  const [image, setImage] = useState<string>('');
  const query = useQuery();
  const { state }: { state: any } = location;
  const [notaMedia, setNotaMedia] = useState<number>(0);
  const [idProjeto, setIdProjeto] = useState<number | string>(0);

  useEffect(() => {
    if (state && state.idProposta) {
      setIdProposta(state.idProposta);
      return;
    }

    setIdProposta(Number(query.get('id_proposta')));
    return;
  }, [location, state, query, setIdProposta]);

  useEffect(() => {
    if (state && state.idProjeto) {
      setIdProjeto(state.idProjeto);
      return;
    }

    setIdProjeto(Number(query.get('id_projeto')));
    return;
  }, [location, state, query, setIdProjeto]);

  useEffect(() => {
    oportunidades_api
      .get<EtapasProps[]>(`/projetos/propostas/${idProposta}/hist-status`)
      .then(({ data }) => {
        setEtapas(data);
      });
  }, [idProjeto, idProposta]);

  useEffect(() => {
    oportunidades_api
      .get<DetalhesPropostaProps>(`/projetos/propostas/${idProposta}`)
      .then(({ data }) => {
        setDetalhesProposta(data);
      });
  }, [idProjeto, idProposta]);

  useEffect(() => {
    oportunidades_api
      .get<PropostaProps>(`/projetos/${idProjeto}`)
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
        });
      });
  }, [idProjeto]);

  useEffect(() => {
    if (project.idPessoaConsumidor) {
      pessoas_api
        .get(`/pessoas/${project.idPessoaConsumidor}`)
        .then(response => {
          setDadosConsumidor(response.data);
        });
    }
  }, [project.idPessoaConsumidor]);

  useEffect(() => {
    if (project.idPessoaConsumidor) {
      oportunidades_api
        .get(
          `/projetos/avaliacoes-consumidor/${project.idPessoaConsumidor}/count`,
        )
        .then(({ data }) => {
          data?.media ? setNotaMedia(data?.media) : setNotaMedia(0);
        });
    }
  }, [project.idPessoaConsumidor]);

  useEffect(() => {
    if (dadosConsumidor.id_arquivo) {
      arquivos_api
        .get(`/arquivos/${dadosConsumidor.id_arquivo}`)
        .then(response => {
          const { url } = response.data;
          setImage(url);
        });
    }
  }, [dadosConsumidor.id_arquivo]);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/fornecedor/propostas');
  }, []);

  return (
    <Content>
      <Helmet>
        <title>Gyan - Ver proposta enviada para {project.nome || ''}</title>
      </Helmet>
      <Layout
        titulo={project.nome && `${project.nome}`}
        subtitulo="Acompanhamento do projeto"
      >
        <Spacer size={54} />
        <Row>
          <Col lg={4} className="mt-4">
            <EtapasProjeto etapas={etapas} />
          </Col>
          <Col lg={8} className="mt-4">
            <DadosProjeto projeto={project} />
          </Col>

          <Spacer size={20} />

          <CardProposal
            idProjeto={Number(idProjeto)}
            detalhesProposta={detalhesProposta}
            idConsumidor={project.idPessoaConsumidor}
          />

          <Spacer size={40} />
          <>
            <Titulo titulo="Cliente" tamanho={40} cor={PRETO_10} />
            <Spacer size={40} />
            <UserCard
              text={dadosConsumidor.resumo_profissional}
              ranking={0}
              name={dadosConsumidor.nome_tratamento}
              image={image}
              notaMedia={notaMedia}
              id={dadosConsumidor.id}
              visao="fornecedor"
              ativo={dadosConsumidor.ativo}
            />
          </>
        </Row>
      </Layout>
    </Content>
  );
}
