import { Col, Container, Row } from 'react-bootstrap';
import { Card } from '../../../components/Card';
import { Titulo } from '../../../components/Titulo';
import Layout from '../../AreaConsumidor/Layout';
import { LinkReportAnuncio, ContentButton, Button } from './style';
import Content from './style';
import { AZUL } from '../../../styles/variaveis';
import { useEffect, useState } from 'react';
import { Spacer } from '../../../components/Spacer';
import { VitrineServico } from '../../../components/VitrineServico';
import Perfil from './Perfil';
import { useHistory } from 'react-router-dom';

import ModalDenuncia from '../../ModalDenuncia';
import { useAuth } from '../../../contexts/auth';
import { geral_api } from '../../../services/geral_api';
import { IServicoInfo } from '../../../interfaces/IServicoInfo';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';

export default function Servico() {
  const [vitrineData, setVitrineData] = useState([] as IServicoInfo[]);
  const [showModalDenuncia, setShowModalDenuncia] = useState(false);
  const [urlAtual, setUrlAtual] = useState('');

  const history = useHistory();
  const { user } = useAuth();

  useEffect(() => {
    if (user.id_pessoa) {
      geral_api
        .get(`/servicos?filter=id_pessoa=${user.id_pessoa}`)
        .then(res => {
          setVitrineData(res.data.data);
        });
    }
  }, [user]);

  useEffect(() => {
    setUrlAtual(window.location.href);
  }, []);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/consumidor/servico');
  }, []);

  return (
    <Content>
      <Helmet>
        <title>Gyan - Vitrine do {user.nome_tratamento || ''}</title>
      </Helmet>
      <Layout titulo="" activeMenu={true}>
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
                <VitrineServico
                  vitrineData={vitrineData}
                  idUsuario={user.id_usuario}
                />
              </Col>
            </Row>
          </Container>
        </Card>

        <Spacer size={36} />

        <Card>
          <Container>
            <Row>
              <Col lg={12}>
                {user && user.id_usuario && (
                  <Perfil idUsuario={user.id_usuario} />
                )}
              </Col>
            </Row>
          </Container>
        </Card>

        <Spacer size={32} />

        <div>
          <LinkReportAnuncio href="#" onClick={e => setShowModalDenuncia(true)}>
            Tem algo de errado com esse anúncio?
          </LinkReportAnuncio>

          <ModalDenuncia
            showModal={showModalDenuncia}
            setShowModal={setShowModalDenuncia}
            url={urlAtual}
            idPessoaDenunciado={user.id_pessoa ? user.id_pessoa : 0}
          />
        </div>
        <Spacer size={32} />

        <ContentButton>
          <Button onClick={() => history.goBack()}>Voltar</Button>
        </ContentButton>
      </Layout>
    </Content>
  );
}
