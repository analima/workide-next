import {
  Content,
  AndreContainer,
  AndreMensagem,
  AndrePersonagem,
  AndreIconClose,
  ContainerButtons,
  ButtonConfirm,
  ContainerText,
  ButtonCancel,
} from './style';
import Image from 'next/image'
import andre from '../../assets/andre-full-regras-plano-png.png';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { AZUL } from '../../styles/variaveis';

type AndreProps = {
  mostrar: boolean;
  esconderAvatar: () => void;
  mensagem: string;
};

export function AvatarErroGeral({
  mostrar,
  esconderAvatar,
  mensagem,
}: AndreProps) {
  function handleFormatText() {
    const texto = mensagem.split('*');
    return texto;
  }
  return (
    <Content>
      <AndreContainer mostrarAvatar={mostrar}>
        <AndreIconClose>
          <IoMdCloseCircleOutline
            onClick={() => {
              esconderAvatar();
            }}
            color={AZUL}
            size={24}
          />
        </AndreIconClose>

        <AndreMensagem>
          <ContainerText>
            <p>
              {handleFormatText().map(palavra => (
                <p key={palavra}>{palavra}</p>
              ))}
            </p>
          </ContainerText>
          <ContainerButtons>
            <ButtonCancel
              onClick={() => {
                esconderAvatar();
              }}
            >
              VOLTAR
            </ButtonCancel>
            <ButtonConfirm
              onClick={() => {
                esconderAvatar();
              }}
            >
              ENTENDI
            </ButtonConfirm>
          </ContainerButtons>
        </AndreMensagem>

        <AndrePersonagem>
          <Image src={andre} alt="" className="avatar-upgrade" />
        </AndrePersonagem>
      </AndreContainer>
    </Content>
  );
}
