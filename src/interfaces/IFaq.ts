export interface IFaqPost {
  categoria: { id: string; descricao: string };
  tags: { id: string; descricao: string }[];
  conteudo: string;
  dataHoraCriacao: Date;
  id: number;
  score: number;
  tipoFaq: string;
  titulo: string;
  type: string;
}
