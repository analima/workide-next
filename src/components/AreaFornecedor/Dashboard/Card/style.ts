import styled from 'styled-components';

import { BRANCO, LARANJA } from '../../../../styles/variaveis';

const Content = styled.article`
  background-color: ${BRANCO};
  height: 300px;
  width: 300px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  padding: 2rem;
  color: ${LARANJA};
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);

    .valor {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .descricao {
      font-size: 2rem;
    }
  }

  .valor {
    transition: all 0.2s ease-in-out;
  }

  .descricao {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: font-size 0.2s ease-in-out;
  }

  @media (max-width: 991px) {
    width: 100%;
    margin-top: 1rem;
  }
`;

export default Content;
