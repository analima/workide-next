import { useCallback, useState } from 'react';
import { Col, ModalBody, Row } from 'react-bootstrap';
import { InputMoney } from '../Form/InputMoney';

import { useForm } from 'react-hook-form';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Content,
  ModalConfirmation,
  Container,
  ContentModalCalculate,
  ContentTaxa,
  TotalValue,
  LabelHora,
} from './style';
import { Button } from '../Form/Button';
import { Spacer } from '../Spacer';
import { formatarValor } from '../../utils/CurrencyFormat';

interface IModalRecomendacao {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  porHora: boolean;
  totalHoras?: number;
}

export function ModalCalculadora({
  showModal,
  setShowModal,
  porHora,
  totalHoras = 0,
}: IModalRecomendacao) {
  const schema = Yup.object().shape({});
  const [taxaAdministrativa, setTaxaAdministrativa] = useState(12);
  const [valorLiquido, setValorLiquido] = useState(0);

  const { control, watch, setValue } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  const handleMudarTotal = useCallback(
    (value: any) => {
      const valorProposta = porHora
        ? Number(watch('valor_propostas') || '0') * totalHoras
        : Number(watch('valor_propostas') || '0');
      const taxaProvisoria = Math.round(
        valorProposta / (1 - 0.12) - valorProposta,
      );
      const taxa = taxaProvisoria < 14 ? 14 : taxaProvisoria;

      const valorTotal = porHora ? valorProposta + taxa : valorProposta + taxa;

      setValue('valor_total', valorTotal);
      setValorLiquido(valorTotal - taxa);
      setTaxaAdministrativa(taxa);
    },
    [porHora, setValue, totalHoras, watch],
  );

  const handleMudarProposta = useCallback(
    (value: any) => {
      const valorTotal = porHora
        ? Number(watch('valor_total') || '0')
        : Number(watch('valor_total') || '0');
      const taxaProvisoria = Math.round(valorTotal / (1 - 0.12) - valorTotal);
      const taxa = taxaProvisoria < 14 ? 14 : taxaProvisoria;
      const valorProposta = porHora
        ? (valorTotal - taxa) / totalHoras
        : valorTotal - taxa;

      setValue('valor_propostas', valorProposta);
      setValorLiquido(valorTotal - taxa);
      setTaxaAdministrativa(taxa);
    },
    [porHora, setValue, totalHoras, watch],
  );

  return (
    <Content>
      <ModalConfirmation
        show={showModal}
        centered
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        onHide={() => {
          if (setShowModal) {
            setShowModal(false);
          }
        }}
      >
        <ModalBody>
          <Container>
            <Row>
              <Col lg={12}>
                <ContentModalCalculate>
                  <p>Para entender melhor:</p>

                  <span>
                    <b>Taxa administrativa</b> é o valor cobrado pela plataforma
                    pelo serviço de intermediação de negócios entre Fornecedores
                    e Clientes.
                  </span>

                  <span>
                    Atualmente, para a intermediação da{' '}
                    <b>contratação de projetos</b>, esta taxa é de <b>12%</b>{' '}
                    sobre o valor total pago pelo cliente, sendo{' '}
                    <b>R$ 14,00 o valor mínimo</b>.
                  </span>
                  <span>
                    Aproveite: para a intermediação da{' '}
                    <b> venda de ofertas prontas,</b> promocionalmente, esta
                    taxa também é de <b>12%</b> sobre o valor total pago pelo
                    cliente, sendo <b>R$ 14,00 o mínimo.</b>
                  </span>
                  <span>
                    <b>Atenção:</b> um diferencial importante da plataforma é
                    que <b>não fazemos nenhum tipo de acréscimo</b> ao valor que
                    o cliente irá pagar, independente da forma de pagamento
                    escolhida.
                  </span>

                  <strong>
                    Para te ajudar a estimar qual o valor total a ser pago pelo
                    cliente (ou seja, o valor que você irá colocar em sua
                    proposta), ultilize a calculadora abaixo:
                  </strong>
                </ContentModalCalculate>
              </Col>
            </Row>
            <Row className="mt-4 d-flex justify-content-between">
              {porHora && (
                <LabelHora>Para {totalHoras} horas do projeto</LabelHora>
              )}
              <Col lg={5}>
                <InputMoney
                  control={control}
                  name="valor_propostas"
                  label={
                    porHora
                      ? 'Valor da hora'
                      : 'Quanto você quer receber líquido'
                  }
                  labelIsBold
                  maxValue={8000}
                  onChangeValue={e => {
                    handleMudarTotal(e);
                  }}
                />
                <Spacer size={15} />
                {porHora && (
                  <TotalValue>
                    Total líquido a receber:{' '}
                    <b>{formatarValor(valorLiquido)}</b>
                  </TotalValue>
                )}
              </Col>
              <Col lg={2}>
                <ContentTaxa>
                  <span>
                    {taxaAdministrativa <= 14
                      ? 'Taxa mínima'
                      : 'Taxa administrativa'}
                  </span>
                  <strong>
                    {taxaAdministrativa < 14
                      ? formatarValor(14)
                      : formatarValor(Math.round(taxaAdministrativa))}
                  </strong>
                </ContentTaxa>
              </Col>

              <Col lg={5}>
                <InputMoney
                  control={control}
                  name="valor_total"
                  label="Valor total a ser pago pelo Cliente:"
                  labelIsBold
                  maxValue={8800}
                  onChangeValue={e => {
                    handleMudarProposta(e);
                  }}
                />
              </Col>
              <Col className="mt-4 d-flex justify-content-end" lg={12}>
                <Button onClick={() => setShowModal(false)} label="Fechar" />
              </Col>
            </Row>
          </Container>
        </ModalBody>
      </ModalConfirmation>
    </Content>
  );
}
