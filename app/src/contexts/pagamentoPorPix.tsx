import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { ModalPagamentoPix } from '../components/ModalPagamentoPix';
import { GlobalLayoutProps } from '../interfaces/globalLayoutProps';
import { pagamentos_api } from '../services/pagamentos_api';

interface PagamentoPorPixContextProps {
  initPooling: (idProjeto: number, idPessoaConsumidor: number) => void;
}

const PagamentoPorPixContext = createContext<PagamentoPorPixContextProps>(
  {} as PagamentoPorPixContextProps,
);

export const PagamentoPorPixProvider: React.FC<GlobalLayoutProps> = ({ children }) => {
  const [showModal, setSHowModal] = useState(false);
  const [descricaoFatura, setDescricaoFatura] = useState('');
  const [valorFatura, setValorFatura] = useState(0);
  const [count, setCount] = useState(0);
  const [idProjeto, setIdProjeto] = useState(0);
  const [idPessoaConsumidor, setIdPessoaConsumidor] = useState(0);

  function initPooling(idProjeto: number, idPessoaConsumidor: number) {
    setIdProjeto(idProjeto);
    setIdPessoaConsumidor(idPessoaConsumidor);
    setCount(300000);
  }

  const handleCheckPixPaid = useCallback(async () => {
    try {
      const response = await pagamentos_api.get(
        `/faturas-servico/consumidor/${idPessoaConsumidor}`,
      );
      const lastInvoice = response.data.values.find(
        (fatura: any) => fatura.id_projeto === idProjeto,
      );
      if (
        lastInvoice?.nm_status === 'paid' &&
        lastInvoice.nm_meio_pagamento === 'pix'
      ) {
        setValorFatura(lastInvoice.vl_total_cent);
        setDescricaoFatura(lastInvoice.ds_descricao);
        setSHowModal(true);
        setCount(0);
      }
    } catch (error: any) {
      console.error(error.response);
    }
  }, [idPessoaConsumidor, idProjeto]);

  useEffect(() => {
    if (count <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setCount(state => state - 15000);
      handleCheckPixPaid();
    }, 15000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <PagamentoPorPixContext.Provider
      value={{
        initPooling,
      }}
    >
      <ModalPagamentoPix
        show={showModal}
        setShow={setSHowModal}
        descricaoFatura={descricaoFatura}
        valor={valorFatura}
      />
      {children}
    </PagamentoPorPixContext.Provider>
  );
};

export function usePagamentoPorPix(): PagamentoPorPixContextProps {
  const context = useContext(PagamentoPorPixContext);

  if (!context) {
    throw new Error(
      'usePagamentoPorPix must be used within an PagamentoPorPixProvider',
    );
  }

  return context;
}
