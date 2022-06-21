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
import { IPacoteInfo, IServicoInfo } from '../interfaces/IServicoInfo';
import { GlobalLayoutProps } from '../interfaces/globalLayoutProps';

interface CarrinhoConsumidorContextProps {
  idFornecedor?: number;
  setIdFornecedor: Dispatch<SetStateAction<number | undefined>>;
  control: Control<FieldValues, object>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  reset: UseFormReset<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  errors: any;
  pacote: IPacoteInfo;
  setPacote: Dispatch<SetStateAction<IPacoteInfo>>;
  servicoInfo: IServicoInfo;
  setServicoInfo: Dispatch<SetStateAction<IServicoInfo>>;
  watch: UseFormWatch<FieldValues>;
}

const CarrinhoConsumidorContext = createContext<CarrinhoConsumidorContextProps>(
  {} as CarrinhoConsumidorContextProps,
);

export const CarrinhoConsumidorProvider: React.FC<GlobalLayoutProps> = ({ children }) => {
  const [idFornecedor, setIdFornecedor] = useState<number | undefined>(
    undefined,
  );
  const [pacote, setPacote] = useState({} as IPacoteInfo);
  const [servicoInfo, setServicoInfo] = useState({} as IServicoInfo);

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
    <CarrinhoConsumidorContext.Provider
      value={{
        idFornecedor,
        setIdFornecedor,
        control,
        handleSubmit,
        reset,
        errors,
        setValue,
        getValues,
        pacote,
        setPacote,
        servicoInfo,
        setServicoInfo,
        watch,
      }}
    >
      {children}
    </CarrinhoConsumidorContext.Provider>
  );
};

export function useCarrinhoConsumidor(): CarrinhoConsumidorContextProps {
  const context = useContext(CarrinhoConsumidorContext);

  if (!context) {
    throw new Error(
      'useCarrinhoConsumidor must be used within an CarrinhoConsumidorProvider',
    );
  }

  return context;
}
