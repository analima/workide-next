import { Col, Row } from 'react-bootstrap';
import {
  ContentButtons,
  ButtonEditPerfil,
  GhostButton,
  LinkReportPerfil,
} from './style';
import Content from './style';
import Sobre from './Sobre';
import { Spacer } from '../../Spacer';
import ProjetosCriados from './ProjetosCriados';
import DizendoSobre from './DizendoSobre';
import { useEffect, useState } from 'react';
import ModalDenuncia from '../../ModalDenuncia';
import { useAuth } from '../../../contexts/auth';
import { geral_api } from '../../../services/geral_api';
import Layout from '../Layout';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useGAEventsTracker } from '../../../hooks/useGAEventsTracker';
import { hotjar } from 'react-hotjar';

type UserProps = {
  id: number;
  email: string;
  tipo: string;
};

interface IProps {
  id: number;
}

interface PerfilConsumidorProps {
  dataProps: {
    id: number;
    idPessoa: number;
    nome: string;
    nome_tratamento: string;
    resumo_profissional: string;
    url_video_apresentacao: string | null;
    usuario: UserProps;
    id_arquivo: string | null;
    is_membro: boolean;
  };
}

export default function PerfilPublico() {
  const history = useHistory();
  const [showModalDenuncia, setShowModalDenuncia] = useState(false);
  const [urlAtual, setUrlAtual] = useState('');
  const location = useLocation<IProps>();
  const GAEventsTracker = useGAEventsTracker('Perfil Publico');

  const [dadosUsuario, setDadosUsuario] = useState<PerfilConsumidorProps>(
    {} as PerfilConsumidorProps,
  );

  const { user } = useAuth();

  useEffect(() => {
    let url_atual = window.location.href;
    setUrlAtual(url_atual);
  }, []);

  useEffect(() => {
    if (location.state?.id) {
      geral_api.get(`/pessoas/${location.state.id}`).then(({ data }) => {
        setDadosUsuario({
          dataProps: {
            idPessoa: data.id,
            id: data.id_usuario,
            nome: data.nome,
            nome_tratamento: data.nome_tratamento,
            resumo_profissional: data.resumo_profissional,
            url_video_apresentacao: data.url_video_apresentacao,
            usuario: data.usuario,
            id_arquivo: data.id_arquivo,
            is_membro: data.is_membro,
          },
        });
      });
    } else {
      geral_api.get(`/pessoas/${user.id_pessoa}`).then(({ data }) => {
        setDadosUsuario({
          dataProps: {
            idPessoa: data.id,
            id: data.id_usuario,
            nome: data.nome,
            nome_tratamento: data.nome_tratamento,
            resumo_profissional: data.resumo_profissional,
            url_video_apresentacao: data.url_video_apresentacao,
            usuario: data.usuario,
            id_arquivo: data.id_arquivo,
            is_membro: data.is_membro,
          },
        });
      });
    }
  }, [user.id_usuario, location.state?.id, user.id_pessoa]);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/consumidor/perfil-publico');
  }, []);

  return (
    <Layout activeMenu titulo="">
      <Helmet>
        <title>Gyan - perfil do consumidor</title>
      </Helmet>
      <ContentButtons>
        {!location.state?.id && (
          <ButtonEditPerfil
            onClick={() =>
              history.push('/cadastro-complementar', {
                isConsumidor: true,
                cadastroCompleto: true,
              })
            }
          >
            EDITAR PERFIL
          </ButtonEditPerfil>
        )}
        <GhostButton onClick={() => history.goBack()}>VOLTAR</GhostButton>
      </ContentButtons>
      <Content>
        <Row>
          <Col lg={12}>
            <Sobre dataProps={dadosUsuario.dataProps} />
          </Col>
        </Row>

        <Spacer size={64} />

        <Row>
          <Col lg={12}>
            <ProjetosCriados
              idPessoa={dadosUsuario?.dataProps?.idPessoa || 0}
            />
          </Col>
        </Row>

        <Spacer size={64} />

        <Row>
          <Col lg={12}>
            <DizendoSobre
              id={
                dadosUsuario?.dataProps?.idPessoa
                  ? dadosUsuario?.dataProps?.idPessoa
                  : 0
              }
            />
          </Col>
        </Row>

        <Spacer size={64} />

        <Row>
          <Col lg={12}>
            <LinkReportPerfil
              onClick={() => {
                GAEventsTracker(
                  'Modal de Denuncia',
                  'Exibindo modal de denuncia',
                );
                setShowModalDenuncia(true);
              }}
            >
              Tem algo de errado com esse perfil?
            </LinkReportPerfil>

            <ModalDenuncia
              showModal={showModalDenuncia}
              setShowModal={setShowModalDenuncia}
              url={urlAtual}
              idPessoaDenunciado={
                dadosUsuario.dataProps ? dadosUsuario.dataProps.id : 0
              }
            />
          </Col>
        </Row>

        <Spacer size={64} />

        <Row>
          <Col lg={12} className="d-flex justify-content-end"></Col>
        </Row>
      </Content>
    </Layout>
  );
}
