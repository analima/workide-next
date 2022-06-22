import {
  Content,
  AndreContainer,
  AndreMensagem,
  AndrePersonagem,
  AndreIconClose,
  ContainerButtons,
  ButtonCancel,
  ButtonConfirm,
  ContainerText,
} from './style';
import Andre  from '../../assets/andre-full-cadastro-incompleto.svg';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { AZUL } from '../../styles/variaveis';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

interface AbaSelecionada {
  indice: number;
  porcentagem: number;
}

type AndreProps = {
  mostrar: boolean;
  esconderAvatar: () => void;
  setAbaSelecionada?: (value: React.SetStateAction<AbaSelecionada>) => void;
  porcentagem: number;
  isConsumer: boolean;
};

export function AvatarCadastroIncompleto({
  mostrar,
  esconderAvatar,
  setAbaSelecionada,
  porcentagem,
  isConsumer,
}: AndreProps) {
  const history = useHistory();
  const { user } = useAuth();

  function handleSelectAba() {
    if (isConsumer) {
      if (porcentagem === 33) return { indice: 0, porcentagem: 20 };
      if (porcentagem === 66) return { indice: 3, porcentagem: 40 };
      return { indice: 0, porcentagem: 33 };
    } else {
      if (porcentagem === 20) return { indice: 0, porcentagem: 20 };
      if (porcentagem === 40) return { indice: 2, porcentagem: 40 };
      if (porcentagem === 60) return { indice: 3, porcentagem: 60 };
      return { indice: 0, porcentagem: 20 };
    }
  }
  function handleSelectAbaInHistory() {
    if (isConsumer) {
      if (porcentagem === 33) return 0;
      if (porcentagem === 66) return 3;
    } else {
      if (porcentagem === 20) return 0;
      if (porcentagem === 40) return 2;
      if (porcentagem === 60) return 3;
    }
    return 0;
  }

  return (
    <Content animation={false} show={mostrar}>
      <AndreContainer mostrarAvatar={mostrar}>
        <AndreIconClose>
          <IoMdCloseCircleOutline
            onClick={() => {
              if (!user.id_pessoa) {
                esconderAvatar();
                return;
              }
              esconderAvatar();
              isConsumer
                ? history.push('/consumidor/home')
                : history.push('/fornecedor/home');
            }}
            color={AZUL}
            size={24}
          />
        </AndreIconClose>

        <AndreMensagem>
          <ContainerText>
            <p>
              Para essa ação você precisa{' '}
              <strong>
                {!user?.id_pessoa ? 'fazer' : 'concluir'} seu cadastro
              </strong>
            </p>
            <p>Deseja fazer isso agora?</p>
          </ContainerText>
          <ContainerButtons>
            <ButtonCancel
              onClick={() => {
                esconderAvatar();
                isConsumer
                  ? history.push('/consumidor/home')
                  : history.push('/fornecedor/home');
              }}
            >
              POR ENQUANTO NÃO
            </ButtonCancel>
            {setAbaSelecionada ? (
              <ButtonConfirm
                onClick={() => {
                  esconderAvatar();
                  setAbaSelecionada(handleSelectAba());
                  history.push('/cadastro-complementar', {
                    cadastroCompleto: true,
                    selectAba: handleSelectAbaInHistory(),
                    isConsumidor: isConsumer,
                  });
                }}
              >
                SIM, VAMOS LÁ
              </ButtonConfirm>
            ) : (
              <ButtonConfirm
                onClick={() => {
                  if (!user.id_pessoa) {
                    history.push('/cadastro-basico');
                    return;
                  }
                  esconderAvatar();
                  history.push('/cadastro-complementar', {
                    cadastroCompleto: true,
                    selectAba: handleSelectAbaInHistory(),
                    isConsumidor: isConsumer,
                  });
                }}
              >
                SIM, VAMOS LÁ
              </ButtonConfirm>
            )}
          </ContainerButtons>
        </AndreMensagem>

        <AndrePersonagem>
          <Andre className="avatar-upgrade" />
        </AndrePersonagem>
      </AndreContainer>
    </Content>
  );
}
