import { Col, Row } from 'react-bootstrap';
import { Card } from '../../../../components/Card';
import { ProposalCard } from '../../../../components/ProposalCard';
import { ScrollContainer } from '../../../../components/ScrollContainer';
import { Spacer } from '../../../../components/Spacer';
import { Titulo } from '../../../../components/Titulo';
import { VERDE } from '../../../../styles/variaveis';
import { NumeroRegistros } from '../Perguntas/style';
import { MobileCenter } from './style';
import Content from './style';

interface IProposta {
  propostas: IPropostaProps[];
  isProbono: boolean;
}

interface IPropostaProps {
  id: number;
  type: any;
  portion: number;
  value: number;
  status: any;
  name: string;
  date: string;
}

export default function Propostas({ propostas, isProbono }: IProposta) {
  return (
    <Content>
      <Card>
        <Row>
          <Col lg={10}>
            <Titulo titulo="Propostas" cor={VERDE} tamanho={24} />
          </Col>
          <Col lg={2}>
            <MobileCenter>
              <NumeroRegistros>2</NumeroRegistros>
            </MobileCenter>
          </Col>
        </Row>

        <Spacer size={52} />

        <ScrollContainer height={400}>
          {propostas.map((item, index) => (
            <Row className="mb-4" key={item.id}>
              <Col lg={12}>
                <ProposalCard
                  portion={item.portion}
                  value={item.value}
                  status={item.status}
                  id_fornecedor={1}
                  date={item.date}
                  id_projeto={1}
                  id_proposta={item.id}
                  isProbono={isProbono}
                />
              </Col>
            </Row>
          ))}
        </ScrollContainer>
      </Card>
    </Content>
  );
}
