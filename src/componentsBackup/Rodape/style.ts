import styled from 'styled-components';
import { CINZA_10, CINZA_50, PRETO_10, VERDE } from '../../styles/variaveis';

export const Footer = styled.footer``;

export const Content = styled.div`
  background-color: ${CINZA_10};
`;

export const FooterInfo = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 36px 0 0 0;
  height: 285px;

  .como-funciona {
    text-decoration: none;
    color: ${CINZA_50};
  }

  article {
    color: ${CINZA_50};

    a {
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }

    img {
      width: 112px;
    }

    h2 {
      font-size: 32px;
      margin-bottom: 8px;
    }

    ul {
      list-style-type: none;
      padding: 0;

      li {
        font-size: 12px;

        img {
          width: 46px;
          height: 46px;
        }
      }

      .li-click {
        cursor: pointer;

        :hover {
          opacity: 0.8;
        }
      }
    }
  }

  @media (max-width: 580px) {
    flex-direction: column;
    flex-wrap: nowrap;
    height: auto;

    article {
      h2 {
        font-size: 24px;
      }
    }
  }
`;

export const FooterSocial = styled.section`
  padding: 10px;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    img + img {
      margin-left: 10px;
    }
  }

  .content-fale-conosco {
  }

  .content-version {
    color: ${CINZA_50};
    font-size: 12px;
  }

  .content-redes-sociais {
    display: flex;
    gap: 16px;

    img {
      width: 50px;
      height: 50px;
    }
  }

  @media (max-width: 991px) {
    .container {
      align-items: flex-start;
      flex-direction: column;

      div:first-child {
        margin-bottom: 1rem;
      }
    }
  }

  @media (max-width: 580px) {
    border-bottom-right-radius: 250px;
    border-bottom-left-radius: 160px;
    padding: 20px;
    flex-direction: column;
  }

  .fale-conosco {
    flex-direction: column;
    align-items: flex-start;
    gap: 0px;
    margin-bottom: 10px;
  }

  .content-redes-sociais {
    margin-bottom: 32px;

    img {
      width: 40px;
      height: 40px;
    }
  }
`;

export const FooterCopyright = styled.section`
  background-color: #fff;
  border-bottom-right-radius: -540px;
  border-bottom-left-radius: -100px;
  padding: 30px 0;

  p {
    font-size: 18px;
    color: ${PRETO_10};
    margin: 0;
    text-align: center;

    a {
      color: ${VERDE};
      text-decoration: none;
    }
  }
`;
