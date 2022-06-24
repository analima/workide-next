import { Col, Row } from 'react-bootstrap';
import { useCarrinhoConsumidor } from '../../../../../hooks/carrinhoConsumidor';
import {
  TypographyStyled,
  DescricaoOferta,
  ValorOferta,
  OfertaImagem,
  OfertaImagemContainer,
  ValorOfertaContainer,
} from './style';
import Content from './style';
import { formatToPrice } from '../../../../../helpers/formatsHelper';
import { useEffect, useState } from 'react';
import { Skeleton } from '../../../../../components/Skeleton';

export default function Descricao() {
  const { servicoInfo, pacote } = useCarrinhoConsumidor();
  const [valorTaxa, setValorTaxa] = useState<number>(0);

  useEffect(() => {
    const fee = Number(pacote.preco) / (1 - 0.12) - Number(pacote.preco);
    fee > 14 ? setValorTaxa(fee) : setValorTaxa(14);
  }, [pacote]);

  return (
    <Content>
      <Row>
        <Col lg={3}>
          <OfertaImagemContainer>
            <OfertaImagem src={servicoInfo.arquivo?.url || ''} />
          </OfertaImagemContainer>
        </Col>

        <Col lg={8}>
          <Row>
            <Col lg={12}>
              <TypographyStyled>{servicoInfo.nome}</TypographyStyled>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <DescricaoOferta>{servicoInfo.descricao}</DescricaoOferta>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <ValorOfertaContainer>
                {valorTaxa ? (
                  <ValorOferta>
                    {formatToPrice(Number(pacote.preco) + valorTaxa)}
                  </ValorOferta>
                ) : (
                  <Skeleton width="100px" height="30px" />
                )}
              </ValorOfertaContainer>
            </Col>
          </Row>
        </Col>
      </Row>
    </Content>
  );
}
