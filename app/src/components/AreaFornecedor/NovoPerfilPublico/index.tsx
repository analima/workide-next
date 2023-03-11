import { useCallback, useEffect, useState } from 'react';
import { hotjar } from 'react-hotjar';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Spacer } from '../../../components/Spacer';
import { useAuth } from '../../../contexts/auth';
import { IProvider } from '../../../interfaces/IProvider';
import { pessoas_api } from '../../../services/pessoas_api';
import { Sobre } from './Sobre';
import {
  ButtonVoltar,
  Content,
  ContentButton,
  InfoPerfil,
  LinkReportPerfil,
  Button,
  GhostButton,
} from './style';
import { SEO } from '../../../components/SEO';
import { OutrasInformacoes } from './OutrasInformacoes';
import Layout from '../Layout';
import ModalDenuncia from 'src/components/ModalDenuncia';
import { useRouter } from 'next/router';
import { IS_EMPTY } from 'src/const';

interface IServicoConsumidorPublicoParams {
  strUsuario: string;
}

interface IProps {
  versao: string;
}

export function NovoPerfilPublico({ versao }: IProps) {
  const [showModalDenuncia, setShowModalDenuncia] = useState(false);
  const [urlAtual, setUrlAtual] = useState('');
  const [dataProvider, setDataProvider] = useState<IProvider>({} as IProvider);
  const [idPessoa, setIdPessoa] = useState(0);
  const router = useRouter();
  const history = useHistory();
  const { user } = useAuth();
  const [imageLoaded, setImageLoaded] = useState(true);

  useEffect(() => {
    const id = `${router.query.strUsuario}`.split('-')[0];
    setIdPessoa(Number(id));
  }, [router, user]);

  const getProvider = useCallback(async () => {
    if (idPessoa) {
      pessoas_api
        .get(`/pessoas/${idPessoa}`)
        .then(({ data }) => {
          setDataProvider(data);
          setImageLoaded(false);
        })
        .catch(error => {
          if (error) {
            // router.push('/');
          }
        });
    }
  }, [idPessoa]);

  useEffect(() => {
    if (dataProvider.nome_tratamento) {
      window.history.pushState(
        dataProvider.id,
        'perfil publico',
        `/fornecedor/perfil-publico/${
          dataProvider.id
        }-${dataProvider.nome_tratamento.replaceAll(' ', '-')}`,
      );
    }
  }, [dataProvider]);

  useEffect(() => {
    getProvider();
  }, [getProvider]);

  useEffect(() => {
    let url_atual = window.location.href;
    setUrlAtual(url_atual);
  }, []);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || IS_EMPTY,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/fornecedor/perfil');
  }, []);

  return (
    <Content>
      <SEO
        title={`Perfil do fornecedor ${dataProvider.nome_tratamento}`}
        description={`Perfil público do fornecedor ${dataProvider.nome_tratamento}`}
        indexPage
        image={
          dataProvider.arquivo
            ? dataProvider.arquivo.url
            : 'https://hom.workide.com/gyan.png'
        }
      />
      <Layout versao={versao}>
        {(user ? user.id_pessoa : 0) === idPessoa && (
          <>
            <Row>
              <Col className="d-flex align-items-center" lg={6}>
                <InfoPerfil>
                  Esta página é apenas um preview de como outros estão te vendo
                </InfoPerfil>
              </Col>

              <Col className="d-flex justify-content-end" lg={6}>
                <ContentButton>
                  <Button
                    onClick={() =>
                      history.push('/cadastro-complementar', {
                        cadastroCompleto: true,
                      })
                    }
                  >
                    EDITAR PERFIL
                  </Button>
                  <GhostButton onClick={() => router.back()}>
                    VOLTAR
                  </GhostButton>
                </ContentButton>
              </Col>
            </Row>
            <Spacer size={30} />
          </>
        )}

        <Row>
          <Col lg={12}>
            <Sobre
              dataProps={dataProvider}
              getProvider={getProvider}
              imageLoaded={imageLoaded}
            />
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            <OutrasInformacoes imageLoaded={imageLoaded} data={dataProvider} />
          </Col>
        </Row>

        <Spacer size={40} />

        {user && user.id !== dataProvider.id && (
          <Row>
            <Col lg={12}>
              <LinkReportPerfil onClick={() => setShowModalDenuncia(true)}>
                Tem algo de errado com esse perfil?
              </LinkReportPerfil>

              <ModalDenuncia
                showModal={showModalDenuncia}
                setShowModal={setShowModalDenuncia}
                url={urlAtual}
                idPessoaDenunciado={dataProvider.id}
              />
            </Col>
          </Row>
        )}

        <Row>
          <Col lg={12}>
            <ContentButton>
              <ButtonVoltar onClick={() => router.back()}>VOLTAR</ButtonVoltar>
            </ContentButton>
          </Col>
        </Row>
      </Layout>
    </Content>
  );
}
