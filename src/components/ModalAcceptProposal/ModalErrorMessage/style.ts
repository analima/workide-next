import styled from 'styled-components';

export const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30rem;
  padding: 2rem;

  h1 {
    font-weight: bold;
    text-align: center;
  }

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;
