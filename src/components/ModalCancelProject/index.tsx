import React, { useCallback, useState } from 'react';
import { oportunidades_api } from '../../services/oportunidades_api';
import {
  Text,
  Container,
  TitleModal,
  ContainerButtons,
  ButtonMainStyled,
} from './styles';

import { Modal } from 'react-bootstrap';
import { LARANJA } from '../../styles/variaveis';
import { ModalInformation } from '../ModalInformation';

interface IModalCancelProjectProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  idProject: number;
  visao?: 'consumidor' | 'fornecedor';
  getProjeto: () => void;
  proBono: boolean;
  wantToCancel?: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalCancelProject: React.FC<IModalCancelProjectProps> = ({
  showModal,
  setShowModal,
  idProject,
  visao,
  getProjeto,
  proBono,
  setLoading,
  wantToCancel,
}) => {
  const [showModalInformation, setShowModalInformation] = useState(false);

  const handleDesistir = useCallback(async () => {
    try {
      const response = await oportunidades_api.patch(
        `/projetos/${idProject}/cancelar`,
      );

      setShowModalInformation(true);

      if (response.status === 200) {
        setShowModal(false);
      }

      setTimeout(() => {
        setLoading(false);
        setShowModalInformation(false);
        getProjeto();
      }, 2000);
    } catch (error) {
      setLoading(false);
      setShowModal(false);

      setShowModalInformation(false);
      getProjeto();
      console.log(error);
    }
  }, [getProjeto, idProject, setLoading, setShowModal]);

  return (
    <>
      <Modal
        show={showModal}
        setShowModal={setShowModal}
        size="lg"
        centered
        onHide={() => {
          setShowModal(false);
          getProjeto();
          setLoading(false);
        }}
      >
        <Container>
          <TitleModal>Cancelar Projeto</TitleModal>
          <Text>Antes de você desistir, queremos que você saiba:</Text>
          {!proBono && !wantToCancel ? (
            <>
              <Text>
                1. Recomendamos que você informe primeiro sua intenção a outra
                parte.
              </Text>
              <Text>
                2. Como você ainda não iniciou o projeto ele será cancelado e
                prosseguiremos com o{' '}
                {visao === 'consumidor'
                  ? 'seu reembolso integral'
                  : 'reembolso integral para o contratante'}
              </Text>
              <Text>
                3. Cancelamentos podem reduzir seu ranking e comprometer sua
                reputação.
              </Text>
            </>
          ) : (
            <Text>
              1. Cancelamentos podem reduzir seu ranking e comprometer sua
              reputação.
            </Text>
          )}

          <strong>
            Tem certeza que quer continuar com o cancelamento do projeto?
          </strong>

          <ContainerButtons>
            <ButtonMainStyled
              color={'DEFAULT'}
              onClick={() => {
                setShowModal(false);
                setLoading(oldState => !oldState);
              }}
            >
              CANCELAR
            </ButtonMainStyled>
            <ButtonMainStyled
              recused={true}
              color={LARANJA}
              onClick={() => {
                handleDesistir();
                setLoading(oldState => !oldState);
              }}
            >
              SIM, QUERO CANCELAR
            </ButtonMainStyled>
          </ContainerButtons>
        </Container>
      </Modal>
      <ModalInformation
        showModal={showModalInformation}
        title="Projeto cancelado com sucesso!"
        color={LARANJA}
      />
    </>
  );
};

export default ModalCancelProject;
