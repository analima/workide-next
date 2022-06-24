import Content from './style';
import { AvaliacoesFornecedor } from '../../../../../components/AvaliacoesFornecedor';

interface IProps {
  idPessoa: number;
}

export default function Avaliacoes({ idPessoa }: IProps) {
  return (
    <Content>
      <AvaliacoesFornecedor id={idPessoa} />
    </Content>
  );
}
