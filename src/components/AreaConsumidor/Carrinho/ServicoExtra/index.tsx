import { Col, Row } from 'react-bootstrap';
import { Card } from '../../../Card';
import { InputCheck } from '../../../Form/InputCheck';
import { Spacer } from '../../../Spacer';
import { Titulo } from '../../../Titulo';
import { useCarrinhoConsumidor } from '../../../../hooks/carrinhoConsumidor';
import { AZUL, PRETO_60, VERDE } from '../../../../styles/variaveis';
import { formatarValor } from '../../../../utils/CurrencyFormat';
import {
  ContainerServicoExtra,
  ServicoExtraDetalhes,
  Descricao,
  TituloAcrescimo,
} from './style';
import Content from './style';

export default function ServicoExtra() {
  const { servicoInfo, control } = useCarrinhoConsumidor();
  return (
    <Content>
      {servicoInfo.servicos_extra?.length ? (
        <>
          <Row>
            <Col lg={12}>
              <Titulo
                titulo="As pessoas que compraram esses pacotes gostaram de comprar também os itens abaixo"
                cor={VERDE}
                tamanho={32}
                negrito={false}
              />
            </Col>
          </Row>

          <Spacer size={52} />
        </>
      ) : (
        <></>
      )}

      <Row className="justify-content-center">
        <Col lg={10}>
          {servicoInfo.servicos_extra?.map((extra, index) => {
            return (
              <>
                <Card key={extra.id}>
                  <ContainerServicoExtra>
                    <InputCheck control={control} name={`extra-${extra.id}`} />
                    <ServicoExtraDetalhes>
                      <Titulo titulo={extra.nome} cor={AZUL} tamanho={20} />
                      <Descricao>{extra.descricao}</Descricao>
                      <TituloAcrescimo>
                        Por um acréscimo de {''}
                        {formatarValor(Number(extra.extra))}, e acrescentará{' '}
                        {extra.acrescimo} dia(s) ao prazo.
                      </TituloAcrescimo>
                      <Titulo
                        titulo="(Valor inclui preço do serviço e taxa administrativa)"
                        cor={PRETO_60}
                        negrito={false}
                        tamanho={12}
                      />
                    </ServicoExtraDetalhes>
                  </ContainerServicoExtra>
                </Card>
                <Spacer size={20} />
              </>
            );
          })}
        </Col>
      </Row>
    </Content>
  );
}
