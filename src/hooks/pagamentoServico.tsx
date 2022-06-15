import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
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
import { GlobalLayoutProps } from '../interfaces/globalLayoutProps';

interface PagamentoServicoContextProps {
  control: Control<FieldValues, object>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  reset: UseFormReset<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  errors: any;
  watch: UseFormWatch<FieldValues>;
  parcelas: number;
  setParcelas: Dispatch<SetStateAction<number>>;
  valorTotalCartao: number;
  setValorTotalCartao: Dispatch<SetStateAction<number>>;
}

const PagamentoServicoContext = createContext<PagamentoServicoContextProps>(
  {} as PagamentoServicoContextProps,
);

export const PagamentoServicoProvider: React.FC<GlobalLayoutProps> = ({ children }) => {
  const [parcelas, setParcelas] = useState(1);
  const [valorTotalCartao, setValorTotalCartao] = useState(0);
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

  return (
    <PagamentoServicoContext.Provider
      value={{
        control,
        handleSubmit,
        reset,
        errors,
        setValue,
        getValues,
        watch,
        parcelas,
        setParcelas,
        valorTotalCartao,
        setValorTotalCartao,
      }}
    >
      {children}
    </PagamentoServicoContext.Provider>
  );
};

export function usePagamentoServico(): PagamentoServicoContextProps {
  const context = useContext(PagamentoServicoContext);

  if (!context) {
    throw new Error(
      'usePagamentoServico must be used within an PagamentoServicoProvider',
    );
  }

  return context;
}
