import styled from 'styled-components';
import { BRANCO, CINZA_10, PRETO_10, VERDE } from '../../styles/variaveis';

export const FooterBody = styled.footer`
  background-color: ${CINZA_10};
  padding: 0 60px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const Content = styled.div``;

export const FooterInfo = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 36px 0 0 0;

  .como-funciona {
    text-decoration: none;
    color: ${PRETO_10};
  }

  article {
    color: ${PRETO_10};

    a {
      cursor: pointer;
      text-decoration: none;
      color: ${PRETO_10};

      &:hover {
        opacity: 0.8;
      }
    }

    img {
      width: 112px;
    }

    h2 {
      font-size: 22px;
      margin-bottom: 8px;
    }

    ul {
      list-style-type: none;
      padding: 0;
      transition: all 0.5s ease;

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

    @media (max-width: 478px) {
      .abrir {
        display: block;
      }
      .normal {
        display: none;
      }

      ul {
        display: none;
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
  padding-bottom: 20px;

  .imageWpp {
    position: fixed !important;
    top: 50%;
    right: 10px;
  }

  .content-fale-conosco {
    display: flex;
    flex-direction: column;
    width: 100%;

    > div {
      margin-left: 32px;
    }

    span {
      margin-right: 8px;
      font-size: 16px;
      color: ${PRETO_10};
    }
  }

  .whats {
    display: flex;
    align-items: center;
    justify-content: space-between;

    hr {
      width: 100%;
      height: 2px;
      background-color: ${PRETO_10};
      opacity: 10;
    }

    a {
      img {
        width: 94px;
        height: 94px;
        object-fit: cover;
      }
    }
  }

  .content-version {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    img {
      width: 122px;
      height: 48px;
    }

    p {
      font-size: 16px;
      color: ${PRETO_10};
    }
  }

  @media (max-width: 478px) {
    .content-fale-conosco {
      > div {
        margin-left: 0px;

        a {
          svg {
            width: 24px;
            height: 24px;
          }
        }
      }

      span {
        font-size: 14px;
      }
    }

    .whats {
      a {
        img {
          width: 60px;
          height: 60px;
          object-fit: cover;
        }
      }
    }
  }
`;

export const FooterCopyright = styled.section`
  background-color: ${BRANCO};
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
