import { useEffect, useMemo, useState } from 'react';
import { formatToPrice } from 'src/helpers/formatsHelper';
import { IExtratoProps } from 'src/interfaces/IExtratoProps';
import { Content, ContentCard } from './styles';

interface ITotalProps {
  dados: IExtratoProps[];
}
export function CardTotalExtrato({ dados }: ITotalProps) {
  const [totalLiberado, setTotalLiberado] = useState(0);
  const [totalPrevisto, setTotalPrevisto] = useState(0);
  const [totalAguardando, setTotalAguardando] = useState(0);
  const [totalTaxa, setTotalTaxa] = useState(0);

  useEffect(() => {
    const total_liberado = dados.reduce((accumulator, extrato) => {
      const valor = extrato.vlrConsumidor;
      return accumulator + valor;
    }, 0);
    setTotalLiberado(total_liberado);

    const total1 = dados.reduce((accumulator, product) => {
      const productsQuantity = product.vlrTaxa;
      return accumulator + productsQuantity;
    }, 0);
  }, [dados]);

  return (
    <Content>
      <span>Nos últimos 7 dias</span>
      <div className="info-total">
        <div className="textos">
          <span className="total-liberado">Total liberado:</span>
          <span className="total-previsto">Total previsto:</span>
          <span className="total-aguardando">Total aguardando conclusão:</span>
          <span className="total-taxa">Total Taxa Administrativa:</span>
        </div>

        <div className="valores">
          <span className="total-liberado">{formatToPrice(totalLiberado)}</span>
          <span className="total-previsto">{formatToPrice(totalLiberado)}</span>
          <span className="total-aguardando">
            {formatToPrice(totalLiberado)}
          </span>
          <span className="total-taxa">{formatToPrice(totalLiberado)}</span>
        </div>
      </div>
    </Content>
  );
}
