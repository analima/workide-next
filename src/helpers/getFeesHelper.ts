import { pagamentos_api } from '../services/pagamentos_api';
import { pessoas_api } from '../services/pessoas_api';

export async function getFeesHelper(
  idPessoa: number | undefined,
  valor: number,
  parcelas: number,
  total: boolean = false,
) {
  if (!idPessoa) throw new Error('ID Pessoa não informado');
  try {
    const responsePessoa = await pessoas_api.get(`/pessoas/${idPessoa}`);
    const responseTaxa = await pagamentos_api.post('/faturas-servico/previa', {
      valor_serv_cent: (valor || 0) * 100,
      nm_plano_assin_fornec: responsePessoa.data.plano.toLowerCase(),
      nr_parcelas_cartao: 1,
    });

    return total
      ? (responseTaxa.data.cartao.vl_gyan_cent +
          responseTaxa.data.cartao.vl_serv_cent) /
          100
      : responseTaxa.data.cartao.vl_gyan_cent / 100;
  } catch (err: any) {
    console.error(err.response);
  }
}
