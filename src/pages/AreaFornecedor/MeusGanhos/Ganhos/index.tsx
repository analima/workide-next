import { Col, Row } from 'react-bootstrap';
import { Card } from '../../../../components/Card';
import { Content, CardHeader, CardBody, CardContent } from './style';
import 'rc-steps/assets/index.css';
import Steps from 'rc-steps';
import { formatarValor } from '../../../../utils/CurrencyFormat';
import { pagamentos_api } from '../../../../services/pagamentos_api';
import { useAuth } from '../../../../contexts/auth';
import { useEffect, useState } from 'react';

interface IMeusGanhos {
  aguardandoRepasse: number;
  aguardandoPagamento: number;
  aguardandoConclusao: number;
  repasseEnviado: number;
  total: number;
}

interface IProps {
  filtro: string;
}

export function Ganhos({ filtro }: IProps) {
  const { user } = useAuth();
  const [meusGanhos, setMeusGanhos] = useState<IMeusGanhos>({} as IMeusGanhos);

  useEffect(() => {
    try {
      pagamentos_api
        .get(
          `/repasse/fornecedor/ganhos/${user?.id_pessoa}${
            filtro.length > 0 ? `/?periodo=${filtro}` : ''
          }`,
        )
        .then((response: any) => {
          if (!response && !response.data) {
            return;
          }
          setMeusGanhos(response.data);
        });
    } catch (error: any) {
      console.log(error);
    }
  }, [user?.id_pessoa, filtro]);

  return (
    <Content>
      <Card>
        <CardContent>
          <CardHeader>
            <div className="dados">
              {filtro.length === 0 && <span>Total</span>}
              {filtro.length > 0 && filtro === 'semana' && (
                <span>Semana atual</span>
              )}
              {filtro.length > 0 && filtro === 'mes' && <span>Mês atual</span>}
              <h1>{formatarValor(meusGanhos?.total / 100)}</h1>
            </div>
          </CardHeader>

          <CardBody>
            <Row
              className="d-flex"
              style={{
                flexWrap: 'nowrap',
              }}
            >
              <Col lg={6}>
                <Steps
                  direction="vertical"
                  status="process"
                  labelPlacement="horizontal"
                  current={3}
                >
                  <Steps.Step
                    icons={{
                      finish: <>1</>,
                      error: <></>,
                    }}
                    title="Aguardando Pagamento"
                  />
                  <Steps.Step
                    icons={{
                      finish: <>2</>,
                      error: <></>,
                    }}
                    title="Aguardando Conclusão"
                  />
                  <Steps.Step
                    icons={{
                      finish: <>3</>,
                      error: <></>,
                    }}
                    title="Aguardando Repasse"
                  />
                  <Steps.Step title="Repasse Enviado" />
                </Steps>
              </Col>
              <Col lg={6}>
                <div className="valores">
                  <h3>{`${formatarValor(
                    meusGanhos.aguardandoPagamento / 100,
                  )}`}</h3>
                  <h3>{`${formatarValor(
                    meusGanhos.aguardandoConclusao / 100,
                  )}`}</h3>
                  <h3>{`${formatarValor(
                    meusGanhos.aguardandoRepasse / 100,
                  )}`}</h3>
                  <h3>{`${formatarValor(meusGanhos.repasseEnviado / 100)}`}</h3>
                </div>
              </Col>
            </Row>
          </CardBody>
        </CardContent>
      </Card>
    </Content>
  );
}
