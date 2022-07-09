import { Col, Container, Row } from 'react-bootstrap';
import { Content } from './style';
 // eslint-disable-next-line
function showCadastroBasico () {
  const element = document.getElementById("cadastro_basico");
  if (element){
    element.style.display = "block";
  }
}

export function FacaParte() {
  return (
    <Content id="faca-parte">
      <Container>
        <Row>
          <Col lg={12}>
            <div>
            <h2>
              Faça parte de nossa <br /> comunidade
            </h2>
            <p>
              A GYAN e muito mais que uma plataforma que conecta pessoas, e feito
              por indivíduos que desejam transformar o ecossistema digital em um
              processo produtivo e totalmente inovador.
            </p>
            <p>
              Ganhe moedas e troque por descontos e prêmios incriels. <br />
              Comece agora e receba 5 moedas para dar um start na sua fortuna
            </p>

            <a className="btn button " href="/cadastro-basico">CADASTRE-SE</a>
            </div>
          </Col>
        </Row>
      </Container>
    </Content>
  );
}
