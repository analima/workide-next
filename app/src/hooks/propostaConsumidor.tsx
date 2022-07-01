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
} from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { GlobalLayoutProps } from '../interfaces/globalLayoutProps';

interface PropostaConsumidorContextProps {
  idProposta?: number;
  setIdProposta: Dispatch<SetStateAction<number | undefined>>;
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
  dadosProjetos: ProjetoProps;
  setDadosProjetos: Dispatch<SetStateAction<ProjetoProps>>;
  etapas: EtapasProps[];
  setEtapas: Dispatch<SetStateAction<EtapasProps[]>>;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

export interface ProjetoProps {
  id: number;
  nome: string;
  descricao: string;
  subareas: {
    id: number;
    descricao: string;
    areaInteresse: {
      id: number;
      descricao: string;
    };
  }[];
  niveisExperiencia: string;
  dataHoraCriacao: string;
  prazoConclusao: number;
  dataInicioEstimada: string;
  precoMaximo: number;
  precoMinimo: number;
  proBono: boolean;
  permitePerguntas: boolean;
  exclusivo: boolean;
  habilidadesComportamentais: string;
  habilidadesTecnicas: string;
  arquivos: IAnexos[];
  idPessoaFornecedor: number;
  idPessoaConsumidor: number;
  status: IEtapaProps;
  propostaAceita: PropostaAceitaProps;
  origemServico: boolean;
  desistencia: DesistenciaProps;
  escopo: string;
  totalHoras: number;
}

export interface AtividadesProps {
  id: string;
  data: string;
  descricao: string;
  horas: number;
}

export interface DesistenciaProps {
  id: number;
  idPessoa: number;
  porcentagemCombinada: number;
  acordoRecusado: boolean;
  descricao: string;
  dataHoraUltimaAtualizacao: string;
}

export interface IAnexos {
  id: string;
  url: string;
}

interface IRequisitosIntegraveis {
  id: number;
  descricao: string;
  status: string;
  dataHoraUltimaAtualizacao: string;
}

interface PropostaAceitaProps {
  descricao: string;
  requisitos: IRequisitosIntegraveis[];
  entregaveis: IRequisitosIntegraveis[];
  atividades: AtividadesProps[];
  parcelas: number;
  arquivos: IAnexos[];
  valor: number;
  dataHoraCriacao: string;
  dataInicioEstimada: string;
  prazoConclusao: number;
  id: number;
  idPessoaFornecedor: number;
  condicoesGerais: string[];
  totalHoras: number;
}

interface IEtapaProps {
  codigo: string;
  descricao: string;
}

export interface EtapasProps {
  id: number;
  idProjeto: number;
  status: IEtapaProps;
  dataOcorrencia: string;
}

const PropostaConsumidorContext = createContext<PropostaConsumidorContextProps>(
  {} as PropostaConsumidorContextProps,
);

export const PropostaConsumidorProvider: React.FC<GlobalLayoutProps> = ({ children }) => {
  const [idProposta, setIdProposta] = useState<number | undefined>(undefined);
  const [mensagemDica, setMensagemDica] = useState('');
  const [dica, setDica] = useState(false);
  const [dadosProjetos, setDadosProjetos] = useState<ProjetoProps>(
    {} as ProjetoProps,
  );
  const [refresh, setRefresh] = useState(false);
  const [etapas, setEtapas] = useState<EtapasProps[]>([] as EtapasProps[]);

  const schema = Yup.object().shape({});

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mostrarDicaAntonio = (dica: string) => {
    setDica(true);
    setMensagemDica(dica);
  };

  return (
    <PropostaConsumidorContext.Provider
      value={{
        idProposta,
        setIdProposta,
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
        dadosProjetos,
        setDadosProjetos,
        etapas,
        setEtapas,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </PropostaConsumidorContext.Provider>
  );
};

export function usePropostaConsumidor(): PropostaConsumidorContextProps {
  const context = useContext(PropostaConsumidorContext);

  if (!context) {
    throw new Error(
      'usePropostaConsumidor must be used within an PropostaConsumidorProvider',
    );
  }

  return context;
}
