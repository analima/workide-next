import styled from 'styled-components';
import { BRANCO } from '../../../../styles/variaveis';

const Content = styled.div`
  min-height: 100%;
  background-color: ${BRANCO};
  padding: 32px 32px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* margin: 32px 0; */

  @media (max-width: 991px) {
    margin-top: 32px;
  }

  @media (max-width: 478px) {
    padding: 16px;
  }
`;

export default Content;
