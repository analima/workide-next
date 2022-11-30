import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Layout from '../Layout';
import { Spacer } from '../../../components/Spacer';
import { GhostButton } from '../../../components/GhostButton';
import Contador from './Contador';
import BarraProgresso from './BarraProgresso';
import MeusGanhos from '../../../assets/meus-ganhos.svg';
import AguardandoRepasse from '../../../assets/aguardando-repasse.svg';
import PropostasEnviadas from '../../../assets/propostas-enviadas.svg';
import PropostasAceitas from '../../../assets/propostas-aceitas.svg';
import ProjetosMesPassado from '../../../assets/projetos-andamento.svg';
import ProjetosNesteMes from '../../../assets/projetos-concluidos.svg';
import { useAuth } from '../../../contexts/auth';
import { pessoas_api } from '../../../services/pessoas_api';
import { pagamentos_api } from '../../../services/pagamentos_api';
import { formatarValorParaReais } from '../../../utils/CurrencyFormat';

import { Contadores, ContadoresTitulo, ContadoresSubtitulo } from './style';
import Cabecalho from './style';
import { useEffect, useState } from 'react';
import { oportunidades_api } from '../../../services/oportunidades_api';
import { addMonths, endOfMonth, startOfMonth } from 'date-fns';
import { formatToPrice } from '../../../helpers/formatsHelper';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';
import { IS_EMPTY } from 'src/const';

interface IMeusGanhos {
  aguardandoRepasse: number;
  aguardandoPagamento: number;
  aguardandoConclusao: number;
  repasseEnviado: number;
}

