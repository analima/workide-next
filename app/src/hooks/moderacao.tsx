export interface IPessoaModeracaoProps {
  id?: number;
  nome?: string;
  nomeReceita?: string;
  email?: string;
  ativo?: boolean;
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
  data_hora_ultima_alteracao: Date;
  moderacao: boolean;
  usuario:IUsuario;
}

export interface IUsuario {
  id?: number;
  email: string;
  tipo: string;
  data_hora_ultima_alteracao: Date;
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



