import { IArquivo, IProviderLittle, ISubareaInteresse } from './IProvider';

export interface IProject {
  arquivos: IArquivo;
  causaSocial: any;
  dataHoraCriacao: string;
  dataHoraFim: string;
  dataHoraInicio: string;
  dataHoraUltimaAtualizacao: string;
  dataInicioEstimada: string;
  descricao: string;
  exclusivo: boolean;
  fornecedoresSelecionados: any[];
  habilidadesComportamentais: string | string[];
  habilidadesTecnicas: string | string[];
  id: number;
  idPessoaConsumidor: number;
  idPessoaFornecedor: number;
  niveisExperiencia: string;
  nome: string;
  origemServico: boolean;
  permitePerguntas: boolean;
  pessoaConsumidor: IProviderLittle;
  pessoaFornecedor: IProviderLittle;
  pessoasAtendidas: any;
  prazoConclusao: number;
  precoMaximo: string | number;
  precoMinimo: string | number;
  proBono: boolean;
  propostaAceita: IProposal;
  status: IStatus;
  subareas: ISubareaInteresse[];
  usuarioUltimaAtualizacao: string;
}

export interface IProposal {
  arquivos: IArquivo;
  dataHoraCriacao: string;
  dataHoraUltimaAtualizacao: string;
  dataInicioEstimada: string;
  descricao: string;
  entregaveis: IProposalDeliverable[];
  fornecedorSelecionado: boolean;
  id: number;
  idPessoaFornecedor: number;
  idProjeto: number;
  parcelas: number;
  prazoConclusao: number;
  requisitos: IProposalRequirement[];
  status: IStatus;
  totalHoras: number;
  usuarioUltimaAtualizacao: string;
  valor: number;
}

export interface IStatus {
  codigo: string;
  descricao: string;
}

export interface IProposalDeliverable {
  dataHoraUltimaAtualizacao: string;
  descricao: string;
  id: number;
  status: string;
}

export interface IProposalRequirement {
  dataHoraUltimaAtualizacao: string;
  descricao: string;
  id: number;
  status: string;
}

export interface Certificado {
  id: string;
  instituicao: {
    nome: string;
    urlImagem: string;
  };
  nomeProjeto: string;
  fornecedor: {
    nome: string;
    urlImagem: string;
  };
  areas: string[];
  totalHoras: number;
  tipo: string;
  token: string;
}
