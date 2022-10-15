import { Col, Row } from 'react-bootstrap';

import Content from './style';

import {
  perguntasMock,
  propostasMock,
} from '../../../../mock/etapasMock/etapas';
import { AZUL } from '../../../../styles/variaveis';
import Layout from '../../Layout';
import Perguntas from '../Perguntas';
import Propostas from '../Propostas';
import { Button } from '../../../Form/Button';
import { IoMdHelpCircle } from 'react-icons/io';
import { usePropostaConsumidor } from '../../../../hooks/propostaConsumidor';
import { Antonio } from '../../../Antonio';
import { Helmet } from 'react-helmet';

export default function PropostaContent() {
  const { dica, setDica } = usePropostaConsumidor();

  const mensagem =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  return (
    <Content>
      <Helmet>
        <title>freelas town - Proposta enviada para Morning Show</title>
      </Helmet>
      <Layout titulo="Projeto Morning Show" activeMenu>
        <Row>
          <Col lg={12} className="d-flex justify-content-end">
            <IoMdHelpCircle
              color={AZUL}
              size={24}
              onClick={() => setDica(true)}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={4} className="mt-4">
            {/* <EtapasProjeto etapas={etapasMock} cor={VERDE} /> */}
          </Col>
          <Col lg={8} className="mt-4">
            {/* <DadosProjeto projeto={projetoMock} cor={VERDE} /> */}
          </Col>
        </Row>

        <Row>
          <Col lg={8} className="mt-4">
            <Perguntas perguntas={perguntasMock} />
          </Col>
          <Col lg={4} className="mt-4">
            <Propostas propostas={propostasMock} isProbono={false} />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg={12} className="d-flex justify-content-end">
            <Button label="VOLTAR" onClick={() => {}} />
          </Col>
        </Row>

        <Antonio mensagem={mensagem} dica={dica} setDica={setDica} />
      </Layout>
    </Content>
  );
}
