import {
  Content,
  AndreContainer,
  AndreMensagem,
  AndrePersonagem,
  AndreIconClose,
  ContainerButtons,
  ButtonConfirm,
  ContainerText,
} from './style';
import { ReactComponent as Andre } from '../../assets/andre-full-moderacao.svg';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { AZUL } from '../../styles/variaveis';

interface AbaSelecionada {
  indice: number;
  porcentagem: number;
}

type AndreProps = {
  mostrar: boolean,
  esconderAvatar: () => void,
  setAbaSelecionada?: (value: React.SetStateAction<AbaSelecionada>) => void
}


export function AvatarModeracao({mostrar, esconderAvatar, setAbaSelecionada}: AndreProps) {


  return (
    <Content>
    <AndreContainer mostrarAvatar={mostrar}>
        <AndreIconClose>
          <IoMdCloseCircleOutline
           onClick={() =>{
            esconderAvatar()
          }} 
            color={AZUL}
            size={24}
          />
        </AndreIconClose>

        <AndreMensagem>
          <ContainerText>
            <p>Para sua segurança e de outros, seu perfil está em análise. 
              Por isso, ainda não é possível fazer essa ação. 
              Assim que concluirmos, enviaremos um email para te avisar, ok?
            </p>
          </ContainerText>
          <ContainerButtons>
         
            <ButtonConfirm onClick={() =>{
              esconderAvatar()
            }}>
              ENTENDI
            </ButtonConfirm>
             
            
          </ContainerButtons>
        </AndreMensagem>
         
        <AndrePersonagem>
          <Andre className="avatar-upgrade"/>
        </AndrePersonagem>
      </AndreContainer>
      </Content>
  );
}
