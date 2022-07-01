import styled from 'styled-components';
import { lighten } from 'polished';

import { AZUL, BRANCO, LARANJA } from '../../styles/variaveis';

interface Props {
  isActive?: boolean;
}
export const Content = styled.div``;

export const CardContent = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 752px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .foto {
    iframe {
      width: 288px;
      height: 288px;

      @media (max-width: 500px) {
        width: 144px;
        height: 144px;
      }

      @media (max-width: 762px) {
        width: 200px;
        height: 200px;
      }

      @media (max-width: 1000px) {
        width: 210px;
        height: 210px;
      }
    }

    img {
      object-fit: cover;
    }
  }
`;

export const ContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;

  @media (max-width: 1200px) {
    width: 580px;
    margin-top: 16px;
  }

  @media (max-width: 991px) {
    width: 420px;

    .info-header {
      width: 400px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .info-content {
      display: inline;
      justify-content: flex-start;
    }
  }

  .info-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .info-content {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 200px;
    gap: 16px;

    span {
      color: #494949;
      font-size: 16px;
      font-weight: bold;
    }

    svg {
      margin: 8px 0;
      cursor: pointer;
    }
  }

  .info-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    @media (max-width: 578px) {
      gap: 16px;
      padding: 16px;
    }

    span {
      width: 678px;
      text-align: justify;
    }

    svg {
      cursor: pointer;
    }
  }

  .info-star {
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;

    .content-star {
      display: flex;
      align-items: center;
      margin-bottom: 16px;

      span {
        color: ${LARANJA};
        font-size: 24px;
        font-weight: bold;
        margin-right: 8px;
      }
      svg {
        width: 32px;
        height: 32px;
        cursor: pointer;
      }
    }

    .content-medal {
      display: flex;
      align-items: center;

      svg {
        width: 32px;
        height: 32px;
      }
    }
  }
`;

export const BotaoCaptar = styled.a`
  padding: 16px 36px;
  color: ${BRANCO};
  background-color: ${AZUL};
  font-weight: bold;
  text-decoration: none;
  border-radius: 80px;
  text-align: center;

  &:hover {
    background-color: ${lighten(0.05, AZUL)};
    color: ${BRANCO};
  }
`;

export const ContentButton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 24px;
`;

export const Button = styled.button<Props>`
  padding: 0;
  margin: 0;
  width: 200px;
  text-align: center;
  font-weight: bold;
  /* color: ${({ isActive }) => (isActive ? BRANCO : AZUL)};
  background-color: ${({ isActive }) => (isActive ? AZUL : 'transparent')}; */
  /* border: 1px solid ${AZUL}; */
  border-radius: 8px;
  font-size: 12px;
  text-decoration: none;
  transition: background-color 0.2s;

  p {
    margin: 0;
    padding: 16px 40px;
    white-space: nowrap;
  }

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
  }

  @media (max-width: 1200px) {
    padding: 8px 20px;
  }
`;
