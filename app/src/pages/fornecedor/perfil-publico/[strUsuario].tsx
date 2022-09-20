import { useCallback, useEffect, useState } from 'react';
import { hotjar } from 'react-hotjar';
import { Col, Row } from 'react-bootstrap';
import { Spacer } from '../../../components/Spacer';
import { useAuth } from '../../../contexts/auth';
import { IProvider } from '../../../interfaces/IProvider';
import { pessoas_api } from '../../../services/pessoas_api';
import ModalDenuncia from '../../../components/ModalDenuncia';
import Layout from '../../../components/AreaFornecedor/Layout';
import { useRouter } from 'next/router';
import { Sobre } from '../../../components/AreaFornecedor/NovoPerfilPublico/Sobre';
import {
  ButtonVoltar,
  ContentButton,
  InfoPerfil,
  LinkReportPerfil,
  Button,
  GhostButton,
} from '../../../components/AreaFornecedor/NovoPerfilPublico/style';
import Content from '../../../components/AreaFornecedor/NovoPerfilPublico/style';
import { SEO } from '../../../components/SEO';
import OutrasInformacoes from '../../../components/AreaFornecedor/NovoPerfilPublico/OutrasInformacoes';
import assert from 'assert';
import { IPessoa } from 'src/interfaces/IPessoa';

interface IServicoConsumidorPublicoParams {
  strUsuario: string;
}

export default function NovoPerfilPublico() {
  const router = useRouter();
  const [showModalDenuncia, setShowModalDenuncia] = useState(false);
  const [urlAtual, setUrlAtual] = useState('');
  const [dataProvider, setDataProvider] = useState<IProvider>({} as IProvider);
  const [idPessoa, setIdPessoa] = useState(0);
  let query = router.query.strUsuario as unknown;
  const params = query as IServicoConsumidorPublicoParams;
  let { user } = useAuth();
  if (!user) {
    user = {} as IPessoa;
    user.id_pessoa = 0;
    console.log('olar');
  }
  if (!user.id_pessoa) {
    user.id_pessoa = 0;
  }
  if (user) {
    console.log('olaaar');
  }
  const [imageLoaded, setImageLoaded] = useState(true);
  useEffect(() => {
    if (params) {
      setIdPessoa(Number(params));
    } else if (user && user.id_pessoa) {
      setIdPessoa(user.id_pessoa ? user.id_pessoa : 0);
    }
  }, [params, user, router]);

  const getProvider = useCallback(async () => {
    if (idPessoa) {
      pessoas_api
        .get(`/pessoas/${idPessoa}`)
        .then(({ data }: { data: IProvider }) => {
          setDataProvider(data);
          setImageLoaded(false);
        })
        .catch(error => {
          if (error) {
            console.log('error do catch: ', error);
            debugger;
          }
        });
    }
  }, [idPessoa]);

  useEffect(() => {
    getProvider();
  }, [getProvider]);

  useEffect(() => {
    let url_atual = window.location.href;
    setUrlAtual(url_atual);
  }, []);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
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
            : 'https://hom.gyan.com.br/gyan.png'
        }
      />
      <Layout>
        {(user ? user.id_pessoa : 0) === idPessoa && (
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
                    router.push({
                      pathname: '/cadastro-complementar',
                      query: { cadastroCompleto: true },
                    })
                  }
                >
                  EDITAR PERFIL
                </Button>
                <GhostButton onClick={() => router.back()}>VOLTAR</GhostButton>
              </ContentButton>
            </Col>
          </Row>
        )}

        <Spacer size={30} />

        <Row>
          <Col lg={12}>
            <Sobre dataProps={dataProvider} imageLoaded={imageLoaded} />
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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps() {
  return {
    props: { post: {} },
  };
}
