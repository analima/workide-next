import styled from 'styled-components';
import OndaGradiente from '../../../assets/onda-gradiente.svg';

export const ContainerConfirmacao = styled.div`
  background-image: url(${OndaGradiente});
  background-size: 70%;
  background-repeat: no-repeat;
  background-position-x: right;
  /* min-height: 100vh; */
 
  
  @media (max-width: 991px) {
    background: none; 
  }



`;

export const Content = styled.div`
  width: 100%;
  border-radius: 16px 16px;
  z-index: 2;
  padding: 250px 80px;

  position: fixed;
  display: flex;
  justify-content: center;
`;
