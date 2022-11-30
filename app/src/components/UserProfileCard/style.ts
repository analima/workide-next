//import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  AZUL,
  AZUL_60,
  BRANCO,
  LARANJA,
  PRETO_10,
} from '../../styles/variaveis';

export const Content = styled.div`
  margin-top: 24px;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;

  .areas-de-interesse {
    @media (max-width: 992px) {
      width: 272px;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
  }

  .container {
    display: flex;
    padding: 16px;

    > div {
      padding: 0 32px;

      &:not(:last-child) {
        border-right: 1px solid ${AZUL_60};
      }
    }

    h2 {
      margin-bottom: 8px;
    }
  }
`;

export const Body = styled.div`
  @media (max-width: 992px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 478px) {
    flex-direction: column-reverse;
  }
`;

export const ContainerProfile = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 992px) {
    align-self: center;
  }
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
  }
  @media (max-width: 510px) {
    flex-direction: column-reverse;
  }
`;

export const Ranking = styled.p`
  font-size: 16px;
  color: ${PRETO_10};
  margin-bottom: 8px;
`;

export const NumProjetos = styled.p`
  font-size: 16px;
  color: ${PRETO_10};
  margin-bottom: 8px;
`;

export const Info = styled.div`
  @media (max-width: 992px) {
    width: 276px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 478px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const Profissao = styled.div`
  margin-top: 20px;
`;

export const FotoPerfil = styled.div`
  margin-bottom: 8px;
  object-fit: cover;

  @media (max-width: 478px) {
    display: flex;
    justify-content: center;
  }
`;

export const Foto = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 992px) {
    width: 124px;
    height: 124px;
  }
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

export const Avaliacao = styled.div`
  margin: 4px 0;
  display: flex;
  align-items: center;

  span {
    color: ${LARANJA};
    font-size: 16px;
    margin-right: 8px;
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;

export const Medalhas = styled.div`
  display: flex;
  margin-bottom: 8px;

  svg {
    width: 32px;
    height: 32px;
  }
`;

export const Footer = styled.div`
  margin-left: 4px;
`;

export const AreasInteresse = styled.div`
  margin: 8px 0;
  margin-top: 8px;
  @media (max-width: 478px) {
    text-align: center;
  }
`;

export const ResumoProfissional = styled.span`
  font-size: 16px;
  color: ${PRETO_10};
  word-wrap: break-word;
  text-align: left;
`;

export const InfoFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .cadastro-completo {
    font-size: 20px;
    font-weight: bold;
    color: ${LARANJA};
    cursor: pointer;

    @media (max-width: 992px) {
      font-size: 1.4rem;
    }

    @media (max-width: 478px) {
      font-size: 1rem;
    }
  }

  .botoes {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 992px) {
      width: 100%;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
    @media (max-width: 478px) {
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    * {
      margin-right: 8px;
    }
  }

  @media (max-width: 992px) {
    width: 100%;
  }
`;

export const Area = styled.label`
  margin: 4px 4px 4px 0;
  padding: 4px 8px;
  color: ${AZUL};
  border: solid 1px ${AZUL};
  border-radius: 8px;
  text-align: center;
`;

export const Favorito = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;

  @media (max-width: 478px) {
    justify-content: center;
  }
`;

export const GhostButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  height: 56px;
  width: 192px;
  padding: 16px 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${AZUL};
  color: ${AZUL};
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;

  @media (max-width: 992px) {
    width: 130px;
  }

  @media (max-width: 768px) {
    width: 200px;
  }

  &:hover {
    color: ${BRANCO};
    background-color: ${AZUL_60};
    border-color: ${BRANCO};
  }
`;

export const EyeContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;

  p {
    font-size: 12px;
    margin: 0;
  }

  @media (max-width: 478px) {
    width: 100%;
  }
`;
