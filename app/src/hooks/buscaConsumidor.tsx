import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
} from 'react';

import { consultas_api } from '../services/consultas_api';
import { IFiltroOferta } from '../components/AreaConsumidor/Busca/Filtro';
import IFiltroFornecedor from '../components/AreaConsumidor/Busca/Filtro';
import { useQuery } from './geral';
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

interface BuscaFornecedorOfertaProps {
  control: Control<FieldValues, object>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  reset: UseFormReset<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  errors: any;

  volunteers: boolean;
  setVolunteers: Dispatch<SetStateAction<boolean>>;
  ofertaFiltro: boolean;
  setOfertaFiltro: Dispatch<SetStateAction<boolean>>;
  isEmpty: boolean;
  setIsEmpty: Dispatch<SetStateAction<boolean>>;
  isEmptyPro: boolean;
  setIsEmptyPro: Dispatch<SetStateAction<boolean>>;
  freelancer: boolean;
  setFreelancer: Dispatch<SetStateAction<boolean>>;
  consultant: boolean;
  setConsultant: Dispatch<SetStateAction<boolean>>;
  especialista: boolean;
  setEspecialista: Dispatch<SetStateAction<boolean>>;
  coaching: boolean;
  setCoaching: Dispatch<SetStateAction<boolean>>;
  mentor: boolean;
  setMentor: Dispatch<SetStateAction<boolean>>;
  term: string;
  setTerm: Dispatch<SetStateAction<string>>;
  filtroFornecedor: IFiltroFornecedor;
  setFiltroFornecedor: Dispatch<SetStateAction<IFiltroFornecedor>>;
  filtroOferta: IFiltroOferta;
  setFiltroOferta: Dispatch<SetStateAction<IFiltroOferta>>;
  people: PessoaProp[];
  setPeople: Dispatch<SetStateAction<PessoaProp[]>>;
  proPeople: PessoaProp[];
  setProPeople: Dispatch<SetStateAction<PessoaProp[]>>;
  pagina: number;
  setPagina: Dispatch<SetStateAction<number>>;
  totalPaginas: number;
  setTotalPaginas: Dispatch<SetStateAction<number>>;
  paginaPerfis: number;
  setPaginaPerfis: Dispatch<SetStateAction<number>>;
  totalPaginasPerfis: number;
  setTotalPaginasPerfis: Dispatch<SetStateAction<number>>;
  service: any;
  setService: any;
  showAvatarCadastroIncompleto: boolean;
  setShowAvatarCadastroIncompleto: Dispatch<SetStateAction<boolean>>;
  handleShowAvatarCadastroIncompleto: () => void;
  handleChangeVolunteers: () => void;
  handleSearch: (values: string) => void;
  sizeFilter: string;
  setSizeFilter: Dispatch<SetStateAction<string>>;
  basic: boolean;
  setBasic: Dispatch<SetStateAction<boolean>>;
  intermediary: boolean;
  setIntermediary: Dispatch<SetStateAction<boolean>>;
  advanced: boolean;
  setAdvanced: Dispatch<SetStateAction<boolean>>;
  specialist: boolean;
  setSpecialist: Dispatch<SetStateAction<boolean>>;
  niveisExperiencia: string[];
  setNiveisExperiencia: Dispatch<SetStateAction<string[]>>;
  avaliacao: number;
  setAvaliacao: Dispatch<SetStateAction<number>>;
  allFilters: any;
  setAllFilters: Dispatch<SetStateAction<any>>;
  atualizaBusca: () => void;
  limparFiltros: () => void;
  isMudar: boolean;
  setIsMudar: Dispatch<SetStateAction<boolean>>;
  causas: CausaProp[];
  setCausas: Dispatch<SetStateAction<CausaProp[]>>;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export type CausaProp = {
  id: number;
  causasSociais: string;
  selected?: boolean;
};

export type PessoaProp = {
  urlArquivo: string;
  tratamento: string;
  ranking: number;
  notaMedia: number;
  profissoes: string[];
  categoriasEspecialidades: string[];
  numProjetos: number;
  id: number;
  nome: string;
  idUsuario: number;
  inVoluntariado: boolean;
  areasInteresse: {
    descricao: string;
  }[];
  nivelExperiencia: string;
  habilidadesTecnicas: string;
};

type ISearchFornecedoresRequest = {
  termo?: string;
  in_voluntariado?: boolean;
  categorias?: string[];
  subareas?: string[];
  habilidades?: string[];
  niveis_experiencia?: string[];
  planos?: string[];
  avaliacao_fornecedor?: number | string | null;
  ids_causas_sociais?: number[];
};

type ISearchOfertasRequest = {
  termo?: string;
  subareas?: string[];
  habilidades_tecnicas?: string[];
  preco_minimo?: number;
  preco_maximo?: number;
  prazo?: number;
};

const BuscaFornecedorOferta = createContext<BuscaFornecedorOfertaProps>(
  {} as BuscaFornecedorOfertaProps,
);

export const BuscaFornecedorOfertaProvider: React.FC<GlobalLayoutProps> = ({
  children,
}) => {
  const query = useQuery();

  const [volunteers, setVolunteers] = useState<boolean>(false);
  const [ofertaFiltro, setOfertaFiltro] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isEmptyPro, setIsEmptyPro] = useState(false);
  const [freelancer, setFreelancer] = useState<boolean>(false);
  const [consultant, setConsultant] = useState<boolean>(false);
  const [especialista, setEspecialista] = useState<boolean>(false);
  const [coaching, setCoaching] = useState<boolean>(false);
  const [mentor, setMentor] = useState<boolean>(false);
  const [term, setTerm] = useState('');
  const [isMudar, setIsMudar] = useState(false);
  const [filtroFornecedor, setFiltroFornecedor] = useState<IFiltroFornecedor>(
    {},
  );
  const [filtroOferta, setFiltroOferta] = useState<IFiltroOferta>({});

