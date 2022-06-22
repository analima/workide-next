import EstrelaOff from '../../../../assets/estrela-off.svg';

import {
  Content,
  Titulo,
  Card,
  Resumo,
  Avaliacao,
  Detalhes,
  Detalhe,
  Estrelas,
  Barra,
  Quantidade,
} from './style';

export function Avaliacoes() {
  return (
    <Content>
      <Titulo>Avaliações</Titulo>
      <Card>
        <Resumo>
          <Avaliacao>
            <span>0</span>
            <small>de 5,00</small>
          </Avaliacao>
          <Detalhes>
            <Detalhe>
              <Estrelas>
                <EstrelaOff />
                <EstrelaOff />
                <EstrelaOff />
                <EstrelaOff />
                <EstrelaOff />
              </Estrelas>
              <Barra porcentagem={0}>
                <div></div>
              </Barra>
            </Detalhe>
            <Detalhe>
              <Estrelas>
                <EstrelaOff />
                <EstrelaOff />
                <EstrelaOff />
                <EstrelaOff />
                <EstrelaOff />
              </Estrelas>
              <Barra porcentagem={0}>
                <div></div>
              </Barra>
            </Detalhe>
            <Detalhe>
              <Estrelas>
                <EstrelaOff />
                <EstrelaOff />
                <EstrelaOff />
                <EstrelaOff />
                <EstrelaOff />
              </Estrelas>
              <Barra porcentagem={0}>
                <div></div>
              </Barra>
            </Detalhe>
            <Detalhe>
              <Estrelas>
                <EstrelaOff />
                <EstrelaOff />
                <EstrelaOff />
                <EstrelaOff />
                <EstrelaOff />
              </Estrelas>
              <Barra porcentagem={0}>
                <div></div>
              </Barra>
            </Detalhe>
            <Detalhe>
              <Estrelas>
                <EstrelaOff />
                <EstrelaOff />
                <EstrelaOff />
                <EstrelaOff />
                <EstrelaOff />
              </Estrelas>
              <Barra porcentagem={0}>
                <div></div>
              </Barra>
            </Detalhe>
            <Detalhe>
              <Estrelas>
                <EstrelaOff />
                <EstrelaOff />
                <EstrelaOff />
                <EstrelaOff />
                <EstrelaOff />
              </Estrelas>
              <Barra porcentagem={0}>
                <div></div>
              </Barra>
            </Detalhe>
          </Detalhes>
        </Resumo>
        <Quantidade>Você já recebeu 0 avaliações</Quantidade>
      </Card>
    </Content>
  );
}
