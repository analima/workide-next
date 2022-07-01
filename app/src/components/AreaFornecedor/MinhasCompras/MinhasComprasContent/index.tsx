import Content from './style';
import { useHistory } from 'react-router-dom';
import Layout from '../../Layout';
import Filtros from '../Filtros';
import { Col, Row } from 'react-bootstrap';
import { Spacer } from '../../../../components/Spacer';
import Compras from '../Compras';
import { AcoesContainer, GhostButton } from '../Compras/style';
import { Antonio } from '../../../../components/Antonio';
import { useMinhasComprasFornecedor } from '../../../../hooks/minhasComprasFornecedor';

export default function MinhasComprasContent() {
  const { setMensagemDica, mensagemDica, setDica, dica } =
    useMinhasComprasFornecedor();
  const history = useHistory();

  setMensagemDica(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  );

  return (
    <Content>
      <Layout titulo="Minhas compras">
        <Spacer size={48} />

        <Row>
          <Col lg={12}>
            <Filtros />
          </Col>
        </Row>

        <Spacer size={48} />

        <Row>
          <Col lg={12}>
            <Compras />
          </Col>
        </Row>

        <Spacer size={148} />

        <Row>
          <Col lg={12}>
            <AcoesContainer>
              <GhostButton onClick={() => history.goBack()}>VOLTAR</GhostButton>
            </AcoesContainer>
          </Col>
        </Row>

        <Antonio mensagem={mensagemDica} dica={dica} setDica={setDica} />
      </Layout>
    </Content>
  );
}
