import { useEffect, useState } from 'react';
import { ModalBody, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Content,
  ModalConfirmation,
  Container,
  Title,
  ContentButton,
} from './style';
import { Spacer } from '../Spacer';
import { InputText } from '../Form/InputText';
import { InputMask } from '../Form/InputMask';
import { pessoas_api } from 'src/services/pessoas_api';

interface IModalRecomendacao {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalEbookOngs({
  showModal,
  setShowModal,
}: IModalRecomendacao) {
  const schema = Yup.object().shape({});

  const [errorName, setErrorName] = useState<string>('');
  const [errorTelephone, setErrorTelephone] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorInstitution, setErrorInstitution] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { control, watch, setValue } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setErrorName('');
    setErrorEmail('');
    setErrorInstitution('');
    setErrorTelephone('');
  }, []);

  const download = async () => {
    try {
      setLoading(true);
      if (!control._formValues.inputNome)
        setErrorName('Por favor, informe um nome.');
      else setErrorName('');
      if (!control._formValues.inputInstituicao)
        setErrorInstitution('Por favor, informe a instituição.');
      else setErrorInstitution('');
      if (!control._formValues.inputTelefone)
        setErrorTelephone('Por favor, informe um telefone.');
      else setErrorTelephone('');
      if (!control._formValues.inputEmail)
        setErrorEmail('Por favor, informe um email.');
      else setErrorEmail('');

      if (
        errorEmail !== '' ||
        errorInstitution !== '' ||
        errorName !== '' ||
        errorTelephone
      )
        return;
      await pessoas_api.post(`/dados-ebook`, {
        nome: control._formValues.inputNome,
        instituicao: control._formValues.inputInstituicao,
        email: control._formValues.inputEmail,
        telefone: control._formValues.inputTelefone,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
                name="inputNome"
                control={control}
                required={true}
                isString={true}
                error={errorName}
              />
            </Row>
            <Row>
              <Spacer size={10} />
              <InputText
                label="Instituição"
                placeholder="Obrigatório"
                name="inputInstituicao"
                control={control}
                required={true}
                error={errorInstitution}
              />
            </Row>
            <Row>
              <Spacer size={10} />
              <InputMask
                label="Telefone"
                placeholder="Obrigatório"
                name="inputTelefone"
                control={control}
                required={true}
                error={errorTelephone}
                mask="(99) 99999-9999"
              />
            </Row>
            <Row>
              <Spacer size={10} />
              <InputText
                label="Email"
                placeholder="Obrigatório"
                name="inputEmail"
                control={control}
                required={true}
                error={errorEmail}
              />
            </Row>
            <Row>
              <ContentButton>
                <button onClick={download}>
                  {loading ? 'Carregando...' : 'Fazer download'}
                </button>
              </ContentButton>
            </Row>
          </Container>
        </ModalBody>
      </ModalConfirmation>
    </Content>
  );
}
