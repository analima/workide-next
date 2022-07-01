import { Col, Container, ModalBody, Row } from 'react-bootstrap';
// eslint-disable-next-line
import { useState, useEffect, useCallback } from 'react';

import { Titulo } from '../Titulo';
import {
  Content,
  ContentHeader,
  ModalConfirmation,
  TypographyStyled,
  ContentDuplicateStyled,
} from './style';
import { Spacer } from '../Spacer';

interface IModalRecomendacao {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  id_usuario: number | string | undefined;
  title: string;
  text: string;
}

export function ModalPaymentMethod({
  showModal,
  setShowModal,
  id_usuario,
  text,
  title,
}: IModalRecomendacao) {
  const handleClose = () => setShowModal(false);

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
              <Titulo titulo={title} tamanho={25} cor="#00C09E" />
            </ContentHeader>
            <Row className="mb-12">
              <Col lg={12} className="mb-3">
                <TypographyStyled>{text}</TypographyStyled>
              </Col>
            </Row>
            <Spacer size={32} />
            <ContentDuplicateStyled>
              {/* <CardProjectDuplicate 
              nameProject="Nome do Projeto"
              hours="12:00"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra eu pulvinar mauris risus. Aliquam eget nunc ac natoque ac pharetra."
              arraySubArea={arraySubArea}
              handleClick={handlePublish}
            /> 
            <CardProjectDuplicate 
              nameProject="Nome do Projeto"
              hours="12:00"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra eu pulvinar mauris risus. Aliquam eget nunc ac natoque ac pharetra."
              arraySubArea={arraySubArea}
              handleClick={handlePublish}
            /> 
            <CardProjectDuplicate 
              nameProject="Nome do Projeto"
              hours="12:00"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra eu pulvinar mauris risus. Aliquam eget nunc ac natoque ac pharetra."
              arraySubArea={arraySubArea}
              handleClick={handlePublish}
            />  */}
            </ContentDuplicateStyled>
          </Container>
        </ModalBody>
      </ModalConfirmation>
    </Content>
  );
}
