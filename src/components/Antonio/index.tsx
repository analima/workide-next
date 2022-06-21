import {
  Content,
  AntonioContainer,
  AntonioMensagem,
  AntonioPersonagem,
  AntonioIconClose,
} from './style';
import { ReactComponent as AntonioSuperior } from '../../assets/antonio-superior.svg';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { AZUL } from '../../styles/variaveis';

type AntonioProps = {
  mensagem: string;
  dica: boolean;
  setDica: (value: boolean) => void;
};

export function Antonio({ mensagem, dica, setDica }: AntonioProps) {
  function handleFormatText() {
    const texto = mensagem.split('*');
    return texto;
  }

  return (
    <Content>
      <AntonioContainer showDica={dica}>
        <AntonioIconClose>
          <IoMdCloseCircleOutline
            onClick={() => setDica(false)}
            color={AZUL}
            size={24}
          />
        </AntonioIconClose>

        <AntonioMensagem>
          <p>
            {handleFormatText().map((palavra, index) => (
              <p key={index}>{palavra}</p>
            ))}
          </p>
        </AntonioMensagem>

        <AntonioPersonagem>
          <AntonioSuperior />
        </AntonioPersonagem>
      </AntonioContainer>
    </Content>
  );
}
