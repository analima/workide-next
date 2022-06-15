import ReactCardFlip from 'react-card-flip';
import { Content } from './style';

interface ICartaoFlip {
  dados: IDadosCartao;
  rotacionar: boolean;
}

interface IDadosCartao {
  numero: string;
  nome: string;
  vencimento: string;
  cvv: string;
}

export function CartaoFlip({ rotacionar, dados }: ICartaoFlip) {
  function exibeNumeroCartaoFormatado() {
    if (dados.numero && dados.numero.length <= 16) {
      return dados.numero.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
    }
    return '**** **** **** ****';
  }

  function exibeDataCartaoFormatada() {
    if (dados.vencimento && dados.vencimento.length <= 4) {
      return dados.vencimento.replace(/\W/gi, '').replace(/(.{2})/g, '$1 ');
    }
    return 'MM AA';
  }

  function exibeNome() {
    return dados.nome ? dados.nome : 'Nome Cartão';
  }

  return (
    <Content>
      <ReactCardFlip isFlipped={rotacionar} flipDirection="horizontal">
        <div className="cartao">
          <div className="dados">
            <p>{exibeNumeroCartaoFormatado()}</p>
            <p>{exibeNome()}</p>
            <p>{exibeDataCartaoFormatada()}</p>
          </div>
        </div>

        <div className="cartao">
          <div className="dados">
            <p>CVV</p>
            <p>{dados.cvv || '***'}</p>
          </div>
        </div>
      </ReactCardFlip>
    </Content>
  );
}
