import { IInvoiceData } from './../interfaces/iuguInterfaces';
import { pagamentos_api } from '../services/pagamentos_api';
import { Projeto } from '../contexts/valorProjetoPago';

export default class BuscarFaturaProjeto {
  static async buscarFatura(
    idPessoa: number,
    idProjeto: number,
  ): Promise<Projeto | undefined> {
    try {
      const {
        data: { values: faturas },
      } = await pagamentos_api.get(`/faturas-servico/consumidor/${idPessoa}`);
      const faturasFiltradas = this.filtrarFaturasPorProjeto(
        faturas,
        idProjeto,
      );
      if (faturasFiltradas.length === 0)
        throw new Error('Nenhuma fatura encontrada');

      return {
        id: idProjeto,
        valorComTaxa: faturasFiltradas[0].vl_total_cent / 100,
        valorSemTaxa: faturasFiltradas[0].vl_repasse_fornec_cent / 100,
      };
    } catch (error: any) {
      console.log(error);
      console.error(error.response);
    }
  }

  public static filtrarFaturasPorProjeto(
    faturas: IInvoiceData[],
    idProjeto: number,
  ): IInvoiceData[] {
    return faturas.filter(
      (fatura: IInvoiceData) =>
        fatura.id_projeto === idProjeto && fatura.nm_status === 'paid',
    );
  }
}
