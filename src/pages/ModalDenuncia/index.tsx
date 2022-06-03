import { Col, Container, Row } from 'react-bootstrap';
import { useState, useCallback, useEffect } from 'react';
import { Titulo } from '../../components/Titulo';

import {
  Content,
  Button,
  Center,
  GhostButton,
  ModalContainer,
  ModalDenunciaContent,
  ContainerInputCheck,
  InputCheck,
  TextAreaDenuncia,
} from './style';
import { Option, Select } from '../../components/Select';
import { Spacer } from '../../components/Spacer';

import * as Yup from 'yup';

import {
  ErrorMessages,
  getValidationErrors,
} from '../../utils/ValidationError';
import { FormError } from '../../utils/FormError';

import { pessoas_api } from '../../services/pessoas_api';
import { useAuth } from '../../contexts/auth';
import { ModalInformation } from '../../components/ModalInformation';
import { LARANJA } from '../../styles/variaveis';

interface IModalDenuncia {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
  idPessoaDenunciado: number;
}

export function ModalDenuncia({
  showModal,
  setShowModal,
  url,
  idPessoaDenunciado,
}: IModalDenuncia) {
  const tiposDenuncia: Option[] = [
    {
      value: 'Propaganda indevida',
      label: 'Propaganda indevida',
    },
    {
      value: 'Agressão verbal',
      label: 'Agressão verbal',
    },
    {
      value: 'Proposta ilegal',
      label: 'Proposta ilegal',
    },
    {
      value: 'Tentativa de Fraude',
      label: 'Tentativa de Fraude',
    },
    {
      value: 'Outros',
      label: 'Outros',
    },
  ];

  const { user } = useAuth();
  const [errors, setErrors] = useState<ErrorMessages>({} as ErrorMessages);
  const [tipoDenuncia, setTipoDenuncia] = useState('');

  const [denuncia, setDenuncia] = useState('');
  const [checkedDenuncia, setCheckedDenuncia] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (denuncia.length >= 150) {
      setErrors({});
    }
  }, [denuncia]);

  const postar = useCallback(
    async event => {
      event.preventDefault();
      setErrors({});
      try {
        if (tipoDenuncia === '') {
          throw new FormError('tipoDenuncia', 'Favor selecionar a opção.');
        }
        if (!denuncia.length) {
          throw new FormError('denuncia', 'Favor preencher a denúncia.');
        } else if (!checkedDenuncia) {
          setErrors({ check: 'marque o check' });
          return;
        } else if (denuncia.length >= 150) {
          setErrors({});
        }
        try {
          // --> Salvar  Denuncia
          var pessoaModeracao = {
            idPessoa: idPessoaDenunciado,
            dsEmailDenunciante: user.email,
            nmDenunciante: user.nome,
            dtDenuncia: new Date(),
            linkDenuncia: url,
            tipoDenuncia: tipoDenuncia,
            denuncia: denuncia,
            nrTelefoneDenunciante: user.telefone_fornecedor,
            termoDenuncia: checkedDenuncia,
          };
          await pessoas_api.post(`/pessoas/denuncias`, pessoaModeracao);
          //--> Fechar Modal
          setShowModal(false);
          setDenuncia('');
          setTipoDenuncia('');
          setShowSuccessModal(true);
          setTimeout(() => {
            setShowSuccessModal(false);
          }, 1000);
        } catch (error) {
          if (error instanceof Yup.ValidationError) {
            const validationErrors = getValidationErrors(error);
            setErrors(validationErrors);
          }
          if (error instanceof FormError) {
            setErrors({ ...errors, [error.field]: error.message });
          }
        }
      } catch (error: any) {
        if (error instanceof Yup.ValidationError) {
          const validationErrors = getValidationErrors(error);
          setErrors(validationErrors);
        }

        if (error instanceof FormError) {
          setErrors({ ...errors, [error.field]: error.message });
        }
      }
    },
    [
      errors,
      setShowModal,
      denuncia,
      tipoDenuncia,
      url,
      user.email,
      idPessoaDenunciado,
      user.nome,
      user.telefone_fornecedor,
      checkedDenuncia,
    ],
  );

  return (
    <Content>
      <ModalInformation
        showModal={showSuccessModal}
        title="Denuncia feita com sucesso"
        color={LARANJA}
      ></ModalInformation>
      <ModalDenunciaContent
        className="modal-denuncia"
        show={showModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modal-dialog modal-lg"
      >
        <ModalContainer>
          <Container className="p-12">
            <Row>
              <Col lg={12} className="d-flex justify-content-center">
                <Titulo
                  titulo="Encontrou algo de errado?"
                  tamanho={30}
                  cor="rgba(0, 143, 229, 1)"
                />
              </Col>
            </Row>
            <Spacer size={10} />
            <Row className="mb-12">
              <Col lg={12} className="mb-12">
                <Titulo
                  titulo="Nós da Gyan valorizamos a sua segurança e privacidade. Por favor, nos informe abaixo o motivo dessa denúncia."
                  tamanho={15}
                  cor="rgba(73, 73, 73, 0.8)"
                />
              </Col>
            </Row>
            <Spacer size={5} />
            <Row className="mt-12">
              <Col lg={12}>
                <Center>
                  <Select
                    name="tipoDenuncia"
                    value={tipoDenuncia}
                    options={tiposDenuncia}
                    error={errors.tipoDenuncia}
                    setter={event => {
                      setTipoDenuncia(event.target.value);
                      setErrors({ ...errors, tipoDenuncia: '' });
                    }}
                  />
                </Center>
              </Col>
            </Row>
            <Spacer size={5} />
            <Row className="mb-12">
              <Col lg={12} className="mb-12">
                <Titulo
                  titulo="Queremos muito te ouvir. Por favor, nos explique melhor o que aconteceu"
                  tamanho={15}
                  cor="rgba(73, 73, 73, 0.8)"
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={12}>
                <TextAreaDenuncia
                  placeholder="Descrição"
                  name="denuncia"
                  setter={setDenuncia}
                  value={denuncia}
                  error={errors.denuncia}
                />
              </Col>
            </Row>
            <Spacer size={5} />
            <Row>
              <Col lg={12}>
                <ContainerInputCheck
                  isError={
                    errors && errors.check && errors.check.length > 0
                      ? true
                      : false
                  }
                >
                  <InputCheck
                    type="checkbox"
                    name="checkbox-denuncia"
                    value="true"
                    onChange={e => {
                      if (!e.target.checked) {
                        setErrors({ check: 'Marque o check' });
                      } else {
                        setErrors({ ...errors, check: '' });
                      }
                      setCheckedDenuncia(!checkedDenuncia);
                    }}
                  />
                  <span>
                    Ao denunciar um usuário, estou ciente que o mesmo poderá
                    ficar bloqueado da plataforma até que a denúncia seja
                    analisada. Também concordo que em caso de denúncia indevida
                    fico sujeito ás punições cabíveis.
                  </span>
                </ContainerInputCheck>
              </Col>
            </Row>
            <Row>
              <Col
                lg={12}
                className="mt-3 d-flex justify-content-end container-buttons"
              >
                <GhostButton
                  onClick={e => {
                    setShowModal(false);
                    setDenuncia('');
                    setTipoDenuncia('');
                  }}
                >
                  CANCELAR
                </GhostButton>
                <Button className="ms-4" onClick={postar}>
                  DENUNCIAR
                </Button>
              </Col>
            </Row>
          </Container>
        </ModalContainer>
      </ModalDenunciaContent>
    </Content>
  );
}
