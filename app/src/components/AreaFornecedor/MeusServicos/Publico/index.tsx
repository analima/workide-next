import { Col, Container, Row } from 'react-bootstrap';
import { Card } from '../../../../components/Card';
import { Titulo } from '../../../../components/Titulo';
import { useParams, useHistory } from 'react-router-dom';
import { useLimitacoesPlanos } from '../../../../contexts/planLimitations';
import { AvatarRegrasPlano } from '../../../../components/AvatarRegrasPlano';

import {
  LabelValor,
  LinkReportAnuncio,
  ServicoImagem,
  ContentButton,
  Button,
} from './styled';
import Content from './styled';
import { AZUL } from '../../../../styles/variaveis';
import { useCallback, useEffect, useState } from 'react';
import { Spacer } from '../../../../components/Spacer';
import { VitrineServico } from '../../../../components/VitrineServico';

import ModalDenuncia from '../../../ModalDenuncia';
import { geral_api } from '../../../../services/geral_api';
import { formatarValor } from '../../../../utils/CurrencyFormat';
import { ModalRecomendacao } from '../../../../components/ModalRecomendacao';
import { ofertas_api } from '../../../../services/ofertas_api';
import { TypographyDescriptionStyled, TypographyStyled } from './styled';
import { pessoas_api } from '../../../../services/pessoas_api';
import { IPacoteInfo, IServicoInfo } from '../../../../interfaces/IServicoInfo';
import { useAuth } from '../../../../contexts/auth';
import { Helmet } from 'react-helmet';
import { Skeleton } from '../../../../components/Skeleton';
import { hotjar } from 'react-hotjar';
import ListaRequisito from '../../../AreaConsumidor/Servico/ListaRequisito';
import OpcoesPacote from '../../../AreaConsumidor/Servico/OpcoesPacote';
import Perfil from '../../../AreaConsumidor/Servico/Perfil';
import TooltipDescricao from '../../../AreaConsumidor/Servico/TooltipDescricao';
import Layout from '../../Layout';
interface IPessoa {
  id: number;
  id_usuario: number;
  plano?: string;
}

interface IServicoConsumidorPublicoParams {
  str_usuario: string;
  str_servico: string;
}

