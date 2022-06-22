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
import Andre  from '../../assets/andre-full-moderacao.svg';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { AZUL } from '../../styles/variaveis';

type AndreProps = {
  mostrar: boolean;
  esconderAvatar: () => void;
};

export function AvatarParcelamento({ mostrar, esconderAvatar }: AndreProps) {
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
              Aqui você pode oferecer a opção de pagamento parcelado para seus
              clientes. Caso você opte, fique ligado à três coisas:
            </p>
            <br />
            <p>1. Isso pode acarretar juros para seus clientes</p>
            <p>2. Seu recebimento também seguirá de forma parcelada</p>
            <p>3. Não é possível fazer parcelas menores que R$ 5,00</p>
            <br />
            <p>Ok?</p>
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
          <Andre className="avatar-upgrade" />
        </AndrePersonagem>
      </AndreContainer>
    </Content>
  );
}
