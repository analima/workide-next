import { Col, Row } from 'react-bootstrap';
import { Card } from '../../../../components/Card';
import { Spacer } from '../../../../components/Spacer';
import Descricao from './Descricao';
import PacoteSelecionado  from './PacoteSelecionado';
import Content from './style';

export default function Oferta() {
  return (
    <Content>
      <Card>
        <Row>
          <Col lg={12}>
            <Descricao />
          </Col>
        </Row>

        <Spacer size={52} />

        <Row>
          <Col lg={12}>
            <PacoteSelecionado />
          </Col>
        </Row>
      </Card>
    </Content>
  );
}
