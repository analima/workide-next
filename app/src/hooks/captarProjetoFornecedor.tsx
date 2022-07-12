import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
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
import { consultas_api } from '../services/consultas_api';
import { oportunidades_api } from '../services/oportunidades_api';
import { useAuth } from '../contexts/auth';
import { GlobalLayoutProps } from '../interfaces/globalLayoutProps';
import { IPessoa } from '../interfaces/IPessoa';

interface CaptarProjetoFornecedorContextProps {
  id?: number;
  setId: Dispatch<SetStateAction<number | undefined>>;
  control: Control<FieldValues, object>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  reset: UseFormReset<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  errors: any;
  pagina: number;
  setPagina: (page: number) => void;
  totalPaginas: number;
  totalPaginasExclusivo: number;
  proximaPagina: () => void;
  paginaAnterior: () => void;
  paginaExclusivo: number;
  proximaPaginaExclusivo: () => void;
  paginaAnteriorExclusivo: () => void;
  projetos: ProjectType[];
  projetosExclusivos: ProjectType[];
  projetosFavoritos: ProjectType[];
  obterProjetos: () => void;
  obterProjetosExclusivos: () => void;
  obterProjetosFavoritos: () => void;
  loadingProjetos: boolean;
  loadingProjetosExclusivos: boolean;
  filtrosAplicados: any;
  limparFiltros: () => void;
  avaliacao: number;
  setAvaliacao: Dispatch<SetStateAction<number>>;
  escopo: string;
  setEscopo: Dispatch<SetStateAction<string>>;
  mudar: boolean;
  setMudar: Dispatch<SetStateAction<boolean>>;
  causas: CausaProp[];
  setCausas: Dispatch<SetStateAction<CausaProp[]>>;
  sizeFilter: string;
  setSizeFilter: Dispatch<SetStateAction<string>>;
}

type AreaInteresse = {
  dataHoraCriacao: string;
  descricao: string;
  id: number;
};

export type SubAreaType = {
  id: number;
  descricao: string;
  areaInteresse: Array<AreaInteresse>;
};

export type SearchProjectsResponseType = {
  total: number;
  pages: number;
  values: ProjectType[];
};

export type ProjectType = {
  score?: number;
  dataHoraCriacao: string;
  dataHoraFim: null | string;
  dataHoraInicio: null | string;
  dataHoraUltimaAtualizacao: string;
  dataInicioEstimada: null | string;
  descricao: string;
  exclusivo?: boolean;
  habilidadesComportamentais: string[];
  habilidadesTecnicas: string[];
  id: number;
  idPessoaConsumidor: number;
  idPessoaFornecedor?: number;
  nivelExperiencia?: string;
  nome: string;
  permitePerguntas?: boolean;
  prazoConclusao: number;
  precoMaximo: number;
  precoMinimo: number;
  proBono: boolean;
  status: string;
  subareas: string[] | [];
  usuarioUltimaAtualizacao?: null | string;
  escopo: string;
  totalHoras: number;
};

export type CausaProp = {
  id: number;
  causasSociais: string;
  selected?: boolean;
};

const CaptarProjetoFornecedorContext =
  createContext<CaptarProjetoFornecedorContextProps>(
    {} as CaptarProjetoFornecedorContextProps,
  );

