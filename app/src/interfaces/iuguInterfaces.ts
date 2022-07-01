export interface IIuguClientData {
  bairro: string;
  cc_emails: string | null;
  cep: string;
  cidade: string;
  complemento: string | null;
  cpf_cnpj: string;
  ddd: string;
  estado: string;
  fundador: boolean;
  id_pessoa: number;
  trial: boolean;
  notas: string | null;
  dh_criacao: string;
  dh_ultima_atualizacao: string;
  email: string;
  id_cliente: string;
  id_cliente_iugu: string;
  id_pagamento_padrao: string | null;
  nome: string;
  telefone: string;
}

export interface IIuguAssinatura {
  id_assinatura: number;
  id_assinatura_iugu: null | string | number;
  id_meio_pagamento_iugu: any;
  id_cliente_iugu: string;
  identificador_plano: string;
  meio_pagamento: any;
  suspensa: boolean;
  ativa: boolean;
  preco: number;
  moeda: string;
  dh_expiracao: string;
  dh_criacao: string;
  dh_ultima_atualizacao: string;
  dh_ciclo: string | null;
}

export interface IRegistryClientData {
  email: string;
  nome: string;
  ddd: string;
  telefone: string;
  cpf_cnpj: string;
  rua: string;
  bairro: string;
  numero: string;
  complemento?: string;
  cep: string;
  fundador: boolean;
  id_pessoa: string;
}

export interface IInvoiceData {
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
  vl_repasse_fornec_cent: number;
  vl_gyan_cent: number;
}
