import { useCallback, useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { HiPencil, HiTrash } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { ofertas_api } from '../../../../../../services/ofertas_api';
import { Card } from '../../../../../../components/Card';
import { Spacer } from '../../../../../../components/Spacer';
import { TextArea } from '../../../../../../components/Form/TextArea';
import { Titulo } from '../../../../../../components/Titulo';
import { AZUL, CINZA_80 } from '../../../../../../styles/variaveis';

import { Button } from './style';
import Content from './style';
import { ModalExcludConfirmation } from '../../../../../../components/ModalExcludConfirmation';
import { ModalInformation } from '../../../../../../components/ModalInformation';

interface IItemRequisitoProps {
  item: IRequisito;
  indice: number;
  loadItens: () => Promise<void>;
}

interface IRequisito {
  descricao: string;
  id: number;
}

interface IFormProps {
  descricao: string;
}

const schema = Yup.object().shape({
  descricao: Yup.string().required('Descrição do requisito é obrigatória'),
});

export default function ItemRequisito({
  item,
  indice,
  loadItens,
}: IItemRequisitoProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  const [editar, setEditar] = useState(false);
  const [requisito, setRequisito] = useState<IRequisito>({} as IRequisito);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showSuccess, setShowSuccess] = useState('');

  useEffect(() => {
    setRequisito(item);
    reset({
      descricao: item.descricao,
    });
  }, [item, reset]);

  const handleAlterarRequisito = useCallback(
    async (form: IFormProps) => {
      const request = {
        descricao: form.descricao,
      };

      const response = await ofertas_api.put(
        `/requisitos-servico/${requisito.id}`,
        request,
      );

      setRequisito(response.data);
      setEditar(false);
      setShowSuccess('O seu requisito foi editado com sucesso!');
      setTimeout(() => {
        setShowSuccess('');
      }, 3000);
    },
    [requisito, setRequisito, setEditar],
  );

  const handleExcluirRequisito = useCallback(async () => {
    await ofertas_api.delete(`/requisitos-servico/${requisito.id}`);

    loadItens();
  }, [requisito, loadItens]);

  const handleDeleteIsTrue = useCallback(async () => {
    setShowModalDelete(true);
  }, []);

  return (
    <Content>
      <ModalExcludConfirmation
        showModal={showModalDelete}
        setShowModal={setShowModalDelete}
        title="Deseja realmente excluir?"
        text="Ao clicar no botão 'sim, quero excluir' o requisito será deletado permanentemente e não será possível recuperar-lo em outro momento"
        mainColor={AZUL}
        onDelete={handleExcluirRequisito}
      />
      <ModalInformation
        title="Sucesso"
        text={showSuccess}
        color={AZUL}
        showModal={showSuccess.length > 0}
      ></ModalInformation>
      <Spacer size={24} />

      {editar ? (
        <Card>
          <Container>
            <Row>
              <Col lg={12}>
                <Titulo
                  titulo={`Requisito ${String(indice).padStart(2, '0')}`}
                  tamanho={20}
                />

                <Spacer size={16} />

                <TextArea
                  control={control}
                  name="descricao"
                  placeholder="Eu preciso que o meu cliente..."
                  error={errors.descricao && errors.descricao.message}
                />
              </Col>

              <Col lg={12} className="mt-4">
                <Button onClick={handleSubmit(handleAlterarRequisito as any)}>
                  SALVAR
                </Button>
              </Col>
            </Row>
          </Container>
        </Card>
      ) : (
        <>
          <Spacer size={24} />
          <Card>
            <Container>
              <Row>
                <Col lg={12}>
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <Titulo
                        titulo={`Requisito ${String(indice).padStart(2, '0')}`}
                        tamanho={20}
                      />
                    </div>
                    <div className="acoes">
                      <HiPencil
                        onClick={() => setEditar(true)}
                        color={CINZA_80}
                        size={20}
                      />

                      <HiTrash
                        color={CINZA_80}
                        size={20}
                        onClick={handleDeleteIsTrue}
                      />
                    </div>
                  </div>

                  <Form.Control
                    className="viewTextArea"
                    as="textarea"
                    rows={5}
                    disabled={true}
                    value={requisito.descricao}
                  />
                </Col>
              </Row>
            </Container>
          </Card>
        </>
      )}
    </Content>
  );
}
