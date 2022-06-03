import styled from 'styled-components';

export const Content = styled.div`
  > div {
    min-height: 400px;
    margin-top: 16px;
  }

  ul {
    li {
      display: flex;
      justify-content: space-between;

      span {
        padding-top: 22px;
        padding-right: 22px;
        font-weight: bold;
        font-size: 20px;
        text-align: left;
      }
    }
  }

  @media (max-width: 478px) {
    padding: 8px 0;
  }
`;
