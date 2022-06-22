import { Col, Container, Row, Card as NewCard } from 'react-bootstrap';
import { Card } from '../../../../components/Card';
import { Titulo } from '../../../../components/Titulo';
import { Layout } from '../../../AreaConsumidor/Layout';
import { useParams, useHistory } from 'react-router-dom';
import { useLimitacoesPlanos } from '../../../../contexts/planLimitations';
import { AvatarRegrasPlano } from '../../../../components/AvatarRegrasPlano';

import {
  Content,
  LinkReportAnuncio,
  ServicoImagem,
  ContentButton,
  Button,
} from '../style';
import { AZUL, PRETO_10 } from '../../../../styles/variaveis';
import { TooltipDescricao } from '../TooltipDescricao';
import { useCallback, useEffect, useState } from 'react';
import { Spacer } from '../../../../components/Spacer';
import { VitrineServico } from '../../../../components/VitrineServico';

import { ModalDenuncia } from '../../../ModalDenuncia';
import { geral_api } from '../../../../services/geral_api';
import { ModalRecomendacao } from '../../../../components/ModalRecomendacao';
import { ofertas_api } from '../../../../services/ofertas_api';
import {
  TypographyStyled,
  ContentPrimary,
  ContentUser,
  Avatar,
  ContentNota,
  LabelNota,
  ContentSecondary,
  Description,
  AccordionPrimary,
  AccordionSecondary,
  RequisitoContent,
  RequisitoLabel,
} from './styled';

import { pessoas_api } from '../../../../services/pessoas_api';
import { IServicoInfo } from '../../../../interfaces/IServicoInfo';
import { useAuth } from '../../../../contexts/auth';
import { hotjar } from 'react-hotjar';
import { SEO } from '../../../../components/SEO';

import EstrelaOff  from '../../../../assets/estrela-off.svg';
import Estrela from '../../../../assets/estrela.svg';
import { FaCheckCircle } from 'react-icons/fa';
import { Pontuacao } from '../../../AreaFornecedor/Home/MinhaReputacao/Pontuacao';
import { CardComentario } from '../../../../components/CardComentario';
import { NovoPerfil } from '../NovoPerfil';
import { TooltipPacotes } from '../TooltipPacotes';
import { OpcoesPacoteNovo } from '../OpcoesPacoteNovo';
import { Skeleton } from '../../../../components/Skeleton';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';

interface IPessoa {
  id: number;
  id_usuario: number;
  plano?: string;
}

interface PessoaProps {
  img: string;
  notaMedia: string;
  nome: string;
}

interface IServicoConsumidorPublicoParams {
  str_usuario: string;
  str_servico: string;
}

