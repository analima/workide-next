import { useEffect, useState } from 'react';
import { hotjar } from 'react-hotjar';
import { Col, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { Spacer } from '../../../components/Spacer';
import { useAuth } from '../../../contexts/auth';
import { IProvider } from '../../../interfaces/IProvider';
import { pessoas_api } from '../../../services/pessoas_api';
import ModalDenuncia from '../../ModalDenuncia';
import Layout from '../Layout';
import Reputacao from './Reputacao';
import Sobre from './Sobre';
import {
  ButtonVoltar,
  ContentButton,
  InfoPerfil,
  LinkReportPerfil,
  Button,
  GhostButton,
} from './style';
import Content from './style';
import Vitrine from './Vitrine';
import { SEO } from '../../../components/SEO';

interface IServicoConsumidorPublicoParams {
  strUsuario: string;
}

export default function PerfilPublico() {
  const [showModalDenuncia, setShowModalDenuncia] = useState(false);
  const [urlAtual, setUrlAtual] = useState('');
  const [dataProvider, setDataProvider] = useState<IProvider>({} as IProvider);
  const [idPessoa, setIdPessoa] = useState(0);
  const history = useHistory();
  const params = useParams<IServicoConsumidorPublicoParams>();
  const { user } = useAuth();
  const [imageLoaded, setImageLoaded] = useState(true);

  useEffect(() => {
    if (params.strUsuario) {
      setIdPessoa(Number(params.strUsuario.split('-')[0]));
    } else if (user && user.id_pessoa) {
      setIdPessoa(user.id_pessoa ? user.id_pessoa : 0);
    } else {
      history.push('/');
    }
  }, [params.strUsuario, user, history]);

  useEffect(() => {
    if (idPessoa) {
      pessoas_api
        .get(`/pessoas/${idPessoa}`)
        .then(({ data }: { data: IProvider }) => {
          setDataProvider(data);
          setImageLoaded(false);
        })
        .catch(error => {
          if (error.response.data.message === 'Pessoa não encontrada') {
            history.push('/');
          }
        });
    }
  }, [idPessoa, history]);

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
            : 'https://hom.workide.com/gyan.png'
        }
      />
      <Layout isConsumidor={true}>
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
                    history.push('/cadastro-complementar', {
                      cadastroCompleto: true,
                    })
                  }
                >
                  EDITAR PERFIL
                </Button>
                <GhostButton onClick={() => history.goBack()}>
                  VOLTAR
                </GhostButton>
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

        <Spacer size={40} />

        <Row>
          <Col lg={12}>
            <Vitrine id={idPessoa} />
          </Col>
        </Row>

        <Spacer size={40} />

        <Row>
          <Col lg={12}>
            <Reputacao idPessoa={dataProvider.id} />
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
