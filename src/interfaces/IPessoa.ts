export interface IPessoa {
  id?: number;
  nome?: string;
  email?: string;
  id_usuario?: number;
  id_pessoa?: number;
  tipo?: 'PF' | 'PJ';
  ong?: boolean;
  nome_tratamento?: string;
  data_nascimento?: string;
  telefone_fornecedor?: string;
  codigo_cadastro?: string;
  resumo_profissional?: string;
  url_video_apresentacao?: string;
  url_avatar?: string;
  id_arquivo?: string;
  habilidades_tecnicas?: string;
  habilidades_comportamentais?: string;
  nivel_experiencia?: string;
  proBono?: boolean;
  voluntariado?: boolean;
  fornecedor?: boolean;
  visitante?: boolean;
  consumidor?: boolean;
  admin?: boolean;
  fundador?: boolean;
  valido?: boolean;
  ativo?: boolean;
  moderacao?: boolean;
  qtAcessos?: number;
  percentageRegisterProvider?: number;
  percentageRegisterConsumer?: number;
  habilidadesPercebidas?: string;
  plano?: string;
  denuncias: any[];
  endereco?: {
    id: number;
    cep: string;
    id_municipio: number;
    endereco: string;
    bairro: string;
    numero: number;
    complemento: string;
  };
  recomendacoes?: {
    id: string;
    emailRecomendador: string;
    recomendador: string;
    empresa?: string;
    recomendacao: string;
    habilidadesLike?: string;
    habilidadesDislike?: string;
    fixa?: boolean;
  }[];
  premiacoes?: {
    id: number;
    tipoPremiacao: {
      id: number;
      descricao: string;
      quantidade: number;
      tag: string;
    };
    ativo: boolean;
    quantidade: number;
  }[];
  profissoes?: {
    id: number;
    descricao: string;
  }[];
  ranking?: {
    pontuacaoTotal: number;
    notaMedia: number;
  };
}
