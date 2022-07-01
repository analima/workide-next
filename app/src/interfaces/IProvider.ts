import { IProject } from './IProject';

export interface IUser {
  admin: boolean;
  data_hora_ultima_alteracao: string;
  email?: string;
  id: number;
}

export interface IRanking {
  dataHoraUltimaAlteracao: string;
  id: number;
  idPessoa: number;
  notaMedia: string;
  pontuacaoTotal?: number;
}

export interface IProfissao {
  data_hora_ultima_alteracao: string;
  descricao: string;
  id: number;
  usuario_ultima_alteracao: string;
}

export interface IProviderLittle {
  arquivo: IArquivo;
  ativo: boolean;
  consumidor: boolean;
  fornecedor: boolean;
  id: number;
  nome: string;
  nomeTratamento: string;
  usuario?: IUser;
}

export interface IPremiacao {
  ativo: boolean;
  cd_tipo_premiacao: number;
  dataCriacao: string;
  dataUltimaAlteracao: string;
  id: number;
  quantidade: number;
  tipoPremiacao: ITipoPremiacao;
}

export interface ITipoPremiacao {
  descricao: string;
  id: number;
  quantidade: number;
  tag: string;
}

export interface IEndereco {
  bairro: string;
  cep: string;
  complemento: string;
  data_hora_ultima_alteracao: string;
  endereco: string;
  id: number;
  id_municipio: number;
  numero: number;
  usuario_ultima_alteracao: string;
  municipio: IMunicipio;
}

export interface ICursoPessoa {
  carga_horaria: any;
  data_hora_ultima_alteracao: string;
  descricao: string;
  id: number;
  local: any;
  usuario_ultima_alteracao: string;
}

export interface IArquivo {
  id: string;
  nome: string;
  url: string;
}

export interface IGraduacao {
  id: number;
  descricao: string;
}

export interface IPosGraduacao {
  id: number;
  sentido: string;
  tipo: string;
  descricao: string;
  local: string;
  data_hora_ultima_alteracao: string;
  usuario_ultima_alteracao: string;
}

export interface ICategoriaEspecialidade {
  id: number;
  descricao: string;
}

export interface ISubareaInteresse {
  id: number;
  id_area_interesse: number;
  descricao: string;
  areaInteresse: IAreaInteresse;
}

export interface IAreaInteresse {
  id: number;
  descricao: string;
  dataHoraCriacao: string;
}

export interface ICertificacao {
  data_hora_ultima_alteracao: string;
  descricao: string;
  id: number;
  orgao_certificador: string;
  usuario_ultima_alteracao: string;
}

export interface IEvaluation {
  dataHoraCriacao: string;
  descricao: string;
  idProjeto: number;
  nota: number;
  projeto: IProject;
  habilidadesPercebidas: string;
}

export interface IProvider {
  email?: string;
  arquivo: IArquivo;
  ativo: boolean;
  bloqueadoDenuncia: boolean;
  denuncias: any[];
  certificacoes: ICertificacao[];
  codigo_cadastro: string;
  consumidor: boolean;
  cursos: ICursoPessoa[];
  data_hora_criacao: string;
  data_hora_exclusao?: string;
  data_hora_ultima_alteracao: string;
  data_nascimento: string;
  fornecedor: boolean;
  fundador: boolean;
  habilidadesPercebidas: any;
  habilidades_comportamentais: string;
  habilidades_tecnicas: string;
  id: number;
  idEndereco: number;
  id_arquivo: string;
  id_usuario: number;
  is_membro: boolean;
  moderacao: boolean;
  motivoReprovacao: any;
  nivel_experiencia: 'BASICO' | 'INTERMEDIARIO' | 'AVANCADO' | 'ESPECIALISTA';
  nome: string;
  nome_tratamento: string;
  ong: boolean;
  percentageRegisterConsumer: number;
  percentageRegisterProvider: number;
  plano: string;
  posGraduacoes: IPosGraduacao[];
  graduacoes: IGraduacao[];
  premiacoes: IPremiacao[];
  categoriaEspecialidades: ICategoriaEspecialidade[];
  proBono: true;
  profissoes: IProfissao[];
  qtAcessos: number;
  ranking: IRanking;
  recomendacoes: any[];
  resumo_profissional: string;
  telefone_consumidor?: number;
  telefone_fornecedor: string;
  tipo: string;
  url_video_apresentacao: string;
  usuario: IUser;
  usuario_ultima_alteracao: string;
  valido: boolean;
  visitante: boolean;
  voluntariado: boolean;
  subareasInteresse: ISubareaInteresse[];
  causasSociais: ICausasProps[];
  endereco: IEndereco;
  idiomas: IIdiomaProps[];
  capa: ICapaProps;
}

interface IIdiomaProps {
  nivel: string;
  idioma: {
    id: number;
    descricao: string;
  };
}

interface ICapaProps {
  id: string;
  nome: string;
  url: string;
}

interface ICausasProps {
  id: number;
  descricao: string;
  url: string;
}

interface IMunicipio {
  id: number;
  nome: string;
  uf: string;
}
