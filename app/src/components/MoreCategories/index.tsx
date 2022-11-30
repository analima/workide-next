import {
  Container,
  ContentCategory,
  Content,
  ContentCategoryMobile,
} from './styles';
import Link from 'next/link';
import { IAreaProps, ISubarea } from '../../interfaces/IDetalheAreaProps';

interface IArea {
  area: IAreaProps;
}

export function MoreCategories({ area }: IArea) {
  return (
    <Container>
      <Content>
        <h1>Mais categorias</h1>

        {area?.descricao && (
          <span>Veja todas as categorias de <strong>{area.descricao}</strong></span>
        )}

        {area?.subareas && (
          <ContentCategory>
            {area.subareas.slice(0, 32).map((subarea: ISubarea) => (
              <span key={subarea.id}>
                {subarea.descricao[0].toUpperCase() +
                  subarea.descricao.substring(1)}
              </span>
            ))}
          </ContentCategory>
        )}

        {area?.subareas && (
          <ContentCategoryMobile>
            {area.subareas.slice(0, 10).map((subarea: ISubarea) => (
              <span key={subarea.id}>
                {subarea.descricao[0].toUpperCase() +
                  subarea.descricao.substring(1)}
              </span>
            ))}
          </ContentCategoryMobile>
        )}
      </Content>
    </Container>
  );
}
