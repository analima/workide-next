import { useCallback, useEffect, useState } from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { ofertas_api } from '../../../../../services/ofertas_api';
// eslint-disable-next-line
import { useAuth } from '../../../../../contexts/auth';
import { Card } from '../../../../../components/Card';
import { Spacer } from '../../../../../components/Spacer';
import { TextArea } from '../../../../../components/Form/TextArea';
import { Titulo } from '../../../../../components/Titulo';
import { AZUL, CINZA_40, PRETO_10 } from '../../../../../styles/variaveis';
import { ItemRequisito } from './ItemRequisito';

import { Button, Content, GhostButton } from './style';
import { useCadastroServico } from '../../../../../hooks/cadastroServico';
import { IoMdHelpCircle } from 'react-icons/io';
import { ModalInformation } from '../../../../../components/ModalInformation';

interface IRequisitosProps {
  continuar: () => void;
  voltar: () => void;
}

interface IFormProps {
  descricao: string;
}
interface IRequisito {
  descricao: string;
  id: number;
}

const schema = Yup.object().shape({
  descricao: Yup.string()
    .min(10, 'Descrição deve conter no mínimo 10 caracteres')
    .max(150, 'Descrição deve conter no máximo 150 caracteres')
    .required('Descrição do requisito é obrigatória'),
});

export function Requisitos({ continuar, voltar }: IRequisitosProps) {
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

  const [listaRequisitos, setListaRequisitos] = useState<IRequisito[]>([]);
  const mensagemRequisito = `
  Se para iniciar o seu trabalho você necessita previamente 
  de um briefing completo, histórico do cliente ou outras 
  informações e requisitos, informe em sua oferta para que 
  os clientes possam reunir tudo o que precisa e otimizar 
  o tempo de produção.
  `;
  const { idServico, mostrarDicaAntonio } = useCadastroServico();
  const [erro, setErro] = useState('');
  const [showSuccess, setShowSuccess] = useState('');

  const loadRequisitos = useCallback(async () => {
    const response = await ofertas_api.get(
      `requisitos-servico?size=9999&filter=servico=${idServico}`,
    );

    const { data } = response.data;

    setListaRequisitos(data);
  }, [idServico]);

  useEffect(() => {
    loadRequisitos();
  }, [loadRequisitos]);

  const handleCriarRequisito = useCallback(
    async (form: IFormProps) => {
      const requisito = {
        id_servico: idServico,
        descricao: form.descricao,
      };

      const response = await ofertas_api.post('/requisitos-servico', requisito);

      const listaAtualizada = [...listaRequisitos, response.data];

      reset({
        descricao: '',
      });
      setListaRequisitos(listaAtualizada);
      setShowSuccess('O seu requisito foi criado com sucesso!');
      setTimeout(() => {
        setShowSuccess('');
      }, 3000);
    },
    [idServico, listaRequisitos, reset],
  );

  const handleContinuar = useCallback(async () => {
    if (listaRequisitos.length > 0) {
      setErro('');
      continuar();
    } else {
      setErro('Adicione no minimo 1 requisito');
      window.scrollTo(0, 300);
    }
  }, [listaRequisitos, continuar]);

  return (
    <Content>
      <ModalInformation
        title="Sucesso"
        text={showSuccess}
        color={AZUL}
        showModal={showSuccess.length > 0}
      ></ModalInformation>
      <Spacer size={32} />
      <Row>
        <Col lg={12}>
          {erro.length > 0 && <Alert variant="danger">{erro}</Alert>}
        </Col>
      </Row>
      <Titulo titulo="Requisitos" cor={PRETO_10} />
      <Col lg={8}>
        <Titulo
          titulo="Adicione abaixo os requisitos e informações que seu cliente precisa fornecer para você iniciar e concluir o seu trabalho."
          tamanho={20}
          cor={CINZA_40}
        />
      </Col>

      <Spacer size={32} />

      <Card>
        <Container>
          <Row>
            <Col lg={12} className="d-flex justify-content-end">
              <IoMdHelpCircle
                color={AZUL}
                size={24}
                onClick={() => mostrarDicaAntonio(mensagemRequisito)}
              />
            </Col>
            <Col lg={12}>
              <Titulo
                titulo={`Requisito ${String(
                  listaRequisitos.length + 1,
                ).padStart(2, '0')}`}
                tamanho={20}
              />

              <Spacer size={16} />

              <TextArea
                control={control}
                name="descricao"
                placeholder="O que meu cliente precisa me entregar de insumo para que eu possa entregar esse serviço?"
                error={errors.descricao && errors.descricao.message}
                maxLength={1000}
              />
            </Col>

            <Col lg={12} className="mt-4">
              <Button onClick={handleSubmit(handleCriarRequisito as any)}>
                SALVAR
              </Button>
            </Col>
          </Row>
        </Container>
      </Card>

      {listaRequisitos.map((requisito, index) => (
        <div key={index}>
          <ItemRequisito
            item={requisito}
            indice={index + 1}
            loadItens={loadRequisitos}
          />
        </div>
      ))}

      <Spacer size={120} />

      <Container>
        <Row>
          <Col lg={12}>
            <div className="btn-acoes">
              <GhostButton onClick={voltar}>VOLTAR</GhostButton>
              <Button onClick={handleContinuar}>PROXIMO</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Content>
  );
}
