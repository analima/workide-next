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
import { useHistory } from 'react-router-dom';

interface IModalRecomendacao {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  text: string;
  id_proposta?: number | string | undefined;
  visao: string;
  id_projeto: number;
}

const schema = Yup.object().shape({});

export function ModalAnalyzeReview({
  showModal,
  setShowModal,
  text,
  title,
  id_proposta,
  visao,
  id_projeto,
}: IModalRecomendacao) {
  const history = useHistory();
  const [requirements, setRequirements] = useState(false);
  const [method, setMethod] = useState(false);
  const [scope, setScope] = useState(false);
  const [price, setPrice] = useState(false);
  const [deadline, setDeadline] = useState(false);
  const [availability, setAvailability] = useState(false);
  const [others, setOthers] = useState(false);
  const [conditions, setConditions] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => setShowModal(false);

  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    setError(false);
    if (mensagem.length > 0) {
      setOthers(true);
    }
    if (mensagem.trim().length === 0) {
      setOthers(false);
    }
  }, [mensagem]);

  const handleExcluded = useCallback(async () => {
    if (
      price === false &&
      deadline === false &&
      availability === false &&
      others === false &&
      requirements === false &&
      method === false &&
      scope === false
    ) {
      setError(true);
      setErrorMessage(
        ' Selecione pelo menos um motivo para a revisão do orçamento',
      );
      return;
    }

    if (others === true && mensagem.length === 0) {
      setError(true);
      setErrorMessage('Preencha o campo de outros');
      return;
    }

    const body = {
      requisitos: requirements,
      metodo: method,
      escopo: scope,
      preco: price,
      prazo: deadline,
      disponibilidade: availability,
      condicoes_gerais: conditions,
      descricao_outros: others ? mensagem : ' ',
    };
    await oportunidades_api.patch(
      `/projetos/propostas/${id_proposta}/revisao`,
      body,
    );
    setShowModal(false);
  }, [
    price,
    deadline,
    availability,
    others,
    requirements,
    method,
    scope,
    mensagem,
    conditions,
    id_proposta,
    setShowModal,
  ]);

  const handleRevisar = useCallback(async () => {
    history.push(`/fornecedor/proposta/${String(id_projeto)}`, {
      id_proposta,
      type: 'revisar',
    });
  }, [history, id_projeto, id_proposta]);

  const {
    control,
    // eslint-disable-next-line
    formState: { errors },
  } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    try {
      oportunidades_api
        .get(`/projetos/propostas/${id_proposta}/revisao`)
        .then(({ data }) => {
          setRequirements(data.requisitos);
          setMethod(data.metodo);
          setScope(data.escopo);
          setPrice(data.preco);
          setDeadline(data.prazo);
          setAvailability(data.disponibilidade);
          setConditions(data.condicoesGerais);
          setOthers(data.outros);
          setMensagem(data.descricaoOutros);
        });
    } catch (error) {}
  }, [id_proposta, visao]);

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
              <Titulo titulo={title} tamanho={25} cor="#494949" />
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
                    name="requirements"
                    type="checkbox"
                    disabled={visao === 'fornecedor' && true}
                    checked={requirements}
                    label="Requisitos"
                    readOnly
                    onClick={() => setRequirements(!requirements)}
                  />

                  <InputCheck
                    control={control}
                    name="method"
                    disabled={visao === 'fornecedor' && true}
                    type="checkbox"
                    checked={method}
                    label="Método"
                    readOnly
                    onClick={() => setMethod(!method)}
                  />

                  <InputCheck
                    control={control}
                    name="scope"
                    disabled={visao === 'fornecedor' && true}
                    type="checkbox"
                    checked={scope}
                    label="Escopo"
                    readOnly
                    onClick={() => setScope(!scope)}
                  />

                  <InputCheck
                    control={control}
                    name="price"
                    type="checkbox"
                    disabled={visao === 'fornecedor' && true}
                    checked={price}
                    label="Preço"
                    readOnly
                    onClick={() => setPrice(!price)}
                  />

                  <InputCheck
                    control={control}
                    name="deadline"
                    type="checkbox"
                    checked={deadline}
                    label="Prazo"
                    disabled={visao === 'fornecedor' && true}
                    readOnly
                    onClick={() => setDeadline(!deadline)}
                  />

                  <InputCheck
                    control={control}
                    name="availability"
                    type="checkbox"
                    checked={availability}
                    disabled={visao === 'fornecedor' && true}
                    label="Disponibilidade"
                    readOnly
                    onClick={() => setAvailability(!availability)}
                  />

                  <InputCheck
                    control={control}
                    name="conditions"
                    type="checkbox"
                    checked={conditions}
                    disabled={visao === 'fornecedor' && true}
                    label="Condições Gerais ou regras para o cancelamento do serviço"
                    readOnly
                    onClick={() => setConditions(!conditions)}
                  />
                </ContentInputCheckStyled>
                <ContentInputCheckStyled isWidth>
                  <InputCheck
                    control={control}
                    name="requirements"
                    type="checkbox"
                    disabled={visao === 'fornecedor' && true}
                    checked={others}
                    label="Outro"
                    readOnly
                    onClick={() => setOthers(!others)}
                  />
                  <TextArea
                    name="denuncia"
                    setter={setMensagem}
                    disabled={visao === 'fornecedor' && true}
                    value={mensagem}
                  />
                </ContentInputCheckStyled>
              </ContainerCheckStyled>
            </Row>
            <Row>
              {error && <MensagemErro>{errorMessage}</MensagemErro>}
              <ContentFooter>
                <BidsButton onClick={handleClose}>Cancelar</BidsButton>
                {visao === 'fornecedor' && (
                  <ButtonCancel onClick={handleRevisar}>Revisar</ButtonCancel>
                )}
                {visao === 'consumidor' && (
                  <ButtonCancel onClick={handleExcluded}>Enviar</ButtonCancel>
                )}
              </ContentFooter>
            </Row>
          </Container>
        </ModalBody>
      </ModalConfirmation>
    </Content>
  );
}
