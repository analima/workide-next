import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import { Card } from '../../../../components/Card';
import { AZUL_60 } from '../../../../styles/variaveis';
import { Content, CardHeader, CardBody, CardContent } from './style';
import 'rc-steps/assets/index.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { formatarValor } from '../../../../utils/CurrencyFormat';
ChartJS.register(ArcElement, Tooltip, Legend);

export function OutrosGanhos() {
  const values = [
    {
      mes: 'Janeiro',
      valor: 500,
    },
    {
      mes: 'Fevereiro',
      valor: 100,
    },
    {
      mes: 'Março',
      valor: 200,
    },
    {
      mes: 'Abril',
      valor: 300,
    },
    {
      mes: 'Maio',
      valor: 400,
    },
    {
      mes: 'Junho',
      valor: 500,
    },
  ];

  return (
    <Content>
      <Card>
        <CardContent>
          <CardHeader>
            <FiArrowLeftCircle size={32} color={AZUL_60} />
            <div className="dados">
              <span>1º semestre de 2021</span>
              <h1>R$ 600,00</h1>
            </div>

            <FiArrowRightCircle size={32} color={AZUL_60} />
          </CardHeader>

          <CardBody>
            {values.map((value, index) => (
              <div className="detalhes" key={index}>
                <div className="detalhes-mes">
                  <span>{value.mes}</span>
                </div>
                <div className="detalhes-valor">
                  <span>{formatarValor(value.valor)}</span>
                </div>
              </div>
            ))}
          </CardBody>
        </CardContent>
      </Card>
    </Content>
  );
}
