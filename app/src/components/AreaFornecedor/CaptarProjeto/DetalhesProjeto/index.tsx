import { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { Card } from '../../../../components/Card';
import { Titulo } from '../../../../components/Titulo';
import { AZUL, PRETO_60 } from '../../../../styles/variaveis';
import Coracao from '../../../../assets/coracao.svg';

import ExclusivoImage from '../../../../assets/exclusive.svg';

import IconeVoluntario from '../../../../assets/icon-voluntare.svg';
import EstrelaOff from '../../../../assets/estrela-off.svg';
import Estrela from '../../../../assets/estrela.svg';
import {
  Header,
  HeaderInfo,
  HeaderContentButton,
  Button,
  ContainerBody,
  TableItens,
  ContainerPerguntas,
  Pergunta,
  Resposta,
  QuemPergunta,
  DataPergunta,
  DataResposta,
  ContainerInput,
  ButtonPergunta,
  Info,
  FotoPerfil,
  NomeTitulo,
  Avaliacao,
  SobreDrescricao,
  ContentButton,
  ButtonVoltar,
  InputStyled,
  CardPergunta,
  CardPerguntaIndividual,
  CardRespostaIndividual,
  FaixaPrecoContainer,
  ContentFaixa,
  FaixaPrecoLabel,
  ValorServico,
  FaixaProBono,
  Compartilhar,
} from './style';
import Content from './style';
import { GiShare } from 'react-icons/gi';

import Layout from '../../Layout';
import { Spacer } from '../../../../components/Spacer';
import { useHistory } from 'react-router-dom';
import { itens } from '../../../../utils/mock-busca';
import { useAuth } from '../../../../contexts/auth';
import { pessoas_api } from '../../../../services/pessoas_api';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { Label } from '../../../../components/Label';
import { arquivos_api } from '../../../../services/arquivos_api';
import { dataValidation } from '../../../../utils/DateValidator';
import { useLimitacoesPlanos } from '../../../../contexts/planLimitations';
import { AvatarRegrasPlano } from '../../../../components/AvatarRegrasPlano';
import { AvatarCadastroIncompleto } from '../../../../components/AvatarCadastroIncompleto';
import { AvatarModeracao } from '../../../../components/AvatarModeracao';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Helmet } from 'react-helmet';
import { formatToPrice } from '../../../../helpers/formatsHelper';
import { hotjar } from 'react-hotjar';
import { AvatarErroGeral } from '../../../../components/AvatarErroGeral';
import { ModalRecomendacao } from '../../../../components/ModalRecomendacao';
import { Skeleton } from '../../../../components/Skeleton';

export interface IProduct {
  id: number;
  score: number;
  nome: string;
  descricao: string;
  areaInteresse: string;
  subareas: string[];
  nivelExperiencia: string;
  habilidadesExigidas: string[];
  dataInicioEstimada: string;
  prazoConclusao: number;
  precoMinimo: number;
  precoMaximo: number;
  voluntario: boolean;
  status: string;
  dataHoraCriacao: string;
  dataHoraInicio: string;
  dataHoraFim: string;
  timestamp: string;
  dataHoraUltimaAtualizacao: string;
  type: string;
  version: number;
}

interface IAnexos {
  id: number;
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
  parcelas?: number;
  arquivos: IAnexos[];
  valor: number;
  dataHoraCriacao: string;
  dataInicioEstimada: string;
  prazoConclusao: number;
  id: number;
}

interface ProjetoProps {
  id: string;
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
  dataInicioEstimada: string;
  dataHoraCriacao: string;
  precoMaximo: number;
  precoMinimo: number;
  proBono: boolean;
  permitePerguntas: boolean;
  exclusivo: boolean;
  habilidadesComportamentais: string;
  habilidadesTecnicas: string;
  arquivos: IAnexos[];
  idPessoaConsumidor: number;
  propostaAceita?: PropostaAceitaProps;
  escopo: string;
  totalHoras: number;
  pessoaConsumidor: {
    id: number;
    nome_tratamento: string;
    arquivo: {
      url: string;
    };
  };
}

interface ConsumidorProps {
  id: number;
  id_usuario: number;
  nome: string;
  resumo_profissional: string;
  id_arquivo: string;
  moderacao: boolean;
  nome_tratamento?: string;
}

interface ListPerguntasProps {
  dataHoraCriacao: string;
  dataHoraResposta: string;
  descricao: string;
  id: number;
  idProjeto: number;
  resposta: string;
  quemPergunta: {
    id: number;
    nomeTratamento: string;
  };
}

