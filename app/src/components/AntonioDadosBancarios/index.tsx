import {
  Content,
  AntonioContainer,
  AntonioMensagem,
  AntonioPersonagem,
  AntonioIconClose,
} from './style';
import AntonioSuperior from '../../assets/antonio-superior-dados-bancarios.svg';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { AZUL } from '../../styles/variaveis';

type AntonioProps = {
  dica: boolean;
  setDica: (value: boolean) => void;
};

export function AntonioDadosBancarios({ dica, setDica }: AntonioProps) {
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
            Informe a conta bancária onde você deseja receber seus depósitos ao
            concluir seus negócios. Dinheiro é assunto sério. Por isso, é muito
            importante e obrigatório que voçê inclua essa informação com atenção
            e da maneira correta. Se seu banco possuir o dígito X, substitua-o
            por 0
          </p>
        </AntonioMensagem>

        <AntonioPersonagem>
          <AntonioSuperior />
        </AntonioPersonagem>
      </AntonioContainer>
    </Content>
  );
}
