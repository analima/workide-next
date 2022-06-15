import styled from 'styled-components';

export const Content = styled.div`

  #chat {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 7%!important;
    z-index: 9999;}
    
  

    @media (max-width: 1200px) {

      #chat { 
        width:10%!important;
      }
    }
    @media (max-width:998px) {
      #chat { 
        width:15%!important;
      }
    }
    @media (max-width:600px) {
      #chat { 
        width:20%!important;
      }
    }
    @media (max-width:500px) {
      #chat { 
        width:25%!important;
      }
    }
    @media (max-width:400px) {
      #chat { 
        width:30%!important;
      }
    }
  
  
`;