export default function DetalhesProjeto() {
  const [areas, setAreas] = useState<string[]>([]);
  const [, setService] = useState<IProduct[] | Array<any>>([]);
  const [project, setProject] = useState<ProjetoProps>({} as ProjetoProps);
  const history = useHistory();
  const { user, refreshUserData } = useAuth();
  const idProject = parseInt(window.location.pathname.split('/')[2]);
  const [habilidades, setHabilidades] = useState<string[]>([]);
  const [dadosConsumidor, setDadosConsumidor] = useState<ConsumidorProps>(
    {} as ConsumidorProps,
  );
  const [image, setImage] = useState<string>('');
  const [chat, setChat] = useState('');
  const [listPerguntas, setListPerguntas] = useState<ListPerguntasProps[]>(
    [] as ListPerguntasProps[],
  );
  const { limitacoesPlano, buscarLimitacoes } = useLimitacoesPlanos();
  const [loading, setLoading] = useState(false);
  const [errorLimitacoes, setErrorLimitacoes] = useState(false);
  const [errorCadastro, setErrorCadastro] = useState(false);
  const [notaMedia, setNotaMedia] = useState<number>(0);
  const [idProposta, setIdProposta] = useState(0);
  const [showAvatarModeration, setShowAvatarModeration] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showAvatarDenunced, setShowAvatarDenunced] = useState(false);
  const [proposalAmount, setProposalAmount] = useState(0);
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [link, setLink] = useState('');

  useEffect(() => {
    oportunidades_api
      .get(`/projetos/${idProject}/propostas/count`)
      .then(({ data }) => {
        setProposalAmount(data);
      });
  }, [idProject]);

  useEffect(() => {
    if (!!user.id_pessoa) {
      oportunidades_api
        .get(`/projetos/propostas?filter=idProjeto_eq=${idProject}`)
        .then(({ data }) => {
          if (data.values.length > 0) {
            setIdProposta(data.values[0].id);
          }
        });
    }
    refreshUserData();
  }, [idProject, refreshUserData, user.id_pessoa]);

  useEffect(() => {
    buscarLimitacoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dadosConsumidor.id]);

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
    setService(itens);
  }, []);

  async function handleChat() {
    if (chat === '') {
      return;
    }
    setIsDisabled(true);
    try {
      await pessoas_api.post(`/projetos/${idProject}/perguntas`, {
        descricao: chat,
      });
      setIsDisabled(false);
      setChat('');
      BuscaMensagem();
    } catch (error) {
      console.log(error);
    }
  }

  const BuscaMensagem = useCallback(async () => {
    try {
      const { data } = await oportunidades_api.get(
        `/projetos/${idProject}/perguntas`,
      );
      setListPerguntas(data.values);
    } catch (error) {
      console.log(error);
    }
  }, [idProject]);

  useEffect(() => {
    BuscaMensagem();
  }, [BuscaMensagem]);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/detalhes-projeto/');
  }, []);

  function handleShowStars(numberOfStars: number) {
    const stars = [];
    for (let i = 1; i <= 5; i += 1) {
      if (i <= numberOfStars) {
        if (numberOfStars === 0)
          stars.push(
            <EstrelaOff className="estrela" key={i + Math.random()} />,
          );
        else
          stars.push(<Estrela className="estrela" key={i + Math.random()} />);
      } else {
        stars.push(<EstrelaOff className="estrela" key={i + Math.random()} />);
      }
    }
    return stars;
  }

  const handleDate = (elm: any) => {
    const date = new Date(elm);
    return date.toLocaleDateString('pt-br');
  };

  const obterNotaMedia = useCallback((id: any) => {
    if (id) {
      oportunidades_api
        .get(`/projetos/avaliacoes-consumidor/${id}/count`)
        .then(({ data }) => {
          data?.media ? setNotaMedia(data.media) : setNotaMedia(0);
        });
    }
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      if (!!user.id_pessoa) {
        const { data } = await oportunidades_api.get<ProjetoProps>(
          `/projetos/${idProject}`,
        );
        setProject(data);
      } else {
        const { data } = await oportunidades_api.get<ProjetoProps>(
          `/projetos/${idProject}/public`,
        );
        setProject(data);
      }
    };

    if (project.idPessoaConsumidor) {
      pessoas_api
        .get(`/pessoas/${project.idPessoaConsumidor}`)
        .then(response => {
          setDadosConsumidor(response.data);
          obterNotaMedia(response.data?.id);
        });
    }

    fetchApi();
  }, [idProject, project.idPessoaConsumidor, obterNotaMedia, user.id_pessoa]);

  useEffect(() => {
    const areas = new Set(
      project.subareas?.map(subarea => subarea.areaInteresse.descricao),
    );
    setAreas(Array.from(areas));

    const habilidadesComportamental =
      project.habilidadesComportamentais?.split('|');
    const habilidadesTecnicas = project.habilidadesTecnicas?.split('|');
    const allProjectSkills = [
      habilidadesComportamental,
      habilidadesTecnicas,
    ].flat();
    const allUProjectSkillsWithoutEmptyElement = allProjectSkills.filter(
      habilidade => !!habilidade,
    );

    setHabilidades(allUProjectSkillsWithoutEmptyElement);
  }, [
    project.habilidadesComportamentais,
    project.habilidadesTecnicas,
    project.subareas,
  ]);

  function checkDenuncedUser() {
    const denunciaProcedente = user.denuncias.find(obj => obj.procede === true);
    return denunciaProcedente ? true : false;
  }

  async function handleCheckNumberOfConcurrenceProjects() {
    try {
      if (checkDenuncedUser()) {
        setShowAvatarDenunced(true);
        return;
      }
      setErrorLimitacoes(false);
      setLoading(true);
      const response = await oportunidades_api.get('/projetos/fornecedor');
      if (project.proBono) {
        if (limitacoesPlano.servicosVoluntarios) {
          const projetosVoluntarios = response.data.values.filter(
            (projeto: any) => projeto.proBono,
          );
          if (
            projetosVoluntarios.length >= limitacoesPlano.servicosVoluntarios &&
            !limitacoesPlano.ilimitadoServicosVoluntarios
          ) {
            setErrorLimitacoes(true);
            return;
          }
        }
      }

      if (
        !project.proBono &&
        user.percentageRegisterConsumer &&
        user.percentageRegisterConsumer < 80
      )
        setErrorCadastro(true);
      else if (
        project.proBono &&
        user.percentageRegisterConsumer &&
        user.percentageRegisterConsumer < 60
      )
        setErrorCadastro(true);
      else if (
        response.data.total >= limitacoesPlano.projetosSimultaneos &&
        !limitacoesPlano.ilimitadoProjetosSimultaneos
      )
        setErrorLimitacoes(true);
      else if (!user.moderacao) {
        setShowAvatarModeration(true);
        setLoading(false);
      } else history.push(`/fornecedor/proposta/${project.id}`);
    } catch (error: any) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  }

  function handleShowAvatarErorr() {
    setErrorLimitacoes(false);
  }

  function handleShowAvatarCadastroErorr() {
    setErrorCadastro(false);
  }

  function handleShowAvatarDenunced() {
    setShowAvatarDenunced(!showAvatarDenunced);
  }

  const exibePrecos = (projeto: ProjetoProps): string => {
    const precoMinimoStr = new Intl.NumberFormat('pt-BR', {
      style: 'currency',

      currency: 'BRL',
      maximumFractionDigits: 2,
    }).format(projeto.precoMinimo);

    const precoMaximoStr = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 2,
    }).format(projeto.precoMaximo);
    if (projeto.precoMinimo === projeto.precoMaximo) {
      return precoMinimoStr;
    }
    return `${precoMinimoStr} - ${precoMaximoStr}`;
  };

  const handleOpenShareLink = useCallback(() => {
    const urlAtual = window.location.href;
    setLink(urlAtual);
    setShowRecommendationModal(true);
  }, []);

  return (
    <Content>
      <Helmet>
        <title>freelas town - Projeto {project.nome || ''}</title>
      </Helmet>
      <Layout>
        <AvatarErroGeral
          mensagem="Ops, parece que há uma denuncia procedente para o seu usuário. Por esse motivo você não pode realizar essa ação"
          mostrar={showAvatarDenunced}
          esconderAvatar={handleShowAvatarDenunced}
        />
        <AvatarRegrasPlano
          mostrar={errorLimitacoes}
          esconderAvatar={handleShowAvatarErorr}
          premium={limitacoesPlano.idPlano === 4}
        />
        <AvatarCadastroIncompleto
          mostrar={errorCadastro}
          esconderAvatar={handleShowAvatarCadastroErorr}
          porcentagem={
            user.percentageRegisterProvider
              ? user.percentageRegisterProvider
              : 0
          }
          isConsumer={false}
        />

        <ModalRecomendacao
          showModal={showRecommendationModal}
          setShowModal={setShowRecommendationModal}
          link={link}
        />

        <AvatarModeracao
          mostrar={showAvatarModeration}
          esconderAvatar={() => {
            setShowAvatarModeration(!showAvatarModeration);
          }}
        ></AvatarModeracao>
        <Row className="d-flex justify-content-center">
          <Col lg={10}>
            <Card>
              <Row className="d-flex justify-content-center">
                <Col lg={12}>
                  <Header>
                    <div className="content-header">
                      <div className="content-project-info">
                        {project.exclusivo ? (
                          <ExclusivoImage
                            style={{
                              width: '110px',
                              height: '110px',
                            }}
                          />
                        ) : (
                          <Coracao />
                        )}
                        <h1>{project.nome}</h1>
                      </div>

                      {!project.proBono ? (
                        project.precoMinimo !== undefined &&
                        project.precoMaximo !== undefined ? (
                          <FaixaPrecoContainer>
                            <ContentFaixa>
                              <FaixaPrecoLabel>
                                {project.escopo === 'ABERTO'
                                  ? 'Faixa de preço por hora'
                                  : 'Faixa de preço'}
                              </FaixaPrecoLabel>
                            </ContentFaixa>
                            <ValorServico>
                              <h1>{exibePrecos(project)}</h1>
                            </ValorServico>
                            {project.escopo === 'ABERTO' && (
                              <p>Quantidade de horas: {project.totalHoras}h </p>
                            )}
                          </FaixaPrecoContainer>
                        ) : (
                          <Skeleton width="264px" height="30px" />
                        )
                      ) : (
                        <FaixaProBono>
                          <IconeVoluntario />
                          <div className="voluntariado">
                            <p>Por hora</p>
                            <span>VOLUNTÁRIO</span>
                            <p>Quantidade de horas: {project.totalHoras}h </p>
                          </div>
                        </FaixaProBono>
                      )}
                    </div>
                  </Header>

                  <HeaderInfo>
                    {project.dataHoraCriacao && (
                      <span>
                        Publicado há menos de{' '}
                        {formatDistance(
                          new Date(),
                          new Date(project.dataHoraCriacao),
                          {
                            locale: pt,
                          },
                        ).replace('aproximadamente', '')}
                      </span>
                    )}
                    <span>
                      Esse projeto recebeu {proposalAmount} proposta
                      {proposalAmount > 1 ? 's' : ''}
                    </span>
                  </HeaderInfo>

                  {!!user.id_pessoa &&
                  project.idPessoaConsumidor === user.id ? (
                    <Col lg={12}>
                      <HeaderContentButton>
                        <Compartilhar onClick={() => handleOpenShareLink()}>
                          <GiShare color={AZUL} size={24} />
                          COMPARTILHAR
                        </Compartilhar>

                        <span>Veja como estão vendo sua proposta</span>
                      </HeaderContentButton>
                    </Col>
                  ) : (
                    <Col lg={12}>
                      {!idProposta ? (
                        <HeaderContentButton>
                          <div>
                            <Compartilhar onClick={() => handleOpenShareLink()}>
                              <GiShare color={AZUL} size={24} />
                              COMPARTILHAR
                            </Compartilhar>

                            <Button
                              onClick={() => {
                                if (!user.id_pessoa) {
                                  history.push('/cadastro-basico');
                                  return;
                                }
                                handleCheckNumberOfConcurrenceProjects();
                              }}
                            >
                              {loading ? 'CARREGANDO...' : 'QUERO PARTICIPAR'}
                            </Button>
                          </div>
                        </HeaderContentButton>
                      ) : (
                        <>
                          <HeaderContentButton>
                            <span>
                              Você já enviou uma proposta para este projeto
                            </span>

                            <div>
                              <Compartilhar
                                onClick={() => handleOpenShareLink()}
                              >
                                <GiShare color={AZUL} size={24} />
                                COMPARTILHAR
                              </Compartilhar>

                              <Button
                                onClick={() => {
                                  history.push(`/fornecedor/propostas`, {
                                    idProposta,
                                    idProjeto: idProject,
                                  });
                                }}
                              >
                                ACOMPANHAR PROPOSTA
                              </Button>
                            </div>
                          </HeaderContentButton>
                        </>
                      )}
                    </Col>
                  )}

                  <ContainerBody>
                    <Titulo tamanho={24} titulo="Dados do projeto" />

                    <TableItens borderless={false} bordered={false}>
                      <tbody>
                        <tr>
                          <td>Sobre o projeto:</td>
                          <td>{project.descricao}</td>
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
                            {project.subareas?.map(categoria => (
                              <Label
                                label={categoria.descricao}
                                key={categoria.id}
                              />
                            ))}
                          </td>
                        </tr>

                        <Spacer size={10} />

                        <tr>
                          <td>Prazos:</td>
                          <td>
                            Inicio:{' '}
                            {project.dataInicioEstimada === null
                              ? 'Imedito'
                              : handleDate(project.dataInicioEstimada)}{' '}
                            <br />
                            Conclusão: {project.prazoConclusao} dias
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
                        {project &&
                          project.arquivos &&
                          project.arquivos.length > 0 && (
                            <tr>
                              <td>Anexos:</td>
                              <td>
                                {project.arquivos?.map(anexo => (
                                  <a
                                    href={anexo.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    key={anexo.id}
                                  >
                                    {anexo.url.split('-')[3]}
                                  </a>
                                ))}
                              </td>
                            </tr>
                          )}

                        <Spacer size={10} />

                        <tr>
                          <td>faixa de preço</td>
                          <td>
                            {project.proBono === true ? (
                              <Titulo tamanho={18} titulo="VOLUNTÁRIO" />
                            ) : (
                              <strong>
                                {project.propostaAceita ? (
                                  <>
                                    {formatToPrice(
                                      project.propostaAceita.valor / (1 - 0.12),
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {formatToPrice(project.precoMinimo)} -{' '}
                                    {formatToPrice(project.precoMaximo)}
                                  </>
                                )}
                              </strong>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </TableItens>
                  </ContainerBody>

                  {project.permitePerguntas && (
                    <ContainerPerguntas>
                      <Titulo
                        tamanho={20}
                        titulo="Ficou com dúvida? Confira as últimas perguntas que seus colegas fizeram"
                        cor={PRETO_60}
                      />
                      <Spacer size={24} />

                      {listPerguntas.map((pergunta: ListPerguntasProps) => (
                        <CardPergunta key={pergunta.id}>
                          <CardPerguntaIndividual>
                            <QuemPergunta>
                              {pergunta.quemPergunta.nomeTratamento}:
                            </QuemPergunta>
                            <Pergunta>{pergunta.descricao}</Pergunta>
                            <DataPergunta>
                              {dataValidation(pergunta.dataHoraCriacao)}
                            </DataPergunta>
                          </CardPerguntaIndividual>
                          <CardRespostaIndividual>
                            <Resposta>R: {pergunta.resposta}</Resposta>
                            <DataResposta>
                              {dataValidation(pergunta.dataHoraResposta)}
                            </DataResposta>
                          </CardRespostaIndividual>
                        </CardPergunta>
                      ))}

                      <Titulo
                        tamanho={20}
                        titulo="Não encontrou? Fique a vontade para perguntar"
                        cor={PRETO_60}
                      />

                      <ContainerInput>
                        <Col lg={9}>
                          <InputStyled
                            disabled={isDisabled}
                            value={chat}
                            type="text"
                            onKeyUp={(e: any) => {
                              if (e.keyCode === 13) {
                                handleChat();
                              }
                            }}
                            placeholder="Pergunte"
                            onChange={evt => {
                              setChat(evt.target.value);
                            }}
                          />
                        </Col>
                        <ButtonPergunta
                          onClick={() => {
                            if (!user.id_pessoa) {
                              history.push('/cadastro-basico');
                              return;
                            }
                            handleChat();
                          }}
                        >
                          PERGUNTAR
                        </ButtonPergunta>
                      </ContainerInput>
                    </ContainerPerguntas>
                  )}
                </Col>
              </Row>
            </Card>
            <Spacer size={24} />
            {image && (
              <>
                <Titulo tamanho={32} titulo="Consumidor" cor={AZUL} />
                <Spacer size={24} />

                <Card>
                  <Row>
                    <Col lg={2} className="d-flex justify-content-center">
                      <FotoPerfil
                        onClick={() =>
                          history.push(`/contratante/perfil-publico`, {
                            id: dadosConsumidor.id,
                          })
                        }
                        alt="foto"
                        src={image}
                      />
                    </Col>

                    <Col lg={10}>
                      <Info>
                        <NomeTitulo
                          onClick={() => {
                            if (!user.id_pessoa) {
                              history.push('/cadastro-basico');
                              return;
                            }
                            history.push(`/contratante/perfil-publico`, {
                              id: dadosConsumidor.id,
                            });
                          }}
                        >
                          {dadosConsumidor.nome_tratamento}
                        </NomeTitulo>
                        <Avaliacao>
                          <span>{notaMedia?.toFixed(2)}</span>
                          {handleShowStars(notaMedia)}
                        </Avaliacao>
                        <SobreDrescricao>
                          {dadosConsumidor.resumo_profissional}
                        </SobreDrescricao>
                      </Info>
                    </Col>
                  </Row>
                </Card>
              </>
            )}
            <ContentButton>
              <ButtonVoltar onClick={() => history.goBack()}>
                VOLTAR
              </ButtonVoltar>
            </ContentButton>
          </Col>
        </Row>
      </Layout>
    </Content>
  );
}
