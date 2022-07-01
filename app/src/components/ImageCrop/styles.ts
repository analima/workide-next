import styled from 'styled-components';
import { AZUL, BRANCO, CINZA_10 } from '../../styles/variaveis';
import Button from '../Button';

export const CropContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999;
`;

export const ContainerButtons = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 9999999;

  display: flex;
  gap: 10px;
`;

export const SaveButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 40px;

  background: ${AZUL};

  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  outline: none;
  border: none;
  color: ${BRANCO};
  cursor: pointer;
  font-weight: bold;
`;

export const CancelButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 40px;

  background: ${CINZA_10};

  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  outline: none;
  border: none;
  color: ${AZUL};
  cursor: pointer;
  font-weight: bold;
`;
