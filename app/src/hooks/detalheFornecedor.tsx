import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import { GlobalLayoutProps } from '../interfaces/globalLayoutProps';
import { pessoas_api } from '../services/pessoas_api';

export interface IPessoaProps {
  id?: number;
  nome?: string;
  email?: string;
  nome_tratamento?: string;
  tipo_pessoa?: number;
  codigo_cadastro_pessoa?: string;
  enderecos: IEndereco[];
  profissoes: IProfissao[];
  graduacoes: IGraduacao[];
  pos_graduacoes: IPosGraduacao[];
  certificacoes: ICertificacao[];
  cursos: ICurso[];
  redes_sociais: IRedeSocial[];
  categorias_especialidade: ICategoriaEspecialidade[];
  subareas_interesse: ISubarea[];
  dados_recebimento: IDadosRecebimento;
}

export interface IProfissao {
  id?: number;
  descricao: string;
}

export interface IGraduacao {
  id?: number;
  id_graduacao: number;
  descricao?: string;
  situacao?: string;
  graduacao?: {
    descricao: string;
  };
}

export interface IPosGraduacao {
  id?: number;
  sentido: string;
  tipo: string;
  descricao?: string;
  local?: string;
}

export interface ICertificacao {
  id?: number;
  orgao_certificador: string;
  descricao: string;
}

export interface ICurso {
  id?: number;
  descricao: string;
  local: string;
  carga_horaria: number;
}

export interface IRedeSocial {
  id?: number;
  tipo: string;
  url: string;
}

export interface IArea {
  id?: number;
  descricao?: string;
  subareas?: ISubarea[];
}

export interface ICategoriaEspecialidade {
  id_categoria_especialidade?: number;
  descricao?: string;
}

export interface ISubarea {
  id?: number;
  id_subarea_interesse?: number;
  descricao?: string;
}

export interface IDadosRecebimento {
  id?: number;
  banco?: string;
  agencia?: string;
  conta_corrente?: string;
  tipo_chave?: string;
  pix?: string;
}

export interface IEndereco {
  id?: number;
  tipo: number;
  id_municipio: number;
  logradouro: string;
  complemento?: string;
  cep: string;
  bairro: string;
  numero: string;
}

export interface IRecomendacao {
  id?: number;
  emailRecomendador: string;
  recomendador: string;
  descricao?: string;
  empresa?: string;
  recomendacao?: string;
}

interface AbaSelecionada {
  indice: number;
  porcentagem: number;
}

interface CadastroComplementarContextProps {
  abaSelecionada: AbaSelecionada;
  setAbaSelecionada: Dispatch<SetStateAction<AbaSelecionada>>;
  pessoa: IPessoaProps;
  setPessoa: Dispatch<SetStateAction<IPessoaProps>>;
  updatePessoa: any;
  updateFornecedor: any;
}

const CadastroComplementarContext =
  createContext<CadastroComplementarContextProps>(
    {} as CadastroComplementarContextProps,
  );

export const CadastroComplementarProvider: React.FC<GlobalLayoutProps> = ({ children }) => {
  const [abaSelecionada, setAbaSelecionada] = useState<AbaSelecionada>({
    indice: 0,
    porcentagem: 20,
  });
  const [pessoa, setPessoa] = useState<IPessoaProps>({} as IPessoaProps);

  const updatePessoa = useCallback(async (updateData: IPessoaProps) => {
    return await pessoas_api.put('/pessoas', updateData);
  }, []);

  const updateFornecedor = useCallback(async (updateData: any) => {
    return await pessoas_api.put('/fornecedores', updateData);
  }, []);

  return (
    <CadastroComplementarContext.Provider
      value={{
        abaSelecionada,
        setAbaSelecionada,
        pessoa,
        setPessoa,
        updatePessoa,
        updateFornecedor,
      }}
    >
      {children}
    </CadastroComplementarContext.Provider>
  );
};

export function useCadastroComplementar(): CadastroComplementarContextProps {
  const context = useContext(CadastroComplementarContext);

  if (!context) {
    throw new Error(
      'useCadastroComplementar must be used within an CadastroComplementarProvider',
    );
  }

  return context;
}
