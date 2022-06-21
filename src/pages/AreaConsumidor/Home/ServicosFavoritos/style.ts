import styled from 'styled-components';

export const Content = styled.section`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .container {
    padding: 25px 0;
  }

  @media (max-width: 478px) {
    .header {
      display: flex;
      flex-direction: column;
    }
  }
`;