export const CaptarProjetoFornecedorProvider: React.FC<GlobalLayoutProps> = ({
  children,
}) => {
  const [id, setId] = useState<number | undefined>(undefined);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalPaginasExclusivo, setTotalPaginasExclusivo] = useState(1);
  const [paginaExclusivo, setPaginaExclusivo] = useState(1);
  const [projetos, setProjetos] = useState<ProjectType[]>([]);
  const [projetosExclusivos, setProjetosExclusivos] = useState<ProjectType[]>(
    [],
  );
  const [filtrosAplicados, setFiltrosAplicados] = useState<any>([]);
  const [projetosFavoritos, setProjetosFavoritos] = useState<ProjectType[]>([]);
  const [loadingProjetos, setLoadingProjetos] = useState(false);
  const [loadingProjetosExclusivos, setLoadingProjetosExclusivos] =
    useState(false);
  const [avaliacao, setAvaliacao] = useState(0);
  const [escopo, setEscopo] = useState('');
  const [mudar, setMudar] = useState(false);
  const [causas, setCausas] = useState<CausaProp[]>([]);
  const [sizeFilter, setSizeFilter] = useState('large');

  let { user } = useAuth();
  const schema = Yup.object().shape({});
  if (!user) {
    user = {} as IPessoa;
  }
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const obterProjetos = useCallback(async () => {
    setLoadingProjetos(true);
    const formData: {
      [key: string]: string | string[] | number | number[] | Date;
    } = {};
    const termo = getValues('pesquisa');
    const subareas = getValues('subareas');
    const habilidades = getValues('habilidades');
    const proBono = getValues('toggle_volutarios');
    const precoMinimo = getValues('preco_minimo');
    const precoMaximo = getValues('preco_maximo');
    const prazo = getValues('prazo');

    const periodoInicial = getValues('periodo_inicial');
    const periodoFinal = getValues('periodo_final');

    const niveisExperiencia: string[] = [];

    if (getValues('nivel_basico')) niveisExperiencia.push('INICIANTE');
    if (getValues('nivel_intermediario'))
      niveisExperiencia.push('INTERMEDIARIO');
    if (getValues('nivel_avancado')) niveisExperiencia.push('AVANCADO');
    if (getValues('nivel_especialista')) niveisExperiencia.push('ESPECIALISTA');

    if (termo) formData['termo'] = termo;
    if (subareas) formData['subareas'] = subareas;
    if (habilidades) formData['habilidades_tecnicas'] = habilidades;
    if (avaliacao)
      formData['avaliacao_consumidor'] = avaliacao === 0 ? '' : avaliacao;
    formData['escopo'] = escopo;

    if (proBono) formData['pro_bono'] = proBono;

    if (precoMinimo && !proBono) formData['preco_minimo'] = precoMinimo;
    if (precoMaximo && !proBono) formData['preco_maximo'] = precoMaximo;
    if (!precoMinimo && precoMaximo && !proBono) formData['preco_minimo'] = 0;
    if (prazo) formData['prazo'] = prazo;

    if (niveisExperiencia) formData['niveis_experiencia'] = niveisExperiencia;

    if (periodoInicial) formData['periodo_inicial'] = periodoInicial;
    if (periodoFinal) formData['periodo_final'] = periodoFinal;

    if (causas.length > 0)
      formData['ids_causas_sociais'] = causas.map(c => c.id);

    setFiltrosAplicados(formData);

    const { data } = await consultas_api.post<SearchProjectsResponseType>(
      `/consulta/oportunidades?limit=10&page=${pagina}`,
      {
        ...formData,
      },
    );
    setProjetos(data.values);
    setTotalPaginas(data.pages);
    setLoadingProjetos(false);
  }, [avaliacao, causas, escopo, getValues, pagina]);

  const limparFiltros = useCallback(() => {
    setMudar(!mudar);
    setValue('nivel_intermediario', false);
    setValue('nivel_basico', false);
    setValue('nivel_avancado', false);
    setValue('nivel_especialista', false);
    setAvaliacao(0);
    setEscopo('');
    setCausas([]);

    setValue('subareas', []);
    setValue('habilidades', []);

    setValue('preco_minimo', '');
    setValue('preco_maximo', '');

    obterProjetos();
  }, [mudar, obterProjetos, setValue]);

  const obterProjetosFavoritos = useCallback(async () => {
    try {
      const { data: novosFavoritos } = await oportunidades_api.get(
        '/projetos/favoritos',
      );
      setProjetosFavoritos(
        novosFavoritos.map((proj: any) => ({
          id: proj.id,
          nome: proj.nome,
          descricao: proj.descricao,
          subareas: proj.subareas.map((subarea: any) => subarea.descricao),
          precoMinimo: proj.precoMinimo,
          precoMaximo: proj.precoMaximo,
          idPessoaConsumidor: proj.idPessoaConsumidor,
          dataHoraCriacao: proj.dataHoraCriacao,
        })),
      );
    } catch (error: any) {
      console.error(error.response);
    }
  }, []);

  const obterProjetosExclusivos = useCallback(async () => {
    if (!user.id_pessoa) return;
    setLoadingProjetosExclusivos(true);

    const { data } = await oportunidades_api.get(`/projetos/selecionados`);
    setProjetosExclusivos(
      data.values
        .filter(
          (project: any) =>
            project.status.codigo === 'RECEBENDO_PROPOSTAS' ||
            project.status.codigo === 'PAUSADO',
        )
        .map((project: any) => ({
          id: project.id,
          nome: project.nome,
          descricao: project.descricao,
          subareas: project.subareas.map((subarea: any) => subarea.descricao),
          precoMinimo: project.precoMinimo,
          precoMaximo: project.precoMaximo,
          escopo: project.escopo,
          proBono: project.proBono,
          totalHoras: project.totalHoras,
          idPessoaConsumidor: project.idPessoaConsumidor,
          dataHoraCriacao: project.dataHoraCriacao,
        })),
    );

    setTotalPaginasExclusivo(data.pages);
    setLoadingProjetosExclusivos(false);
  }, [user.id_pessoa]);

  const proximaPagina = () => {
    setPagina(pagina + 1);
    setProjetos({} as ProjectType[]);
  };

  const paginaAnterior = () => {
    setPagina(pagina - 1);
    setProjetos({} as ProjectType[]);
  };

  const proximaPaginaExclusivo = () => {
    setPaginaExclusivo(paginaExclusivo + 1);
    setProjetosExclusivos({} as ProjectType[]);
  };

  const paginaAnteriorExclusivo = () => {
    setPaginaExclusivo(paginaExclusivo - 1);
    setProjetosExclusivos({} as ProjectType[]);
  };

  return (
    <CaptarProjetoFornecedorContext.Provider
      value={{
        id,
        setId,
        control,
        handleSubmit,
        reset,
        watch,
        errors,
        setValue,
        getValues,
        paginaExclusivo,
        proximaPaginaExclusivo,
        paginaAnteriorExclusivo,
        pagina,
        setPagina,
        totalPaginas,
        totalPaginasExclusivo,
        proximaPagina,
        paginaAnterior,
        projetos,
        projetosExclusivos,
        projetosFavoritos,
        obterProjetos,
        obterProjetosExclusivos,
        obterProjetosFavoritos,
        loadingProjetos,
        loadingProjetosExclusivos,
        filtrosAplicados,
        limparFiltros,
        avaliacao,
        setAvaliacao,
        escopo,
        setEscopo,
        mudar,
        setMudar,
        causas,
        setCausas,
        sizeFilter,
        setSizeFilter,
      }}
    >
      {children}
    </CaptarProjetoFornecedorContext.Provider>
  );
};

export function useCaptarProjetoFornecedor(): CaptarProjetoFornecedorContextProps {
  const context = useContext(CaptarProjetoFornecedorContext);

  if (!context) {
    throw new Error(
      'useCaptarProjetoFornecedor must be used within an CaptarProjetoFornecedorProvider',
    );
  }

  return context;
}