export function ServicoConsumidorPublico() {
  const [vitrineData, setVitrineData] = useState<IServicoInfo[]>([]);
  const [showModalDenuncia, setShowModalDenuncia] = useState(false);
  const [pessoa, setPessoa] = useState<IPessoa>({} as IPessoa);
  const [idUsuario, setIdUsuario] = useState(0);
  const [idServico, setIdServico] = useState(0);
  const [servico, setServico] = useState<IServicoInfo>({} as IServicoInfo);
  // eslint-disable-next-line
  const [link, setLink] = useState('');
  const [linkDenuncia, setLinkDenuncia] = useState<string>('');
  const [showRecomendacaoModal, setShowRecomendacaoModal] = useState(false);
  // eslint-disable-next-line
  const [isFavorite, setIsFavorite] = useState(false);
  // eslint-disable-next-line
  const { limitacoesPlano } = useLimitacoesPlanos();
  const [showAvatar, setShowAvatar] = useState(false);
  // eslint-disable-next-line
  const [favoriteProjects, setFavoriteProjects] = useState([]);
  const { user } = useAuth();
  const [dadosPessoa, setDadosPessoa] = useState<PessoaProps>(
    {} as PessoaProps,
  );
  const [arrowProject, setArrowProject] = useState(false);
  const [arrowCase, setArrowCase] = useState(false);
  const [arrowAvaliation, setArrowAvaliation] = useState(false);
  const [arrowComents, setArrowComents] = useState(false);
  const [arrowPackage, setArrowPackage] = useState(false);
  const [arrowVitrine, setArrowVitrine] = useState(false);
  const [sizePage, setSizePage] = useState(0);

  const history = useHistory();

  const { str_usuario: strUsuario, str_servico: strServico } =
    useParams<IServicoConsumidorPublicoParams>();

  const handleLinkDenuncia = useCallback(() => {
    setLinkDenuncia(window.location.href);
  }, []);

  const getFavoritos = useCallback(async () => {
    if (idUsuario) {
      const response = await pessoas_api.get(`/pessoas/favoritos/${idUsuario}`);
      setFavoriteProjects(response.data.data);
    }
  }, [idUsuario]);

  useEffect(() => {
    getFavoritos();
  }, [getFavoritos]);

  useEffect(() => {
    pessoas_api.get(`/pessoas/${idUsuario}`).then(response => {
      setPessoa(response.data);
    });
  }, [idUsuario]);

  useEffect(() => {
    setIdUsuario(Number(strUsuario.split('-')[0]));
    setIdServico(Number(strServico.split('-')[0]));
  }, [strUsuario, strServico]);

  useEffect(() => {
    if (pessoa.id) {
      geral_api.get(`/servicos?filter=id_pessoa=${pessoa.id}`).then(res => {
        setVitrineData(res.data.data);
      });
    }
  }, [pessoa, idServico]);

  const load = useCallback(async () => {
    if (idServico !== 0) {
      const { data: servicoDatas } = await ofertas_api.get(
        `/servicos/${idServico}`,
      );

      setServico(servicoDatas);
    }
  }, [idServico]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    let load = async () => {
      const {
        data: { data: servicoRequisitos },
      } = await ofertas_api.get(
        '/requisitos-servico?filter=servico=' + servico.id,
      );
      const service = { ...servico, requisitos: servicoRequisitos };
      setServico(service);
    };
    load();
  }, [servico, servico.id]);

  function handleSetShowAvatar() {
    setShowAvatar(!showAvatar);
  }

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/consumidor/servico');
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

  useEffect(() => {
    try {
      pessoas_api.get(`/pessoas/${servico.id_pessoa}`).then(({ data }) => {
        setDadosPessoa({
          img: data.arquivo.url,
          notaMedia: data.ranking.notaMedia,
          nome: data.nome_tratamento,
        });
      });
    } catch (err: any) {
      console.log(err.message);
    }
  }, [servico.id_pessoa]);

  const handleResize = (e: any) => {
    setSizePage(window.innerWidth);
  };

  useEffect(() => {
    setSizePage(window.innerWidth);
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <Content>
      <SEO
        title={`ServiÃ§o ${servico?.nome || ''}`}
        indexPage
        image={servico?.arquivo?.url}
      />
      <AvatarRegrasPlano
        mostrar={showAvatar}
        esconderAvatar={handleSetShowAvatar}
        premium={limitacoesPlano.idPlano === 4}
      />
      <Layout
        titulo=""
        activeMenu={true}
        navbarIsNotVisible={user && user.id === undefined}
      >
        {servico.id ? (
          <Container>
            <Row
              style={{
                flexDirection: sizePage < 768 ? 'column-reverse' : 'row',
              }}
            >
              <Col lg={7}>
                <ModalRecomendacao
                  showModal={showRecomendacaoModal}
                  setShowModal={setShowRecomendacaoModal}
                  link={link}
                />

                <ContentPrimary>
                  <TypographyStyled cor={PRETO_10} tamanho="40px">
                    {servico?.nome}
                  </TypographyStyled>

                  <ServicoImagem src={servico?.arquivo?.url} />
                  <ContentUser>
                    <div>
                      <Avatar src={dadosPessoa.img} />
                      <strong>{dadosPessoa.nome}</strong>

                      <ContentNota>
                        <LabelNota>{dadosPessoa.notaMedia}</LabelNota>
                        {handleShowStars(
                          Number(
                            dadosPessoa.notaMedia ? dadosPessoa.notaMedia : 0,
                          ),
                        )}
                      </ContentNota>
                    </div>
                  </ContentUser>
                </ContentPrimary>

                <Row>
                  <Col lg={12}>
                    <ContentSecondary>
                      <TypographyStyled cor={AZUL} tamanho="20px">
                        Mais informaÃ§Ãµes sobre a oferta
                      </TypographyStyled>
                      <Description>{servico?.descricao}</Description>
                    </ContentSecondary>

                    <AccordionPrimary defaultActiveKey="0" id="headingOne">
                      <NewCard className="card-resposta my-2">
                        <AccordionSecondary id="headingOne" eventKey="0">
                          <span>
                            O que vou precisar enviar para esse projeto?
                          </span>
                          {arrowProject ? (
                            <IoIosArrowDropdown
                              onClick={() => setArrowProject(!arrowProject)}
                              size={20}
                              color={AZUL}
                            />
                          ) : (
                            <IoIosArrowDropup
                              onClick={() => setArrowProject(!arrowProject)}
                              size={20}
                              color={AZUL}
                            />
                          )}
                        </AccordionSecondary>
                        <AccordionPrimary.Collapse eventKey="0">
                          <NewCard.Body className="reposta-cont">
                            {servico?.requisitos.length > 0 ? (
                              <>
                                {servico?.requisitos.map(requisito => (
                                  <RequisitoContent key={requisito.id}>
                                    <FaCheckCircle size={16} color={AZUL} />
                                    <RequisitoLabel>
                                      {requisito.descricao}
                                    </RequisitoLabel>
                                  </RequisitoContent>
                                ))}
                              </>
                            ) : (
                              <Titulo
                                cor={PRETO_10}
                                titulo="Nenhum requisito encontrado para esta oferta"
                                tamanho={14}
                              />
                            )}
                          </NewCard.Body>
                        </AccordionPrimary.Collapse>
                      </NewCard>
                    </AccordionPrimary>

                    <AccordionPrimary defaultActiveKey="0">
                      <NewCard className="card-resposta my-2">
                        <AccordionSecondary eventKey="0">
                          <span>Essa oferta possui algum caso de sucesso?</span>

                          {arrowCase ? (
                            <IoIosArrowDropup
                              onClick={() => setArrowCase(!arrowCase)}
                              size={20}
                              color={AZUL}
                            />
                          ) : (
                            <IoIosArrowDropdown
                              onClick={() => setArrowCase(!arrowCase)}
                              size={20}
                              color={AZUL}
                            />
                          )}
                        </AccordionSecondary>

                        <AccordionPrimary.Collapse eventKey="0">
                          <NewCard.Body className="reposta-cont">
                            {servico?.cases_sucesso.length > 0 ? (
                              <>
                                {servico?.cases_sucesso && (
                                  <TooltipDescricao
                                    open={servico?.cases_sucesso.length > 0}
                                    item={servico?.cases_sucesso}
                                    servicoLink={servico?.url_apresentacao}
                                  />
                                )}
                              </>
                            ) : (
                              <Titulo
                                cor={PRETO_10}
                                titulo="Nenhum caso de sucesso encontrado para esta oferta"
                                tamanho={14}
                              />
                            )}
                          </NewCard.Body>
                        </AccordionPrimary.Collapse>
                      </NewCard>
                    </AccordionPrimary>

                    <AccordionPrimary defaultActiveKey="0">
                      <NewCard className="card-resposta my-2">
                        <AccordionSecondary eventKey="0">
                          <span>AvaliaÃ§Ãµes</span>

                          {arrowAvaliation ? (
                            <IoIosArrowDropup
                              onClick={() =>
                                setArrowAvaliation(!arrowAvaliation)
                              }
                              size={20}
                              color={AZUL}
                            />
                          ) : (
                            <IoIosArrowDropdown
                              onClick={() =>
                                setArrowAvaliation(!arrowAvaliation)
                              }
                              size={20}
                              color={AZUL}
                            />
                          )}
                        </AccordionSecondary>

                        <AccordionPrimary.Collapse eventKey="0">
                          <NewCard.Body className="reposta-cont">
                            <Pontuacao idPessoa={servico?.id_pessoa} />
                          </NewCard.Body>
                        </AccordionPrimary.Collapse>
                      </NewCard>
                    </AccordionPrimary>

                    <AccordionPrimary defaultActiveKey="0">
                      <NewCard className="card-resposta my-2">
                        <AccordionSecondary eventKey="0">
                          <span>ComentÃ¡rios</span>

                          {arrowComents ? (
                            <IoIosArrowDropup
                              onClick={() => setArrowComents(!arrowComents)}
                              size={20}
                              color={AZUL}
                            />
                          ) : (
                            <IoIosArrowDropdown
                              onClick={() => setArrowComents(!arrowComents)}
                              size={20}
                              color={AZUL}
                            />
                          )}
                        </AccordionSecondary>

                        <AccordionPrimary.Collapse eventKey="0">
                          <NewCard.Body className="reposta-cont">
                            <CardComentario id={Number(servico?.id_pessoa)} />
                          </NewCard.Body>
                        </AccordionPrimary.Collapse>
                      </NewCard>
                    </AccordionPrimary>

                    <AccordionPrimary defaultActiveKey="0">
                      <NewCard className="card-resposta my-2">
                        <AccordionSecondary eventKey="0">
                          <span>
                            Quais opÃ§Ãµes de pacote essa oferta oferece?
                          </span>

                          {arrowPackage ? (
                            <IoIosArrowDropup
                              onClick={() => setArrowPackage(!arrowPackage)}
                              size={20}
                              color={AZUL}
                            />
                          ) : (
                            <IoIosArrowDropdown
                              onClick={() => setArrowPackage(!arrowPackage)}
                              size={20}
                              color={AZUL}
                            />
                          )}
                        </AccordionSecondary>

                        <AccordionPrimary.Collapse eventKey="0">
                          <NewCard.Body className="reposta-cont">
                            <OpcoesPacoteNovo
                              pacotes={servico?.pacotes}
                              itens={servico?.itens}
                            />
                          </NewCard.Body>
                        </AccordionPrimary.Collapse>
                      </NewCard>
                    </AccordionPrimary>
                    <Spacer size={16} />

                    <Titulo titulo="Do fornecedor" cor={AZUL} tamanho={24} />
                    <Titulo
                      titulo="Mais produtos que podem ser do seu interesse"
                      tamanho={16}
                      cor={AZUL}
                      negrito={false}
                    />

                    <AccordionPrimary defaultActiveKey="0">
                      <NewCard className="card-resposta my-2">
                        <AccordionSecondary eventKey="0">
                          <span>Vitrine</span>

                          {arrowVitrine ? (
                            <IoIosArrowDropup
                              onClick={() => setArrowVitrine(!arrowVitrine)}
                              size={20}
                              color={AZUL}
                            />
                          ) : (
                            <IoIosArrowDropdown
                              onClick={() => setArrowVitrine(!arrowVitrine)}
                              size={20}
                              color={AZUL}
                            />
                          )}
                        </AccordionSecondary>

                        <AccordionPrimary.Collapse eventKey="0">
                          <NewCard.Body className="reposta-cont">
                            <VitrineServico
                              numberCard={
                                vitrineData.length > 2
                                  ? 2.2
                                  : vitrineData.length
                              }
                              vitrineData={vitrineData}
                            />
                          </NewCard.Body>
                        </AccordionPrimary.Collapse>
                      </NewCard>
                    </AccordionPrimary>

                    <Card>
                      <NovoPerfil
                        publico={user && user.id === undefined}
                        idUsuario={idUsuario}
                        onChange={newPessoa => setPessoa(newPessoa)}
                      />
                    </Card>

                    <Spacer size={20} />

                    <div>
                      {user && user.id !== undefined && (
                        <LinkReportAnuncio
                          href="#"
                          onClick={() => {
                            handleLinkDenuncia();
                            setShowModalDenuncia(true);
                          }}
                        >
                          Tem algo de errado com esse anÃºncio?
                        </LinkReportAnuncio>
                      )}
                      <ModalDenuncia
                        showModal={showModalDenuncia}
                        setShowModal={setShowModalDenuncia}
                        url={linkDenuncia}
                        idPessoaDenunciado={pessoa.id}
                      />
                    </div>
                    <ContentButton>
                      <Button onClick={() => history.goBack()}>VOLTAR</Button>
                    </ContentButton>
                  </Col>
                </Row>
              </Col>

              <Col lg={5}>
                {servico?.pacotes && (
                  <TooltipPacotes
                    open={servico?.pacotes.length > 0}
                    pacote={servico.pacotes}
                    itens={servico?.itens}
                    favoritos={servico?.favoritos}
                    compartilhamentos={servico?.compartilhamentos}
                    projetosIniciados={servico?.projetosIniciados}
                    servicoInfo={servico}
                    loadServico={load}
                  />
                )}
              </Col>
            </Row>
          </Container>
        ) : (
          <Container>
            <Row>
              <Col lg={7}>
                <Skeleton width="100%" height="400px" />
              </Col>
              <Col lg={5}>
                <Skeleton width="100%" height="400px" />
              </Col>
            </Row>
          </Container>
        )}
      </Layout>
    </Content>
  );
}
