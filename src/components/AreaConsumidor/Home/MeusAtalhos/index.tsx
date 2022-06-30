import { Col, Row } from 'react-bootstrap';
import { Titulo } from '../../../Titulo';
import { VERDE } from '../../../../styles/variaveis';
import { Atalho, AtalhoTexto } from './style';
import Content from './style';

export default function MeusAtalhos() {
  return (
    <Content>
      <Titulo titulo="Meus atalhos" cor={VERDE} />
      <Row>
        <Col lg={4}>
          <Atalho>
            <AtalhoTexto href="#">Meus Projetos</AtalhoTexto>
          </Atalho>
        </Col>
        {/* <Col lg={4}>
            <Atalho>
              <AtalhoTexto href="#">Suporte</AtalhoTexto>
            </Atalho>
          </Col> */}

        <Col lg={4}>
          <Atalho>
            <AtalhoTexto href="#">Minha agenda</AtalhoTexto>
          </Atalho>
        </Col>

        <Col lg={4}>
          <Atalho>
            <AtalhoTexto href="#">Outros</AtalhoTexto>
          </Atalho>
        </Col>
      </Row>
    </Content>
  );
}