export default function Dashboard() {
  const [propostas, setPropostas] = useState([]);
  const [propostasAceitas, setPropostasAceitas] = useState(0);
  const [projetosMesPassado, setProjetosMesPassado] = useState(0);
  const [projetosNesteMes, setProjetosNesteMes] = useState(0);
  const [projetosConcluidosNesteMes, setProjetosConcluidosNesteMes] =
    useState(0);
  const [projetosConcluidosMesPassado, setProjetosConcluidosMesPassado] =
    useState(0);
  const [projetosEmAndamentoNesteMes, setProjetosEmAndamentoNesteMes] =
    useState(0);
  const [projetosEmAndamentoMesPassado, setProjetosEmAndamentoMesPassado] =
    useState(0);
  const [valorHora, setValorHora] = useState(0);
  const history = useHistory();
  const { user } = useAuth();
  const [meusGanhos, setMeusGanhos] = useState<IMeusGanhos>({} as IMeusGanhos);
  const [porcentagemValorRecebido, setPorcentagemValorRecebido] =
    useState<number>(0);
  const [porcentagemAguardandoRepasse, setPorcentagemAguardandoRepasse] =
    useState<number>(0);

  const inicioMesAtual = startOfMonth(new Date()).toISOString();
  const fimMesAtual = endOfMonth(new Date()).toISOString();

  const inicioMesAnterior = startOfMonth(
    addMonths(new Date(), -1),
  ).toISOString();
  const fimMesAnterior = endOfMonth(addMonths(new Date(), -1)).toISOString();

  useEffect(() => {
    pessoas_api
      .get(`/fornecedores/${user?.id_pessoa}/indicadores`)
      .then(({ data }) => {
        setValorHora(data.valor_medio_hora);
      });
  }, [user?.id_pessoa]);

  useEffect(() => {
    try {
      pagamentos_api
        .get(`/repasse/fornecedor/ganhos/${user?.id_pessoa}`)
        .then(({ data }) => {
          setMeusGanhos(data);
        });
    } catch (error: any) {
      console.log(error);
    }
  }, [user?.id_pessoa]);

  useEffect(() => {
    if (meusGanhos) {
      const porcentagemValorRecebidoAux =
        (meusGanhos?.repasseEnviado /
          (meusGanhos?.aguardandoConclusao +
            meusGanhos?.aguardandoPagamento +
            meusGanhos?.aguardandoRepasse +
            meusGanhos?.repasseEnviado)) *
        100;
      porcentagemValorRecebidoAux
        ? setPorcentagemValorRecebido(porcentagemValorRecebidoAux)
        : setPorcentagemValorRecebido(0);

      const porcentagemAguardandoRepasseAux =
        (meusGanhos?.aguardandoRepasse /
          (meusGanhos?.aguardandoConclusao +
            meusGanhos?.aguardandoPagamento +
            meusGanhos?.aguardandoRepasse +
            meusGanhos?.repasseEnviado)) *
        100;
      porcentagemAguardandoRepasseAux
        ? setPorcentagemAguardandoRepasse(porcentagemAguardandoRepasseAux)
        : setPorcentagemAguardandoRepasse(0);
    }
  }, [meusGanhos]);

  useEffect(() => {
    oportunidades_api.get('/projetos/propostas?limit=100').then(({ data }) => {
      setPropostas(data.values);

      setPropostasAceitas(
        data.values.filter((proposta: any) => {
          return proposta.status.codigo === 'ACEITA';
        }).length,
      );
    });
  }, []);

  useEffect(() => {
    oportunidades_api
      .get(
        `/projetos/fornecedor?filter=dataHoraCriacao_gte=${inicioMesAtual},dataHoraCriacao_lte=${fimMesAtual}`,
      )
      .then(({ data }) => {
        setProjetosNesteMes(data.total);
        setProjetosConcluidosNesteMes(
          data.values.filter(
            (projeto: any) => projeto.status.codigo === 'CONCLUIDO',
          ).length,
        );
        setProjetosEmAndamentoNesteMes(
          data.values.filter(
            (projeto: any) => projeto.status.codigo === 'INICIADO',
          ).length,
        );
      });
  }, [inicioMesAtual, fimMesAtual]);

  useEffect(() => {
    oportunidades_api
      .get(
        `/projetos/fornecedor?filter=dataHoraCriacao_gte=${inicioMesAnterior},dataHoraCriacao_lte=${fimMesAnterior}`,
      )
      .then(({ data }) => {
        setProjetosMesPassado(data.total);
        setProjetosConcluidosMesPassado(
          data.values.filter(
            (projeto: any) => projeto.status.codigo === 'CONCLUIDO',
          ).length,
        );
        setProjetosEmAndamentoMesPassado(
          data.values.filter(
            (projeto: any) => projeto.status.codigo === 'INICIADO',
          ).length,
        );
      });
  }, [fimMesAnterior, inicioMesAnterior]);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || IS_EMPTY,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/apresentacao');
  }, []);

  const porcentagemProjetosConcluidos = () => {
    const totalProjetosEmAndamento =
      projetosEmAndamentoMesPassado + projetosEmAndamentoNesteMes;
    const totalProjetosConcluidos =
      projetosConcluidosMesPassado + projetosConcluidosNesteMes;
    if (totalProjetosEmAndamento === 0 && totalProjetosConcluidos > 0) {
      return 100;
    } else {
      const porcentagemProjetosConcluidosAux =
        (totalProjetosConcluidos / totalProjetosEmAndamento) * 100;
      return porcentagemProjetosConcluidosAux
        ? porcentagemProjetosConcluidosAux.toFixed(1)
        : 0;
    }
  };

  const porcentagemAproveitamentoPropostas = () => {
    const porcentagemAproveitamentoAux =
      (propostasAceitas / propostas.length) * 100;
    return porcentagemAproveitamentoAux
      ? porcentagemAproveitamentoAux.toFixed(1)
      : 0;
  };

  return (
    <Layout titulo="Minha Dashboard">
      <Helmet>
        <title>freelas town - Dashboard do fornecedor</title>
      </Helmet>
      <Cabecalho>
        <GhostButton onClick={() => history.push('perfil')}>
          ATUALIZAR PERFIL
        </GhostButton>
      </Cabecalho>

      <Contadores>
        <ContadoresTitulo>Contadores</ContadoresTitulo>
        <ContadoresSubtitulo>
          Acompanhe aqui seus números nos ultimos 90 dias
        </ContadoresSubtitulo>
        <Row>
          <ContadoresTitulo>Valor médio/hora</ContadoresTitulo>
          <ContadoresSubtitulo>
            {valorHora ? formatarValorParaReais(valorHora) : '0,00'}
          </ContadoresSubtitulo>
        </Row>
        <Row>
          <Col lg={6} onClick={() => history.push('/fornecedor/meus-ganhos')}>
            <Contador
              titulo="Meus ganhos"
              valor={
                meusGanhos?.repasseEnviado
                  ? formatToPrice(meusGanhos?.repasseEnviado / 100)
                  : '0,00'
              }
              Icone={MeusGanhos}
            />
          </Col>
          <Col lg={6} onClick={() => history.push('/fornecedor/meus-ganhos')}>
            <Contador
              titulo="Aguardando repasse"
              valor={
                meusGanhos?.aguardandoRepasse
                  ? formatToPrice(meusGanhos?.aguardandoRepasse / 100)
                  : '0,00'
              }
              Icone={AguardandoRepasse}
              destaque={true}
            />
          </Col>
          <Col lg={12}>
            <BarraProgresso
              titulo={`Você já recebeu ${porcentagemValorRecebido.toFixed(
                1,
              )}% de seu pagamento. ${porcentagemAguardandoRepasse.toFixed(
                1,
              )}% está em aguardando repasse.`}
              porcentagem={porcentagemValorRecebido}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Contador
              isCursorPointer={false}
              titulo="Propostas enviadas"
              valor={propostas.length}
              Icone={PropostasEnviadas}
            />
          </Col>
          <Col lg={6}>
            <Contador
              isCursorPointer={false}
              titulo="Propostas aceitas"
              valor={propostasAceitas}
              Icone={PropostasAceitas}
              destaque={true}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Spacer size={16} />
            <p>
              Você tem {porcentagemAproveitamentoPropostas()}% de aproveitamento
              em propostas enviadas e {propostasAceitas} aceitas.
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Contador
              isCursorPointer={false}
              titulo="Projetos no mês passado"
              valor={projetosMesPassado}
              Icone={ProjetosMesPassado}
            />
          </Col>
          <Col lg={6}>
            <Contador
              isCursorPointer={false}
              titulo="Projetos neste mês"
              valor={projetosNesteMes}
              Icone={ProjetosNesteMes}
              destaque={true}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <BarraProgresso
              titulo={`Você já realizou ${porcentagemProjetosConcluidos()}% dos seus projetos em andamento`}
              porcentagem={Number(porcentagemProjetosConcluidos())}
            />
          </Col>
        </Row>
      </Contadores>
    </Layout>
  );
}
