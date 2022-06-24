import { Col, Row } from 'react-bootstrap';
import { Titulo } from '../../../../components/Titulo';
import { Atalho, AtalhoTexto } from './style';
import Content from './style';

export default function MeusAtalhos() {
  return (
    <Content>
      <Titulo titulo="Meus atalhos" />
      <Row>
        <Col lg={3}>
          <Atalho disabled>
            <AtalhoTexto disabled href="#">Meus Projetos</AtalhoTexto>
          </Atalho>
        </Col>
        <Col lg={3}>
          <Atalho>

            <AtalhoTexto
              href="https://api.whatsapp.com/send/?phone=55061991053691"
              target="_blank"
              rel="noreferrer">
              Suporte
            </AtalhoTexto>
          </Atalho>
        </Col>

        <Col lg={3}>
          <Atalho>
            <AtalhoTexto href="/minhas-campanhas">Campanhas de Divulgação</AtalhoTexto>
          </Atalho>
        </Col>

        <Col lg={3}>
          <Atalho disabled>
            <AtalhoTexto disabled href="#">Minha agenda</AtalhoTexto>
          </Atalho>
        </Col>
      </Row>
    </Content>
  );
}
