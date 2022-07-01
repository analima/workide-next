import { InputHTMLAttributes, useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { FiTrash2 } from 'react-icons/fi';
import { oportunidades_api } from '../../services/oportunidades_api';
import { VERMELHO } from '../../styles/variaveis';
import { dataValidation } from '../../utils/DateValidator';
import { Card } from '../Card';
import { Button } from '../Form/Button';
import { InputText } from '../Form/InputText';
import { Titulo } from '../Titulo';
import {
  PerguntaData,
  Pergunta,
  PerguntaContainer,
  RespostaContainer,
  RespostaData,
  Resposta,
  PerguntaAutor,
  IconeContainer,
  LoadDelete,
  ModalContainer,
} from './style';

interface ICardPergunta {
  inputProps: IInputProps;
  perguntas: IPerguntasProps;
  excluir?: () => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
  id_pergunta?: number;
  id_projeto?: number;
}

interface IPerguntasProps {
  id: number;
  idProjeto: number;
  descricao: string;
  resposta: string;
  quemPergunta: QuemPerguntaProps;
  dataHoraCriacao: string;
  dataHoraResposta: string;
}

interface QuemPerguntaProps {
  id: number;
  nomeTratamento: string;
}

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
}

export function CardPergunta({
  inputProps,
  perguntas,
  excluir,
  setLoading,
  id_projeto,
}: ICardPergunta) {
  const [isLoading, setIsLoading] = useState(false);
  const [modalExcluirPergunta, setModalExcluirPergunta] = useState(false);

  const excluirPergunta = async (id_pergunta: number) => {
    try {
      setIsLoading(true);
      await oportunidades_api.delete(
        `/projetos/${id_projeto}/perguntas/${id_pergunta}`,
      );
      setIsLoading(false);
      setLoading(true);
    } catch (error: any) {
      console.error(error.response);
      setIsLoading(false);
      setLoading(false);
    }
  };

  const responder = (id: number) => {
    const resposta = inputProps.control._formValues.pergunta;
    if (resposta !== '') {
      oportunidades_api.patch(
        `projetos/${id_projeto}/perguntas/${id}/responder`,
        {
          resposta: resposta,
        },
      );
      setLoading(true);
      inputProps.control._formValues.pergunta = '';
    }
  };

  return (
    <Card>
      <Modal
        onHide={() => setModalExcluirPergunta(false)}
        centered
        show={modalExcluirPergunta}
      >
        <Modal.Body>
          <ModalContainer>
            <Titulo
              titulo="Deseja realmente excluir esta pergunta?"
              cor={VERMELHO}
              tamanho={18}
            />
            <div>
              <Button
                label="CANCELAR"
                onClick={() => setModalExcluirPergunta(false)}
              />
              <Button
                label="EXCLUIR"
                color="danger"
                onClick={() => {
                  excluirPergunta(perguntas.id);
                  setModalExcluirPergunta(false);
                }}
              />
            </div>
          </ModalContainer>
        </Modal.Body>
      </Modal>
      <IconeContainer>
        <Row>
          <Col lg={12}>
            <FiTrash2
              onClick={() => {
                setModalExcluirPergunta(true);
              }}
            />
          </Col>
        </Row>
      </IconeContainer>

      <PerguntaContainer>
        {isLoading && (
          <LoadDelete>
            <div className="spinner-border text-primary" role="status"></div>
          </LoadDelete>
        )}
        <Row>
          <Col lg={12}>
            <PerguntaData>
              {dataValidation(perguntas.dataHoraCriacao)}
            </PerguntaData>
          </Col>
          <Col lg={12}>
            <Pergunta>{perguntas.descricao}</Pergunta>
          </Col>
          <Col lg={12}>
            <PerguntaAutor>
              - {perguntas.quemPergunta.nomeTratamento}
            </PerguntaAutor>
          </Col>
        </Row>
      </PerguntaContainer>

      <RespostaContainer>
        {perguntas.resposta ? (
          <Row>
            <Col lg={12}>
              <strong>Resposta:</strong>
            </Col>
            <Col lg={12}>
              <Resposta>{perguntas.resposta}</Resposta>
            </Col>
            <Col lg={12}>
              <RespostaData>
                {dataValidation(perguntas.dataHoraResposta)}
              </RespostaData>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col lg={8}>
              <InputText control={inputProps.control} name={inputProps.name} />
            </Col>
            <Col lg={4}>
              <Button
                label="RESPONDER"
                onClick={() => responder(perguntas.id)}
              />
            </Col>
          </Row>
        )}
      </RespostaContainer>
    </Card>
  );
}
