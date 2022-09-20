import styled from 'styled-components';
import { AZUL, BRANCO, VERDE } from '../../styles/variaveis';

interface IImgProps {
  img: string;
}
export const Container = styled.section<IImgProps>`
  width: 100%;
  height: 100vh;
  position: relative;
  background-image: url(${props => props.img});
  background-repeat: no-repeat;
  background-size: cover;
  padding: 16px 72px;

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

export const Content = styled.section`
  width: 551px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .content-logo {
    cursor: pointer;
  }

  h1 {
    font-family: 'Renner';
    font-weight: 700;
    font-size: 45px;
    color: ${BRANCO};
    margin-top: 90px;
    text-align: left;
  }

  span {
    margin-top: 29px;
    font-family: 'Renner';
    color: ${BRANCO};
    width: 500px;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 38px;
      margin-top: 64px;
    }

    span {
      width: 100%;
      font-size: 16px;
    }
  }

  @media (max-width: 630px) {
    width: 100%;
  }

  @media (max-width: 478px) {
    height: 100%;
    gap: 8px;

    h1 {
      font-size: 32px;
      margin-top: 40px;
    }
  }

  @media (max-width: 300px) {
    h1 {
      font-size: 28px;
      margin-top: 32px;
    }
  }
`;

export const ContentButton = styled.div`
  margin-top: 42px;
  display: flex;
  flex-direction: column;
  width: 464px;
  gap: 16px;

  .btn-cadastrar {
    padding: 10px 97px;
    text-align: center;
    width: 100%;
    height: 63px;
    border: none;
    background-color: ${VERDE};
    color: ${BRANCO};
    border-radius: 23px;
    -webkit-transition: transform 0.2s ease;
    transition: transform 0.2s ease;

    :hover {
      transform: scale(1.01);
    }
  }

  .btn-ebook {
    padding: 10px 97px;
    text-align: center;
    width: 100%;
    height: 63px;
    border: none;
    background-color: ${AZUL};
    color: ${BRANCO};
    border-radius: 23px;
    -webkit-transition: transform 0.2s ease;
    transition: transform 0.2s ease;

    :hover {
      transform: scale(1.01);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 468px) {
    .btn-cadastrar,
    .btn-ebook {
      padding: 10px;
    }
  }
`;
