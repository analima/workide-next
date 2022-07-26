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
  ContentModalEbook,
  Title,
  ContentButton,
} from './style';
import { Button } from '../Form/Button';
import { Spacer } from '../Spacer';
import { formatarValor } from '../../utils/CurrencyFormat';
import { InputText } from '../Form/InputText';

interface IModalRecomendacao {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalEbookOngs({
  showModal,
  setShowModal,
}: IModalRecomendacao) {
  const schema = Yup.object().shape({});

  const { control, watch, setValue } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  return (
    <Content>
      <ModalConfirmation
        show={showModal}
        centered
        aria-labelledby="contained-modal-title-vcenter"
        onHide={() => {
          if (setShowModal) {
            setShowModal(false);
          }
        }}
      >
        <ModalBody
          style={{
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <Container>
            <Row>
              <Title>Preencha o formulario para fazer o download:</Title>
            </Row>
            <Row>
              <Spacer size={20} />
              <InputText
                label="Nome"
                placeholder="Obrigatório"
                name="input-nome"
                control={control}
                required={true}
                isString={true}
              />
            </Row>
            <Row>
              <Spacer size={10} />
              <InputText
                label="Instituição"
                placeholder="Obrigatório"
                name="input-instituicao"
                control={control}
                required={true}
              />
            </Row>
            <Row>
              <Spacer size={10} />
              <InputText
                label="Telefone"
                placeholder="Obrigatório"
                name="input-telefone"
                control={control}
                required={true}
              />
            </Row>
            <Row>
              <Spacer size={10} />
              <InputText
                label="Email"
                placeholder="Obrigatório"
                name="input-email"
                control={control}
                required={true}
              />
            </Row>
            <Row>
              <ContentButton>
                <button>Fazer download</button>
              </ContentButton>
            </Row>
          </Container>
        </ModalBody>
      </ModalConfirmation>
    </Content>
  );
}
