import styled from 'styled-components';

const Content = styled.section`
  textarea {
    border-radius: 8px;
  }

  .especialidades {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .accordion-body {
    display: grid;
    grid-template-columns: 3fr 3fr 3fr 3fr;

    .form-check {
      padding: 10px 25px;
    }
  }

  .btn {
    font-weight: bold;
    font-size: 16px;
    padding: 16px 40px;
    border-radius: 8px;
  }

  @media (max-width: 766px) {
    .accordion-body {
      display: grid;
      grid-template-columns: 2fr 2fr;

      .form-check {
        padding: 10px 25px;
      }
    }
  }

  @media (max-width: 414px) {
    .accordion-body {
      display: grid;
      grid-template-columns: 1fr;

      .form-check {
        padding: 10px 25px;
      }
    }
  }
`;

export default Content;
