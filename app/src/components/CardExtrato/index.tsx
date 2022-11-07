import { formatDate } from 'src/helpers/DateHelper';
import { formatToPrice } from 'src/helpers/formatsHelper';
import { IExtratoProps } from 'src/interfaces/IExtratoProps';
import { Content } from './styles';
import { useRouter } from 'next/router';

interface IDadosExtratoProps {
  item: IExtratoProps;
  type: string;
}
export function CardExtrato({ item, type }: IDadosExtratoProps) {
  const router = useRouter();
  function handleColorStatus(status: string) {
    if (status === 'Projeto em andamento') return 'andamento';
    if (status === 'Concluído parcialmente') return 'parcialmente';
    if (status === 'Projeto concluído') return 'concluido';
    if (status === 'Projeto cancelado') return 'cancelado';
    if (status === 'Aguardando início') return 'aguardando-inicio';
    if (status === 'Conclusão solicitada') return 'conclusao-solicitada';
    if (status === 'Desistência em andamento') return 'desistencia-andamento';
    if (status === 'Cancelamento do Projeto Solicitado')
      return 'cancelamento-solicitado';
    if (status === 'Pausado') return 'pausado';
  }

  function handleDatePagamento(status: string) {
    if (status === 'Previsto') return true;
    if (status === 'Liberado em') return true;
    if (status === 'Cancelado') return true;
  }

  return (
    <Content
      status={item.statusProjeto === 'Projeto cancelado'}
      onClick={() =>
        router.push({
          pathname: `/${
            type === 'provider' ? 'fornecedor' : 'contratante'
          }/projeto/andamento`,
          query: `id_projeto=${item.id}`,
        })
      }
    >
      <div className="collunm-1">
        <h1>{item.nomeProjeto}</h1>
        <p>{type === 'provider' ? item.nomeConsumidor : item.nomeFornecedor}</p>
        <span className={handleColorStatus(item.statusProjeto)}>
          {item.statusProjeto}
          {item.statusProjeto === 'Projeto em andamento' &&
            ' ' + item.percentualConclusao.toFixed(1) + '%'}
        </span>
      </div>

      <div className="collunm-2">
        <span>{item.statusPagamento}</span>
        {handleDatePagamento(item.statusPagamento) && (
          <p>
            {type === 'provider'
              ? formatDate(item.dataPagamentoConsumidor)
              : formatDate(item.dataPagamentoFornecedor)}
          </p>
        )}
      </div>

      <div className="collunm-3">
        <span>Valor pago via {item.meioPagamento}</span>
        {type === 'provider' && (
          <>
            <span>Taxa administrativa</span>
            <span>Repasse</span>
          </>
        )}
      </div>

      <div className="collunm-4">
        <span className="pago">
          +{' '}
          {formatToPrice(
            type === 'provider' ? item.vlrFornecedor : item.vlrConsumidor,
          )}
        </span>
        {type === 'provider' && (
          <>
            <span className="taxa">- {formatToPrice(item.vlrTaxa)}</span>
            <span className="repase">
              +{' '}
              {formatToPrice(
                type === 'provider' ? item.vlrFornecedor : item.vlrConsumidor,
              )}
            </span>
          </>
        )}
      </div>
    </Content>
  );
}
