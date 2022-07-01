import { Col, Row } from 'react-bootstrap';
import {
  AiFillFilePdf,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from 'react-icons/ai';
import { Card } from '../../../../components/Card';
import {
  AcoesContainer,
  Button,
  ComprasContainer,
  CompraStatus,
  CompraDescricao,
  CompraVencimento,
  GhostButton,
  CompraFormaPagamento,
  ContainerLoading,
  EmptyList,
  DownloadLink,
} from './style';
import Content from './style';
import { BarraCarregamentoCircular } from '../../../../components/BarraCarregamentoCircular';
import { useMinhasComprasFornecedor } from '../../../../hooks/minhasComprasFornecedor';

interface IMeioPagamentoProps {
  [key: string]: string;
}

export default function Compras() {
  const { compras, loading } = useMinhasComprasFornecedor();

  const helperMeioPagamento: IMeioPagamentoProps = {
    cartao_credito: 'Cartão de Crédito',
    pix: 'Pix',
    boleto: 'Boleto',
  };

  const formatDate = (data: string) => {
    const dia = data[8].concat(data[9]);
    const mes = data[5].concat(data[6]);
    const ano = `${data[0]}${data[1]}${data[2]}${data[3]}`;
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <Content>
      {loading ? (
        <ContainerLoading>
          <BarraCarregamentoCircular />
        </ContainerLoading>
      ) : (
        <Card>
          {!compras.length ? (
            <EmptyList>Não há faturas cadastradas.</EmptyList>
          ) : (
            compras.map((compra, index) => (
              <Row key={index}>
                <Col lg={12}>
                  <ComprasContainer>
                    <Row>
                      <Col lg={6}>
                        <CompraDescricao>
                          {`Plano ${
                            compra.ds_plano[0].toUpperCase() +
                            compra.ds_plano.slice(1).toLocaleLowerCase()
                          }`}
                        </CompraDescricao>
                        <CompraVencimento>
                          Vencimento em: {formatDate(compra.dh_vencimento)}
                        </CompraVencimento>
                      </Col>
                      <Col lg={2}>
                        {compra.ds_status === 'paid' && (
                          <>
                            <CompraStatus className="aprovado">
                              Aprovado <AiOutlineCheckCircle size={24} />
                            </CompraStatus>
                            <CompraFormaPagamento>
                              Pagamento feito via:{' '}
                              {helperMeioPagamento[compra.nm_meio_pagamento]}
                            </CompraFormaPagamento>
                          </>
                        )}

                        {compra.ds_status === 'canceled' && (
                          <CompraStatus className="reprovado">
                            Cancelado <AiOutlineCloseCircle size={24} />
                          </CompraStatus>
                        )}

                        {compra.ds_status === 'pending' && (
                          <CompraStatus>Pendente</CompraStatus>
                        )}
                        {compra.ds_status === 'refunded' && (
                          <CompraStatus>Reembolso</CompraStatus>
                        )}

                        {compra.ds_status === 'expired' && (
                          <CompraStatus className="expirado">
                            Expirado
                          </CompraStatus>
                        )}
                      </Col>
                      <Col lg={4}>
                        <AcoesContainer>
                          {compra.ds_status === 'paid' ? (
                            <DownloadLink
                              href={`${compra.ds_url}.pdf`}
                              target="blank"
                              download
                            >
                              <GhostButton>
                                {/* Adicionar .pdf no final da 'url_fatura' para visualizar a fatura em pdf */}
                                <AiFillFilePdf /> BAIXAR RECIBO
                              </GhostButton>
                            </DownloadLink>
                          ) : (
                            compra.ds_status === 'pending' &&
                            compra.nm_meio_pagamento !== 'cartao_credito' && (
                              <DownloadLink
                                href={`${compra.ds_url}`}
                                target="blank"
                                download
                              >
                                <Button>
                                  {/* Adicionar .pdf no final da 'url_fatura' para visualizar a fatura em pdf */}
                                  <span>PAGAR</span>
                                </Button>
                              </DownloadLink>
                            )
                          )}
                        </AcoesContainer>
                      </Col>
                    </Row>
                  </ComprasContainer>
                </Col>
              </Row>
            ))
          )}
        </Card>
      )}
    </Content>
  );
}
