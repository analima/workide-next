import { Col, Row } from 'react-bootstrap';
import { Card } from '../../../Card';
import { InputCheck } from '../../../Form/InputCheck';
import { ToggleSwitch } from '../../../Form/ToggleSwitch';
import { Titulo } from '../../../Titulo';
import { useCarrinhoConsumidor } from '../../../../hooks/carrinhoConsumidor';
import { AZUL } from '../../../../styles/variaveis';
import { RequisitoContainer, RequisitoLabel, RequisitoVazio } from './style';
import Content from './style';

export default function ListaRequisito() {
  const { control, servicoInfo } = useCarrinhoConsumidor();

  return (
    <Content>
      <Row>
        <Col lg={12}>
          <Titulo titulo="Lista de requisitos" cor={AZUL} />
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col lg={10}>
          <Card>
            {!servicoInfo.requisitos?.length && (
              <RequisitoVazio>A oferta não possui requisitos.</RequisitoVazio>
            )}
            {servicoInfo.requisitos?.map(requisito => {
              return (
                <RequisitoContainer key={requisito.id}>
                  <InputCheck
                    control={control}
                    name={`requisito-${requisito.id}`}
                  />
                  <RequisitoLabel>{requisito.descricao}</RequisitoLabel>
                </RequisitoContainer>
              );
            })}
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col lg={10}>
          <ToggleSwitch
            control={control}
            name="acordo"
            disabled={!servicoInfo.requisitos?.length}
            label="Estou de acordo com os requisitos e os farei prontamente"
          />
        </Col>
      </Row>
    </Content>
  );
}
