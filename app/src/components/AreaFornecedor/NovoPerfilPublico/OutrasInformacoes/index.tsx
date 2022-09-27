import { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Spacer } from '../../../../components/Spacer';
import { Titulo } from '../../../../components/Titulo';
import {
  ICursoPessoa,
  IPosGraduacao,
  IProvider,
} from '../../../../interfaces/IProvider';
import { AZUL, PRETO_10 } from '../../../../styles/variaveis';
import { IGraduacao } from '../../../../interfaces/IProvider';
import {
  Content,
  InfoSection,
  Container,
  Wrapper,
  Carrousel,
  Frame,
  ArrowSlider,
  CardCertificado,
} from './style';
import { Card } from '../../../../components/Card';
import { useAuth } from '../../../../contexts/auth';
import { nivel_experiencia } from '../../../../utils/nivelExperiencia';
import { Label } from '../../../../components/Label';
import { HabilidadesPercebidas } from '../HabilidadesPercebidas';
import { CardAvaliacao } from '../../../../components/CardAvaliacao';
import { IServicoInfo } from '../../../../interfaces/IServicoInfo';
import { ofertas_api } from '../../../../services/ofertas_api';
import { VitrineServico } from '../../../../components/VitrineServico';
import { Skeleton } from '../../../../components/Skeleton';
import { CardRecomendation } from '../../../../components/CardRecomendacao';
import { SemConteudo } from '../../../../components/SemConteudo';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { Certificado } from '../../../../interfaces/IProject';
import { useHistory } from 'react-router';
import {
  FaBehance,
  FaDribbble,
  FaFigma,
  FaGithub,
  FaPinterest,
  FaYoutube,
} from 'react-icons/fa';
import { pessoas_api } from '../../../../services/pessoas_api';
import { AiOutlineGlobal } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  data: IProvider;
  imageLoaded: boolean;
}

interface IRedeSocialProps {
  id: number;
  tipo: string;
  url: string;
}