export default function ServicoFornecedorPublico() {
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
        let datas = res.data.data.filter((d: any) => d.id !== idServico);
        setVitrineData(datas);
      });
    }
  }, [pessoa, idServico]);

  useEffect(() => {
    const load = async () => {
      const { data: servicoDatas } = await ofertas_api.get(
        `/servicos/${idServico}`,
      );
      if (servicoDatas.itens?.length > 0) {
        servicoDatas.itens.sort(function (a: any, b: any) {
          if (a.id > b.id) {
            return 1;
          }
          if (a.id < b.id) {
            return -1;
          }
          return 0;
        });
      }

      setServico(servicoDatas);
    };
    load();
  }, [idServico]);

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

  function handlePrice(value: IPacoteInfo[]) {
    value = value.map(v => {
      return { ...v, preco: Number(v.taxa) + Number(v.preco) };
    });
    const valor = value.map(i => Number(i.preco));
    if (valor.length === 1) {
      return formatarValor(valor[0]);
    }
    const valorMaior = Math.max(...valor);
    const valorMenor = Math.min(...valor);

    return `${formatarValor(valorMenor)} à ${formatarValor(valorMaior)}`;
  }

  const checkSpace = (description: string) => {
    return description.indexOf(' ') >= 0;
  };

  function handleSetShowAvatar() {
    setShowAvatar(!showAvatar);
  }

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/contratante/servico');
  }, []);

  return (
    <Content>
      <Helmet>
        <title>freelas town - Serviço {servico.nome || ''}</title>
      </Helmet>
      <AvatarRegrasPlano
        mostrar={showAvatar}
        esconderAvatar={handleSetShowAvatar}
        premium={limitacoesPlano.idPlano === 4}
      />
      <Layout titulo="">
        {servico.id && (
          <Card>
            <Container>
              <Row>
                <Col lg={12}>
                  <ModalRecomendacao
                    showModal={showRecomendacaoModal}
                    setShowModal={setShowRecomendacaoModal}
                    link={link}
                  />
                </Col>
              </Row>
              <Row key={servico.id} className="mb-4">
                <Col
                  lg={2}
                  className="d-flex justify-content-center p-2 container-image"
                >
                  <ServicoImagem src={servico.arquivo?.url} />
                </Col>
                <Col lg={9}>
                  <Row>
                    <Col lg={12} className="mb-3">
                      <TypographyStyled>{servico.nome}</TypographyStyled>
                    </Col>
                    <Col lg={12}>
                      <TypographyDescriptionStyled
                        isSpace={checkSpace(servico.descricao)}
                      >
                        {servico.descricao}
                      </TypographyDescriptionStyled>
                      {servico.pacotes ? (
                        <LabelValor>{handlePrice(servico.pacotes)}</LabelValor>
                      ) : (
                        <Skeleton width="90px" height="30px" />
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
              {servico.cases_sucesso.length > 0 && (
                <Row>
                  <Col lg={12}>
                    <Titulo
                      tamanho={32}
                      titulo="Cases de Sucesso"
                      negrito={false}
                      cor={AZUL}
                    />
                  </Col>
                  <Col lg={12}>
                    <div>
                      {servico.cases_sucesso && (
                        <TooltipDescricao
                          open={servico.cases_sucesso.length > 0}
                          item={servico.cases_sucesso}
                          servicoLink={servico.url_apresentacao}
                        />
                      )}
                    </div>
                  </Col>
                </Row>
              )}

              <Spacer size={62} />

              {servico.requisitos && servico.requisitos.length > 0 && (
                <Row>
                  <ListaRequisito
                    requisitos={servico.requisitos ? servico.requisitos : []}
                  />
                </Row>
              )}

              <Spacer size={62} />

              <Row>
                <OpcoesPacote
                  pacotes={servico.pacotes}
                  itens={servico.itens}
                  servicoInfo={servico}
                />
              </Row>
            </Container>
          </Card>
        )}

        <Spacer size={62} />

        <Titulo titulo="Do fornecedor" cor={AZUL} />

        <Spacer size={24} />

        <Titulo
          titulo="Mais produtos que podem ser do seu interesse"
          tamanho={20}
        />

        <Spacer size={24} />

        <Card>
          <Container>
            <Row>
              <Col lg={12}>
                <Titulo titulo="Vitrine" />
                <Spacer size={32} />
              </Col>
              <Col lg={12}>
                <VitrineServico vitrineData={vitrineData} />
              </Col>
            </Row>
          </Container>
        </Card>

        <Spacer size={36} />

        <Card>
          <Container>
            <Row>
              <Col lg={12}>
                <Perfil
                  publico={user && user.id === undefined}
                  idUsuario={idUsuario}
                  onChange={newPessoa => setPessoa(newPessoa)}
                />
              </Col>
            </Row>
          </Container>
        </Card>

        <Spacer size={32} />

        <div>
          {user && user.id !== undefined && (
            <LinkReportAnuncio
              href="#"
              onClick={() => {
                handleLinkDenuncia();
                setShowModalDenuncia(true);
              }}
            >
              Tem algo de errado com esse anúncio?
            </LinkReportAnuncio>
          )}
          <ModalDenuncia
            showModal={showModalDenuncia}
            setShowModal={setShowModalDenuncia}
            url={linkDenuncia}
            idPessoaDenunciado={pessoa.id}
          />
        </div>
        <Spacer size={32} />

        <ContentButton>
          <Button onClick={() => history.goBack()}>VOLTAR</Button>
        </ContentButton>
      </Layout>
    </Content>
  );
}