  const [people, setPeople] = useState<PessoaProp[]>([]);
  const [proPeople, setProPeople] = useState<PessoaProp[]>([]);

  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const [paginaPerfis, setPaginaPerfis] = useState(1);
  const [totalPaginasPerfis, setTotalPaginasPerfis] = useState(1);

  const [service, setService] = useState([]);
  const [showAvatarCadastroIncompleto, setShowAvatarCadastroIncompleto] =
    useState(false);
  const [sizeFilter, setSizeFilter] = useState('small');

  const [basic, setBasic] = useState(false);
  const [intermediary, setIntermediary] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [specialist, setSpecialist] = useState(false);
  const [avaliacao, setAvaliacao] = useState(0);

  const [niveisExperiencia, setNiveisExperiencia] = useState<string[]>([]);
  const [allFilters, setAllFilters] = useState<any>({});
  const [causas, setCausas] = useState<CausaProp[]>([]);
  const [filter, setFilter] = useState<string>('');

  function handleShowAvatarCadastroIncompleto() {
    setShowAvatarCadastroIncompleto(!showAvatarCadastroIncompleto);
  }

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
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const atualizaBusca = useCallback(async () => {
    if (!ofertaFiltro) {
      const niveis: string[] = [];
      if (basic) niveis.push('BASICO');
      if (intermediary) niveis.push('INTERMEDIARIO');
      if (advanced) niveis.push('AVANCADO');
      if (specialist) niveis.push('ESPECIALISTA');

      const categorias: string[] = [];
      if (freelancer) categorias.push('Freelancer');
      if (consultant) categorias.push('Consultoria');
      if (especialista) categorias.push('Especialista');
      if (coaching) categorias.push('Coaching');
      if (mentor) categorias.push('Mentor');

      const fornecedoresQuery: ISearchFornecedoresRequest = {};

      if (term) fornecedoresQuery.termo = term;
      if (categorias.length) fornecedoresQuery.categorias = categorias;
      if (niveis.length) fornecedoresQuery.niveis_experiencia = niveis;

      if (filtroFornecedor.habilidades)
        fornecedoresQuery.habilidades = filtroFornecedor.habilidades;
      if (filtroFornecedor.inVoluntariado)
        fornecedoresQuery.in_voluntariado = filtroFornecedor.inVoluntariado;
      if (filtroFornecedor.subareas)
        fornecedoresQuery.subareas = filtroFornecedor.subareas;

      if (filtroFornecedor.causas)
        fornecedoresQuery.ids_causas_sociais = filtroFornecedor.causas.map(
          (causa: any) => causa.id,
        );

      if (avaliacao)
        fornecedoresQuery.avaliacao_fornecedor =
          avaliacao === 0 ? '' : avaliacao;

      setAllFilters(fornecedoresQuery);

      consultas_api
        .post<{ values: PessoaProp[]; pages: number }>(
          `/consulta/fornecedores?limit=${
            sizeFilter === 'small' ? '9' : 8
          }&page=${paginaPerfis}`,
          {
            ...fornecedoresQuery,
          },
        )
        .then(({ data }) => {
          setPeople(data?.values);
          setTotalPaginasPerfis(data?.pages);
        });

      consultas_api
        .post<{ values: PessoaProp[] }>('/consulta/fornecedores', {
          ...fornecedoresQuery,
          planos: ['profissional', 'premium'],
        })
        .then(({ data }) => setProPeople(data.values));
    } else {
      const ofertasQuery: ISearchOfertasRequest = {};

      if (term) ofertasQuery.termo = term;
      if (filtroOferta.subareas) ofertasQuery.subareas = filtroOferta.subareas;

      if (filtroOferta.habilidades)
        ofertasQuery.habilidades_tecnicas = filtroOferta.habilidades;

      if (filtroOferta.preco_minimo)
        ofertasQuery.preco_minimo = filtroOferta.preco_minimo;
      if (filtroOferta.preco_maximo)
        ofertasQuery.preco_maximo = filtroOferta.preco_maximo;
      if (filtroOferta.prazo) ofertasQuery.prazo = filtroOferta.prazo;

      setAllFilters(ofertasQuery);

      consultas_api
        .post(`/consulta/ofertas?limit=12&page=${pagina}`, {
          ...ofertasQuery,
        })
        .then(({ data }) => {
          setService(data.values);
          setTotalPaginas(data.pages);
        });
    }
  }, [
    ofertaFiltro,
    freelancer,
    consultant,
    especialista,
    coaching,
    mentor,
    term,
    filtroFornecedor,
    filtroOferta,
    pagina,
    paginaPerfis,
    sizeFilter,
    basic,
    intermediary,
    advanced,
    specialist,
    avaliacao,
  ]);

