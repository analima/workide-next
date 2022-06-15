import {
  Content,
  CarolContainer,
  CarolMensagem,
  CarolPersonagem,
  CarolIconClose,
} from './style';
import { ReactComponent as CarolSuperior } from '../../assets/carol-superior.svg';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { AZUL } from '../../styles/variaveis';

type CarolProps = {
  mensagem: string,
  dica: boolean,
  setDica: (value: boolean) => void,
}

export function Carol({mensagem, dica, setDica}: CarolProps) {
 
  return (
    <Content>
    <CarolContainer showDica={dica}>
        <CarolIconClose>
          <IoMdCloseCircleOutline
            onClick={() => setDica(false)}
            color={AZUL}
            size={24}
          />
        </CarolIconClose>

        <CarolMensagem>{mensagem}</CarolMensagem>
         
        <CarolPersonagem>
          <CarolSuperior />
        </CarolPersonagem>
      </CarolContainer>
      </Content>
  );
}
