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
import andre from '../../assets/andre-full-regras-plano-png.png';
import Image from 'next/image'
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { AZUL } from '../../styles/variaveis';
import { useHistory } from 'react-router-dom';

type AndreProps = {
  mostrar: boolean;
  esconderAvatar: () => void;
};

export function AvatarAssinaturaInicial({
  mostrar,
  esconderAvatar,
}: AndreProps) {
  const history = useHistory();
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
              Antes de mais nada, vamos conferir seus benefícios na plataforma,
              para você poder aproveitar ao máximo nossas ferramentas.
            </p>
          </ContainerText>
          <ContainerButtons>
            <ButtonConfirm
              onClick={() => {
                history.push('/turbine-seu-potencial/planos');
              }}
            >
              VAMOS LÁ
            </ButtonConfirm>
          </ContainerButtons>
        </AndreMensagem>

        <AndrePersonagem>
          <Image src={andre} alt="Andre" className="avatar-upgrade" />
        </AndrePersonagem>
      </AndreContainer>
    </Content>
  );
}
