import {
  Content,
  AndreContainer,
  AndreMensagem,
  AndrePersonagem,
  AndreIconClose,
} from './style';
import  AndreSuperior  from '../../assets/andre-superior.svg';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { AZUL } from '../../styles/variaveis';

type AndreProps = {
  mensagem: string;
  dica: boolean;
  setDica: () => void;
};

export function Andre({ mensagem, dica, setDica }: AndreProps) {
  function handleFormatText() {
    const texto = mensagem.split('*');
    return texto;
  }

  return (
    <Content>
      <AndreContainer showDica={dica}>
        <AndreIconClose>
          <IoMdCloseCircleOutline
            onClick={() => setDica()}
            color={AZUL}
            size={24}
          />
        </AndreIconClose>

        <AndreMensagem>
          <p>
            {handleFormatText().map(palavra => (
              <p key={palavra}>{palavra}</p>
            ))}
          </p>{' '}
        </AndreMensagem>

        <AndrePersonagem>
          <AndreSuperior />
        </AndrePersonagem>
      </AndreContainer>
    </Content>
  );
}
