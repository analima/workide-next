import { BordaAzul, Content, Scroll } from './style';
import { Col, Row } from 'react-bootstrap';
import { Pontuacao } from '../../Home/MinhaReputacao/Pontuacao';
import { Titulo } from '../../../../components/Titulo';
import { HabilidadesPercebidas } from './HabilidadesPercebidas';
import { Card } from '../../../../components/Card';
import { Spacer } from '../../../../components/Spacer';
import { Avaliacoes } from './Avaliacoes';
import { Recomendacoes } from './Recomendacoes';

interface Props {
  idPessoa: number;
}

export function Reputacao({ idPessoa }: Props) {
  return (
    <Content>
      <Card>
        <Row>
          <Col lg={12}>
            <Titulo titulo="Reputação" />
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            <BordaAzul>
              <Titulo titulo="Pontuação" negrito={false} tamanho={34} />

              <Spacer size={24} />

              <Scroll reputacao>
                <Pontuacao idPessoa={idPessoa} />
              </Scroll>
            </BordaAzul>
          </Col>

          <Col lg={6}>
            <BordaAzul>
              <Titulo
                titulo="Habilidades Percebidas"
                negrito={false}
                tamanho={34}
              />

              <Spacer size={24} />

              <Scroll reputacao>
                <HabilidadesPercebidas idPessoa={idPessoa} />
              </Scroll>
            </BordaAzul>
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            <BordaAzul>
              <Titulo titulo="Avaliações" negrito={false} tamanho={34} />

              <Spacer size={24} />

              <Scroll>
                <Avaliacoes idPessoa={idPessoa} />
              </Scroll>
            </BordaAzul>
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            <BordaAzul>
              <Titulo titulo="Recomendações" negrito={false} tamanho={34} />

              <Spacer size={24} />

              <Scroll>
                <Recomendacoes idPessoa={idPessoa} />
              </Scroll>
            </BordaAzul>
          </Col>
        </Row>
      </Card>
    </Content>
  );
}
