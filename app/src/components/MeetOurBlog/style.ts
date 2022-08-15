import { PRETO_10 } from 'src/styles/variaveis';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px;
  max-width: 1200px;
  margin: 0 auto;

  h2 {
    font-family: 'Renner';
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 134.6%;
    color: ${PRETO_10};
    text-align: left;
    justify-self: flex-start;
  }

  h4 {
    font-family: 'Renner';
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0em;
    color: ${PRETO_10};
    text-align: left;
    justify-self: flex-start;
  }
`;

export const ContainerPosts = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;

  @media (max-width: 578px) {
    flex-direction: column;
    align-items: space-between;
    justify-content: center;
  }
`;

export const Posts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .containerImage {
    height: 248px;
    width: 250px;
    border-radius: 15px;

    .image {
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 15px;
    }
  }

  h3 {
    font-family: 'Renner';
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 121.6%;
    margin-top: 10px;
    text-align: center;
    color: ${PRETO_10};
    max-width: 254px;
  }

  h4 {
    font-family: 'Renner';
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: center;
    color: ${PRETO_10};
    max-width: 238px;
  }
`;
