import { Col, Container, ModalBody, Row } from 'react-bootstrap';
// eslint-disable-next-line
import { useState, useEffect, useCallback } from 'react';
import * as Yup from 'yup';

import { Titulo } from '../Titulo';
import {
  Content,
  ContentHeader,
  ContentFooter,
  BidsButton,
  ModalConfirmation,
  ButtonCancel,
  TypographyStyled,
  ContentInputCheckStyled,
  ContainerCheckStyled,
  MensagemErro,
} from './style';
import { InputCheck } from '../Form/InputCheck';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextArea } from '../TextArea';
import { oportunidades_api } from '../../services/oportunidades_api';
import { LARANJA } from '../../styles/variaveis';
import { ModalInformation } from '../ModalInformation';

interface IModalRecomendacao {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  id_usuario: number | string | undefined;
  title: string;
  text: string;
  id_proposta?: number | string | undefined;
}

const schema = Yup.object().shape({});

export function ModalRecuseProposal({
  showModal,
  setShowModal,
  id_usuario,
  text,
  title,
  id_proposta,
}: IModalRecomendacao) {
  const [price, setPrice] = useState(false);
  const [technicalQualification, setTechnicalQualification] = useState(false);
  const [paymentsTerms, setPaymentsTerms] = useState(false);
  const [scope, setScope] = useState(false);
  const [others, setOthers] = useState(false);
  const [error, setError] = useState(false);
  const [errorDenounces, setErrorDenounces] = useState<boolean>(false);
  const handleClose = () => {
    setPrice(false);
    setTechnicalQualification(false);
    setPaymentsTerms(false);
    setScope(false);
    setOthers(false);
    setError(false);
    setErrorDenounces(false);
    setShowModal(false);
  };

  const [mensagem, setMensagem] = useState('');
  const [showModalInformation, setShowModalInformation] = useState(false);

  useEffect(() => {
    setError(false);
    if (mensagem.length > 0) {
      setOthers(true);
    }
    if (mensagem.trim().length === 0) {
      setOthers(false);
    }
  }, [mensagem]);

  useEffect(() => {
    if (mensagem.length) setOthers(true);
    else setOthers(false);
  }, [mensagem.length]);

  const handleExcluded = useCallback(async () => {
    if (
      price === false &&
      technicalQualification === false &&
      paymentsTerms === false &&
      scope === false &&
      others === false
    ) {
      setErrorDenounces(false);
      setError(true);
      return;
    }

    if (others === true && mensagem.length === 0) {
      setError(false);
      setErrorDenounces(true);
      return;
    }

    const body = {
      preco: price,
      qualificacao_tecnica: technicalQualification,
      condicoes_pagamento: paymentsTerms,
      escopo: scope,
      descricao_outros: mensagem,
    };
    setError(false);
    setErrorDenounces(false);
    await oportunidades_api.patch(
      `/projetos/propostas/${id_proposta}/recusar`,
      body,
    );
    setShowModalInformation(true);
    setShowModal(false);

    setTimeout(() => {
      setShowModalInformation(false);
    }, 1500);
  }, [
    price,
    technicalQualification,
    paymentsTerms,
    scope,
    others,
    mensagem,
    id_proposta,
    setShowModal,
  ]);

  const {
    control,
    // eslint-disable-next-line
    formState: { errors },
  } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  return (
    <Content>
      <ModalConfirmation
        show={showModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modal-dialog modal-lg"
        onHide={handleClose}
      >
        <ModalBody>
          <Container className="p-10">
            <ContentHeader>
              <Titulo titulo={title} tamanho={25} cor={LARANJA} />
            </ContentHeader>

            <Row className="mb-12">
              <Col lg={12} className="mb-3">
                <TypographyStyled>{text}</TypographyStyled>
              </Col>
            </Row>
            <Row className="mb-12">
              <ContainerCheckStyled>
                <ContentInputCheckStyled>
                  <InputCheck
                    control={control}
                    name="price"
                    type="checkbox"
                    checked={price}
                    label="Preço"
                    onClick={() => setPrice(!price)}
                  />

                  <InputCheck
                    control={control}
                    name="technicalQualification"
                    type="checkbox"
                    checked={technicalQualification}
                    label="Qualificação técnica"
                    onClick={() =>
                      setTechnicalQualification(!technicalQualification)
                    }
                  />

                  <InputCheck
                    control={control}
                    name="method"
                    type="checkbox"
                    checked={paymentsTerms}
                    label="Condições de pagamento"
                    onClick={() => setPaymentsTerms(!paymentsTerms)}
                  />

                  <InputCheck
                    control={control}
                    name="scope"
                    type="checkbox"
                    checked={scope}
                    label="Escopo"
                    onClick={() => setScope(!scope)}
                  />
                </ContentInputCheckStyled>
                <ContentInputCheckStyled>
                  <InputCheck
                    control={control}
                    name="requirements"
                    type="checkbox"
                    checked={others}
                    label="Outros"
                    onClick={() => setOthers(!others)}
                  />
                  <TextArea
                    name="denuncia"
                    setter={setMensagem}
                    value={mensagem}
                  />
                </ContentInputCheckStyled>
              </ContainerCheckStyled>
            </Row>

            <Row>
              {error && (
                <MensagemErro>
                  Selecione pelo menos um motivo para recusar a proposta
                </MensagemErro>
              )}
              {errorDenounces && (
                <MensagemErro>
                  É necessário que a justificativa em Outros seja preenchida
                </MensagemErro>
              )}
              <ContentFooter>
                <BidsButton onClick={handleClose}>Cancelar</BidsButton>
                <ButtonCancel onClick={handleExcluded}>Enviar</ButtonCancel>
              </ContentFooter>
            </Row>
          </Container>
        </ModalBody>
      </ModalConfirmation>
      <ModalInformation
        showModal={showModalInformation}
        title="Proposta recusada com sucesso"
        color={LARANJA}
      />
    </Content>
  );
}
