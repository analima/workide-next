import { pessoas_api } from '../services/pessoas_api';

interface IEndereco {
  id: number;
  cep: string;
  id_municipio: number;
  endereco: string;
  complemento: string | null;
  usuario_ultima_alteracao: string;
  data_hora_ultima_alteracao: string;
}

interface IPremiacao {
  ativo: boolean;
  cd_tipo_premiacao: number;
  dataCriacao: string;
  dataUltimaAlteracao: string;
  id: number;
  quantidade: number;
}

interface IProfissao {
  data_hora_ultima_alteracao: string;
  descricao: string;
  id: number;
  usuario_ultima_alteracao: string;
}

interface IDenuncia {
  dataDenuncia: string;
  dataUltimaAlteracao: string;
  emailDenunciante: string;
  id: number;
  idPessoa: number;
  linkDenunciado: string;
  motivo: string;
  nomeDenunciante: string;
  numeroTelefoneDenunciante: string;
  procede: null;
  tipoMotivo: string;
  usuarioUltimaAlteracao: string;
}

interface IUsuario {
  data_hora_ultima_alteracao: string;
  email: string;
  id: number;
}

interface UserData {
  areas_atuacao: null | Array<string>;
  ativo: boolean;
  bio: null | string;
  bloqueadoDenuncia: boolean;
  codigo_cadastro: string;
  configuracao_consumidor: any;
  configuracao_fornecedor: any;
  consumidor: boolean;
  data_hora_criacao: string;
  data_hora_ultima_alteracao: string;
  denuncias: Array<IDenuncia>;
  fornecedor: boolean;
  fundador: boolean;
  habilidadesPercebidas: string | null;
  habilidades_comportamentais: string | null;
  habilidades_tecnicas: string | null;
  id: number;
  id_arquivo: string;
  id_usuario: number;
  endereco: IEndereco;
  moderacao: null | boolean;
  motivoReprovacao: null | string;
  nivel_experiencia: string;
  nome: string;
  nome_tratamento: string;
  ong: boolean;
  percetageRegister: number;
  plano: string;
  premiacoes: Array<IPremiacao> | null;
  proBono: boolean;
  profissoes: Array<IProfissao> | null;
  recomendacoes: Array<any>;
  resumoProfissional: string | null;
  telefone_consumidor: string | null;
  telefone_fornecedor: string | null;
  tipo: string;
  url_video_apresentacao: string | null;
  usuario: IUsuario;
  usuario_ultima_alteracao: string;
  valido: boolean;
  visitante: boolean;
  voluntariado: boolean;
}

export async function getUserData(id_usuario: number | undefined) {
  try {
    let data: UserData;
    const response = await pessoas_api.get(
      `/pessoas/?id_usuario=${id_usuario}`,
    );
    data = response.data;
    return data;
  } catch (error: any) {
    return error.response;
  }
}
