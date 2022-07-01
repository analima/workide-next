import styled from "styled-components";
import { BRANCO, VERDE, AZUL_60, AZUL } from '../../styles/variaveis';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 340px;

  @media (max-width: 530px){
    width: 340px;
  }
`

export const ChatUserHeader = styled.div`
  width: 100%;
  padding: 1rem;
  justify-content: space-between;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 8px 8px 0 0;
  

  div.user{
    display: flex;
    align-items: center;

    div.image{
      width: 4.125rem;
      height: 4.125rem;
      border-radius: 50%;
      background-color: #555;
    }

    span.name{
      font-size: 1.25rem;
      color: ${VERDE};
      font-weight: bold;
      margin-left: 1.3rem;
    }
  }

  div.icons{
    display: flex;
  }
`;

export const OnlineStatus = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${props => props.theme.color};
`;

export const ContainerMessages = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 1rem;
  overflow-y: auto;
  max-height: 400px;

  ::-webkit-scrollbar {
    display: none;
  }

  div.container-message-me{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }

  img{
    width: 15.6875rem;
    height: 10.8125rem;
  }

  div.container-message-user{
    width: 100%;
    display: flex;
    margin-bottom: 1rem;
  }
`

export const Message = styled.span`
  background-color: ${AZUL};
  color: ${BRANCO};
  padding: 0.5rem 1rem;
  border-radius: 16px;
  font-size:1rem;
`

export const ContainerProjectInfo = styled.div`
  background-color: ${BRANCO};
  border-radius: 0 0 8px 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  -webkit-box-shadow: 0px -3px 10px 0px rgba(0,0,0,0.25); 
  box-shadow: 0px -4px 10px 0px rgba(0,0,0,0.25);

  div.container-name{
    width: 100%;
    display: flex;
    justify-content: space-between;

    span{
      font-size: 1.25rem;
      font-weight: bold;
      color: PRETO_40;
    }
  }

  div.container-fast-actions{
    width: 100%;
    display: flex;
    flex-wrap: wrap;

  }
`;

export const GhostButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  border: 2px solid ${AZUL_60};
  color: ${AZUL_60};
  font-size: 1rem;
  font-weight: normal;
  text-decoration: none;
  cursor: pointer;
  margin-right: 1rem;
  margin-bottom: 1rem;

  &:hover {
    color: ${BRANCO};
    background-color: ${AZUL_60};
    border-color: ${BRANCO};
  }
`;

export const ContainerSandMessage = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 5rem;
  padding: 1rem 0;
  align-items: center;

  textarea{ 
    border: solid 1px #949494;
    border-radius: 8px;
    padding: 0.8rem;
    font-size: 1rem;
    color: #333333;
    width: 85%;
    height: 3rem;

    ::-webkit-scrollbar{
      display: none;
    }

    ::placeholder {
      color: #cacaca;
    }
  
  }
`

export const OverlayUploadOptions = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25); 
  box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
  position: absolute;
  width: 229px;
  background-color: ${BRANCO};

  button{
    font-size: 1rem;
    width: 100%;
    background-color: transparent;
    border: none;
    padding: 0.5rem;
    text-align: left;
  }
`;

export const InputUpload = styled.input`
  display: none;
`;