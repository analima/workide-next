import styled from 'styled-components';

export const Content = styled.div``;

export const CardInformation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 44px;
  gap: 16px;
  
  @media (max-width: 853px) {
    flex-wrap: wrap;

}
`;

export const Information = styled.div`
  border: 1px solid #CCE9FA;
  border-radius: 8px;
  width: 100%;
  padding: 32px;

  .content-information {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;

    .badges {
      display: flow-root;
    }

   > span {
      font-size: 16px;
    }
  }

  .info-certifications {
    overflow-y: scroll;
    margin-top: 8px;


  ::-webkit-scrollbar {
    display: none;
    }

    > span {
      display: flex;
      padding: 4px;
      border: 1px solid #4949492f;
      border-radius: 8px;

      & + span {
      margin-top: 4px;
      }
    }
  }

  .info-skills {
    height: 90%;
    overflow-y: scroll;
    margin-top: 8px;

    ::-webkit-scrollbar {
    display: none;
    }
  }
`;

export const InfoSection = styled.div`
  max-height: 280px;
  overflow-y: scroll;
  margin-bottom: 32px;

  ::-webkit-scrollbar {
    display: none;
}

  .info-curso {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    padding: 8px;
    border: 1px solid #4949492f;
    border-radius: 8px;

    & + div {
    margin-top: 8px;
  }
}
`;