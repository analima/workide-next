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
import { CINZA_80, AZUL } from '../../../../../../styles/variaveis';
import { ModalExcludConfirmation } from '../../../../../../components/ModalExcludConfirmation';

import { Button, Content } from './style';
import { ModalInformation } from '../../../../../../components/ModalInformation';

interface IItemCaseSucessoProps {
  item: ICaseSucesso;
  loadItens: () => Promise<void>;
}

interface IFormProps {
  titulo: string;
  problema: string;
  solucao: string;
  resultado: string;
  link: string;
  total_horas: number;
  setor: string;
}
interface ICaseSucesso {
  id: number;
  titulo: string;
  problema: string;
  solucao: string;
  resultado: string;
  link: string;
  total_horas: number;
  setor: string;
}

const schema = Yup.object().shape({
  titulo: Yup.string()
    .min(10, 'Título deve conter no mínimo 10 caracteres')
    .max(100, 'Título deve conter no máximo 100 caracteres')
    .required('Título é obrigatório'),
  problema: Yup.string()
    .min(150, 'Problema deve conter no mínimo 150 caracteres')
    .max(1000, 'Problema deve conter no máximo 1000 caracteres')
    .required('Problema é obrigatório'),
  solucao: Yup.string()
    .min(150, 'Solução deve conter no mínimo 150 caracteres')
    .max(1000, 'Solução deve conter no máximo 1000 caracteres')
    .required('Solução é obrigatório'),
  resultado: Yup.string()
    .min(150, 'Resultado deve conter no mínimo 150 caracteres')
    .max(1000, 'Resultado deve conter no máximo 1000 caracteres')
    .required('Resultado é obrigatório'),
  link: Yup.string().matches(
    /^$|((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    'Informe uma URL válida',
  ),
  total_horas: Yup.string().required('Total de horas é obrigatório'),
  setor: Yup.string()
    .required('Setor é obrigatório')
    .max(100, 'Descrição deve conter no máximo 100 caracteres'),
});

export function ItemCaseSucesso({ item, loadItens }: IItemCaseSucessoProps) {
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
  const [caseSucesso, setCaseSucesso] = useState<ICaseSucesso>(
    {} as ICaseSucesso,
  );
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showSuccess, setShowSuccess] = useState('');

  useEffect(() => {
    setCaseSucesso(item);
    reset({
      titulo: item.titulo,
      problema: item.problema,
      solucao: item.solucao,
      resultado: item.resultado,
      link: item.link ? item.link : '',
      total_horas: item.total_horas,
      setor: item.setor,
    });
  }, [item, reset]);

  const handleAlterarCaseSucesso = useCallback(
    async (form: IFormProps) => {
      const request = {
        link: form.link ? form.link : '',
        problema: form.problema,
        resultado: form.resultado,
        setor: form.setor,
        solucao: form.solucao,
        titulo: form.titulo,
        total_horas: form.total_horas,
      };

      const response = await ofertas_api.put(
        `/cases-sucesso/${caseSucesso.id}`,
        request,
      );

      setCaseSucesso(response.data);
      setEditar(false);
      loadItens();

      setShowSuccess('O seu case de sucesso foi editado com sucesso!');
      setTimeout(() => {
        setShowSuccess('');
      }, 3000);
    },
    [caseSucesso, setCaseSucesso, setEditar, loadItens],
  );

  const handleExcluirCaseSucesso = useCallback(async () => {
    await ofertas_api.delete(`/cases-sucesso/${caseSucesso.id}`);

    loadItens();
  }, [caseSucesso, loadItens]);

  const handleDeleteIsTrue = useCallback(async () => {
    setShowModalDelete(true);
  }, []);

  return (
    <Content>
      <ModalExcludConfirmation
        showModal={showModalDelete}
        setShowModal={setShowModalDelete}
        title="Deseja realmente excluir?"
        text="Ao clicar no botão 'sim, quero excluir' o case de sucesso será deletado permanentemente e não será possível recuperar-lo em outro momento"
        mainColor={AZUL}
        onDelete={handleExcluirCaseSucesso}
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
                  <Col lg={2}>Titulo: </Col>
                  <Col lg={10}>
                    <InputText
                      control={control}
                      name="titulo"
                      placeholder="Descreva um título para o case"
                      error={errors.titulo && errors.titulo.message}
                    />
                  </Col>
                </Row>
              </Col>

              <Col lg={12} className="mb-3">
                <Row>
                  <Col lg={2}>Problema: </Col>
                  <Col lg={10}>
                    <TextArea
                      control={control}
                      name="problema"
                      placeholder="Explique aqui qual era o principal problema do seu cliente"
                      error={errors.problema && errors.problema.message}
                    />
                  </Col>
                </Row>
              </Col>

              <Col lg={12} className="mb-3">
                <Row>
                  <Col lg={2}>Solução: </Col>
                  <Col lg={10}>
                    <TextArea
                      control={control}
                      name="solucao"
                      placeholder="Descreva como você solucionou"
                      error={errors.solucao && errors.solucao.message}
                    />
                  </Col>
                </Row>
              </Col>

              <Col lg={12} className="mb-3">
                <Row>
                  <Col lg={2}>Resultado: </Col>
                  <Col lg={10}>
                    <TextArea
                      control={control}
                      name="resultado"
                      placeholder="Descreva quais foram os resultados"
                      error={errors.resultado && errors.resultado.message}
                    />
                  </Col>
                </Row>
              </Col>

              <Col lg={12} className="mb-3">
                <Row>
                  <Col lg={2}>Link: </Col>
                  <Col lg={10}>
                    <InputText
                      control={control}
                      name="link"
                      placeholder="URL"
                      error={errors.link && errors.link.message}
                    />
                  </Col>
                </Row>
              </Col>

              <Col lg={12} className="mb-3">
                <Row>
                  <Col lg={2}>Total horas: </Col>
                  <Col lg={10}>
                    <InputText
                      type="number"
                      control={control}
                      name="total_horas"
                      placeholder="Total de horas na execução"
                      error={errors.total_horas && errors.total_horas.message}
                    />
                  </Col>
                </Row>
              </Col>

              <Col lg={12} className="mb-3">
                <Row className="align-items-center">
                  <Col lg={2}>Setor: </Col>
                  <Col lg={10}>
                    <InputText
                      control={control}
                      name="setor"
                      placeholder="Setor do case de sucesso"
                      error={errors.setor && errors.setor.message}
                      maxLength={100}
                    />
                  </Col>
                </Row>
              </Col>

              <Col lg={12} className="mt-4">
                <Button onClick={handleSubmit(handleAlterarCaseSucesso as any)}>
                  SALVAR
                </Button>
              </Col>
            </Row>
          </Container>
        </Card>
      ) : (
        <Card>
          <Container>
            <div className="d-flex justify-content-between">
              <div>
                <Titulo titulo={item.titulo} tamanho={20} />
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
          </Container>
        </Card>
      )}

      <Spacer size={24} />
    </Content>
  );
}
