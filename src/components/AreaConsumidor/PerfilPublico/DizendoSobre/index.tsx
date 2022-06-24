import { Card } from '../../../Card';

import { CardReputacao } from './style';
import Content from './style';

import { Titulo } from '../../../Titulo';
import { AZUL } from '../../../../styles/variaveis';

import { AvaliacoesConsumidor } from '../../../AvaliacoesConsumidor';

interface IProps {
  id: number;
}

export default function DizendoSobre({ id }: IProps) {
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
