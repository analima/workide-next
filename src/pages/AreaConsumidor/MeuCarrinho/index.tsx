import { Alert, Col, Row } from 'react-bootstrap';
import { InputCheck } from '../../../components/Form/InputCheck';
import { Titulo } from '../../../components/Titulo';
import { CINZA_40, LARANJA, PRETO_60, VERDE } from '../../../styles/variaveis';
import Layout from '../Layout';
import { useLocation } from 'react-router-dom';
import { FiXCircle } from 'react-icons/fi';
import Antonio from '../../../assets/antonio-full.svg';
import {
  Adicional,
  CardCarrinho,
  Descricao,
  AdicionalDescricao,
  Oferta,
  OfertaContainer,
  StatusContainer,
  TotalContainer,
  Valor,
  AcoesContainer,
  Button,
  GhostButton,
  CarrinhoVazio,
  TituloGradiente,
} from './style';
import Content  from './style';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spacer } from '../../../components/Spacer';
import { useCallback, useEffect, useState } from 'react';
import { ModalAcceptProposal } from '../../../components/ModalAcceptProposal';
import { formatToPrice } from '../../../helpers/formatsHelper';
import { getFeesHelper } from '../../../helpers/getFeesHelper';
import { ModalLoading } from '../../../components/ModalLoading';
import { Helmet } from 'react-helmet';

interface ICarrinhoData {
  nome: string;
  preco: number;
  adicional: string;
  adicionalPreco: number;
  parcelas: number;
  taxa: number;
  idPessoaConsumidor: number;
  idPessoaFornecedor: number;
  idProjeto?: number;
}

