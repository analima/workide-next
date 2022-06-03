import { Card } from '../../../../components/Card';

import { Content, CardReputacao } from './style';

import { Titulo } from '../../../../components/Titulo';
import { AZUL } from '../../../../styles/variaveis';

import { AvaliacoesConsumidor } from '../../../../components/AvaliacoesConsumidor';

interface IProps {
  id: number;
}

export function DizendoSobre({ id }: IProps) {
  return (
    <Content>
      <Card>
        <Titulo titulo="O que dizem sobre ele" cor={AZUL} />
        <CardReputacao>
          <AvaliacoesConsumidor id={id} />
        </CardReputacao>
      </Card>
    </Content>
  );
}
