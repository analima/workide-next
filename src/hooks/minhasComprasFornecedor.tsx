import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
} from 'react';

import {
  Control,
  FieldValues,
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { pagamentos_api } from '../services/pagamentos_api';
import { useAuth } from '../contexts/auth';
import { handleFormatDocument } from '../helpers/formatsHelper';
import { GlobalLayoutProps } from '../interfaces/globalLayoutProps';

interface ICompraProps {
  descricao: string;
  vl_total_cent: number;
  nm_meio_pagamento: string;
  ds_status: 'paid' | 'pending' | 'expired' | 'canceled' | 'refunded';
  ds_url: string;
  dh_vencimento: string;
  motivo: string;
  ds_plano: string;
}

interface MinhasComprasFornecedorContextProps {
  id?: number;
  setId: Dispatch<SetStateAction<number | undefined>>;
  control: Control<FieldValues, object>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  reset: UseFormReset<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  errors: any;
  selecionaFiltroDias: (tipo: string) => void;
  filtroDias: string[];
  modalPagamento: boolean;
  setModalPagamento: React.Dispatch<React.SetStateAction<boolean>>;
  mensagemDica: string;
  setMensagemDica: Dispatch<SetStateAction<string>>;
  dica: boolean;
  setDica: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  compras: Array<ICompraProps>;
  setCompras: Dispatch<SetStateAction<ICompraProps[]>>;
  watch: UseFormWatch<FieldValues>;
}

const MinhasComprasFornecedorContext =
  createContext<MinhasComprasFornecedorContextProps>(
    {} as MinhasComprasFornecedorContextProps,
  );

export const MinhasComprasFornecedorProvider: React.FC<GlobalLayoutProps> = ({ children }) => {
  const [id, setId] = useState<number | undefined>(undefined);
  const [compras, setCompras] = useState<ICompraProps[]>([]);
  const [comprasSemFiltro, setComprasSemFiltro] = useState<ICompraProps[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [mensagemDica, setMensagemDica] = useState('');
  const [dica, setDica] = useState(false);
  const [modalPagamento, setModalPagamento] = useState<boolean>(false);
  const [filtroDias, setFiltroDias] = useState<string[]>([]);

  const selecionaFiltroDias = (tipo: string) => {
    const filtroDiasSelecionado = filtroDias.includes(tipo)
      ? filtroDias.filter(item => item !== tipo)
      : [...filtroDias, ...[tipo]];

    setFiltroDias(filtroDiasSelecionado);
    setValue('filtro_dias', filtroDiasSelecionado);
  };

  const handleFiltroHoje = useCallback(() => {
    const hoje = new Date();
    const comprasFiltradas = compras.filter((obj: ICompraProps) => {
      const dataCompra = new Date(obj.dh_vencimento);
      return (
        hoje.getFullYear() === dataCompra.getFullYear() &&
        hoje.getMonth() === dataCompra.getMonth() &&
        hoje.getDate() === dataCompra.getDate()
      );
    });
    setCompras(comprasFiltradas);
  }, [compras]);

  const ordenaData = useCallback((item1: ICompraProps, item2: ICompraProps) => {
    return new Date(item1.dh_vencimento) < new Date(item2.dh_vencimento);
  }, []);

  const getCompras = useCallback(
    async function () {
      try {
        const { data } = await pagamentos_api.get(
          `/faturas-assinatura/${handleFormatDocument(
            user?.codigo_cadastro || '',
          )}`,
        );
        setCompras(data.sort(ordenaData));
        setComprasSemFiltro(data);
      } catch (err: any) {
        console.log(err.response);
      }
    },
    [ordenaData, user?.codigo_cadastro],
  );

  const handleGetIuguClientData: () => void = useCallback(
    async function () {
      try {
        setLoading(true);
        await getCompras();
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [getCompras],
  );

  useEffect(() => {
    handleGetIuguClientData();
  }, [handleGetIuguClientData]);

  const schema = Yup.object().shape({});

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    watch(value => {
      value.filtro_dias.indexOf('hoje', 0) !== -1
        ? handleFiltroHoje()
        : setCompras(comprasSemFiltro);
    });
  }, [
    watch,
    control._formValues.filtro_dias,
    handleFiltroHoje,
    comprasSemFiltro,
  ]);

  return (
    <MinhasComprasFornecedorContext.Provider
      value={{
        id,
        setId,
        control,
        handleSubmit,
        reset,
        errors,
        setValue,
        getValues,
        mensagemDica,
        setMensagemDica,
        dica,
        setDica,
        selecionaFiltroDias,
        filtroDias,
        modalPagamento,
        setModalPagamento,
        compras,
        setCompras,
        loading,
        setLoading,
        watch,
      }}
    >
      {children}
    </MinhasComprasFornecedorContext.Provider>
  );
};

export function useMinhasComprasFornecedor(): MinhasComprasFornecedorContextProps {
  const context = useContext(MinhasComprasFornecedorContext);

  if (!context) {
    throw new Error(
      'useMinhasComprasFornecedor must be used within an MinhasComprasFornecedorProvider',
    );
  }

  return context;
}
