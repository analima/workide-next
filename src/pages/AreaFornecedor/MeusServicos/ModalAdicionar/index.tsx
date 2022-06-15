import { useCallback, useEffect, useState } from 'react';
import { Alert, Col, Container, Modal, ModalBody, Row } from 'react-bootstrap';
import { GrFormClose } from 'react-icons/gr';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { ofertas_api } from '../../../../services/ofertas_api';
import { InputText } from '../../../../components/Form/InputText';
import { TextArea } from '../../../../components/Form/TextArea';
import { InputCheck } from '../../../../components/Form/InputCheck';
import { Foto } from '../../../../components/Foto';
import { Titulo } from '../../../../components/Titulo';
import {
  CloseModal,
  Content,
  Button,
  FotoServico,
  ModalServicoHeader,
  ModalServicoBody,
  ModalServicoFooter,
} from './style';
import { AZUL } from '../../../../styles/variaveis';

interface IModalAdicionar {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  loadData: () => Promise<void>;
}

interface FormProps {
  id_arquivo?: number;
  nome: string;
  descricao: string;
  termo_autoria: boolean;
}

const schema = Yup.object().shape({
  nome: Yup.string().required('Nome é obrigatório'),
  descricao: Yup.string().required('Descrição é obrigatória'),
  termo_autoria: Yup.boolean().required('Termo de autoria é obrigatório'),
});

export function ModalAdicionar({
  showModal,
  setShowModal,
  loadData,
}: IModalAdicionar) {
  const [erro, setErro] = useState('');
  const [fotoId, setFotoId] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [formData, setFormData] = useState<FormProps>({} as FormProps);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const loadServico = useCallback(() => {
    const formData = {
      nome: '',
      descricao: '',
      termo_autoria: false,
    };

    setFormData(formData);
  }, []);

  useEffect(() => {
    loadServico();
  }, [loadServico]);

  useEffect(() => {
    if (formData) {
      reset(formData);
    }
  }, [reset, formData]);

  const handleSalvarServico = useCallback(
    async (form: FormProps) => {
      try {
        if (!form.termo_autoria) {
          setErro('É necessário confirmar a declaração de autoria');
          return;
        }

        if (fotoId) {
          const id_arquivo = Number(fotoId);

          form = { ...form, id_arquivo };
        }

        await ofertas_api.post('/servicos', form);

        setFotoId('');
        setFotoUrl('');
        setErro('');
        setFormData({ nome: '', descricao: '', termo_autoria: false });
        setShowModal(false);
        loadData();
      } catch (error: any) {
        const { data } = error.response;

        if (data.status === 'error' && data.message) {
          setErro(data.message);
        }
      }
    },
    [fotoId, setShowModal, loadData],
  );

  return (
    <Content>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalBody>
          <CloseModal onClick={() => setShowModal(false)}>
            <GrFormClose />
          </CloseModal>

          <Container className="p-3">
            <ModalServicoHeader>
              <Row className="mb-4">
                <Col lg={12}>
                  <Titulo titulo="Novo serviço" cor={AZUL} />
                </Col>
              </Row>

              <Row className="mb-4">
                <Col lg={12}>
                  <Titulo
                    titulo="Adicione as informações básicas"
                    cor={AZUL}
                    tamanho={24}
                  />
                </Col>
              </Row>

              <Row className="mb-4">
                <Col lg={12}>
                  {erro && <Alert variant="danger">{erro}</Alert>}
                </Col>
              </Row>
            </ModalServicoHeader>

            <ModalServicoBody>
              <Row>
                <Col lg={3}>
                  <FotoServico>
                    <Foto
                      id="foto-servico"
                      idFoto={fotoId}
                      urlFoto={fotoUrl}
                      setterId={setFotoId}
                      setterUrl={setFotoUrl}
                    />
                  </FotoServico>
                </Col>

                <Col lg={9}>
                  <Row>
                    <Col lg={12} className="mb-3">
                      <InputText
                        control={control}
                        label="Nome do serviço"
                        name="nome"
                        placeholder="Obrigatório"
                        error={errors.nome && errors.nome.message}
                      />
                    </Col>

                    <Col lg={12}>
                      <TextArea
                        control={control}
                        label="Descrição do serviço"
                        name="descricao"
                        placeholder="Obrigatório"
                        error={errors.descricao && errors.descricao.message}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </ModalServicoBody>

            <ModalServicoFooter>
              <Row>
                <Col lg={12} className="mt-5">
                  <InputCheck
                    control={control}
                    label="Declaro que estes materiais foram criados por mim e não infigrem qual quer direitos de terceiros. Eu entendo que o uso ilegal de ativos digitais é contra os Termos de Serviço da Gyan e pode resultar em bloqueio da minha conta."
                    name="termo_autoria"
                    error={errors.termo_autoria && errors.termo_autoria.message}
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={12} className="mt-2 d-flex justify-content-end">
                  <Button onClick={handleSubmit(handleSalvarServico)}>
                    SALVAR
                  </Button>
                </Col>
              </Row>
            </ModalServicoFooter>
          </Container>
        </ModalBody>
      </Modal>
    </Content>
  );
}
