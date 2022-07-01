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
  UseFormWatch,
  UseFormSetValue,
} from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { GlobalLayoutProps } from '../interfaces/globalLayoutProps';

interface AvaliacaoProjetoConsumidorContextProps {
  idProjeto?: number;
  setIdProjeto: Dispatch<SetStateAction<number | undefined>>;
  mensagemDica: string;
  setMensagemDica: Dispatch<SetStateAction<string>>;
  dica: boolean;
  setDica: Dispatch<SetStateAction<boolean>>;
  mostrarDicaAntonio: (dica: string) => void;
  control: Control<FieldValues, object>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  reset: UseFormReset<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  errors: any;
  id_pessoa?: number;
  setIdPessoa: Dispatch<SetStateAction<number | undefined>>;
  nota?: number;
  setNota: Dispatch<SetStateAction<number | undefined>>;
  descricao?: string;
  setDescricao: Dispatch<SetStateAction<string>>;
  habilidades_percebidas?: Array<string>;
  setHabilidades_percebidas: Dispatch<SetStateAction<string[] | undefined>>;
  nota_plataforma?: number;
  setNota_plataforma: Dispatch<SetStateAction<number | undefined>>;
  usabilidade?: boolean;
  setUsabilidade: Dispatch<SetStateAction<boolean | undefined>>;
  funcionalidade?: boolean;
  setFuncionalidade: Dispatch<SetStateAction<boolean | undefined>>;
  seguranca?: boolean;
  setSeguranca: Dispatch<SetStateAction<boolean | undefined>>;
  comentario_plataforma?: string;
  setComentario_plataforma: Dispatch<SetStateAction<string | undefined>>;
  watch: UseFormWatch<FieldValues>;
}

const AvaliacaoProjetoConsumidorContext =
  createContext<AvaliacaoProjetoConsumidorContextProps>(
    {} as AvaliacaoProjetoConsumidorContextProps,
  );

export const AvaliacaoProjetoConsumidorProvider: React.FC<GlobalLayoutProps> = ({ children }) => {
  const [idProjeto, setIdProjeto] = useState<number | undefined>(undefined);
  const [mensagemDica, setMensagemDica] = useState('');
  const [dica, setDica] = useState(false);
  const [id_pessoa, setIdPessoa] = useState<number | undefined>(undefined);
  const [nota, setNota] = useState<number | undefined>(undefined);
  const [descricao, setDescricao] = useState<string>('');
  const [habilidades_percebidas, setHabilidades_percebidas] = useState<
    Array<string> | undefined
  >(undefined);
  const [nota_plataforma, setNota_plataforma] = useState<number | undefined>(
    undefined,
  );
  const [usabilidade, setUsabilidade] = useState<boolean | undefined>(
    undefined,
  );
  const [funcionalidade, setFuncionalidade] = useState<boolean | undefined>(
    undefined,
  );
  const [seguranca, setSeguranca] = useState<boolean | undefined>(undefined);
  const [comentario_plataforma, setComentario_plataforma] = useState<
    string | undefined
  >(undefined);

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

  const mostrarDicaAntonio = (dica: string) => {
    setDica(true);
    setMensagemDica(dica);
  };

  return (
    <AvaliacaoProjetoConsumidorContext.Provider
      value={{
        idProjeto,
        setIdProjeto,
        mensagemDica,
        setMensagemDica,
        dica,
        setDica,
        mostrarDicaAntonio,
        control,
        handleSubmit,
        reset,
        errors,
        setValue,
        getValues,
        id_pessoa,
        setIdPessoa,
        nota,
        setNota,
        descricao,
        setDescricao,
        habilidades_percebidas,
        setHabilidades_percebidas,
        nota_plataforma,
        setNota_plataforma,
        usabilidade,
        setUsabilidade,
        funcionalidade,
        setFuncionalidade,
        seguranca,
        setSeguranca,
        comentario_plataforma,
        setComentario_plataforma,
        watch,
      }}
    >
      {children}
    </AvaliacaoProjetoConsumidorContext.Provider>
  );
};

export function useAvaliacaoProjetoConsumidor(): AvaliacaoProjetoConsumidorContextProps {
  const context = useContext(AvaliacaoProjetoConsumidorContext);

  if (!context) {
    throw new Error(
      'useAvaliacaoProjetoConsumidor must be used within an AvaliacaoProjetoConsumidorProvider',
    );
  }

  return context;
}