export function OutrasInformacoes({ data, imageLoaded }: Props) {
  const { user } = useAuth();
  const history = useHistory();
  const [verMaisSubareas, setVerMaisSubareas] = useState(false);
  const [verMaisCapacitacao, setVerMaisCapacitacao] = useState(false);
  const [vitrineData, setVitrineData] = useState([] as IServicoInfo[]);
  const [urlVideo, setUrlVideo] = useState('');
  const [sizePage, setSizePage] = useState(1.8);
  const [certificados, setCertificados] = useState<Certificado[]>([]);
  const [redesSociais, setRedesSociais] = useState<IRedeSocialProps[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const redes = [
    'instagram',
    'facebook',
    'twitter',
    'linkedin-empresa',
    'linkedin-pessoal',
  ];

  const loadRedesSociais = useCallback(async () => {
    const response = await pessoas_api.get(`/pessoas/${data.id}/redes-sociais`);
    setRedesSociais(response.data);
  }, [data.id]);

  useEffect(() => {
    loadRedesSociais();
  }, [loadRedesSociais]);

  useEffect(() => {
    if (data.url_video_apresentacao) {
      var urlAtual = data.url_video_apresentacao.split(
        /(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/,
      );
      const rlAtual =
        urlAtual[2] !== undefined
          ? urlAtual[2].split(/[^0-9a-z_-]/i)[0]
          : urlAtual[0];

      setUrlVideo(`https://www.youtube.com/embed/${rlAtual}`);
    }
  }, [data.url_video_apresentacao]);

  useEffect(() => {
    async function handleData() {
      const response = await ofertas_api.get(
        `/servicos?filter=id_pessoa=${data.id}`,
      );
      setVitrineData(response.data.data);
    }
    async function buscarCertificados() {
      try {
        const response = await oportunidades_api.get(
          `/certificados?id_pessoa=${user.id_pessoa}`,
        );
        setCertificados(response.data);
      } catch (error: any) {
        console.error(error);
      }
    }
    handleData();
    buscarCertificados();
  }, [data.id, user.id_pessoa]);

  function settingSlider(data: any[]) {
    return {
      speed: 500,
      dots: true,
      autoplay: true,
      autoplaySpeed: 2000,
      slidesToShow: data?.length > 3 ? 3 : data?.length,
      className: 'container-slider',
      initialSlide: 1,
      slidesToScroll: 1,
      nextArrow: <ArrowSlider />,
      prevArrow: <ArrowSlider />,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: data?.length > 3 ? 3.5 : data?.length,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 580,
          settings: {
            slidesToShow: data?.length > 3 ? 2.2 : data?.length,

            slidesToScroll: 2,
          },
        },
      ],
    };
  }

  const handleResize = () => {
    if (window.innerWidth > 1200) {
      setSizePage(1.6);
    } else if (window.innerWidth < 1200) {
      setSizePage(1.5);
    } else if (window.innerWidth < 991) {
      setSizePage(1.5);
    } else if (window.innerWidth < 768) {
      setSizePage(1);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  function handleRedes(item: IRedeSocialProps) {
    switch (item.tipo) {
      case 'github':
        return (
          <a href={item.url} title={item.tipo} target="_blank" rel="noreferrer">
            <FaGithub size={28} color="#000" />
          </a>
        );
      case 'pinterest':
        return (
          <a href={item.url} title={item.tipo} target="_blank" rel="noreferrer">
            <FaPinterest size={28} color="#000" />
          </a>
        );
      case 'instagram':
        return;

      case 'linkedin-pessoal':
        return;

      case 'linkedin-empresa':
        return;

      case 'facebook':
        return;

      case 'behance':
        return (
          <a href={item.url} title={item.tipo} target="_blank" rel="noreferrer">
            <FaBehance size={28} color="#000" />
          </a>
        );

      case 'figma':
        return (
          <a href={item.url} title={item.tipo} target="_blank" rel="noreferrer">
            <FaFigma size={28} color="#000" />
          </a>
        );

      case 'dribbble':
        return (
          <a href={item.url} title={item.tipo} target="_blank" rel="noreferrer">
            <FaDribbble size={28} color="#000" />
          </a>
        );

      case 'youtube':
        return (
          <a href={item.url} title={item.tipo} target="_blank" rel="noreferrer">
            <FaYoutube size={28} color="#000" />
          </a>
        );

      case 'twitter':
        return;
      default:
        return (
          <a href={item.url} title={item.tipo} target="_blank" rel="noreferrer">
            <AiOutlineGlobal size={28} color="#000" />
          </a>
        );
    }
  }

  return (
    <Content>
      <Container>
        {!imageLoaded ? (
          <Row>
            <Col lg={5} className="mb-4">
              <Card isShadow={false}>
                <Wrapper>
                  <Titulo
                    titulo="Apresentação"
                    cor={AZUL}
                    negrito
                    tamanho={16}
                  />
                  <span>
                    {data?.endereco?.municipio?.nome},{' '}
                    {data?.endereco?.municipio?.uf} - Brasil
                  </span>
                  <span>{data.resumo_profissional}</span>
                </Wrapper>
              </Card>

              <Spacer size={16} />

              <Card id="professional" isShadow={false}>
                <Wrapper>
                  <Titulo
                    titulo="Profissional"
                    cor={AZUL}
                    negrito
                    tamanho={16}
                  />
                  <span>
                    Estou cadastrado como{' '}
                    {data.tipo === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                  </span>
                  <span>
                    Me considero um profissional{' '}
                    <span className="nivel-experiencia">
                      {nivel_experiencia[data.nivel_experiencia] as string}
                    </span>
                  </span>

                  <span>
                    Atuo como{' '}
                    {data?.categoriaEspecialidades
                      ?.map(c => c.descricao)
                      ?.join(', ')}
                  </span>

                  <span>
                    {data?.profissoes?.length !== 0 &&
                    data?.profissoes?.length === 1
                      ? 'Minha profissão é '
                      : 'Minhas profissões são '}
                    {data?.profissoes &&
                      data?.profissoes.map(p => p.descricao).join(', ')}
                  </span>
                  {data?.idiomas.length > 0 && (
                    <span className="esconderMobile">
                      idiomas:{' '}
                      {data?.idiomas?.map(
                        language => `${language.idioma.descricao} -
                  ${language.nivel}. `,
                      )}
                    </span>
                  )}
                </Wrapper>
              </Card>

              <Spacer size={16} />

              <Card id="portfolio" isShadow={false}>
                <Wrapper>
                  <Titulo
                    titulo="Portfólio Externo"
                    cor={AZUL}
                    negrito
                    tamanho={16}
                  />
                  <div className="redes">
                    {redesSociais
                      .filter((i: IRedeSocialProps) => !redes.includes(i.tipo))
                      .map(item => handleRedes(item))}
                  </div>
                </Wrapper>
              </Card>

              <Spacer size={16} />
              <Card id="interest" isShadow={false}>
                <Wrapper>
                  <Titulo
                    titulo="Áreas de interesse"
                    cor={AZUL}
                    negrito
                    tamanho={16}
                  />

                  {data.subareasInteresse && (
                    <div className="label-content">
                      {data.subareasInteresse
                        .slice(
                          0,
                          verMaisSubareas ? data.subareasInteresse.length : 10,
                        )
                        ?.map(area => (
                          <Label
                            cor={PRETO_10}
                            negrito
                            label={area.descricao}
                            key={area.id}
                          />
                        ))}
                    </div>
                  )}

                  <span
                    className="ver-subarea"
                    onClick={() => setVerMaisSubareas(!verMaisSubareas)}
                  >
                    {verMaisSubareas ? 'Ver menos' : 'Ver mais'}
                  </span>
                </Wrapper>
              </Card>

              <Spacer size={16} />
              <Card id="training" isShadow={false}>
                <Wrapper>
                  <Titulo
                    titulo="Capacitação"
                    cor={AZUL}
                    negrito
                    tamanho={16}
                  />

                  <InfoSection>
                    {data?.cursos
                      ?.slice(0, verMaisCapacitacao ? data?.cursos.length : 1)
                      ?.map((curso: ICursoPessoa, index: number) => (
                        <div key={index} className="info-curso">
                          <strong>Curso</strong>
                          <span>{curso.descricao}</span>
                        </div>
                      ))}

                    {data?.graduacoes && (
                      <>
                        {data?.graduacoes
                          ?.slice(
                            0,
                            verMaisCapacitacao ? data?.graduacoes.length : 1,
                          )
                          ?.map((graduacao: IGraduacao, index: number) => (
                            <div key={index} className="info-curso">
                              <strong>Graduação</strong>
                              <span>{graduacao.descricao}</span>
                            </div>
                          ))}
                      </>
                    )}

                    {data?.posGraduacoes
                      ?.slice(
                        0,
                        verMaisCapacitacao ? data?.posGraduacoes.length : 1,
                      )

                      .map((pos: IPosGraduacao, index: number) => (
                        <div key={index} className="info-curso">
                          <strong>Pós-Graduação</strong>
                          <span>{pos.descricao}</span>
                        </div>
                      ))}
                  </InfoSection>

                  <span
                    className="ver-subarea"
                    onClick={() => setVerMaisCapacitacao(!verMaisCapacitacao)}
                  >
                    {verMaisCapacitacao ? 'Ver menos' : 'Ver mais'}
                  </span>
                </Wrapper>
              </Card>

              <Spacer size={16} />
              <Card id="causes" isShadow={false}>
                <Wrapper>
                  <Titulo
                    titulo="Causas sociais"
                    cor={AZUL}
                    negrito
                    tamanho={16}
                  />

                  <Carrousel {...settingSlider(data.causasSociais)}>
                    {data.causasSociais
                      ?.sort(function (a: any, b: any) {
                        if (a.id < b.id) {
                          return 1;
                        }
                        if (a.id > b.id) {
                          return -1;
                        }
                        return 0;
                      })
                      ?.map(item => (
                        <li key={item.id}>
                          <Image
                            width={120}
                            height={120}
                            src={item.url}
                            alt={item.descricao}
                          />
                        </li>
                      ))}
                  </Carrousel>
                </Wrapper>
              </Card>

              <Spacer size={16} />
              <Card id="certified" isShadow={false}>
                <Wrapper>
                  <Titulo
                    titulo="Certificados em causas sociais"
                    cor={AZUL}
                    negrito
                    tamanho={16}
                  />

                  <Carrousel {...settingSlider(certificados)}>
                    {certificados?.map(certificado => (
                      <CardCertificado key={certificado.id}>
                        <p
                          onClick={() =>
                            history.push('/projetos/imprimir-certificado', {
                              ...certificado,
                            })
                          }
                        >
                          {certificado.instituicao.nome}
                        </p>
                      </CardCertificado>
                    ))}
                  </Carrousel>
                </Wrapper>
              </Card>
            </Col>

            <Col lg={7}>
              <Card isShadow={false}>
                <Wrapper>
                  <Titulo titulo="Vídeo" cor={AZUL} negrito tamanho={16} />

                  {data?.url_video_apresentacao ? (
                    <Frame
                      frameBorder="0"
                      allowFullScreen
                      src={urlVideo}
                      title={data?.nome_tratamento}
                    />
                  ) : (
                    <SemConteudo
                      mensagem={`${
                        !user || data.id !== user.id_pessoa
                          ? data?.nome_tratamento
                          : 'Você'
                      } ainda não possui vídeo de apresentação.`}
                    />
                  )}
                </Wrapper>
              </Card>
              <Spacer size={20} />

              <Card isShadow={false}>
                <Wrapper>
                  <Titulo
                    titulo="Minhas Habilidades"
                    cor={AZUL}
                    negrito
                    tamanho={16}
                  />

                  <HabilidadesPercebidas idPessoa={data.id} />
                </Wrapper>
              </Card>

              <Spacer size={20} />
              <Card isShadow={false}>
                <Wrapper>
                  <Titulo titulo="Vitrine" cor={AZUL} negrito tamanho={16} />
                  <VitrineServico
                    numberCard={sizePage}
                    vitrineData={vitrineData}
                  />
                </Wrapper>
              </Card>
              <Spacer size={20} />

              <Card isShadow={false}>
                <Wrapper>
                  <Titulo
                    titulo="Recomendações"
                    cor={AZUL}
                    negrito
                    tamanho={16}
                  />
                  <CardRecomendation id={data.id} />
                </Wrapper>
              </Card>

              <Spacer size={20} />

              <Card isShadow={false}>
                <Wrapper>
                  <Titulo titulo="Avaliações" cor={AZUL} negrito tamanho={16} />
                  <CardAvaliacao id={data.id} />
                </Wrapper>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col lg={5}>
              <Skeleton width="100%" height="400px" />
            </Col>
            <Col lg={7}>
              <Skeleton width="100%" height="400px" />
            </Col>
          </Row>
        )}
      </Container>
    </Content>
  );
}
