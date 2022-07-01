import React, { createContext, useState, useContext, useEffect } from 'react';
import { handleFormatDocument } from '../helpers/formatsHelper';
import { IIuguClientData } from '../interfaces/iuguInterfaces';
import { pagamentos_api } from '../services/pagamentos_api';
import { pessoas_api } from '../services/pessoas_api';
import { useAuth } from '../contexts/auth';
import { GlobalLayoutProps } from '../interfaces/globalLayoutProps';

export interface IAssinaturaEscolhida {
  ativa: boolean;
  dh_criacao: string;
  dh_ultima_atualizacao: string;
  dh_expiracao: string;
  gratuita: boolean;
  id_assinatura: number;
  id_cliente_iugu: string;
  id_assinatura_iugu?: string;
  identificador_plano: 'degustacao' | 'estudante' | 'profissional' | 'premium';
  moeda: string;
  preco: number;
  suspensa: boolean;
  cobranca_recorrente: boolean;
  url?: string;
  meio_pagamento: string;
}

export interface IAssinaturaCriada {
  ativa: boolean;
  dh_criacao: string;
  dh_ciclo: string;
  dh_expiracao: string;
  dh_ultima_atualizacao: string;
  id_assinatura: number;
  id_assinatura_iugu: string;
  id_meio_pagamento_iugu: string | null;
  id_cliente_iugu: string;
  identificador_plano: 'degustacao' | 'estudante' | 'profissional' | 'premium';
  moeda: string;
  meio_pagamento: string;
  preco: number;
  suspensa: boolean;
  cobranca_recorrente: boolean;
  url: string;
}

export interface IContaBancaria {
  id_banco: string;
  nome: string;
  agencia: string;
  conta: string;
  digitos_conta: string;
  tipo_conta: string;
  descricao: string;
}

type MeioPagamento = 'pix' | 'cartao' | 'boleto' | null;

interface IInformacoesFinanceirasProps {
  assinaturaEscolhida: IAssinaturaEscolhida;
  setAssinaturaEscolhida: React.Dispatch<
    React.SetStateAction<IAssinaturaEscolhida>
  >;
  dadosClienteIugu: IIuguClientData;
  setDadosClientIugu: React.Dispatch<React.SetStateAction<IIuguClientData>>;
  assinaturaCriada: IAssinaturaCriada;
  meioPagamentoEscolhido: MeioPagamento;
  setMeioPagamentoEscolhido: React.Dispatch<
    React.SetStateAction<MeioPagamento>
  >;
  setAssinaturaCriada: React.Dispatch<React.SetStateAction<IAssinaturaCriada>>;
  buscarAssinatura: (document: string) => Promise<void>;
  buscarClienteIugu: (document: string) => Promise<void>;
  suspenderAssinatura: (document: string) => Promise<void>;
  planoSelecionado: string;
  setPlanoSelecionado: React.Dispatch<React.SetStateAction<string>>;
  possuiAssinatura: boolean;
  contaBancaria: IContaBancaria;
  setContaBancaria: React.Dispatch<React.SetStateAction<IContaBancaria>>;
}

const InformacoesFinanceirasContext =
  createContext<IInformacoesFinanceirasProps>(
    {} as IInformacoesFinanceirasProps,
  );

export const InformacoesFinanceirasProvider: React.FC<GlobalLayoutProps> = ({ children }) => {
  const [planoSelecionado, setPlanoSelecionado] = useState('degustacao');
  const [possuiAssinatura, setPossuiAssinatura] = useState(true);
  const { user } = useAuth();
  const [contaBancaria, setContaBancaria] = useState<IContaBancaria>(
    {} as IContaBancaria,
  );
  const [assinaturaEscolhida, setAssinaturaEscolhida] =
    useState<IAssinaturaEscolhida>({} as IAssinaturaEscolhida);
  const [dadosClienteIugu, setDadosClientIugu] = useState<IIuguClientData>(
    {} as IIuguClientData,
  );
  const [assinaturaCriada, setAssinaturaCriada] = useState<IAssinaturaCriada>(
    {} as IAssinaturaCriada,
  );
  const [meioPagamentoEscolhido, setMeioPagamentoEscolhido] =
    useState<MeioPagamento>(null);

  async function buscarAssinatura(document: string) {
    try {
      const response = await pessoas_api.get(`/assinaturas/${document}`);
      setAssinaturaEscolhida(response.data);
      setPlanoSelecionado(response.data.identificador_plano);
      response.data.id_assinatura_iugu
        ? setPossuiAssinatura(true)
        : setPossuiAssinatura(false);
    } catch (error: any) {
      console.error(error.response);
      if (
        document &&
        error.response?.data?.message === 'Assinatura não encontrada'
      )
        setPossuiAssinatura(false);
    }
  }

  async function buscarClienteIugu(document: string) {
    try {
      const response = await pagamentos_api.get<any>(`/clientes/${document}`);
      setDadosClientIugu(response.data);
    } catch (error: any) {
      console.error(error.response);
    }
  }

  async function suspenderAssinatura(document: string) {
    try {
      await pagamentos_api.delete(`/assinaturas/${document}`);
      setAssinaturaCriada({} as IAssinaturaCriada);
      setAssinaturaEscolhida({} as IAssinaturaEscolhida);
    } catch (error: any) {
      console.error(error.response);
    }
  }

  useEffect(() => {
    buscarAssinatura(handleFormatDocument(user.codigo_cadastro || ''));
  }, [user.codigo_cadastro]);

  return (
    <InformacoesFinanceirasContext.Provider
      value={{
        assinaturaEscolhida,
        dadosClienteIugu,
        setAssinaturaEscolhida,
        setDadosClientIugu,
        assinaturaCriada,
        setAssinaturaCriada,
        buscarAssinatura,
        suspenderAssinatura,
        meioPagamentoEscolhido,
        setMeioPagamentoEscolhido,
        buscarClienteIugu,
        planoSelecionado,
        setPlanoSelecionado,
        possuiAssinatura,
        contaBancaria,
        setContaBancaria,
      }}
    >
      {children}
    </InformacoesFinanceirasContext.Provider>
  );
};

export function useInformacoesFinanceiras(): IInformacoesFinanceirasProps {
  const context = useContext(InformacoesFinanceirasContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
