interface IAttributesCover {
  attributes: {
    size: number;
    url: string;
    width: number;
    height: number;
    provider: string;
    providerUrl: string;
  };
}

interface IPropsCover {
  data: IAttributesCover;
}
interface IAttributes {
  createdAt: string;
  description: string;
  publishedAt: string;
  slug: string;
  title: string;
  updatedAt: string;
  viewsCount: string;
  cover: IPropsCover;
}

export interface IPostProps {
  attributes: IAttributes;
  id: number;
}

export interface IStatsProps {
  projetos: number;
  usuarios: number;
  horas: number;
  voluntarios: number;
  projetosvoluntarios: number;
  ongs: number;
  pessoasAtendidas: number;
}
