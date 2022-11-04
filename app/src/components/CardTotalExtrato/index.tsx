import { useEffect, useMemo, useState } from 'react';
import { formatToPrice } from 'src/helpers/formatsHelper';
import { IExtratoProps } from 'src/interfaces/IExtratoProps';
import { Content, ContentCard } from './styles';

interface ITotalProps {
  dados: IExtratoProps[];
  periodo: number;
  type: string;
}
export function CardTotalExtrato({ dados, periodo, type }: ITotalProps) {
  const [totalLiberado, setTotalLiberado] = useState(0);
  const [totalPrevisto, setTotalPrevisto] = useState(0);
  const [totalAguardando, setTotalAguardando] = useState(0);
  const [totalTaxa, setTotalTaxa] = useState(0);
  const [totalConsumidor, setTotalConsumidor] = useState(0);

  useEffect(() => {
    const total_liberado = dados.reduce((accumulator, extrato) => {
      const valor = extrato.vlrConsumidor;
      return accumulator + valor;
    }, 0);
    setTotalLiberado(total_liberado);

    const total_previsto = dados
      .filter(i => i.statusPagamento === 'Previsto')
      .reduce((accumulator, extrato) => {
        const valor = extrato.vlrFornecedor;
        return accumulator + valor;
      }, 0);
    setTotalAguardando(total_previsto);

    const total_aguardando = dados
      .filter(i => i.statusPagamento === 'Aguardando conclusão')
      .reduce((accumulator, extrato) => {
        const valor = extrato.vlrFornecedor;
        return accumulator + valor;
      }, 0);
    setTotalPrevisto(total_aguardando);

    const total_taxa = dados.reduce((accumulator, extrato) => {
      const valor = extrato.vlrTaxa;
      return accumulator + valor;
    }, 0);
    setTotalTaxa(total_taxa);

    const total_consumidor = dados.reduce((accumulator, extrato) => {
      const valor = extrato.vlrConsumidor;
      return accumulator + valor;
    }, 0);
    setTotalConsumidor(total_consumidor);
  }, [dados]);

  return (
    <Content>
      <span>{!periodo ? 'Todo o período' : `Nos ultimos ${periodo} dias`}</span>
      <div className="info-total">
        <div className="textos">
          {type === 'provider' && (
            <span className="total-liberado">Total liberado:</span>
          )}
          {type === 'provider' ? (
            <span className="total-previsto">Total previsto:</span>
          ) : (
            <span className="total-previsto">Total de reembolso:</span>
          )}
          {type === 'provider' && (
            <span className="total-aguardando">
              Total aguardando conclusão:
            </span>
          )}
          <span className="total-taxa">
            {type === 'provider' ? 'Total Taxa Administrativa:' : 'Total pago'}
          </span>
        </div>

        <div className="valores">
          <span className="total-liberado">{formatToPrice(totalLiberado)}</span>

          <span className="total-previsto">{formatToPrice(totalPrevisto)}</span>
          {type === 'provider' && (
            <span className="total-aguardando">
              {formatToPrice(totalAguardando)}
            </span>
          )}
          <span className="total-taxa">
            {formatToPrice(type === 'provider' ? totalTaxa : totalConsumidor)}
          </span>
        </div>
      </div>
    </Content>
  );
}
