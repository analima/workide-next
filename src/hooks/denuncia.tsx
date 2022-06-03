import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

export interface IPessoaDenunciaProps {
  id?: number;
  nome?: string;
  email?: string;
  ativo?: boolean;
  nome_tratamento?: string;
  tipo_pessoa?: number;
  codigo_cadastro_pessoa?: string;
  enderecos: IEndereco[];
  profissoes: IProfissao[];
  graduacoes: IGraduacao[];
  telefones: ITelefone[];
  pos_graduacoes: IPosGraduacao[];
  certificacoes: ICertificacao[];
  cursos: ICurso[];
  redes_sociais: IRedeSocial[];
  categorias_especialidade: ICategoriaEspecialidade[];
  subareas_interesse: ISubarea[];
  denuncias: IDenunciaProps[];
  dados_recebimento: IDadosRecebimento;
  data_hora_ultima_alteracao: Date;
  data_hora_criacao: Date;
  moderacao: boolean;
  usuario: IUsuario;
}

export interface IUsuario {
  id?: number;
  email: string;
  tipo: string;
  data_hora_ultima_alteracao: Date;
}

export interface IDenunciaProps {
  id?: number;
  emailDenunciante: string;
  nomeDenunciante: string;
  numeroTelefoneDenunciante: string;
  dataDenuncia: Date;
  linkDenunciado: string;
  tipoMotivo: string;
  motivo: string;
  procede: boolean;
  dataUltimaAlteracaouncia: Date;
  usuarioUltimaAlteracao: string;
  date: string;
  denunciado: string;
  usuario: IUsuario;
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

export interface ITelefone {
  id?: number;
  tipo: number;
  codigo_pais?: string;
  ddd?: string;
  numero?: string;
  whatsapp?: string;
  ativo?: string;
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

export interface IDenuncia {
  denuncia: IDenunciaProps;
  setDenuncia: Dispatch<SetStateAction<IDenunciaProps>>;
  pessoa: IPessoaDenunciaProps;
  setPessoa: Dispatch<SetStateAction<IPessoaDenunciaProps>>;
  atualizarPessoa(pessoaTemp: IPessoaDenunciaProps): void;
}

export const DenunciaContext = createContext<IDenuncia>({} as IDenuncia);

export const DenunciaProvider: React.FC = ({ children }) => {
  const [denuncia, setDenuncia] = useState<IDenunciaProps>(
    {} as IDenunciaProps,
  );
  const [pessoa, setPessoa] = useState<IPessoaDenunciaProps>(
    {} as IPessoaDenunciaProps,
  );

  function atualizarPessoa(pessoaTemp: IPessoaDenunciaProps): void {
    setPessoa(pessoaTemp);
  }

  return (
    <DenunciaContext.Provider
      value={{
        denuncia,
        setDenuncia,
        pessoa,
        setPessoa,
        atualizarPessoa,
      }}
    >
      {children}
    </DenunciaContext.Provider>
  );
};

export function useDenuncia(): IDenuncia {
  const context = useContext(DenunciaContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
