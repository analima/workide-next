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
  AlertError,
  ButtonDownload,
} from './style';
import { Spacer } from '../Spacer';
import { InputText } from '../Form/InputText';
import { InputMask } from '../Form/InputMask';
import { pessoas_api } from 'src/services/pessoas_api';

interface IModalRecomendacao {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  link: string;
  type: string;
}

export function ModalEbook({
  showModal,
  setShowModal,
  link,
  type,
}: IModalRecomendacao) {
  const schema = Yup.object().shape({});
  const [error, setError] = useState('');
  const [errorName, setErrorName] = useState<string>('');
  const [errorTelephone, setErrorTelephone] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorInstitution, setErrorInstitution] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [authorizedDownload, setAuthorizedDownload] = useState<boolean>(false);
  const { control, watch, setValue } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    watch(() => {
      if (
        control._formValues.inputEmail !== undefined &&
        control._formValues.inputInstituicao !== undefined &&
        control._formValues.inputNome !== undefined &&
        control._formValues.inputTelefone !== undefined
      )
        setAuthorizedDownload(true);
      else setAuthorizedDownload(false);
    });
  }, [
    control._formValues.inputEmail,
    control._formValues.inputInstituicao,
    control._formValues.inputNome,
    control._formValues.inputTelefone,
    watch,
  ]);

  useEffect(() => {
    setError('');
    setErrorName('');
    setErrorEmail('');
    setErrorInstitution('');
    setErrorTelephone('');
    setAuthorizedDownload(false);
  }, []);

  const validatingFields = () => {
    if (
      !control._formValues.inputNome ||
      control._formValues.inputNome === undefined
    )
      setErrorName('Por favor, informe um nome.');
    else setErrorName('');
    if (
      !control._formValues.inputInstituicao ||
      control._formValues.inputInstituicao === undefined
    )
      setErrorInstitution('Por favor, informe a instituição.');
    else setErrorInstitution('');
    console.log(!!control._formValues.inputInstituicao);
    if (
      !control._formValues.inputTelefone ||
      control._formValues.inputTelefone === undefined
    )
      setErrorTelephone('Por favor, informe um telefone.');
    else setErrorTelephone('');
    if (
      !control._formValues.inputEmail ||
      control._formValues.inputEmail === undefined
    )
      setErrorEmail('Por favor, informe um email.');
    else setErrorEmail('');

    if (
      control._formValues.inputEmail === undefined ||
      control._formValues.inputInstituicao === undefined ||
      !!control._formValues.inputInstituicao === false ||
      control._formValues.inputNome === undefined ||
      control._formValues.inputTelefone === undefined
    )
      return true;
    return false;
  };

  const download = async () => {
    try {
      setLoading(true);
      if (validatingFields()) return;
      const res = await pessoas_api.post(`/dados-ebook`, {
        nome: control._formValues.inputNome,
        instituicao: control._formValues.inputInstituicao,
        email: control._formValues.inputEmail,
        telefone: control._formValues.inputTelefone,
        ebook: type,
      });
      if (res.status === 201) {
        setAuthorizedDownload(true);
        setShowModal(false);
        setValue('inputEmail', '');
        setValue('inputTelefone', '');
        setValue('inputInstituicao', '');
        setValue('inputNome', '');
      }
    } catch (error: any) {
      console.error(error);
      setError(error.reponse?.message);
      setAuthorizedDownload(false);
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
            paddingLeft: '0',
            paddingRight: '0',
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
                label={type === 'ong' ? 'Instituição' : 'Empresa'}
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
            {error !== '' && (
              <Row>
                <AlertError>{error}</AlertError>
              </Row>
            )}
            <Row>
              <ContentButton onClick={download}>
                <button disabled={authorizedDownload}>
                  {authorizedDownload ? (
                    <ButtonDownload download href={link} target="_blank">
                      {loading ? 'Carregando...' : 'Fazer download'}
                    </ButtonDownload>
                  ) : (
                    <ButtonDownload>
                      {loading ? 'Carregando...' : 'Fazer download'}
                    </ButtonDownload>
                  )}
                </button>
              </ContentButton>
            </Row>
          </Container>
        </ModalBody>
      </ModalConfirmation>
    </Content>
  );
}
