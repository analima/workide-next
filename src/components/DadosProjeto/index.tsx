import { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { handleSplitAt } from '../../helpers/formatsHelper';
import { AZUL } from '../../styles/variaveis';
import { formatarValorParaReais } from '../../utils/CurrencyFormat';
import { dataValidationCurrent } from '../../utils/DateValidator';
import { Card } from '../Card';
import { Label } from '../Label';
import { Spacer } from '../Spacer';
import { Titulo } from '../Titulo';
import ModalCancelProject from '../../components/ModalCancelProject';
import {
  Anexo,
  ButtonMainStyled,
  Content,
  FaixaPreco,
  TableItens,
  TextoDescricao,
} from './style';
import { oportunidades_api } from '../../services/oportunidades_api';
import { useAuth } from '../../contexts/auth';
import { useLimitacoesPlanos } from '../../contexts/planLimitations';

import { ReactComponent as PDFIcon } from '../../assets/print-icon.svg';
import { usePropostaFornecedor } from '../../hooks/propostaFornecedor';

interface IAnexos {
  id: string;
  url: string;
}

interface AreaProps {
  id: number;
  descricao: string;
  areaInteresse: {
    id: number;
    descricao: string;
  };
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
  parcelas?: number;
  arquivos: IAnexos[];
  valor: number;
  dataHoraCriacao: string;
  dataInicioEstimada: string;
  prazoConclusao: number;
  id: number;
  idPessoaFornecedor: number;
}

interface PropostaProps {
  id: number;
  nome: string;
  descricao: string;
  subareas: AreaProps[];
  niveisExperiencia: string;
  prazoConclusao: number;
  dataInicioEstimada: string;
  precoMaximo: number;
  precoMinimo: number;
  proBono: boolean;
  permitePerguntas: boolean;
  dataHoraCriacao: string;
  exclusivo: boolean;
  habilidadesComportamentais: string;
  habilidadesTecnicas: string;
  arquivos: IAnexos[];
  idPessoaFornecedor?: number;
  idPessoaConsumidor: number;
  propostaAceita?: PropostaAceitaProps;
  status?: {
    codigo: string;
    descricao: string;
  };
}

export interface IDadosProjeto {
  projeto: PropostaProps;
  titulo?: string;
  cor?: string;
  height?: number;
  valor?: number;
}

export function DadosProjeto({
  projeto,
  titulo = 'Dados do projeto',
  cor = AZUL,
  height = 800,
  valor = 0,
}: IDadosProjeto) {
  const [areas, setAreas] = useState<string[]>([]);

  const { idProposta } = usePropostaFornecedor();

  const [habilidades, setHabilidades] = useState<string[]>([]);
  const [showModalCancelProject, setShowModalCancelProject] =
    useState<boolean>(false);
  const [statusProject, setStatusProject] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const { buscarLimitacoes } = useLimitacoesPlanos();

  const getProjeto = useCallback(async () => {
    if (projeto.id) {
      oportunidades_api.get(`/projetos/${projeto?.id}`).then(({ data }) => {
        setStatusProject(data?.status?.codigo);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projeto.id]);

  useEffect(() => {
    getProjeto();
  }, [getProjeto]);

  const NIVEIS_EXPERIENCIA = [
    'BASICO',
    'INTERMEDIARIO',
    'AVANCADO',
    'ESPECIALISTA',
  ];

  useEffect(() => {
    const areas = new Set(
      projeto.subareas?.map(subarea => subarea.areaInteresse.descricao),
    );
    setAreas(Array.from(areas));
    const habilidadesComportamental =
      projeto.habilidadesComportamentais?.split('|');
    const habilidadesTecnicas = projeto.habilidadesTecnicas?.split('|');

    setHabilidades([habilidadesComportamental, habilidadesTecnicas].flat());
    buscarLimitacoes();
  }, [buscarLimitacoes, projeto]);

  const exibirBotaoCancelar =
    user.id_pessoa === projeto.idPessoaConsumidor &&
    (statusProject === 'PAUSADO' || statusProject === 'RECEBENDO_PROPOSTAS');

  return (
    <Content>
      <Card>
        <Row className="headerDadosProjeto">
          <Col xs={12}>
            <Titulo titulo={titulo} tamanho={28} />
            {idProposta && (
              <div>
                <div className="selected-items__container-icons-export">
                  <a
                    href={`/projetos/imprimir-proposta/${idProposta}`}
                    target="_blank"
                    rel="noreferrer"
                    className="icon-pdf"
                  >
                    <PDFIcon color={AZUL} />
                  </a>
                </div>
              </div>
            )}
          </Col>

          {exibirBotaoCancelar && (
            <Col xs={4}>
              <ButtonMainStyled
                color={'DEFAULT'}
                onClick={() => {
                  setShowModalCancelProject(!showModalCancelProject);
                  setLoading(true);
                }}
              >
                {loading ? 'Carregando...' : ' CANCELAR PROJETO'}
              </ButtonMainStyled>
            </Col>
          )}
        </Row>

        {areas.length > 0 && (
          <>
            <Spacer size={42} />

            <TableItens borderless={false} bordered={false}>
              <tbody>
                <tr>
                  <td>Sobre o projeto:</td>
                  <td>
                    <TextoDescricao>{projeto.descricao}</TextoDescricao>
                  </td>
                </tr>
                <Spacer size={10} />
                <tr>
                  <td>Àrea</td>
                  <td>
                    {areas.map((area: string) => (
                      <Label label={area} key={area} />
                    ))}
                  </td>
                </tr>
                <Spacer size={10} />
                <tr>
                  <td>Subáreas:</td>
                  <td>
                    {projeto.subareas?.map((subarea: AreaProps) => (
                      <span key={subarea.id}>
                        <Label label={subarea.descricao} />
                      </span>
                    ))}
                  </td>
                </tr>
                <Spacer size={10} />
                <tr>
                  <td>Nível de experiência</td>
                  <td>
                    {NIVEIS_EXPERIENCIA.map(
                      nivel =>
                        projeto.niveisExperiencia
                          ?.split('|')
                          .some(
                            (nivelExperiencia: string) =>
                              nivelExperiencia === nivel,
                          ) && <Label label={nivel} key={nivel} />,
                    )}
                  </td>
                </tr>
                <Spacer size={10} />
                <tr>
                  <td>Prazos:</td>
                  <td>
                    Início:{' '}
                    {projeto.dataInicioEstimada
                      ? dataValidationCurrent(projeto.dataInicioEstimada)
                      : 'Não informado'}
                  </td>
                  <td>
                    Conclusão:{' '}
                    {projeto.prazoConclusao
                      ? `${projeto.prazoConclusao} dias`
                      : 'Não informado'}
                  </td>
                </tr>
                <Spacer size={10} />
                {habilidades.length > 0 && (
                  <tr>
                    <td>Habilidades:</td>
                    <td>
                      {habilidades.map((label, index) => (
                        <span key={index}>
                          <Label label={label} />
                        </span>
                      ))}
                    </td>
                  </tr>
                )}
                <Spacer size={10} />
                <tr>
                  <td>Anexos</td>
                  <td>
                    {projeto.arquivos?.map((anexo, index) => (
                      <Anexo
                        key={index}
                        className="mx-1"
                        href={anexo.url}
                        download
                        target="blank"
                      >
                        {handleSplitAt(anexo?.url) + ' '}
                      </Anexo>
                    ))}
                  </td>
                </tr>
                <Spacer size={10} />
                <tr>
                  <td>Faixa de preço:</td>
                  <td>
                    <FaixaPreco>
                      {projeto.precoMinimo === null &&
                      projeto.precoMinimo == null &&
                      projeto.propostaAceita
                        ? formatarValorParaReais(
                            projeto.propostaAceita.valor / (1 - 0.12) -
                              projeto.propostaAceita?.valor >
                              14
                              ? projeto.propostaAceita.valor / (1 - 0.12)
                              : 14 + projeto.propostaAceita?.valor,
                          )
                        : `${formatarValorParaReais(
                            Number(projeto.precoMinimo),
                          )} - ${formatarValorParaReais(
                            Number(projeto.precoMaximo),
                          )}`}
                    </FaixaPreco>
                  </td>
                </tr>
              </tbody>
              <Spacer size={10} />
            </TableItens>
          </>
        )}
        <ModalCancelProject
          idProject={projeto.id}
          showModal={showModalCancelProject}
          setShowModal={setShowModalCancelProject}
          getProjeto={getProjeto}
          proBono={projeto.proBono}
          setLoading={setLoading}
          wantToCancel={true}
        />
      </Card>
    </Content>
  );
}
