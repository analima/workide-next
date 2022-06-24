import { useCallback, useEffect, useState } from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import { ofertas_api } from '../../../services/ofertas_api';
import { useAuth } from '../../../contexts/auth';
import { Spacer } from '../../../components/Spacer';
import Layout from '../Layout';
import { Card } from '../../../components/Card';
import { Titulo } from '../../../components/Titulo';
import { AZUL, CINZA_10, LARANJA, PRETO_60 } from '../../../styles/variaveis';
import { AiFillDownCircle, AiOutlineDownCircle } from 'react-icons/ai';
import ModalAdicionar from './ModalAdicionar';
import ModalExcluir from './ModalExcluir';
import { formatDate } from '../../../helpers/DateHelper';
import { AvatarCadastroIncompleto } from '../../../components/AvatarCadastroIncompleto';
import { useLimitacoesPlanos } from '../../../contexts/planLimitations';

import {
  Button,
  LabelCheck,
  Organizar,
  Servico,
  ServicoTitulo,
  ServicoDescricao,
  ServicoImagem,
  ServicoAcao,
  ServicoOpcao,
  Opcao,
  Registro,
  RegistroQuantidade,
  Paginacao,
  ContainerInput,
} from './style';
import Content from './style';
import { IoMdHelpCircle } from 'react-icons/io';
import { Antonio } from '../../../components/Antonio';
import { SearchInput } from '../../../components/SearchInput';
import { getUserData } from '../../../utils/getUserData';
import { UserData } from '../../../interfaces/userInterface';
import { AvatarModeracao } from '../../../components/AvatarModeracao';
import { ModalRecomendacao } from '../../../components/ModalRecomendacao';
import { InformacoesFinanceirasProvider } from '../../../hooks/informacoesFinanceiras';
import { GhostButton } from '../../../components/GhostButton';
import { AvatarRegrasPlano } from '../../../components/AvatarRegrasPlano';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';

interface IServico {
  id: number;
  nome: string;
  descricao: string;
  data_hora_criacao: string;
  arquivo: IArquivo;
  pacotes: IPacote[];
  cases_sucesso: object[];
  servicos_extra: object[];
  isServicoExtra: boolean;
  requisitos: IRequisito[];
}

interface IRequisito {
  data_hora_criacao: string;
  data_hora_ultima_alteracao: string;
  descricao: string;
  id: number;
  usuario_ultima_alteracao: string;
}

interface IArquivo {
  url: string;
}

interface IPacote {
  tipo: string;
}

