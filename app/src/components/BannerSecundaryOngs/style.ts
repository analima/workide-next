import styled from 'styled-components';
import { LARANJA, PRETO_10 } from '../../styles/variaveis';

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
  background-position: center;
  padding: 16px 72px;
  position: relative;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: -76px;
  width: 1129px;
  height: 319px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  background-color: #f5f5f5;
  padding: 35px 70px;
  gap: 40px;

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 84px;
  }

  .primary,
  .secundary {
    text-align: center;
  }

  h1 {
    font-family: 'Renner';
    font-weight: 700;
    font-size: 34px;
    color: ${LARANJA};
  }

  span {
    font-weight: 400;
    font-size: 16px;
    color: ${PRETO_10};
  }

  @media (max-width: 1140px) {
    width: 100%;
  }

  @media (max-width: 991px) {
    padding: 32px;
    gap: 24px;

    .content {
      gap: 40px;
    }

    h1 {
      font-size: 24px;
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
    gap: 10px;

    .content {
      gap: 20px;
    }

    h1 {
      font-size: 20px;
    }
  }

  @media (max-width: 478px) {
    padding: 20px;
    height: auto;

    .content {
      gap: 24px;
      flex-direction: column;
    }

    h1 {
      font-size: 18px;
    }
  }
`;
