import { Accordion, Col, Row  } from 'react-bootstrap';

import { ComplementarForm } from '../ComplementarForm';
import { CondicaoGeralForm } from '../CondicaoGeralForm';
import { FinanceiroForm } from '../FinanceiroForm';
import { ProdutoServicoForm } from '../ProdutoServicoForm';
import { TurbineForm } from '../TurbineForm';
import { Container, Button, ContentButton } from './style';

import ArrowButton from '../../../../assets/arrow.svg';

export function CadastroComplementarContent() { 

  return (
    <Container>

      <div>
        <Accordion defaultActiveKey="0">
          <div>
            <Accordion.Toggle  className="panel-toggle" eventKey="0">
                <p className="panel-titulo">Dados pessoais</p> 
                <div className="panel-seta"> <img src={ArrowButton}  alt="Abrir" /> </div>
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="0">
            <ComplementarForm />
          </Accordion.Collapse>
          <div>
            <Accordion.Toggle className="panel-toggle" eventKey="1">
              <div className="panel-titulo">Turbine o seu potencial</div> 
              <div className="panel-seta"> <img src={ArrowButton}  alt="Abrir" /> </div>              
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="1">
            <TurbineForm />
          </Accordion.Collapse>
         
          <Accordion.Collapse eventKey="2">
             <ProdutoServicoForm />
          </Accordion.Collapse>          
          <div>
            <Accordion.Toggle className="panel-toggle" eventKey="3">
              <div className="panel-titulo">Dados Financeiros</div> 
              <div className="panel-seta"> <img src={ArrowButton}  alt="Abrir" /> </div>              
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="3">
            <FinanceiroForm />
          </Accordion.Collapse>
          <div>
            <Accordion.Toggle className="panel-toggle" eventKey="4">
              <div className="panel-titulo">Condições gerais </div> 
              <div className="panel-seta"> <img src={ArrowButton}  alt="Abrir" /> </div>              
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="4">
            <CondicaoGeralForm />
          </Accordion.Collapse>
        </Accordion>
      </div>
      <Row>
        <Col lg={12}>
        <ContentButton>
          <Button to="/">VOLTAR A HOME</Button>
        </ContentButton>
        </Col>
      </Row>
    </Container>

  );
}
