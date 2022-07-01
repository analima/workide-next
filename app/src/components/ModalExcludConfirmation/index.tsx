import { Col, Container, ModalBody, Row } from 'react-bootstrap';
// eslint-disable-next-line
import { useState, useEffect, useCallback } from 'react';
import { Titulo } from '../Titulo';
import {
  Content,
  ContentHeader,
  ContentFooter,
  BidsButton,
  ModalConfirmation,
  ButtonCancel,
  TypographyStyled,
} from './style';

interface IModalRecomendacao {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  id_usuario?: number | string | undefined;
  title: string;
  text: string;
  mainColor?: string;
  onDelete?: () => void;
  onCancel?: () => void;
}

export function ModalExcludConfirmation({
  showModal,
  setShowModal,
  id_usuario,
  text,
  title,
  mainColor,
  onDelete,
  onCancel,
}: IModalRecomendacao) {
  const handleClose = () => {
    if (onCancel) {
      onCancel();
      setShowModal(false);
    } else {
      setShowModal(false);
    }
  };
  const handleExcluded = () => {
    if (onDelete) {
      onDelete();
      setShowModal(false);
    } else {
      setShowModal(false);
    }
  };

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
            <Row>
              <ContentFooter>
                <ButtonCancel onClick={handleClose}>Cancelar</ButtonCancel>
                <BidsButton onClick={handleExcluded} mainColor={mainColor}>
                  Sim, quero excluir
                </BidsButton>
              </ContentFooter>
            </Row>
          </Container>
        </ModalBody>
      </ModalConfirmation>
    </Content>
  );
}