  const limparFiltros = useCallback(() => {
    setIsMudar(!isMudar);
    setFreelancer(false);
    setConsultant(false);
    setEspecialista(false);
    setCoaching(false);
    setMentor(false);
    setTerm('');
    setFiltroFornecedor({
      habilidades: [],
      inVoluntariado: false,
      subareas: [],
    });
    setFiltroOferta({
      subareas: [],
      preco_minimo: 0,
      preco_maximo: 0,
      prazo: 0,
    });
    setCausas([]);
    setAvaliacao(0);
    setBasic(false);
    setIntermediary(false);
    setAdvanced(false);
    setSpecialist(false);
  }, [isMudar]);

  const handleChangeVolunteers = useCallback(() => {
    setVolunteers(oldVolunteers => !oldVolunteers);
  }, []);

  useEffect(() => {
    setOfertaFiltro(query.get('oferta') === 'true');
    setVolunteers(query.get('voluntario') === 'true');
  }, [query]);

  useEffect(() => {
    setFiltroFornecedor((oldFiltro: any) => ({
      ...oldFiltro,
      inVoluntariado: volunteers,
    }));
  }, [volunteers]);

  useEffect(
    function atualizaPeopleEmpty() {
      setIsEmpty(people.length === 0);
      setIsEmptyPro(proPeople.length === 0);
    },
    [people, proPeople],
  );
  const handleSearch = (value: string) => {
    setTerm(value);
    setFilter(value);
  };

  return (
    <BuscaFornecedorOferta.Provider
      value={{
        control,
        handleSubmit,
        reset,
        watch,
        errors,
        setValue,
        getValues,

        volunteers,
        setVolunteers,
        ofertaFiltro,
        setOfertaFiltro,
        isEmpty,
        setIsEmpty,
        isEmptyPro,
        setIsEmptyPro,
        freelancer,
        setFreelancer,
        consultant,
        setConsultant,
        especialista,
        setEspecialista,
        coaching,
        setCoaching,
        mentor,
        setMentor,
        term,
        setTerm,
        filtroFornecedor,
        setFiltroFornecedor,
        filtroOferta,
        setFiltroOferta,
        people,
        setPeople,
        proPeople,
        setProPeople,
        pagina,
        setPagina,
        totalPaginas,
        setTotalPaginas,
        paginaPerfis,
        setPaginaPerfis,
        totalPaginasPerfis,
        setTotalPaginasPerfis,
        service,
        setService,
        showAvatarCadastroIncompleto,
        setShowAvatarCadastroIncompleto,
        handleShowAvatarCadastroIncompleto,
        handleChangeVolunteers,
        handleSearch,
        sizeFilter,
        setSizeFilter,
        basic,
        setBasic,
        intermediary,
        setIntermediary,
        advanced,
        setAdvanced,
        specialist,
        setSpecialist,
        niveisExperiencia,
        setNiveisExperiencia,
        avaliacao,
        setAvaliacao,
        allFilters,
        setAllFilters,
        atualizaBusca,
        limparFiltros,
        isMudar,
        setIsMudar,
        setCausas,
        causas,
        setFilter,
        filter,
      }}
    >
      {children}
    </BuscaFornecedorOferta.Provider>
  );
};

export function useBuscaFornecedorOferta(): BuscaFornecedorOfertaProps {
  const context = useContext(BuscaFornecedorOferta);

  if (!context) {
    throw new Error(
      'useBuscaFornecedorOferta must be used within an CaptarProjetoFornecedorProvider',
    );
  }

  return context;
}
