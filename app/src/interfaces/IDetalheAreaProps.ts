import { StaticImageData } from 'next/image';

export interface IPerguntasAreasProps {
  id: number;
  nome: string;
  image: StaticImageData;
  perguntas: IPerguntasProps[];
}
export interface IPerguntasProps {
  id: number;
  pergunta: string;
  resposta: string;
  subresposta?: string[];
}

export interface IAreaProps {
  id: number;
  descricao: string;
  subareas: ISubarea[];
}

export interface ISubarea {
  id: number;
  id_subarea_interesse: number;
  descricao: string;
}
