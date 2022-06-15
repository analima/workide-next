import styled from 'styled-components';
import { AZUL, BRANCO, LARANJA } from '../../../styles/variaveis';

export const Content = styled.section`
`;

export const CardContent = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;

  .oportunidade {
    max-width: 700px;
    padding: 20px;

    h4 {
      color: ${LARANJA};
      font-size: 25;
      font-weight: bold;
      line-height: 30px;
      margin-bottom: 24px;
    }
  }

  @media (max-width: 768px) {
    .oportunidade {
      padding: 4px;

      h4 {
        font-size: 16px;
        margin-bottom: 12px;
      }
    }

      img {
        width: 200px;
        height: 200px;
      }
  }

  @media (max-width: 468px) {
    .oportunidade {
      
      h4 {
        font-size: 14px;
        margin-bottom: 6px;
      }
    }

      img {
       display: none;
      }
  }
`;

export const ContentButton = styled.div`
  display: flex;
  justify-content: flex-end;
  `;

export const Button = styled.button`
  padding: 16px 40px;
  width: 142px;
  font-weight: bold;
  color: ${AZUL};
  background-color: ${BRANCO};
  border-radius: 8px;
  border: 1px solid ${AZUL};
  font-size: 12px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${AZUL};
    color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
  }
`;

