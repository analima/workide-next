import Link from 'next/link';
import { IAreaProps, ISubarea } from '../../interfaces/IDetalheAreaProps';
import { Content, ContentLabel, Label } from './styles';

interface IArea {
  area: IAreaProps;
}

export function MainCategories({ area }: IArea) {
  return (
    <Content>
      <h1>Conheça as principais categorias</h1>
      <span>
        Procurando algo mais?{' '}
        <Link href="/fornecedor/busca" target="blank">
          Veja mais habilidades
        </Link>
      </span>

      {area?.subareas && (
        <ContentLabel>
          {area.subareas.slice(0, 16).map((subarea: ISubarea) => (
            <Label key={subarea.id}>{subarea.descricao}</Label>
          ))}
        </ContentLabel>
      )}
    </Content>
  );
}
