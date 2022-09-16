import { Content, ContentCard } from './styles';

export function CardExtrato() {
  return (
    <Content>
      <div className="collunm-1">
        <h1>Nome do projeto para Internet</h1>
        <p>Roberto Carlos de Oliveira</p>
        <span>Em andamento (99%)</span>
      </div>

      <div className="collunm-2">
        <span>Aguardando conclusão</span>
      </div>

      <div className="collunm-3">
        <span>Pago pelo cliente via boleto</span>
        <p>Taxa administrativa</p>
        <span>Repasse</span>
      </div>

      <div className="collunm-4">
        <span className="pago">R$ + 100,00</span>
        <span className="taxa">R$ - 10,00</span>
        <span className="repasee">R$ + 90,00</span>
      </div>
    </Content>
  );
}
