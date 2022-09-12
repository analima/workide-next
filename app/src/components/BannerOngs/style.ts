import styled from 'styled-components';
import { BRANCO } from '../../styles/variaveis';

interface IImgProps {
  img: string;
}
export const Container = styled.section<IImgProps>`
  width: 100%;
  height: 683px;
  margin-top: 16px;
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
  width: 654px;
  height: 423px;
  background-color: #00c09e;
  position: absolute;
  bottom: 0;
  left: 120px;
  border-radius: 15px 15px 0px 0px;
  box-shadow: 7px -5px 9px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 48px;
  gap: 10px;

  h1 {
    font-weight: 700;
    font-size: 48.83px;
    color: ${BRANCO};
    text-align: left;
  }

  span {
    text-align: left;
    font-weight: 400;
    font-size: 16px;
    color: ${BRANCO};
  }

  @media (max-width: 991px) {
    /* gap: 24px; */
  }

  @media (max-width: 768px) {
    align-items: center;
    width: 100%;
    height: 462px;
    left: 0;

    h1 {
      font-size: 40px;
    }
  }

  @media (max-width: 478px) {
    padding: 16px;
    h1 {
      font-weight: 400;
      font-size: 31.25px;
    }
  }

  @media (max-width: 320px) {
    padding: 10px;
    h1 {
      font-weight: 400;
      font-size: 28px;
    }
  }
`;