import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AZUL, BRANCO } from '../../../../styles/variaveis';
import { Containe } from '../../../AreaConsumidor/Layout/HeaderPublico/style';

const Container = styled.div`
  .panel-toggle {

    width: 100%;
    height: 64px;
    /* Neutros/Branco */
    left: 0px !important;

    background: #FFFFFF;
    margin-top: 1px;

    font-family: Renner;
    font-style: normal;
    font-weight: normal;
    font-size: 47px;
    line-height: 120%;

    display: flex;
    justify-content: left;
    align-items: left;
    color: rgba(0, 143, 229, 1);

    border-color:  rgba(0, 143, 229, 1);


  }

  .panel{
    width: 100%;
  }

  .panel-titulo{
    width: 90%;
    text-align: left;

    @media (max-width: 768px) {
      font-size: 32px;
    }

    @media (max-width: 420px) {
      font-size: 24px;
    }

    @media (max-width: 330px) {
      font-size: 18px;
    }

    @media (max-width: 260px) {
      font-size: 14px;
    }

    @media (max-width: 215px) {
      font-size: 12px;
    }
  }

  .panel-seta{
    width: 10%;
    text-align: right;
  }

  .panel-botao{
    margin-top: 60px;
    margin-left: 70%;
    margin-bottom: 60px;

  }

  .voltar-botao{
      width: 213px;
      height: 56px;
      border-radius: 8px;
      color: rgba(0, 143, 229, 1);
      border-color: rgba(0, 143, 229, 1);

      border: 1px solid rgba(0, 143, 229, 1);;
      padding: 16px 40px;
      border-radius: 10px;
      text-decoration: none;

      &:hover {
        background-color: rgba(0, 143, 229, 1);;
        border-color: rgba(0, 143, 229, 1);;
        color: #FFFFFF;
      }
  }
`;

export const ContentButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 16px;
  `;

export const Button = styled(Link)`
  padding: 16px 40px;
  font-weight: bold;
  color: ${AZUL};
  background-color: ${BRANCO};
  border-radius: 8px;
  border: 1px solid ${AZUL};
  font-size: 12px;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${AZUL};
    color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
  }
`;

export default Container;
