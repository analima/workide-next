import { useState, useEffect } from 'react';
import { pagamentos_api } from '../services/pagamentos_api';
import { useAuth } from '../contexts/auth';

interface ICompraProps {
  id_fatura: string;
  ds_descricao: string;
  vl_total_cent: number;
  nm_meio_pagamento: any;
  nm_status:
    | 'paid'
    | 'pending'
    | 'expired'
    | 'canceled'
    | 'refunded'
    | 'cancellation_requested';
  ds_url: string;
  dh_vencimento: string;
  nr_parcel: number;
  id_projeto: number;
  id_pessoa_consum: number;
  id_pessoa_forn: number;
  vl_gyan_perc: number;
}

export function useFaturaProjeto(idProjeto: number | string) {
  const [compras, setCompras] = useState<ICompraProps>({} as ICompraProps);
  const { user } = useAuth();

  useEffect(() => {
    const carregarCompras = async () => {
      const { data } = await pagamentos_api.get(
        `/faturas-servico/contratante/${user.id_pessoa}?order=dh_criacao=DESC`,
      );
      const compra = data.values.filter(
        (item: ICompraProps) => item.id_projeto === idProjeto,
      );
      setCompras(compra[0]);
    };
    carregarCompras();
  }, [idProjeto, user.id_pessoa]);
  return compras;
}
