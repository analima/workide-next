export interface IPacoteInfo {
  data_hora_criacao: string;
  data_hora_ultima_alteracao: string;
  descricao: string;
  id: number;
  nome: string;
  parcelas: number;
  prazo: number;
  preco: string | number;
  taxa: string;
  tempo: number;
  tipo: 'BASICO' | 'INTERMEDIARIO' | 'AVANCADO' | undefined;
  usuario_ultima_alteracao: string;
}

export interface IRequisito {
  data_hora_criacao: string;
  data_hora_ultima_alteracao: string;
  descricao: string;
  id: number;
  usuario_ultima_alteracao: string;
}

export interface IItens {
  avancado: boolean;
  basico: boolean;
  data_hora_criacao: string;
  data_hora_ultima_alteracao: string;
  descricao: string;
  id: number;
  intermediario: boolean;
  usuario_ultima_alteracao: string;
}

export interface IServicoExtra {
  acrescimo: number;
  data_hora_criacao: string;
  data_hora_ultima_alteracao: string;
  descricao: string;
  extra: string;
  id: number;
  nome: string;
  usuario_ultima_alteracao: string;
}

export interface IServicoInfo {
  idUsuario?: number;
  precoMaximo?: number;
  precoMinimo?: number;
  prazoMaximo?: number;
  prazoMinimo?: number;
  urlArquivo?: string;
  habilidades_tecnicas?: any;
  areas_atuacao?: any;
  areasAtuacao?: any;
  arquivo: {
    id: string;
    nome: string;
    url: string;
    data_ultima_alteracao: string;
  };
  ativo: boolean;
  cases_sucesso: any[];
  data_hora_criacao: string;
  data_hora_ultima_alteracao: string;
  descricao: string;
  id: number;
  id_arquivo: string;
  id_pessoa?: number;
  idPessoa?: number;
  nome: string;
  pacotes: IPacoteInfo[];
  primeira_reuniao_obrigatoria: boolean;
  requisitos: IRequisito[];
  servicos_extra: IServicoExtra[];
  subareas: any[];
  termo_autoria: boolean;
  url_apresentacao: string;
  usuario_ultima_alteracao: string;
  itens?: IItens[];
  favoritos: number;
  compartilhamentos: number;
  projetosIniciados: number;
  fornecedor?: IFornecedorProps;
}

interface IFornecedorProps {
  id: number;
  nome_tratamento: string;
  foto: {
    id: string;
    url: string;
  };
  ranking: {
    id: number;
    nota_media: number;
  };
}
