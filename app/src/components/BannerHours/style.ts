import styled from 'styled-components';
import { AZUL, BRANCO, VERDE_40 } from '../../styles/variaveis';

interface IImgProps {
  img: string;
}
export const Container = styled.section<IImgProps>`
  width: 100%;
  height: 202px;
  max-width: 1320px;
  margin: 20px auto;
  position: relative;
  background-image: url(${props => props.img});
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: 768px) {
    padding: 0 8px;
    background-position-x: center;
    background-repeat: no-repeat;
    height: 783px;
  }
`;

export const Content = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-family: 'Renner';
    font-style: normal;
    font-weight: 400;
    font-size: 39.06px;
    line-height: 120%;
    color: ${BRANCO};
    max-width: 536px;
  }

  span {
    font-family: 'Renner';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    color: ${BRANCO};
  }
`;

export const ContentButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 100%;
    width: 330px;
    height: 51px;
    background-color: ${BRANCO};
    border-radius: 8px;
    padding: 16px, 40px;
    text-transform: uppercase;
    color: ${VERDE_40};
    font-family: 'Renner';
    font-size: 13px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: center;
    border: 0;
    margin-right: 10px;
  }

  :hover {
    opacity: 0.8;
  }
`;
