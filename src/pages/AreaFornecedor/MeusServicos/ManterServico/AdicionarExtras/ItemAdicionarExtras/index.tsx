import { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { HiPencil, HiTrash } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { ofertas_api } from '../../../../../../services/ofertas_api';
import { Card } from '../../../../../../components/Card';
import { InputText } from '../../../../../../components/Form/InputText';
import { Spacer } from '../../../../../../components/Spacer';
import { TextArea } from '../../../../../../components/Form/TextArea';
import { Titulo } from '../../../../../../components/Titulo';
import { CINZA_80, LARANJA, AZUL } from '../../../../../../styles/variaveis';

import { Button, Content } from './style';
import { InputNumber } from '../../../../../../components/Form/InputNumber';
import { InputMoney } from '../../../../../../components/Form/InputMoney';
import { ModalExcludConfirmation } from '../../../../../../components/ModalExcludConfirmation';
import { ModalInformation } from '../../../../../../components/ModalInformation';

interface IItemAdicionarExtrasProps {
  item: IServicoExtra;
  loadItens: () => Promise<void>;
}

interface IServicoExtra {
  id: number;
  nome: string;
  descricao: string;
  extra: number;
  acrescimo: string;
}

const schema = Yup.object().shape({
  nome: Yup.string()
    .min(10, 'Nome deve conter no mínimo 10 caracteres')
    .max(100, 'Nome deve conter no máximo 100 caracteres')
    .required('Nome é obrigatório'),
  descricao: Yup.string()
    .min(150, 'Descrição deve conter no mínimo 150 caracteres')
    .max(1000, 'Descrição deve conter no máximo 1000 caracteres')
    .required('Descrição é obrigatória'),
  extra: Yup.string().required('Extra é obrigatório'),
  acrescimo: Yup.string().required('Acrescimo é obrigatório'),
});

export function ItemAdicionarExtras({
  item,
  loadItens,
}: IItemAdicionarExtrasProps) {
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
  const [servicoExtra, setServicoExtra] = useState<IServicoExtra>(
    {} as IServicoExtra,
  );
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showSuccess, setShowSuccess] = useState('');

  useEffect(() => {
    setServicoExtra(item);
    reset({
      nome: item.nome,
      descricao: item.descricao,
      extra: item.extra,
      acrescimo: item.acrescimo,
    });
  }, [item, reset]);

  const handleAlterarServicoExtra = useCallback(
    async (form: IServicoExtra) => {
      const request = {
        ...form,
      };

      const response = await ofertas_api.put(
        `/servicos-extra/${servicoExtra.id}`,
        request,
      );

      setServicoExtra(response.data);
      setEditar(false);
      loadItens();
      setShowSuccess('O seu serviço extra foi editado com sucesso!');
      setTimeout(() => {
        setShowSuccess('');
      }, 3000);
    },
    [servicoExtra, setServicoExtra, setEditar, loadItens],
  );

  const handleExcluirServicoExtra = useCallback(async () => {
    await ofertas_api.delete(`/servicos-extra/${servicoExtra.id}`);

    loadItens();
  }, [servicoExtra, loadItens]);

  const handleDeleteIsTrue = useCallback(async () => {
    setShowModalDelete(true);
  }, []);

  return (
    <Content>
      <ModalExcludConfirmation
        showModal={showModalDelete}
        setShowModal={setShowModalDelete}
        title="Deseja realmente excluir?"
        text="Ao clicar no botão 'sim, quero excluir' o item será deletado permanentemente e não será possível recuperar-lo em outro momento"
        mainColor={AZUL}
        onDelete={handleExcluirServicoExtra}
      />
      <ModalInformation
        title="Sucesso"
        text={showSuccess}
        color={AZUL}
        showModal={showSuccess.length > 0}
      ></ModalInformation>

      <Spacer size={20} />

      {editar ? (
        <Card>
          <Container>
            <Row>
              <Col lg={12} className="mb-3">
                <Row>
                  <Col lg={2}>Nome: </Col>
                  <Col lg={10}>
                    <InputText
                      control={control}
                      name="nome"
                      placeholder="Ex: Arquivo editável"
                      error={errors.nome && errors.nome.message}
                    />
                  </Col>
                </Row>
              </Col>

              <Col lg={12} className="mb-3">
                <Row>
                  <Col lg={2}>Descrição: </Col>
                  <Col lg={10}>
                    <TextArea
                      control={control}
                      name="descricao"
                      placeholder="Ex.: Vou enviar mais unidades do serviço..."
                      error={errors.descricao && errors.descricao.message}
                    />
                  </Col>
                </Row>
              </Col>

              <Row>
                <Col lg={6} className="mb-3">
                  <Row>
                    <Col lg={4}>Por um extra de: </Col>
                    <Col lg={6}>
                      <InputMoney
                        control={control}
                        name="extra"
                        placeholder="R$"
                        error={errors.extra && errors.extra.message}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col lg={6} className="mb-3">
                  <Row>
                    <Col lg={3}>E acrescentará mais: </Col>
                    <Col lg={6}>
                      <InputNumber
                        control={control}
                        name="acrescimo"
                        placeholder="Em dias"
                        error={errors.acrescimo && errors.acrescimo.message}
                      />
                    </Col>
                    <Col lg={2}>ao prazo.</Col>
                  </Row>
                </Col>
              </Row>

              <Col lg={12} className="mt-4">
                <Button onClick={handleSubmit(handleAlterarServicoExtra as any)}>
                  SALVAR
                </Button>
              </Col>
            </Row>
          </Container>
        </Card>
      ) : (
        <Card>
          <Container>
            <div className="d-flex justify-content-between mb-3">
              <div>
                <Titulo titulo={servicoExtra.nome} tamanho={20} cor={LARANJA} />
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

            <Row>
              <Col lg={12}>
                <p>{servicoExtra.descricao}</p>
              </Col>
            </Row>

            <Row>
              <Col lg={12} className="d-flex justify-content-between">
                <p>
                  Por um extra de <strong> R$ {servicoExtra.extra}.</strong>
                </p>

                <p>
                  E acrescentará mais{' '}
                  <strong>{servicoExtra.acrescimo} dias</strong> ao prazo.
                </p>
              </Col>
            </Row>
          </Container>
        </Card>
      )}
    </Content>
  );
}
