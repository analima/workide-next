import styled from 'styled-components';
import { AZUL, BRANCO, LARANJA } from '../../../../../styles/variaveis';

export const Container = styled.div`
  .resultados {
    font-size: 10px;
    margin-top: 16px;
  }
`;

export const GrupoResultado = styled.div`
  padding: 8px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SubAreaContainer = styled.div`
  padding: 8px 0;

  .areas {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 768px) {
    .areas {
      flex-wrap: wrap;
      gap: 4px;
    }
  }
`;

interface NameProps {
  select: boolean;
}

export const NameArea = styled.span<NameProps>`
  padding: 8px;
  background-color: ${({ select }) => (select ? LARANJA : AZUL)};
  font-size: 12px;
  font-weight: 600;
  color: ${BRANCO};
  border-radius: 4px;
  text-align: center;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px;
  }
`;

export const SubAreaItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-top: 20px;

  .form-check {
    display: flex;
    align-items: center;

    > .form-check-input {
      margin-left: 0;
    }

    label {
      font-weight: 500;
      font-size: 14px;
      margin: 0;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 478px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, auto));
  }
`;
