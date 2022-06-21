import { Card } from '../../../../components/Card';
import { Titulo } from '../../../../components/Titulo';
import { PRETO_10 } from '../../../../styles/variaveis';
import { Content, CardContent } from './style';
import 'rc-steps/assets/index.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Spacer } from '../../../../components/Spacer';
ChartJS.register(ArcElement, Tooltip, Legend);

export function GraficoDosGanhos() {
  const dados = [
    {
      status: 'Aguardando pagamento',
      valor: 1000,
    },
    {
      status: 'Aguardando conclusão',
      valor: 800,
    },
    {
      status: 'Aguardando repasse',
      valor: 1000,
    },
    {
      status: 'Repasse enviado',
      valor: 600,
    },
  ];

  const data = {
    labels: [...dados.map(dado => `${dado.status}`)],
    datasets: [
      {
        data: [...dados.map(d => d.valor)],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
        cutout: '70%',
        rotation: Math.random() * 100,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      animation: {
        duration: 2000,
      },
    },
  };

  return (
    <Content>
      <Card>
        <CardContent>
          <Titulo titulo="Detalhes" tamanho={24} />
          <Spacer size={32} />
          <Titulo titulo="Janeiro de 2021" tamanho={16} cor={PRETO_10} />

          <Spacer size={32} />
          <Doughnut data={data} options={options} />

          <div className="total">
            <span>Total</span>
            <Titulo titulo="R$ 850,00" tamanho={20} cor={PRETO_10} />
          </div>
        </CardContent>
      </Card>
    </Content>
  );
}
