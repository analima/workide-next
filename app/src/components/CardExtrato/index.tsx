import { formatDate } from 'src/helpers/DateHelper';
import { formatToPrice } from 'src/helpers/formatsHelper';
import { IExtratoProps } from 'src/interfaces/IExtratoProps';
import { Content, ContentCard } from './styles';

interface IDadosExtratoProps {
  item: IExtratoProps;
  type: string;
}
export function CardExtrato({ item, type }: IDadosExtratoProps) {
  function handleColorStatus(status: string) {
    if (status === 'Projeto em andamento') return 'andamento';
    if (status === 'Concluído parcialmente') return 'parcialmente';
    if (status === 'Projeto concluído') return 'concluido';
    if (status === 'Projeto cancelado') return 'cancelado';
    if (status === 'Aguardando início') return 'aguardando-inicio';
  }
  return (
    <Content>
      <div className="collunm-1">
        <h1>{item.nomeProjeto}</h1>
        <p>{item.nomeConsumidor}</p>
        <span className={handleColorStatus(item.statusProjeto)}>
          {item.statusProjeto + ' ' + item.percentualConclusao.toFixed(1)}%
        </span>
      </div>

      <div className="collunm-2">
        <span>{item.statusPagamento}</span>
        <p>
          {type === 'consumer'
            ? formatDate(item.dataPagamentoFornecedor)
            : formatDate(item.dataPagamentoConsumidor)}
        </p>
      </div>

      <div className="collunm-3">
        <span>Pago pelo cliente via {item.meioPagamento}</span>
        <span>Taxa administrativa</span>
        <span>Repasse</span>
      </div>

      <div className="collunm-4">
        <span className="pago">{formatToPrice(item.vlrConsumidor)}</span>
        <span className="taxa">{formatToPrice(item.vlrTaxa)}</span>
        <span className="repasee">{formatToPrice(item.vlrFornecedor)}</span>
      </div>
    </Content>
  );
}