export default function MeuCarrinho() {
  const schema = Yup.object().shape({});
  const [showPagamento, setShowPagamento] = useState(false);
  const location = useLocation<ICarrinhoData>();
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);
  const [carrinhoData, setCarrinhoData] = useState<ICarrinhoData>(
    location.state ||
      (JSON.parse(localStorage.getItem('@Gyan:cart') || '{}') as ICarrinhoData),
  );
  const [valorTaxa, setValorTaxa] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { control, watch } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  function getInitialValues() {
    if (location.state) {
      setCarrinhoData(location.state);
    } else {
      const data = localStorage.getItem('@Gyan:cart');
      if (data) {
        const newValues: ICarrinhoData = JSON.parse(data);
        if (newValues) {
          setCarrinhoData(newValues);
        }
      }
    }
  }

  useEffect(() => {
    getInitialValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetTotalValue = useCallback(
    (oferta: boolean, ofertaAdicional: boolean) => {
      let totalValue = 0;
      if (oferta) {
        setError(false);
        totalValue += carrinhoData.preco;
      }
      if (ofertaAdicional) {
        setError(false);
        totalValue += carrinhoData.adicionalPreco;
      }
      if (totalValue > 0) totalValue += valorTaxa;
      setTotal(totalValue);
    },
    [carrinhoData, valorTaxa],
  );

  useEffect(() => {
    watch(value => {
      handleSetTotalValue(value.oferta, value.oferta_adicional);
    });
  }, [handleSetTotalValue, watch]);

  async function handleGetTaxa() {
    setIsLoading(true);
    try {
      const taxa = await getFeesHelper(
        carrinhoData.idPessoaFornecedor,
        carrinhoData.preco,
        1,
      );
      if (taxa) setValorTaxa(Number(taxa));
    } catch (error: any) {
      console.error(error.response);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleGetTaxa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carrinhoData]);

  return (
    <Content>
      <Helmet>
        <title>Gyan - Meu carrinho consumidor</title>
      </Helmet>
      <Layout titulo="Meu Carrinho" activeMenu>
        <ModalLoading showModal={isLoading} setShowModal={setIsLoading} />
        <Spacer size={48} />

        <ModalAcceptProposal
          showModal={showPagamento}
          setShowModal={setShowPagamento}
          valor={total - valorTaxa}
          parcelas={carrinhoData.parcelas}
          tipo="servico"
          idPessoaConsumidor={carrinhoData.idPessoaConsumidor}
          idPessoaFornecedor={carrinhoData.idPessoaFornecedor}
          descricao={`Pagamento de serviço - ${carrinhoData.nome}`}
          idProjeto={carrinhoData.idProjeto}
          nomeProjeto={carrinhoData.nome}
        />

        <Row>
          <Col
            lg={12}
            className="d-flex justify-content-center align-items-center"
          >
            <CardCarrinho>
              {carrinhoData.nome ? (
                <>
                  <TituloGradiente>Resumo da compra</TituloGradiente>
                  <OfertaContainer>
                    <Oferta>
                      <Descricao>
                        <InputCheck control={control} name="oferta" />
                        <Titulo
                          titulo={carrinhoData.nome}
                          cor={CINZA_40}
                          tamanho={24}
                        />
                      </Descricao>
                      <Valor>
                        <Titulo
                          titulo={formatToPrice(carrinhoData.preco + valorTaxa)}
                          cor={CINZA_40}
                          tamanho={24}
                        />
                      </Valor>
                    </Oferta>
                    {carrinhoData.adicionalPreco > 0 && (
                      <Adicional>
                        <AdicionalDescricao>
                          <InputCheck
                            control={control}
                            name="oferta_adicional"
                          />
                          <Titulo
                            titulo={carrinhoData.adicional}
                            cor={CINZA_40}
                            tamanho={16}
                            negrito={false}
                          />
                        </AdicionalDescricao>
                        <Valor>
                          <Titulo
                            titulo={formatToPrice(carrinhoData.adicionalPreco)}
                            cor={CINZA_40}
                            tamanho={16}
                            negrito={false}
                          />
                        </Valor>
                      </Adicional>
                    )}

                    <Adicional>
                      <AdicionalDescricao>
                        <Titulo titulo="Total" cor={PRETO_60} tamanho={16} />
                      </AdicionalDescricao>
                      <Valor>
                        <Titulo
                          titulo={formatToPrice(total)}
                          cor={PRETO_60}
                          tamanho={16}
                        />
                      </Valor>
                    </Adicional>
                  </OfertaContainer>

                  <TotalContainer>
                    <Titulo titulo="TOTAL" cor={VERDE} tamanho={24} />
                    <Titulo
                      titulo={formatToPrice(total)}
                      cor={VERDE}
                      tamanho={24}
                    />
                  </TotalContainer>

                  <AcoesContainer>
                    <Button
                      onClick={() => {
                        if (total === 0) {
                          setError(true);
                          return;
                        }
                        setShowPagamento(true);
                      }}
                    >
                      PAGAR
                    </Button>
                  </AcoesContainer>

                  <StatusContainer>
                    <Titulo
                      titulo="Status do pagamento: Não iniciado"
                      cor={CINZA_40}
                      tamanho={16}
                    />
                  </StatusContainer>
                  {error && (
                    <Row>
                      <Col lg={12}>
                        <Alert
                          variant="danger"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          Você deve selecionar pelo menos um item para pagar.
                          <FiXCircle
                            className="fechar"
                            onClick={() => setError(false)}
                            size={20}
                            color="#c53030"
                          />
                        </Alert>
                      </Col>
                    </Row>
                  )}
                </>
              ) : (
                <CarrinhoVazio>
                  <Titulo
                    negrito
                    titulo="Seu carrinho está vazio"
                    cor={LARANJA}
                    tamanho={24}
                  />
                  <Antonio />
                </CarrinhoVazio>
              )}
            </CardCarrinho>
          </Col>
        </Row>

        <Spacer size={50} />

        <Row>
          <Col lg={12}>
            <AcoesContainer>
              <GhostButton href="/">VOLTAR</GhostButton>
            </AcoesContainer>
          </Col>
        </Row>
      </Layout>
    </Content>
  );
}
