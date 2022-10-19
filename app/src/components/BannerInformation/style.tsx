import { BRANCO, LARANJA } from 'src/styles/variaveis';
import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
`;

export const Content = styled.section`
  max-width: 1440px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
  gap: 40px;

  @media (max-width: 991px) {
    gap: 16px;
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 478px) {
    padding: 16px;
  }
`;

export const ContentImage = styled.div`
  width: 493px;
  display: flex;
  align-items: flex-end;

  @media (max-width: 991px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 782px;
  height: 100%;
  gap: 54px;
  padding: 40px 0;

  .titles {
    border-radius: 8px 8px 0px 0px;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  /* @media (max-width: 991px) {
    h1 {
      font-size: 32px;
    }
  } */

  @media (max-width: 991px) {
    max-width: 682px;
    gap: 20px;
  }

  @media (max-width: 768px) {
    padding: 0px;
    width: 100%;
  }
`;
interface InfoProps {
  cor: string;
}

export const Information = styled.div<InfoProps>`
  padding: 40px;
  max-width: 782px;
  height: 280px;
  background-color: ${({ cor }) => cor};
  border-radius: 0px 0px 8px 8px;

  span {
    font-size: 20px;
    color: ${BRANCO};
    line-height: 30px;
  }

  @media (max-width: 1200px) {
    max-width: 700px;
    padding: 32px;
  }

  @media (max-width: 991px) {
    padding: 16px;
    span {
      font-size: 16px;
    }
  }

  @media (max-width: 478px) {
    span {
      font-size: 14px;
      line-height: 24px;
    }
  }
`;

export const Title = styled.h1<InfoProps>`
  font-size: 22px;
  color: ${BRANCO};
  font-weight: 700;
  text-align: center;
  padding: 22px;
  width: 100%;
  margin: 0;
  border-radius: 8px 8px 0px 0px;
  background-color: ${({ cor }) => cor};
  cursor: pointer;

  @media (max-width: 991px) {
    font-size: 18px;
  }

  @media (max-width: 478px) {
    font-size: 16px;
    padding: 16px 8px;
  }
`;

export const LastInformation = styled(Information)`
  height: 264px;
  padding: 36px 50px;
  border-radius: 8px;
  display: flex;
  position: relative;

  .wrapper {
    width: 354px;
    display: flex;
    flex-direction: column;
    gap: 44px;

    h1 {
      font-family: 'Inter';
      font-size: 28px;
      font-weight: 700;
      line-height: 34px;
      color: ${BRANCO};
    }

    a {
      background-color: ${LARANJA};
      color: ${BRANCO};
      padding: 16px 40px;
      border: none;
      transition: all 0.3s;
      text-decoration: none;
      text-align: center;

      :hover {
        opacity: 0.8;
      }
    }
  }

  .img-ebook {
    width: 323px;
    height: 351px;
    position: absolute;
    top: -48px;
    right: 0;
  }

  @media (max-width: 1200px) {
    height: 220px;
    padding: 24px;

    .wrapper {
      width: 280px;
      gap: 12px;
    }

    .img-ebook {
      width: 220px;
      height: 240px;
      top: -32px;
    }
  }

  @media (max-width: 991px) {
    align-items: center;
    .wrapper {
      width: 100%;
      h1 {
        font-size: 22px;
      }
    }
    .img-ebook {
      position: initial;
      width: 200px;
      height: 100%;
    }
  }

  @media (max-width: 478px) {
    .wrapper {
      button {
        font-size: 14px;
        padding: 16px;
      }
    }
    .img-ebook {
      display: none;
    }
  }
`;
