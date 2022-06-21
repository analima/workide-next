import styled from 'styled-components';
import {
  AZUL,
  BRANCO,
  CINZA_20,
  CINZA_80,
  LARANJA,
  PRETO_40,
  PRETO_60,
} from '../../../../../styles/variaveis';

type ToggleButtonProps = {
  checked: boolean;
};

interface SizeProps {
  sizeFilter: string;
}

export const Content = styled.div<SizeProps>`
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

  @media (max-width: 178px) {
    width: 100%;
  }
`;

export const ContentIcon = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 2px;
  margin-bottom: ${({ sizeFilter }: SizeProps) =>
    sizeFilter === 'small' ? '0px' : '16px'};
  padding: 4px;

  > svg {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  span {
    font-size: 12px;
    color: ${PRETO_40};
  }
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

type PropsGrupo = {
  isGrid?: boolean;
};

export const Grupo = styled.div<PropsGrupo>`
  margin-top: 24px;
  display: ${props => (props.isGrid ? 'grid' : 'block')};
  grid-template-columns: repeat(2, 158px);
  grid-gap: 15px;

  @media (max-width: 400px) {
    grid-template-columns: repeat(2, 140px);
    align-items: center;
    justify-content: center;
  }
`;

export const HabilidadesSelecionadas = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  border: 1px solid ${CINZA_20};
  border-radius: 4px;
  padding: 8px;

  .hab-select {
    background-color: ${AZUL};
    color: white;
    font-size: 16px;
    padding: 4px 8px;
    border-radius: 4px;
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

const checkedButton = `
  background-color: ${AZUL};
  color: ${BRANCO};
`;

const uncheckedButton = `
  background-color: ${BRANCO};
  color: ${AZUL};
`;

export const ToggleButton = styled.button<ToggleButtonProps>`
  padding: 16px 40px;
  font-weight: 700;
  font-size: 16px;
  color: #008fe5;
  ${props => (props.checked ? checkedButton : uncheckedButton)}
  border-radius: 8px;
  border: 1px solid ${AZUL};
  font-size: 12px;
  text-decoration: none;
  transition: background-color 0.25s;

  @media (max-width: 400px) {
    padding: 16px 16px;
    width: 100%;
  }
`;

export const TypographyVolunteers = styled.p`
  margin: 0;
  font-weight: bold;
  margin-bottom: 16px;
  color: #6d6d6d;
`;

export const ContentToggle = styled.div`
  label {
    color: ${LARANJA} !important;
    font-size: 20px;
    font-weight: 700;
  }
`;

export const ContentCheck = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }
`;
