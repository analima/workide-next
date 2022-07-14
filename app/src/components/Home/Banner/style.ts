import styled from 'styled-components';
import { BRANCO, BRANCO_GELO } from '../../../styles/variaveis';
export const Container = styled.section`
  height: 100vh;
  padding: 0px 60px;
  background-color: ${BRANCO};

  @media (max-width: 768px) {
    padding: 0 20px;
  }

  @media (max-width: 630px) {
    padding: 0;
    height: 459px;
  }
`;

interface BannerProps {
  img: string;
}

export const Content = styled.section<BannerProps>`
  background-image: url(${({ img }) => img});
  background-color: #dedecc;
  background-size: cover;
  background-position: center;
  height: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  padding: 0px 40px;
  position: relative;
  opacity: 0;
  animation: fade-in 1s normal forwards ease-in-out;

  -webkit-transition: background-image 0.5s ease-in-out;
  transition: background-image 0.5s ease-in-out;

  @media (max-width: 768px) {
    height: 450px;
    width: 100%;
  }

  @media (max-width: 630px) {
    padding: 20px;
    height: 415px;
    border-radius: 0px;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ContentDescription = styled.div`
  width: 603px;
  height: 150px;
  margin: 116px 144px 116px 90px;

  h1 {
    font-size: 45px;
    font-weight: bold;
    color: ${BRANCO};
    line-height: 54px;
    font-family: Renner;
    font-size: 40px;
    font-weight: 700;
    line-height: 49px;
    letter-spacing: 0em;
    text-align: left;
    text-shadow: 0px 4px 7px rgba(0, 0, 0, 0.45);
  }

  h4 {
    color: ${BRANCO};
    text-shadow: 0px 4px 7px rgba(0, 0, 0, 0.45);
    font-family: 'Renner';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 120%;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    margin-top: 32px;

    h1 {
      width: 100%;
      font-size: 30px;
      line-height: 40px;
    }
  }

  @media (max-width: 630px) {
    margin-left: 0;
    margin-top: 86px;

    h1 {
      line-height: 37.5px;
      font-size: 31.25px;
      font-weight: 400;
    }
  }

  @media (max-width: 478px) {
    margin-left: 0;
    margin-top: 42px;
  }

  @media (max-width: 375px) {
    margin-left: 0;
    margin-top: 24px;

    h1 {
      font-size: 24px;
    }
  }
`;

export const ContentBox = styled.div`
  position: absolute;
  bottom: -70px;

  .content-box {
    display: flex;
    align-items: flex-end;
  }

  @media (max-width: 768px) {
    width: 90%;

    .content-box {
      justify-content: space-between;
      width: 100%;
    }
  }

  @media (max-width: 630px) {
    bottom: -20px;
  }
`;

interface BoxProps {
  color: string;
  active: boolean;
}

export const BoxInfo = styled.span<BoxProps>`
  font-size: 18px;
  color: ${BRANCO};
  padding: 22px 42px;
  text-align: center;
  background-color: ${({ color }) => color};
  cursor: pointer;
  box-shadow: ${({ active }) =>
    active ? '0px 0px 10px rgba(0, 0, 0, 0.2)' : 'none'};
  -webkit-transition: -webkit-transform 0.05s ease;
  transition: transform all 0.5s ease-out;
  -webkit-transform: ${({ active }) => (active ? 'scale(1.01)' : 'scale(1)')};
  transform: ${({ active }) => (active ? 'scale(1.01)' : 'scale(1)')};
  height: ${({ active }) => (active ? '104px' : '90px')};
  -webkit-transition: height 0.2s ease-in-out;
  transition: height 0.2s ease-in-out;

  :first-child {
    border-radius: 20px 0px 0px 0px;
  }

  :last-child {
    border-radius: 0px 20px 0px 0px;
  }

  :hover {
    filter: brightness(1.1);
  }

  @media (max-width: 991px) {
    font-size: 16px;
    padding: 24px 30px;
  }

  @media (max-width: 768px) {
    height: ${({ active }) => (active ? '80px' : '71px')};

    font-size: 14px;
    padding: 16px;
    flex: 1;
  }

  @media (max-width: 478px) {
    font-size: 12px;
    padding: 12px;
    height: ${({ active }) => (active ? '70px' : '61px')};
  }

  @media (max-width: 375px) {
    font-size: 10px;
    padding: 8px;
  }
`;

export const ContentSearch = styled.div`
  width: 742px;
  background-color: ${BRANCO_GELO};
  height: 137px;
  padding: 37px 60px;
  border-radius: 0px 5px 5px 5px;
  box-shadow: 0px 2px 59px -5px rgba(0, 0, 0, 0.45);

  @media (max-width: 991px) {
    width: 580px;
    padding: 24px;
    align-items: center;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 68px;
    padding: 0px 8px;
  }
`;
