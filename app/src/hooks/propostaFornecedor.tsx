import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
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
import { oportunidades_api } from '../services/oportunidades_api';
import { useHistory } from 'react-router';
import { addDays, addMinutes } from 'date-fns';
import { geral_api } from '../services/geral_api';
import { GlobalLayoutProps } from '../interfaces/globalLayoutProps';

interface PropostaFornecedorContextProps {
  idProposta?: number;
  setIdProposta: Dispatch<SetStateAction<number | undefined>>;
  mensagemDica: string;
  setMensagemDica: Dispatch<SetStateAction<string>>;
  dica: boolean;
  setDica: Dispatch<SetStateAction<boolean>>;
  mostrarDicaAntonio: (dica: string) => void;
  control: Control<FieldValues, object>;
  reset: UseFormReset<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  errors: any;
  handleOnSubmit: () => void;
  dataInicio: string | undefined;
  dataFinal: string | undefined;
  setDataInicio: Dispatch<SetStateAction<string | undefined>>;
  setDataFinal: Dispatch<SetStateAction<string | undefined>>;
  project: ProjetoProps;
  setProject: Dispatch<SetStateAction<ProjetoProps>>;
  watch: UseFormWatch<FieldValues>;
  etapas: EtapasProps[];
  setEtapas: Dispatch<SetStateAction<EtapasProps[]>>;
  anexo: File[];
  setAnexo: Dispatch<SetStateAction<any>>;
  arquivosDaProposta: string[];
  setArquivosDaProposta: Dispatch<SetStateAction<string[]>>;
  editar: boolean;
  setEditar: Dispatch<SetStateAction<boolean>>;
  proposaAlreadySubmitted: boolean;
  setProposaAlreadySubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  profileInModeration: boolean;
  setProfileInModeration: React.Dispatch<React.SetStateAction<boolean>>;
  successModalIsOpen: boolean;
  setSuccessModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  metodoEntrega: string[];
  setMetodoEntrega: Dispatch<SetStateAction<string[]>>;
  requisitos: string[];
  setRequisitos: Dispatch<SetStateAction<string[]>>;
  buscaProjeto: boolean;
  setBuscaProjeto: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  condicoesGerais: string[];
  setCondicoesGerais: Dispatch<SetStateAction<string[]>>;
}

interface IAnexos {
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
  parcelas?: number;
  arquivos: IAnexos[];
  valor: number;
  totalHoras: number;
  dataHoraCriacao: string;
  dataInicioEstimada: string;
  prazoConclusao: number;
  id: number;
  idPessoaFornecedor: number;
  condicoesGerais: string[];
  atividades: AtividadesProps[];
}

export interface AtividadesProps {
  id: string;
  data: string;
  descricao: string;
  horas: number;
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
  prazoConclusao: number;
  dataHoraCriacao: string;
  dataInicioEstimada: string;
  precoMaximo: number;
  precoMinimo: number;
  proBono: boolean;
  permitePerguntas: boolean;
  exclusivo: boolean;
  habilidadesComportamentais: string;
  habilidadesTecnicas: string;
  arquivos: IAnexos[];
  status: {
    codigo: string;
    descricao: string;
  };
  idPessoaConsumidor: number;
  propostaAceita: PropostaAceitaProps;
  origemServico: boolean;
  pessoaConsumidor: {
    arquivo: {
      id: string;
      url: string;
    };
    ativo: boolean;
    consumidor: boolean;
    fornecedor: boolean;
    id: number;
    nome: string;
    nomeTratamento: string;
  };
  pessoaFornecedor: {
    arquivo: {
      id: string;
      url: string;
    };
    ativo: boolean;
    consumidor: boolean;
    fornecedor: boolean;
    id: number;
    nome: string;
    nomeTratamento: string;
  };
  desistencia: DesistenciaProps;
  escopo: string;
  totalHoras: number;
}

export interface DesistenciaProps {
  id: number;
  idPessoa: number;
  porcentagemCombinada: number;
  acordoRecusado: boolean;
  descricao: string;
  dataHoraUltimaAtualizacao: string;
}

