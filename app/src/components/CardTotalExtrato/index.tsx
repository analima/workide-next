import { Content, ContentCard } from './styles';

export function CardTotalExtrato() {
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
          <span className="total-liberado">R$ 500,00</span>
          <span className="total-previsto">R$ 500,00</span>
          <span className="total-aguardando">R$ 500,00</span>
          <span className="total-taxa">R$ 50,00</span>
        </div>
      </div>
    </Content>
  );
}
