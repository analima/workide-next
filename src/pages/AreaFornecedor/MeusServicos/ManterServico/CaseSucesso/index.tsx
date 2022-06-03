import { useState, useCallback, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { ofertas_api } from '../../../../../services/ofertas_api';
import { Card } from '../../../../../components/Card';

import { InputText } from '../../../../../components/Form/InputText';
import { Spacer } from '../../../../../components/Spacer';
import { TextArea } from '../../../../../components/Form/TextArea';
import { Titulo } from '../../../../../components/Titulo';
import { AZUL, CINZA_40, PRETO_10 } from '../../../../../styles/variaveis';
import { ItemCaseSucesso } from './ItemCaseSucesso';

import {
  Button,
  ContainerButtons,
  ContainerHeader,
  Content,
  GhostButton,
} from './style';
import { useCadastroServico } from '../../../../../hooks/cadastroServico';
import { IoMdHelpCircle } from 'react-icons/io';
import { InputNumber } from '../../../../../components/Form/InputNumber';
import { ModalInformation } from '../../../../../components/ModalInformation';

interface ICaseSucessoProps {
  continuar: () => void;
  voltar: () => void;
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
  total_horas: number;
  link: string;
  horas: string;
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
    /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
    'Informe uma URL válida',
  ),
  total_horas: Yup.string().required('Total de horas é obrigatório'),
  setor: Yup.string()
    .required('Setor é obrigatório')
    .max(100, 'Descrição deve conter no máximo 100 caracteres'),
});

export function CaseSucesso({ continuar, voltar }: ICaseSucessoProps) {
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

  const mensagemCaseSucesso = `
  Agora é a hora de conquistar novos clientes! 
  Nesse campo você pode adicionar um case de 
  sucesso para essa oferta, contando como você 
  já atendeu um cliente com ela. Explique, qual 
  foi o desafio, a solução que você encontrou e 
  o resultado final que você atingiu.
  `;

  const [listaCaseSucesso, setListaCaseSucesso] = useState<ICaseSucesso[]>([]);

  const { idServico, mostrarDicaAntonio } = useCadastroServico();
  const [errorHorasTotal, setErrorHorasTotal] = useState('');
  const [showSuccess, setShowSuccess] = useState('');

  const loadCasesSucesso = useCallback(async () => {
    const response = await ofertas_api.get(
      `cases-sucesso?size=9999&filter=servico=${idServico}`,
    );

    const { data } = response.data;

    setListaCaseSucesso(data);
  }, [idServico]);

  useEffect(() => {
    loadCasesSucesso();
  }, [loadCasesSucesso]);

  const handleCriarCaseSucesso = useCallback(
    async (form: IFormProps) => {
      const caseSucesso = {
        id_servico: idServico,
        link: form.link ? form.link : undefined,
        problema: form.problema,
        resultado: form.resultado,
        setor: form.setor,
        solucao: form.solucao,
        titulo: form.titulo,
        total_horas: form.total_horas,
      };

      const response = await ofertas_api.post('/cases-sucesso', caseSucesso);

      const listaAtualizada = [...listaCaseSucesso, response.data];

      setListaCaseSucesso(listaAtualizada);

      reset({
        titulo: '',
        problema: '',
        solucao: '',
        resultado: '',
        link: '',
        total_horas: '',
        setor: '',
      });

      setShowSuccess('O seu case de sucesso foi criado com sucesso!');
      setTimeout(() => {
        setShowSuccess('');
      }, 3000);
    },
    [idServico, listaCaseSucesso, reset],
  );

  const handleHoraValue = async (horas: string) => {
    if (Number(horas) > 1000000000) {
      setErrorHorasTotal('O limite maximo de horas é de 1000000000 horas');
    } else {
      setErrorHorasTotal('');
    }
  };

  return (
    <Content>
      <ModalInformation
        title="Sucesso"
        text={showSuccess}
        color={AZUL}
        showModal={showSuccess.length > 0}
      ></ModalInformation>
      <Titulo titulo="Case de sucesso" cor={PRETO_10} />
      <ContainerHeader>
        <Titulo
          titulo="Adicione aqui um case de sucesso que você realizou para essa oferta e impressione seu cliente!"
          tamanho={20}
          cor={CINZA_40}
        />
        <GhostButton onClick={continuar}>PULAR</GhostButton>
      </ContainerHeader>

      <Spacer size={32} />

      {listaCaseSucesso.map(caseSucesso => (
        <div key={caseSucesso.id}>
          <ItemCaseSucesso item={caseSucesso} loadItens={loadCasesSucesso} />
        </div>
      ))}

      <Spacer size={32} />

      <Card>
        <Container>
          <Row>
            <Col lg={12} className="d-flex justify-content-end">
              <IoMdHelpCircle
                color={AZUL}
                size={24}
                onClick={() => mostrarDicaAntonio(mensagemCaseSucesso)}
              />
            </Col>
          </Row>

          <Spacer size={32} />

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
                    maxLength={1000}
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
                    maxLength={1000}
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
                    maxLength={1000}
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
                    maxLength={1000}
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
                  <InputNumber
                    control={control}
                    name="total_horas"
                    placeholder="Total de horas na execução"
                    error={
                      errors.total_horas
                        ? errors.total_horas.message
                        : errorHorasTotal
                    }
                    changeInpuNumberValue={handleHoraValue}
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
              <ContainerButtons>
                <Button onClick={handleSubmit(handleCriarCaseSucesso)}>
                  SALVAR
                </Button>
              </ContainerButtons>
            </Col>
          </Row>
        </Container>
      </Card>

      <Spacer size={64} />

      <Container>
        <Row>
          <Col lg={12}>
            <div className="btn-acoes">
              <GhostButton onClick={voltar}>VOLTAR</GhostButton>
              <Button onClick={continuar}>CONCLUIR</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Content>
  );
}
