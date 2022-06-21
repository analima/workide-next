import { Alert, Col, Row } from 'react-bootstrap';
// import { IoMdHelpCircle } from 'react-icons/io';
// import { Antonio } from '../../../../components/Antonio';
import { useAvaliacaoProjetoFornecedor } from '../../../../hooks/avaliacaoProjetoFornecedor';
import { AZUL } from '../../../../styles/variaveis';
import { AjudeMelhorar } from '../AjudeMelhorar';
import { SobreProjeto } from '../SobreProjeto';
import { Button, ContainerAcoes, Content, GhostButton } from './style';
import { useHistory } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { FiXCircle } from 'react-icons/fi';
import { ModalInformation } from '../../../../components/ModalInformation';
import { Card } from '../../../../components/Card';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';

interface IDadosProjetoConsumidor {
  idProjeto: number;
  idConsumidor: number;
}

export function AvaliacaoProjetoContent({
  idProjeto,
  idConsumidor,
}: IDadosProjetoConsumidor) {
  const {
    nota,
    nota_plataforma,
    getValues,
    habilidades_percebidas,
    usabilidade,
    funcionalidade,
    seguranca,
  } = useAvaliacaoProjetoFornecedor();

  const [successModalIsOpen, setSuccessModalIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const history = useHistory();

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  const plataformEvaluationValidation = useCallback(() => {
    if (
      usabilidade === undefined ||
      funcionalidade === undefined ||
      seguranca === undefined
    ) {
      setError(
        'É necessário que seja avaliado os campos usabilidade, funcionalidade e segurança.',
      );
      scrollTop();
      return true;
    }
    return false;
  }, [funcionalidade, seguranca, usabilidade]);

  const noteValidation = useCallback(() => {
    if (!nota) {
      setError('É necessario que escolha de 1 a 5 para classificar.');
      scrollTop();
      return true;
    }
    return false;
  }, [nota]);

  const notePlatform = useCallback(() => {
    if (nota_plataforma === undefined) {
      setError(
        'É necessário que informe as chances de recomendar a Gyan para um amigo.',
      );
      scrollTop();
      return true;
    }
    return false;
  }, [nota_plataforma]);

  const handleSendEvaluation = useCallback(async () => {
    const description = getValues('experiencia');

    try {
      setError('');
      if (noteValidation()) return;
      if (notePlatform()) return;
      if (plataformEvaluationValidation()) return;
      await oportunidades_api.post(
        `/projetos/${idProjeto}/avaliacao-consumidor`,
        {
          id_pessoa: idConsumidor,
          nota: nota,
          descricao: description,
          habilidades_percebidas:
            getValues('habilidades') !== undefined
              ? habilidades_percebidas?.concat(getValues('habilidades'))
              : habilidades_percebidas,
          nota_plataforma: nota_plataforma,
          usabilidade: usabilidade,
          funcionalidade: funcionalidade,
          seguranca: seguranca,
          comentario_plataforma: getValues('comentario'),
        },
      );
      setSuccessModalIsOpen(true);
      setTimeout(() => {
        setSuccessModalIsOpen(false);
        history.push('/fornecedor/home');
      }, 3000);
    } catch (error: any) {
      console.error(error?.response);
      setError(error?.response?.data?.message);
      scrollTop();
    }
  }, [
    noteValidation,
    notePlatform,
    plataformEvaluationValidation,
    idProjeto,
    idConsumidor,
    nota,
    getValues,
    habilidades_percebidas,
    nota_plataforma,
    usabilidade,
    funcionalidade,
    seguranca,
    history,
  ]);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/fornecedor/avaliacao-projeto');
  }, []);

  return (
    <Content>
      <Helmet>
        <title>Gyan - Envie uma avaliação</title>
      </Helmet>
      <Card>
        <Row>
          {error?.length ? (
            <Alert
              variant="danger"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              {error}
              <FiXCircle
                className="fechar"
                onClick={() => setError('')}
                size={20}
                color="#c53030"
              />
            </Alert>
          ) : (
            <></>
          )}
        </Row>
        <ModalInformation
          title="Avaliação enviada com sucesso! :)"
          showModal={successModalIsOpen}
          color={AZUL}
        />
        <Row>
          <Col lg={6}>
            <SobreProjeto idConsumidor={idConsumidor} />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg={6}>
            <AjudeMelhorar />
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            <ContainerAcoes>
              <GhostButton onClick={() => history.goBack()}>VOLTAR</GhostButton>
              <Button onClick={handleSendEvaluation}>ENVIAR</Button>
            </ContainerAcoes>
          </Col>
        </Row>
      </Card>
    </Content>
  );
}
