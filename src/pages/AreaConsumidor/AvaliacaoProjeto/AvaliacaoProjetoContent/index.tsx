import { useCallback, useState } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { useAvaliacaoProjetoConsumidor } from '../../../../hooks/avaliacaoProjetoConsumidor';
import { VERDE } from '../../../../styles/variaveis';
import  AjudeMelhorar  from '../AjudeMelhorar';
import  SobreProjeto  from '../SobreProjeto';
import { Button, ContainerAcoes, Content, GhostButton } from './style';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { FiXCircle } from 'react-icons/fi';
import { useHistory } from 'react-router';
import { ModalInformation } from '../../../../components/ModalInformation';
import { Card } from '../../../../components/Card';

interface IDadosProjetoFornecedor {
  idProjeto: number;
  idFornecedor: number;
}

export default function AvaliacaoProjetoContent({
  idProjeto,
  idFornecedor,
}: IDadosProjetoFornecedor) {
  const {
    nota,
    nota_plataforma,
    getValues,
    habilidades_percebidas,
    usabilidade,
    funcionalidade,
    seguranca,
  } = useAvaliacaoProjetoConsumidor();

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

  const commentValidation = useCallback(() => {
    if (getValues('comentario')?.length > 1000) {
      setError('O número de caracteres excedeu o limite permitido!');
      scrollTop();
      return true;
    }
    if (usabilidade && funcionalidade && seguranca) return false;

    return false;
  }, [funcionalidade, getValues, seguranca, usabilidade]);

  const experieceValidation = useCallback(() => {
    if (getValues('experiencia')?.length > 1000) {
      setError('O número de caracteres excedeu o limite permitido!');
      scrollTop();
      return true;
    }
    if (nota && nota > 3) return false;
    if (
      getValues('experiencia')?.length === 0 ||
      !getValues('experiencia') ||
      getValues('experiencia') === undefined
    ) {
      setError('Campo de descricao esta vazio');
      scrollTop();
      return true;
    }
    if (getValues('experiencia')?.length < 30) {
      setError(
        'E necessario que o campo de descricao tenha pelo menos 30 letras',
      );
      scrollTop();
      return true;
    }
    return false;
  }, [getValues, nota]);

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

  const skillsValidation = useCallback(() => {
    if (getValues('habilidades') === undefined && !habilidades_percebidas) {
      setError('É necessário que informe pelo menos uma habilidade.');
      scrollTop();
      return true;
    }
    return false;
  }, [getValues, habilidades_percebidas]);

  const handleSendEvaluation = useCallback(async () => {
    try {
      setError('');
      if (noteValidation()) return;
      if (experieceValidation()) return;
      if (skillsValidation()) return;
      if (notePlatform()) return;
      if (plataformEvaluationValidation()) return;
      if (commentValidation()) return;
      await oportunidades_api.post(
        `/projetos/${idProjeto}/avaliacao-fornecedor`,
        {
          id_pessoa: idFornecedor,
          nota: nota ? nota : 1,
          descricao: getValues('experiencia'),
          habilidades_percebidas: habilidades_percebidas,
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
        history.push('/consumidor/home');
      }, 3000);
    } catch (error: any) {
      setError(error.response.data.message);
      scrollTop();
      console.error(error.response);
    }
  }, [
    noteValidation,
    experieceValidation,
    skillsValidation,
    notePlatform,
    plataformEvaluationValidation,
    commentValidation,
    idProjeto,
    idFornecedor,
    nota,
    getValues,
    habilidades_percebidas,
    nota_plataforma,
    usabilidade,
    funcionalidade,
    seguranca,
    history,
  ]);
  return (
    <Content>
      <Card>
        <ModalInformation
          title="Avaliação enviada com sucesso! :)"
          showModal={successModalIsOpen}
          color={VERDE}
        />

        <Row>
          {error.length ? (
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

        <Row>
          <Col lg={6}>
            <SobreProjeto id={idFornecedor} idProjeto={idProjeto} />
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
