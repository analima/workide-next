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
import Image from 'next/image';
import andre from '../../assets/andre-full-regras-plano-png.png';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { AZUL } from '../../styles/variaveis';
import { useHistory } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';

type AndreProps = {
  mostrar: boolean;
  esconderAvatar: Dispatch<SetStateAction<boolean>>;
};

export function AvatarContaBancaria({ mostrar, esconderAvatar }: AndreProps) {
  const history = useHistory();
  return (
    <Content>
      <AndreContainer mostrarAvatar={mostrar}>
        <AndreIconClose>
          <IoMdCloseCircleOutline
            onClick={() => {
              esconderAvatar(!mostrar);
              history.push('/turbine-seu-potencial/planos');
            }}
            color={AZUL}
            size={24}
          />
        </AndreIconClose>

        <AndreMensagem>
          <ContainerText>
            <p>
              Você precisa adicionar uma conta bancária em que o titular possua
              o mesmo CPF ou CNPJ cadastrado aqui na freelas town.
            </p>
          </ContainerText>
          <ContainerButtons>
            <ButtonConfirm onClick={() => esconderAvatar(!mostrar)}>
              ENTENDI
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
