import { Col, Row } from 'react-bootstrap';
import Content from './style';
import CardProposal from '../CardProposal';
import { Spacer } from '../../../../Spacer';
import { UserCard } from '../../../../UserCard';
import { Titulo } from '../../../../Titulo';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { oportunidades_api } from '../../../../../services/oportunidades_api';
import { EtapasProjeto } from '../../../../EtapasProjeto';
import { DadosProjeto } from '../../../../DadosProjeto';
import { pessoas_api } from '../../../../../services/pessoas_api';
import { arquivos_api } from '../../../../../services/arquivos_api';
import { consultas_api } from '../../../../../services/consultas_api';
import Layout from '../../../Layout';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';
import { IS_EMPTY } from 'src/const';

interface IAnexos {
  id: string;
  url: string;
}

interface IRequisitosIntegraveis {
  id: number;
  descricao: string;
  status: string;
  dataHoraUltimaAtualizacao: string;
}

interface PropostaAceitaProps {
  descricao: string;
  requisitos: IRequisitosIntegraveis[];
  entregaveis: IRequisitosIntegraveis[];
  parcelas: number;
  arquivos: IAnexos[];
  valor: number;
  dataHoraCriacao: string;
  dataInicioEstimada: string;
  prazoConclusao: number;
  id: number;
  idPessoaFornecedor: number;
}

interface ProjetosProps {
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
  dataHoraCriacao: string;
  prazoConclusao: number;
  dataInicioEstimada: string;
  precoMaximo: number;
  precoMinimo: number;
  proBono: boolean;
  permitePerguntas: boolean;
  exclusivo: boolean;
  habilidadesComportamentais: string;
  habilidadesTecnicas: string;
  arquivos: IAnexos[];
  idPessoaFornecedor: number;
  idPessoaConsumidor: number;
  propostaAceita?: PropostaAceitaProps;
}

interface EtapasProps {
  id: number;
  idProjeto: number;
  status: {
    codigo: string;
    descricao: string;
  };
  dataOcorrencia: string;
}

interface IPropsUsuario {
  usuarioCognito: {
    idUsuario: number;
    username: string;
  };
}

interface IFornecedorProps {
  nome: string;
  nome_tratamento: string;
  resumo_profissional: string;
  id_arquivo: number;
  fundador: boolean;
  moderacao: boolean;
  usuario: IPropsUsuario;
  id_usuario: number;
  id: number;
  ativo: boolean;
}

type ConsultaRankingType = {
  idUsuario: number;
  ranking: number;
  notaMedia: number;
  pontuacao: number;
};

export default function PropostaContent() {
  const [etapas, setEtapas] = useState<EtapasProps[]>([] as EtapasProps[]);
  const [dadosProjetos, setDadosProjetos] = useState<ProjetosProps>(
    {} as ProjetosProps,
  );
  const [dadosFornecedor, setDadosFornecedor] = useState<IFornecedorProps>(
    {} as IFornecedorProps,
  );
  const [consultaRanking, setConsultaRanking] = useState<ConsultaRankingType>(
    {} as ConsultaRankingType,
  );
  const [imageUsuario, setImageUsuario] = useState<string>('');

  const location = useLocation();

  const { state }: { state: any } = location;
  const [notaMedia, setNotaMedia] = useState<number>(0);

  useEffect(() => {
    oportunidades_api
      .get<EtapasProps[]>(`/projetos/${state?.id_projeto}/hist-status`)
      .then(({ data }) => {
        setEtapas(data);
      });
  }, [state?.id_projeto]);

  useEffect(() => {
    oportunidades_api.patch(`/projetos/${state.id_projeto}`);

    oportunidades_api
      .get<ProjetosProps>(`/projetos/${state?.id_projeto}`)
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
        });
      });
  }, [state?.id_projeto]);

  useEffect(() => {
    if (dadosFornecedor.id) {
      consultas_api
        .get<ConsultaRankingType>(
          `/consulta/fornecedores/${dadosFornecedor.id}/ranking`,
        )
        .then(res => {
          setConsultaRanking(res.data);
        });
    }
  }, [dadosFornecedor.id]);

  useEffect(() => {
    if (state.id_fornecedor) {
      pessoas_api
        .get<IFornecedorProps>(`/pessoas/${state.id_fornecedor}`)
        .then(({ data }) => {
          setDadosFornecedor({
            nome: data.nome,
            nome_tratamento: data.nome_tratamento,
            resumo_profissional: data.resumo_profissional,
            id_arquivo: data.id_arquivo,
            fundador: data.fundador,
            moderacao: data.moderacao,
            usuario: data.usuario,
            id_usuario: data.id_usuario,
            id: data?.id,
            ativo: data.ativo,
          });
        });
    }
  }, [state?.id_fornecedor]);

  useEffect(() => {
    if (dadosFornecedor.id_arquivo) {
      arquivos_api
        .get(`/arquivos/${dadosFornecedor.id_arquivo}`)
        .then(({ data }) => {
          setImageUsuario(data.url);
        });
    }
  }, [dadosFornecedor.id_arquivo]);

  useEffect(() => {
    if (dadosFornecedor.id) {
      oportunidades_api
        .get(`/projetos/avaliacoes-fornecedor/${dadosFornecedor.id}/count`)
        .then(({ data }) => {
          data?.media ? setNotaMedia(data?.media) : setNotaMedia(0);
        });
    }
  }, [dadosFornecedor.id]);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || IS_EMPTY,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/contratante/propostas');
  }, []);

  return (
    <Content>
      <Helmet>
        <title>
          freelas town - Proposta enviada para {dadosProjetos.nome || ''}
        </title>
      </Helmet>
      <Layout
        activeMenu={true}
        titulo={dadosProjetos?.nome ? `${dadosProjetos.nome}` : ''}
      >
        <Spacer size={54} />
        <Row>
          <CardProposal id_proposta={state?.id_proposta} />
          <Col lg={4} className="mt-4">
            <EtapasProjeto etapas={etapas} />
          </Col>
          <Col lg={8} className="mt-4">
            <DadosProjeto
              projeto={dadosProjetos}
              valor={dadosProjetos.propostaAceita?.valor || IS_EMPTY}
            />
          </Col>
          <Spacer size={40} />
          <Titulo titulo="Sobre o fornecedor" tamanho={40} />
          <Spacer size={40} />
          <UserCard
            text={dadosFornecedor.resumo_profissional}
            ranking={consultaRanking.ranking}
            name={dadosFornecedor.nome_tratamento}
            image={imageUsuario}
            notaMedia={notaMedia}
            id={state?.id_fornecedor}
            id_usuario={dadosFornecedor?.id_usuario}
            visao="consumidor"
            ativo={dadosFornecedor.ativo}
          />
        </Row>
      </Layout>
    </Content>
  );
}
