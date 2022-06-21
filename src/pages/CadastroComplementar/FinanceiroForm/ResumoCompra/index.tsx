import { useState, memo, useEffect, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { InputCheck } from '../../../../components/Form/InputCheck';
import { Titulo } from '../../../../components/Titulo';
import checkIcon from '../../../../assets/check-gradient.svg';
import { useAuth } from '../../../../contexts/auth';
import Image from 'next/image'
import {
  AiOutlineCloseCircle,
  AiOutlineCheckCircle,
  AiOutlineMinusCircle,
} from 'react-icons/ai';
import {
  VERMELHO,
  VERDE,
  CINZA_40,
  AZUL,
} from './../../../../styles/variaveis';

import {
  ResumoContainer,
  Resumo,
  Content,
  TituloGradiente,
  Plano,
  PlanoSelecionado,
  PlanoValor,
  Total,
  Acoes,
  Status,
  StatusContainer,
  DisabledPayButton,
  ContentPlano,
  ContentDesconto,
  ButtonCancel,
  OverlayGratuidade,
} from './style';

import * as Yup from 'yup';
import { useInformacoesFinanceiras } from '../../../../hooks/informacoesFinanceiras';
import { ModalCancelarAssinatura } from './ModalCancelarAssinatura';
import { pagamentos_api } from '../../../../services/pagamentos_api';
import { ModalAcceptProposal } from '../../../../components/ModalAcceptProposal';
import { handleFormatDocument } from '../../../../helpers/formatsHelper';

interface IProps {
  plano: number;
}

function ResumoCompra({ plano }: IProps) {
  const schema = Yup.object().shape({});
  const { assinaturaEscolhida } = useInformacoesFinanceiras();
  const [showModalCancelar, setShowModalCancelar] = useState(false);
  const [showOverlayGratuidade, setShowOverlayGratuidade] = useState(false);
  const [statusPagamento, setStatusPagamento] =
    useState<string>('Não iniciado');
  const { user } = useAuth();
  function handleFormatPlanPrice(price: number) {
    if (price === 0 || assinaturaEscolhida.suspensa) return 'R$ 0';
    const formatedPrice = price.toString();
    return `R$ ${formatedPrice[0]}${formatedPrice[1]},${formatedPrice[2]}${formatedPrice[3]}`;
  }

  const { control } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPagamento, setShowPagamento] = useState(false);

  const handlePlanNameStrategy = (
    plan: 'degustacao' | 'estudante' | 'profissional' | 'premium',
  ) => {
    const strategies = {
      degustacao: 'Degustação',
      estudante: 'Estudante',
      profissional: 'Pró',
      premium: 'Premium',
    };

    return strategies[plan];
  };

  const handleGetPaymentStatus = useCallback(async () => {
    try {
      const response = await pagamentos_api.get(
        `faturas-assinatura/${handleFormatDocument(
          user.codigo_cadastro || '',
        )}/atual`,
      );
      handlePaymentStatus(response.data.status);
    } catch (error: any) {
      setStatusPagamento('Não iniciado');
      console.log(error.response);
    }
  }, [user.codigo_cadastro]);

  function handlePaymentStatus(status: string) {
    if (
      status === 'pending' ||
      status === 'in_analysis' ||
      status === 'in_protest' ||
      status === 'partially_paid'
    )
      setStatusPagamento('Processando');
    else if (status === 'paid') setStatusPagamento('Aprovado');
    else if (
      status === 'canceled' ||
      status === 'refunded' ||
      status === 'chargeback'
    )
      setStatusPagamento('Reprovado');
  }

  function handleGetExpiredDate() {
    return assinaturaEscolhida.dh_expiracao
      ? assinaturaEscolhida.dh_expiracao.substring(8, 10)
      : new Date().getDate();
  }

  useEffect(() => {
    handleGetPaymentStatus();
  }, [assinaturaEscolhida, handleGetPaymentStatus]);

  function handlePlanPrice(price: number) {
    if (!price) return 0;
    if (price === 0) return price;
    const newPrice = price.toString();
    return Number(newPrice.substring(0, 2) + '.' + newPrice.substring(2));
  }

  return (
    <Content>
      <ModalAcceptProposal
        showModal={showPagamento}
        setShowModal={setShowPagamento}
        valor={
          user.fundador ? 0 : handlePlanPrice(assinaturaEscolhida.preco) || 0
        }
        parcelas={1}
        tipo="assinatura"
        descricao={`Pagamento de assinatura - ${assinaturaEscolhida.identificador_plano}`}
        idPessoaFornecedor={user.id_pessoa}
      />
      <ModalCancelarAssinatura
        show={showModalCancelar}
        setShow={setShowModalCancelar}
      />
      <ResumoContainer>
        <Row>
          <Col lg={12}>
            <Resumo>
              <TituloGradiente>Resumo da compra</TituloGradiente>

              <Plano>
                <ContentPlano>
                  <PlanoSelecionado>
                    <InputCheck
                      control={control}
                      name="tipo_plano"
                      type="checkbox"
                      checked={true}
                      label=""
                      readOnly
                    />

                    <Titulo
                      titulo={`Plano ${handlePlanNameStrategy(
                        assinaturaEscolhida.identificador_plano || 'degustacao',
                      )}`}
                      tamanho={24}
                      cor={CINZA_40}
                    />
                  </PlanoSelecionado>

                  <PlanoValor
                    onMouseEnter={() => setShowOverlayGratuidade(true)}
                    onMouseLeave={() => setShowOverlayGratuidade(false)}
                  >
                    {user.fundador ? (
                      <OverlayGratuidade show={showOverlayGratuidade}>
                        <p>
                          Não se esqueça que você como cofundador, ganhou 6
                          meses grátis para qualquer plano. Mas para começar a
                          aproveitar esse período você precisa prosseguir para o
                          pagamento.
                        </p>
                        <br />
                        <br />
                        <p>
                          Não se preocupe, as cobranças serão geradas com o
                          desconto de 100% e retornará integralmente somente
                          após o período de 6 meses.
                        </p>
                      </OverlayGratuidade>
                    ) : (
                      <></>
                    )}

                    <Titulo
                      titulo={handleFormatPlanPrice(
                        assinaturaEscolhida.preco || 0,
                      )}
                      tamanho={24}
                      cor={CINZA_40}
                    />
                  </PlanoValor>
                </ContentPlano>
                {user.fundador && (
                  <ContentDesconto>
                    <div className="cofundador">
                      <Image src={checkIcon} alt="" />
                      <span>Desconto Cofundador</span>
                    </div>

                    <span>
                      - {handleFormatPlanPrice(assinaturaEscolhida.preco || 0)}
                    </span>
                  </ContentDesconto>
                )}
              </Plano>

              <Total>
                <Titulo titulo="TOTAL" tamanho={24} cor={VERDE} />
                <Titulo
                  titulo={
                    user.fundador
                      ? 'R$ 0'
                      : handleFormatPlanPrice(assinaturaEscolhida.preco || 0)
                  }
                  tamanho={24}
                  cor={VERDE}
                />
              </Total>

              <Acoes>
                <DisabledPayButton
                  onClick={() => {
                    setShowPagamento(true);
                  }}
                >
                  PAGAR
                </DisabledPayButton>
              </Acoes>
              {(!user.fundador || !assinaturaEscolhida.gratuita) && (
                <Status>
                  {statusPagamento === 'Não iniciado' && (
                    <>
                      <span>Status do pagamento: </span>
                      <span>Não iniciado</span>
                    </>
                  )}
                  {statusPagamento === 'Aprovado' && (
                    <>
                      <span>Status do pagamento: </span>
                      <span className="aprovado">Aprovado</span>
                      <AiOutlineCheckCircle size={25} color={VERDE} />
                    </>
                  )}
                  {statusPagamento === 'Reprovado' && (
                    <>
                      <span>Status do pagamento: </span>
                      <span className="reprovado">Reprovado</span>
                      <AiOutlineCloseCircle size={25} color={VERMELHO} />
                    </>
                  )}
                  {statusPagamento === 'Processando' && (
                    <>
                      <span>Status do pagamento: </span>
                      <span className="processando">Processando</span>
                      <AiOutlineMinusCircle size={25} color={AZUL} />
                    </>
                  )}
                </Status>
              )}
            </Resumo>
          </Col>
        </Row>
      </ResumoContainer>

      <StatusContainer>
        <Row>
          <Col lg={12}>
            <h3>
              Sua assinatura será renovada todo dia {handleGetExpiredDate()} e
              você pode{' '}
              <ButtonCancel onClick={() => setShowModalCancelar(true)}>
                cancelar
              </ButtonCancel>{' '}
              a qualquer momento.
            </h3>
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            <p>
              Para mais informações sobre pagamento, acesse{' '}
              <a href="/fornecedor/minhas-compras">Minhas Compras</a>
            </p>
          </Col>
        </Row>
      </StatusContainer>
    </Content>
  );
}

export default memo(ResumoCompra);
