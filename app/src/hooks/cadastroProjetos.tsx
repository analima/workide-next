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
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Subarea } from '../components/AreaConsumidor/Busca/Filtro/FiltroSubarea';
import { GlobalLayoutProps } from '../interfaces/globalLayoutProps';

type CadastroProjetoContextProps = {
  errorName?: boolean;
  setErrorName: Dispatch<SetStateAction<boolean>>;
  errorDescription: boolean;
  setErrorDescription: Dispatch<SetStateAction<boolean>>;
  setErrorProfissao: Dispatch<SetStateAction<boolean>>;
  errorProfissao?: boolean;
  errorService: boolean;
  setErrorService: Dispatch<SetStateAction<boolean>>;
  control: Control<FieldValues, object>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  reset: UseFormReset<FieldValues>;
  errors: any;
  dataInicioPersonalizado: string;
  dataFimPersonalizadoEscopoAberto: number | string;
  dataFimPersonalizadoEscopoFechado: number | string;
  dataInicio: string;
  dataFimEscopoAberto: string;
  dataFimEscopoFechado: string;
  description: string;
  volunteers: boolean;
  setVolunter: React.Dispatch<React.SetStateAction<boolean>>;
  setDataInicio: Dispatch<SetStateAction<string>>;
  setDataFimEscopoAberto: Dispatch<SetStateAction<string>>;
  setDataFimEscopoFechado: Dispatch<SetStateAction<string>>;
  setDataInicioPersonalizado: Dispatch<SetStateAction<string>>;
  setDataFimPersonalizadoEscopoAberto: Dispatch<
    SetStateAction<number | string>
  >;
  setDataFimPersonalizadoEscopoFechado: Dispatch<
    SetStateAction<number | string>
  >;
  errorMinimo: boolean;
  errorMaximo: boolean;
  setErrorMinimo: Dispatch<SetStateAction<boolean>>;
  setErrorMaximo: Dispatch<SetStateAction<boolean>>;
  errorHabilidadesTecnicas: boolean;
  erroHabilidadesComportamentais: boolean;
  setErrorHabilidadesTecnicas: Dispatch<SetStateAction<boolean>>;
  setErroHabilidadesComportamentais: Dispatch<SetStateAction<boolean>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  selectedSubareas: Subarea[];
  setSelectedSubareas: React.Dispatch<React.SetStateAction<Subarea[]>>;
  errorSubArea: boolean;
  setErrorSubArea: Dispatch<SetStateAction<boolean>>;
  anexo: File[];
  setAnexo: Dispatch<SetStateAction<any>>;
  setChangeCausaId?: Dispatch<any>;
  nomesProjetos: string[];
  setNomesProjetos: Dispatch<SetStateAction<string[]>>;
  idProjetoSelecionado: number;
  setIdProjetoSelecionado: Dispatch<SetStateAction<number>>;
  watch: UseFormWatch<FieldValues>;
  escopo: string;
  setEscopo: Dispatch<SetStateAction<string>>;
  valorMinimoHora: number;
  setValorMinimoHora: Dispatch<SetStateAction<number>>;
  valorMaximoHora: number;
  setValorMaximoHora: Dispatch<SetStateAction<number>>;
};

const CadastroProjetoContext = createContext<CadastroProjetoContextProps>(
  {} as CadastroProjetoContextProps,
);

export const CadastroProjetoProvider: React.FC<GlobalLayoutProps> = ({
  children,
}) => {
  const [escopo, setEscopo] = useState('FECHADO');
  const [valorMinimoHora, setValorMinimoHora] = useState(0);
  const [valorMaximoHora, setValorMaximoHora] = useState(0);

  const [idProjetoSelecionado, setIdProjetoSelecionado] = useState<number>(0);
  const [errorName, setErrorName] = useState(false);
  const [errorMinimo, setErrorMinimo] = useState(false);
  const [errorMaximo, setErrorMaximo] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [errorSubArea, setErrorSubArea] = useState(false);
  const [errorHabilidadesTecnicas, setErrorHabilidadesTecnicas] =
    useState(false);
  const [erroHabilidadesComportamentais, setErroHabilidadesComportamentais] =
    useState(false);
  const [errorService, setErrorService] = useState(false);
  const [errorProfissao, setErrorProfissao] = useState(false);
  const [dataInicioPersonalizado, setDataInicioPersonalizado] =
    useState<string>('30');
  const [
    dataFimPersonalizadoEscopoAberto,
    setDataFimPersonalizadoEscopoAberto,
  ] = useState<string | number>(30);
  const [
    dataFimPersonalizadoEscopoFechado,
    setDataFimPersonalizadoEscopoFechado,
  ] = useState<string | number>(30);
  const [dataInicio, setDataInicio] = useState('01');
  const [dataFimEscopoAberto, setDataFimEscopoAberto] = useState('1');
  const [dataFimEscopoFechado, setDataFimEscopoFechado] = useState('03');
  const [description, setDescription] = useState<string>('');
  const [volunteers, setVolunter] = useState<boolean>(false);
  const [selectedSubareas, setSelectedSubareas] = useState<Subarea[]>([]);
  const [anexo, setAnexo] = useState<File[]>([]);
  const [nomesProjetos, setNomesProjetos] = useState<string[]>([]);
  const schema = Yup.object().shape({});

  const {
    control,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <CadastroProjetoContext.Provider
      value={{
        errorName,
        setErroHabilidadesComportamentais,
        setErrorHabilidadesTecnicas,
        erroHabilidadesComportamentais,
        errorHabilidadesTecnicas,
        setErrorName,
        errorDescription,
        setErrorDescription,
        setAnexo,
        anexo,
        setErrorProfissao,
        setDescription,
        description,
        errorProfissao,
        errorService,
        selectedSubareas,
        setSelectedSubareas,
        setErrorService,
        setValue,
        getValues,
        control,
        reset,
        errorSubArea,
        setErrorSubArea,
        errors,
        dataInicioPersonalizado,
        dataFimPersonalizadoEscopoAberto,
        dataFimPersonalizadoEscopoFechado,
        setDataFimPersonalizadoEscopoAberto,
        setDataFimPersonalizadoEscopoFechado,
        setDataInicioPersonalizado,
        setDataInicio,
        setDataFimEscopoAberto,
        setDataFimEscopoFechado,
        dataInicio,
        dataFimEscopoAberto,
        dataFimEscopoFechado,
        errorMaximo,
        errorMinimo,
        setErrorMaximo,
        setErrorMinimo,
        volunteers,
        setVolunter,
        nomesProjetos,
        setNomesProjetos,
        idProjetoSelecionado,
        setIdProjetoSelecionado,
        watch,
        escopo,
        setEscopo,
        valorMinimoHora,
        setValorMinimoHora,
        valorMaximoHora,
        setValorMaximoHora,
      }}
    >
      {children}
    </CadastroProjetoContext.Provider>
  );
};

export function useCadastroProjeto(): CadastroProjetoContextProps {
  const context = useContext(CadastroProjetoContext);

  if (!context) {
    throw new Error(
      'useCadastroProjeto must be used within an CadastroProjetoProvider',
    );
  }

  return context;
}