export interface EtapasProps {
  id: number;
  idProjeto: number;
  status: {
    codigo: string;
    descricao: string;
  };
  dataOcorrencia: string;
  usuarioOcorrencia: string;
}

const PropostaFornecedorContext = createContext<PropostaFornecedorContextProps>(
  {} as PropostaFornecedorContextProps,
);

export const PropostaFornecedorProvider: React.FC<GlobalLayoutProps> = ({ children }) => {
  const [idProposta, setIdProposta] = useState<number | undefined>(undefined);
  const [mensagemDica, setMensagemDica] = useState('');
  const [dataInicio, setDataInicio] = useState<string | undefined>();
  const [dataFinal, setDataFinal] = useState<string | undefined>();
  const [dica, setDica] = useState(false);
  const [project, setProject] = useState<ProjetoProps>({} as ProjetoProps);
  const [etapas, setEtapas] = useState<EtapasProps[]>([] as EtapasProps[]);
  const [anexo, setAnexo] = useState<File[]>([]);
  const [editar, setEditar] = useState(false);
  const [proposaAlreadySubmitted, setProposaAlreadySubmitted] = useState(false);
  const [profileInModeration, setProfileInModeration] =
    useState<boolean>(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [metodoEntrega, setMetodoEntrega] = useState<string[]>([]);
  const [requisitos, setRequisitos] = useState<string[]>([]);
  const [condicoesGerais, setCondicoesGerais] = useState<string[]>([]);
  const [buscaProjeto, setBuscaProjeto] = useState<boolean>(false);
  const history = useHistory();
  const schema = Yup.object().shape({});
  const [isLoading, setIsLoading] = useState(false);
  const [isProBono, setIsProBono] = useState(false);
  const idProject = window.location.href.split('/')[5];
  const [arquivosDaProposta, setArquivosDaProposta] = useState<string[]>([]);

  const {
    control,
    setValue,
    getValues,
    setError,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mostrarDicaAntonio = (dica: string) => {
    setDica(true);
    setMensagemDica(dica);
  };

  useEffect(() => {
    oportunidades_api
      .get<ProjetoProps>(`/projetos/${idProject}`)
      .then(({ data }) => {
        setIsProBono(data.proBono);
      });
  }, [idProject]);

  const handleOnSubmit = async () => {
    setIsLoading(true);
    const description = getValues('description');
    let proposalAmount = getValues('valor_proposta');
    const totalHoras = getValues('total_horas');

    if (project.escopo === 'ABERTO') {
      proposalAmount = Number(proposalAmount) * project.totalHoras;
    }

    if (project.escopo === 'FECHADO') {
      proposalAmount = getValues('valor_proposta');
    }

    if (!dataInicio) {
      setIsLoading(false);
      setError('dias_inicial', {
        type: 'custom',
        message: 'Adicione o dia de inicio.',
      });
    } else {
      setIsLoading(false);

      setError('dias_inicial', {
        type: 'custom',
        message: undefined,
      });
    }

    const dateStart = Number(
      dataInicio === 'dias_inicial'
        ? (getValues('dias_inicial') as string)
        : dataInicio,
    );
    const currentDate = new Date();
    const estimatedStartDate = addMinutes(
      addDays(currentDate, dateStart),
      -currentDate.getTimezoneOffset(),
    );

    if (!dataFinal) {
      setIsLoading(false);

      setError('dias_final', {
        type: 'custom',
        message: 'Adicione o dia de término.',
      });
    } else {
      setIsLoading(false);

      setError('dias_final', {
        type: 'custom',
        message: undefined,
      });
    }

    if (dataInicio === 'dias_inicial' && !getValues('dias_inicial')) {
      setIsLoading(false);
      setError('dias_inicial', {
        type: 'custom',
        message: 'Adicione um prazo em dias.',
      });
    }

    if (dataFinal === 'dias_final' && !getValues('dias_final')) {
      setIsLoading(false);
      setError('dias_final', {
        type: 'custom',
        message: 'Adicione um prazo em dias.',
      });
    }

    const deadline =
      dataFinal === 'dias_final' ? getValues('dias_final') : dataFinal;

    if (!description) {
      setIsLoading(false);
      setError('description', {
        type: 'custom',
        message: 'Preencha os dados da descrição',
      });
    } else if (description?.length < 100) {
      setIsLoading(false);
      setError('description', {
        type: 'custom',
        message: 'A descrição deve ter pelo menos 100 caracteres',
      });
      return;
    } else if (description?.length > 1000) {
      setIsLoading(false);
      setError('description', {
        type: 'custom',
        message: 'A descrição ultrapassou o limite maximo de 1000 caracteres',
      });
      return;
    } else {
      setIsLoading(false);
      setError('description', {
        type: 'custom',
        message: undefined,
      });
    }

    if (project.escopo === 'FECHADO' && requisitos.length === 0) {
      setIsLoading(false);
      setError('metodo_aceite_cliente', {
        type: 'custom',
        message: 'Adicione uma habilidade que você precise do cliente',
      });
      return;
    } else {
      setIsLoading(false);
      setError('metodo_aceite_cliente', {
        type: 'custom',
        message: undefined,
      });
    }

    if (project.escopo === 'FECHADO' && !metodoEntrega.length) {
      setIsLoading(false);
      setError('metodo_entrega', {
        type: 'custom',
        message: 'Adicione os métodos de entrega ou entregáveis',
      });
      return;
    } else {
      setIsLoading(false);
      setError('metodo_entrega', {
        type: 'custom',
        message: undefined,
      });
    }

    if (isProBono === false && proposalAmount === 0) {
      setIsLoading(false);
      setError('valor_proposta', {
        type: 'custom',
        message: 'Adicione o valor da proposta',
      });

      return;
    } else if (Number(proposalAmount) > 10000) {
      setIsLoading(false);
      setError('valor_proposta', {
        type: 'custom',
        message: 'O valor máximo por proposta é de R$ 10.000,00',
      });

      return;
    } else if (isProBono === false && Number(proposalAmount) < 30) {
      setIsLoading(false);
      setError('valor_proposta', {
        type: 'custom',
        message: 'O valor minimo por proposta é de R$ 30,00',
      });

      return;
    } else if (totalHoras > 1000) {
      setIsLoading(false);

      setError('total_horas', {
        type: 'custom',
        message: 'O total de horas não pode ser superior a 1000.',
      });

      return;
    } else {
      setIsLoading(false);
      setError('total_horas', {
        type: 'custom',
        message: undefined,
      });
    }

    const body = {
      descricao: description,
      prazo_conclusao: deadline,
      data_inicio_estimada: estimatedStartDate,
      valor: project.proBono ? 0 : proposalAmount,
      entregaveis: metodoEntrega,
      requisitos: requisitos,
      parcelas: 1,
      total_horas: totalHoras,
      condicoes_gerais: condicoesGerais,
    };

    if (editar === false) {
      setIsLoading(true);
      try {
        const response = await oportunidades_api.post(
          `/projetos/${idProject}/propostas`,
          body,
        );
        setSuccessModalIsOpen(true);

        setTimeout(async () => {
          if (anexo) {
            const formData = new FormData();
            anexo.forEach(a => formData.append('arquivos', a));
            await oportunidades_api.patch(
              `/projetos/propostas/${response.data.id}/arquivos`,
              formData,
            );
          }
          setIsLoading(false);
        }, 1500);

        setTimeout(() => {
          setSuccessModalIsOpen(false);

          history.push('/fornecedor/propostas', {
            idProposta: response.data.id,
            idProjeto: response.data.idProjeto,
          });
        }, 3000);
        setIsLoading(false);
        return;
      } catch (error: any) {
        setIsLoading(false);
        checkErrorFromAPI(error.response.data.message);
        return;
      }
    }

    if (editar === true) {
      setIsLoading(true);
      const todosArquivos: string[] = [];
      try {
        for (let i = 0; i < anexo.length; i++) {
          if (typeof anexo[i] !== 'string') {
            const formData = new FormData();
            formData.append('file', anexo[i]);
            const response = await geral_api.post<any>(`/arquivos`, formData);
            todosArquivos.push(response.data.id);
          }
        }
        const allFiles = todosArquivos.concat(arquivosDaProposta);
        const arquivosSalvos = allFiles.filter(function (este, i) {
          return allFiles.indexOf(este) === i;
        });
        const bodyEditar: {
          [key: string]:
            | any
            | any
            | Date
            | number
            | any
            | any
            | number
            | any
            | string[]
            | any[];
        } = {};

        if (description) bodyEditar['descricao'] = description;
        if (deadline) bodyEditar['prazo_conclusao'] = deadline;
        if (proposalAmount) bodyEditar['valor'] = Number(proposalAmount);
        if (estimatedStartDate)
          bodyEditar['data_inicio_estimada'] = estimatedStartDate;
        bodyEditar['entregaveis'] = metodoEntrega.map((i: any) => {
          return {
            descricao: i,
          };
        });
        bodyEditar['requisitos'] = requisitos.map((i: any) => {
          return {
            descricao: i,
          };
        });
        bodyEditar['parcelas'] = 1;
        if (totalHoras) bodyEditar['total_horas'] = totalHoras;
        if (arquivosSalvos) bodyEditar['ids_arquivos'] = arquivosSalvos;
        if (condicoesGerais.length && condicoesGerais[0] !== '')
          bodyEditar['condicoes_gerais'] = condicoesGerais.map((i: any) => i);

        const response = await oportunidades_api.put(
          `/projetos/propostas/${idProposta}`,
          {
            ...bodyEditar,
          },
        );

        setTimeout(() => {
          history.push('/fornecedor/propostas', {
            idProposta: response.data.id,
            idProjeto: response.data.idProjeto,
          });
        }, 3000);
        setIsLoading(false);
        return;
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };

  const checkErrorFromAPI = (errorMessage: string) => {
    const knownErros = {
      proposaAlreadySubmitted:
        'Fornecedor já enviou proposta para este projeto',
      profileInModeration:
        'Cadastro ainda não passou pela moderação e não pode apresentar propostas',
    };

    if (errorMessage === knownErros.proposaAlreadySubmitted) {
      setProposaAlreadySubmitted(true);
      return;
    }
    if (errorMessage === knownErros.profileInModeration) {
      setProfileInModeration(true);
      return;
    }
  };

  return (
    <PropostaFornecedorContext.Provider
      value={{
        arquivosDaProposta,
        setArquivosDaProposta,
        idProposta,
        dataFinal,
        setDataFinal,
        setIdProposta,
        setDataInicio,
        dataInicio,
        mensagemDica,
        setMensagemDica,
        dica,
        setDica,
        mostrarDicaAntonio,
        control,
        watch,
        reset,
        errors,
        setValue,
        handleOnSubmit,
        project,
        setProject,
        etapas,
        setEtapas,
        getValues,
        setAnexo,
        anexo,
        editar,
        setEditar,
        proposaAlreadySubmitted,
        setProposaAlreadySubmitted,
        profileInModeration,
        setProfileInModeration,
        successModalIsOpen,
        setSuccessModalIsOpen,
        metodoEntrega,
        setMetodoEntrega,
        requisitos,
        setRequisitos,
        buscaProjeto,
        setBuscaProjeto,
        isLoading,
        setIsLoading,
        condicoesGerais,
        setCondicoesGerais,
      }}
    >
      {children}
    </PropostaFornecedorContext.Provider>
  );
};

export function usePropostaFornecedor(): PropostaFornecedorContextProps {
  const context = useContext(PropostaFornecedorContext);

  if (!context) {
    throw new Error(
      'usePropostaFornecedor must be used within an CadastroServicoProvider',
    );
  }

  return context;
}
