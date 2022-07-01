import { IArquivo } from './IProvider';

export interface IFeedback {
  arquivo?: IArquivo;
  id: number;
  id_arquivo: string;
  ds_tipo: string;
  status: string;
  id_usuario: number;
  conclusao: string;
  conteudo: string;
  url_rota: string;
  data_criacao: string;
  nome_pessoa: string;
  email_usuario: string;
  priority?: string;
  message?: string;
  encaminhamento: string | null;
}
