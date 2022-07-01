import styled from 'styled-components';
import { CINZA_80, PRETO_40, PRETO_60 } from '../../../../../styles/variaveis';

interface SizeProps {
  sizeFilter: string;
}

const Content = styled.div<SizeProps>`
  border: 1px solid ${PRETO_40};
  padding: ${({ sizeFilter }) => (sizeFilter === 'small' ? '0px' : '8px')};
  border-radius: 8px;

  ul {
    list-style: none;
    padding: 0;
  }

  .form-check {
    padding-left: 0;
  }

  button {
    right: 0;
  }
`;

export const ContentIcon = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: ${({ sizeFilter }: SizeProps) =>
    sizeFilter === 'small' ? '0px' : '8px'};

  > svg {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const TypographyTitle = styled.p`
  font-family: 'Renner';
  font-style: normal;
  font-weight: 700;
  color: ${PRETO_60};
  font-size: 16px;
  margin: 0;
`;

export const Grupo = styled.div`
  margin-top: 24px;
`;

export const SubAreaContainer = styled.div`
  padding: 8px 0;
`;

export const SubArea = styled.div`
  padding: 8px 0;
`;

export const ContentFilter = styled.div`
  border: 1px solid ${CINZA_80};
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const HeaderTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;

  svg {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export default Content;
