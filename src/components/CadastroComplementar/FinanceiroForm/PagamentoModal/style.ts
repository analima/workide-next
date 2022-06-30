import styled from 'styled-components';
import { BRANCO_GELO } from '../../../../styles/variaveis';

const Content = styled.div``;

export const CardTipoPagamento = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  margin-top: 24px;
  cursor: pointer;

  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  div:first-child {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  div:nth-child(2n) {
    display: flex;
    align-self: flex-end;
  }

  svg {
    /* position: absolute;
      bottom: 0;
      right: 0; */
  }
`;

export const CardTipoPagamentoDisabled = styled.div`
  background-color: ${BRANCO_GELO};
  cursor: default;
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  margin-top: 24px;

  border-radius: 8px;

  div:first-child,
  div:nth-child(2n) {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  div:last-child {
    display: flex;
    align-self: flex-end;
  }

  .content-enabled {
    display: flex !important;
  }
  .content-disabled {
    display: none !important;
  }

  :hover {
    .content-enabled {
      display: none !important;
    }
    .content-disabled {
      display: flex !important;
    }
  }
`;

export const ContainerCheckbox = styled.div`
  width: 100%;
  padding-left: 25px;
  margin-bottom: 20px;
`;

export default Content;
