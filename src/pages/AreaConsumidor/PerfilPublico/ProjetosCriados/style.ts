import ScrollContainer from 'react-indiana-drag-scroll';
import styled from 'styled-components';
import { AZUL } from '../../../../styles/variaveis';

const Content = styled.section`
  .vitrine-projetos {
    display: flex;

    > div {
      &:not(:last-child) {
        margin-right: 16px;
      }
    }
  }
`;

export const Scroll = styled(ScrollContainer)`
  display: flex;
  gap: 16px;
  padding: 16px;
`;

export const CreatedProjects = styled.span`
  color: ${AZUL};
  font-weight: 400;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  @media (max-width: 992px) {
    display: block;
    text-align: start;
  }

  strong {
    font-weight: 800;
    font-size: 22px;
  }
`;

export default Content;
