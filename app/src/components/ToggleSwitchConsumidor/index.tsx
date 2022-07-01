import { AZUL, VERDE } from '../../styles/variaveis';
import { Content, TipoPerfil } from './style';

interface Consumidor {
  change: () => void;
  isConsumer: boolean
}

export function ToggleSwitchConsumidor({ change, isConsumer }: Consumidor) {

  return (
    <Content>
      <div className="form-check form-switch">
        <div className="container-buttons">
          <TipoPerfil
            color={VERDE}
            type="button"
            onClick={() => change()}
            active={isConsumer === false}
          >
            Sou um <br />
            fornecedor
          </TipoPerfil>
          <TipoPerfil
            color={AZUL}
            type="button"
            onClick={() => change()}
            active={isConsumer === true}
          >
            Sou um <br />
            consumidor
          </TipoPerfil>
        </div>

      </div>
    </Content>
  );
}
