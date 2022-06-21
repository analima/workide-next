import {
  Content,
  AndreContainer,
  AndreMensagem,
  AndrePersonagem,
  AndreIconClose,
  ContainerButtons,
  ButtonConfirm,
} from './style';
import Image from 'next/image'
import andre from '../../assets/andre-full-regras-plano-png.png';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { AZUL } from '../../styles/variaveis';
import { CadastroComplementarProvider } from '../../hooks/cadastroComplementar';

type AndreProps = {
  mostrar: boolean;
  esconderAvatar: () => void;
  aba?: number;
  premium?: boolean;
};

export function AvatarRegrasPlano({
  mostrar,
  esconderAvatar,
  aba,
  premium = false,
}: AndreProps) {
  const mensagem = `
      Não é possível adicionar mais itens, você atingiu o limite máximo dessa informação.
    `;
  return (
    <CadastroComplementarProvider>
      <Content>
        <AndreContainer mostrarAvatar={mostrar}>
          <AndreIconClose>
            <IoMdCloseCircleOutline
              onClick={() => esconderAvatar()}
              color={AZUL}
              size={24}
            />
          </AndreIconClose>

          <AndreMensagem>
            <p>{mensagem}</p>
            <ContainerButtons>
              <ButtonConfirm
                onClick={() => {
                  esconderAvatar();
                }}
              >
                OK, OBRIGADO
              </ButtonConfirm>
            </ContainerButtons>
          </AndreMensagem>

          <AndrePersonagem>
            <Image src={andre} alt="" className="avatar-upgrade" />
          </AndrePersonagem>
        </AndreContainer>
      </Content>
    </CadastroComplementarProvider>
  );
}