export default function MeusServicos() {
  const { user } = useAuth();
  const history = useHistory();

  const [pesquisa, setPesquisa] = useState('');
  const [ordenacao, setOrdenacao] = useState('nome');
  const [pagina, setPagina] = useState(1);
  const [paginas, setPaginas] = useState(0);
  // eslint-disable-next-line
  const [total, setTotal] = useState(0);
  const [showAdicionarModal, setShowAdicionarModal] = useState(false);
  const [showExcluirModal, setShowExcluirModal] = useState(false);
  const [servicos, setServicos] = useState<IServico[]>([]);
  const [dica, setDica] = useState(false);
  const [showAvatarCadastroIncompleto, setShowAvatarCadastroIncompleto] =
    useState(false);
  const [showAvatarModeracao, setShowAvatarModeracao] = useState(false);
  const [porcentagem, setPorcentagem] = useState(20);
  const [perfilModerado, setPerfilModerado] = useState<null | boolean>(null);
  const [showModalRecomendacao, setShowModalRecomendacao] = useState(false);
  const [link, setLink] = useState('');
  const [showAvatarRegrasPlano, setShowAvatarRegrasPlano] = useState(false);
  const { limitacoesPlano, buscarLimitacoes } = useLimitacoesPlanos();
  const [totalServicos, setTotalServicos] = useState(0);
  function handleShowAvatarRegrasPlano() {
    setShowAvatarRegrasPlano(!showAvatarRegrasPlano);
  }

  const mensagem = `
    Adicione e gerencie suas ofertas.*
    Na Gyan o projeto é realmente seu: te damos a liberdade para deixá-lo a sua cara. Em cada oferta, você pode oferecer um ou três pacotes  totalmente configuráveis.  Por exemplo: Em cada pacote, você pode configurar plano de pagamento com diferentes preços e que contemplem diferentes entregas do projeto criado por você.*
    Ainda ficou com dúvida? Vamos juntos, tenho certeza que você vai curtir. Te vejo na próxima tela.
    `;

  function handleShowAvatarCadastroIncompleto() {
    setShowAvatarCadastroIncompleto(!showAvatarCadastroIncompleto);
  }
  function handleShowAvatarModeracao() {
    setShowAvatarModeracao(!showAvatarModeracao);
  }

  async function handleGetUserPercentage() {
    try {
      const responsePessoa: UserData = await getUserData(user.id_usuario);
      setPorcentagem(responsePessoa.percentageRegisterProvider);
      setPerfilModerado(responsePessoa.moderacao);
    } catch (error: any) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    handleGetUserPercentage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/fornecedor/meus-servicos');
  }, []);

  const loadServicos = useCallback(
    async (newPage?: number | undefined) => {
      const response = await ofertas_api.get(
        `/servicos?size=2&page=${newPage ? newPage : pagina}&filter=id_pessoa=${
          user.id_pessoa
        },nome=${pesquisa},order_by=${ordenacao}`,
      );
      setServicos(response.data.data);
      setTotalServicos(response.data.pagination.total);

      setPaginas(response.data.pagination.pages);
      setTotal(response.data.pagination.total);
    },
    [user.id_pessoa, pesquisa, ordenacao, pagina],
  );

  useEffect(() => {
    loadServicos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordenacao, pesquisa]);

  const handleAlteraOrdernacao = (valor: string) => {
    setOrdenacao(valor);
  };

  const handleProximaPagina = () => {
    loadServicos(pagina + 1);
    setPagina(pagina + 1);
  };

  const handlePaginaAnterior = () => {
    setPagina(pagina - 1);
    loadServicos(pagina - 1);
  };

  const handleEditarServico = (id_servico: number) => {
    history.push('editar-servico', {
      id_servico,
    });
  };

  const handleNovoServico = () => {
    if (porcentagem < 80) {
      setShowAvatarCadastroIncompleto(true);
    } else if (!perfilModerado) {
      setShowAvatarModeracao(true);
    } else if (totalServicos >= limitacoesPlano.servicosPacotesECases) {
      handleShowAvatarRegrasPlano();
    } else {
      history.push('novo-servico');
    }
  };

  const handleCompartilharServico = useCallback(
    (id_servico: any) => {
      ofertas_api
        .get<string>('/servicos/indicacao', {
          params: {
            idUsuario: user.id_usuario,
            idServico: id_servico,
          },
        })
        .then(response => {
          setLink(response.data);
          setShowModalRecomendacao(true);
        });
    },
    [user.id_usuario],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    buscarLimitacoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InformacoesFinanceirasProvider>
      <Helmet>
        <title>Gyan - Veja os seus serviços</title>
      </Helmet>
      <Content>
        <AvatarRegrasPlano
          mostrar={showAvatarRegrasPlano}
          esconderAvatar={handleShowAvatarRegrasPlano}
          premium={limitacoesPlano.idPlano === 4}
        />
        <ModalRecomendacao
          showModal={showModalRecomendacao}
          setShowModal={setShowModalRecomendacao}
          link={link}
        />
        <AvatarCadastroIncompleto
          mostrar={showAvatarCadastroIncompleto}
          esconderAvatar={handleShowAvatarCadastroIncompleto}
          porcentagem={porcentagem}
          isConsumer={false}
        />
        <AvatarModeracao
          mostrar={showAvatarModeracao}
          esconderAvatar={handleShowAvatarModeracao}
        />
        <Layout titulo="Minhas Ofertas">
          <Titulo
            titulo="Crie ofertas do seu trabalho e publique na plataforma para que os clientes te encontrem."
            cor={PRETO_60}
            tamanho={18}
          />
          <Col lg={10} className="d-flex justify-content-end">
            <IoMdHelpCircle
              color={AZUL}
              size={24}
              onClick={() => setDica(true)}
            />
          </Col>
          <Row>
            <Col lg={12}>
              <ModalAdicionar
                showModal={showAdicionarModal}
                setShowModal={setShowAdicionarModal}
                loadData={loadServicos}
              />
              <Button onClick={() => handleNovoServico()}>
                <FaRegCalendarAlt />
                ADICIONAR NOVA OFERTA
              </Button>
            </Col>
          </Row>

          <Spacer size={48} />

          <Row className="align-items-end">
            <Col lg={7}>
              <ContainerInput>
                <SearchInput
                  onChange={value => setPesquisa(value)}
                  placeholder="Pesquisar por palavra-chave"
                  variation="no-button"
                />
              </ContainerInput>
            </Col>

            <Col lg={3}>
              <Organizar>
                <label>Organizar por:</label>
                <div className="d-flex">
                  <LabelCheck checked={ordenacao === 'nome'}>
                    <label htmlFor="nome">Nome</label>
                    <input
                      type="checkbox"
                      name="organizar"
                      id="nome"
                      checked={ordenacao === 'nome'}
                      onChange={() => {
                        handleAlteraOrdernacao('nome');
                      }}
                    />
                  </LabelCheck>

                  <LabelCheck checked={ordenacao === 'data_hora_criacao'}>
                    <label htmlFor="data_criacao">Data de criação</label>
                    <input
                      type="checkbox"
                      name="organizar"
                      id="data_criacao"
                      checked={ordenacao === 'data_hora_criacao'}
                      onChange={() =>
                        handleAlteraOrdernacao('data_hora_criacao')
                      }
                    />
                  </LabelCheck>
                </div>
              </Organizar>
            </Col>
          </Row>

          <Spacer size={32} />

          {servicos &&
            servicos.map(servico => (
              <Servico key={servico.id}>
                <Row>
                  <Col lg={12}>
                    <Card>
                      <ServicoAcao>
                        <Dropdown>
                          <Dropdown.Toggle
                            key="toggle"
                            variant="none"
                            id="dropdown-basic"
                          >
                            <AiOutlineDownCircle size={24} color={AZUL} />
                          </Dropdown.Toggle>

                          <Dropdown.Menu key="menu">
                            <Dropdown.Item
                              key="editar"
                              onClick={() => handleEditarServico(servico.id)}
                            >
                              Editar
                            </Dropdown.Item>
                            <Dropdown.Item
                              key="compartilhar"
                              onClick={() =>
                                handleCompartilharServico(servico.id)
                              }
                            >
                              Compartilhar
                            </Dropdown.Item>
                            <Dropdown.Item
                              key="excluir"
                              onClick={() =>
                                setShowExcluirModal(!showExcluirModal)
                              }
                              href="#"
                            >
                              <ModalExcluir
                                idServico={servico.id}
                                loadData={loadServicos}
                                showModal={showExcluirModal}
                                setShowModal={setShowExcluirModal}
                              />
                              Excluir
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </ServicoAcao>

                      <Row className="align-items-center">
                        <Col lg={2}>
                          <ServicoImagem url={servico.arquivo?.url} />
                        </Col>
                        <Col lg={10}>
                          <ServicoTitulo
                            onClick={() => {
                              handleEditarServico(servico.id);
                            }}
                          >
                            <Titulo
                              titulo={servico.nome}
                              tamanho={24}
                              cor={LARANJA}
                            />
                            <label>
                              Criado em {formatDate(servico.data_hora_criacao)}
                            </label>
                          </ServicoTitulo>
                          <ServicoDescricao>
                            <p>{servico.descricao}</p>
                          </ServicoDescricao>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg={12}>
                          <ServicoOpcao>
                            <Opcao>
                              <AiFillDownCircle
                                color={
                                  servico.pacotes
                                    .map(pacote => pacote.tipo === 'BASICO')
                                    .includes(true)
                                    ? AZUL
                                    : CINZA_10
                                }
                                size={20}
                              />
                              <span>Opções de pacotes</span>
                            </Opcao>
                            <Opcao>
                              <AiFillDownCircle
                                color={
                                  servico.requisitos.length > 0
                                    ? AZUL
                                    : CINZA_10
                                }
                                size={20}
                              />
                              <span>Requisitos</span>
                            </Opcao>
                            <Opcao>
                              <AiFillDownCircle
                                color={
                                  servico.cases_sucesso.length > 0
                                    ? AZUL
                                    : CINZA_10
                                }
                                size={20}
                              />
                              <span>Case de sucesso</span>
                            </Opcao>
                          </ServicoOpcao>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>

                <Spacer size={32} />
              </Servico>
            ))}

          <Spacer size={32} />

          <Registro>
            <RegistroQuantidade>
              Exibindo {paginas === 0 ? 0 : pagina} de {paginas} páginas
            </RegistroQuantidade>

            <Paginacao>
              <button disabled={pagina === 1} onClick={handlePaginaAnterior}>
                <FiChevronLeft color={pagina === 1 ? CINZA_10 : AZUL} />
              </button>
              <button
                disabled={pagina === paginas}
                onClick={handleProximaPagina}
              >
                <FiChevronRight color={pagina === paginas ? CINZA_10 : AZUL} />
              </button>
            </Paginacao>
          </Registro>
          <div>
            <GhostButton
              className="voltar-botao"
              onClick={() => history.goBack()}
            >
              VOLTAR
            </GhostButton>
          </div>
        </Layout>
        <Antonio mensagem={mensagem} dica={dica} setDica={setDica} />
      </Content>
    </InformacoesFinanceirasProvider>
  );
}
