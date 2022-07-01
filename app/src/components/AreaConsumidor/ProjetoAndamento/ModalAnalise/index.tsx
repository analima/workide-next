import { Col, Container, Modal, ModalBody, Row } from 'react-bootstrap';
import { Titulo } from '../../../Titulo';

import {
  ContainerAcoes,
  Aprovar,
  Negar,
  Anular,
  ArquivoAnexadoContainer,
  ArquivoAnexado,
  ContainerMensagem,
  MensagemAnexoIcone,
  MensagemEnviarIcone,
  DescricaoItem,
  Mensagem,
  InputStyled,
  EnviarRequisito,
} from './style';
import Content from './style';
import { AZUL, CINZA_40, VERDE, VERMELHO } from '../../../../styles/variaveis';
import {
  BsCheckCircle,
  BsDashCircle,
  BsFillArrowUpCircleFill,
  BsPaperclip,
} from 'react-icons/bs';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { ScrollContainer } from '../../../ScrollContainer';

import { usePropostaConsumidor } from '../../../../hooks/propostaConsumidor';
import { useCallback, useEffect, useState } from 'react';
import { pessoas_api } from '../../../../services/pessoas_api';
import { UserPanel } from '../../../UserPanel';
import { Spacer } from '../../../Spacer';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { useAuth } from '../../../../contexts/auth';

interface IModalAnalise {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  dadosEntregavel: {
    id: number;
    nome: string;
  };
}

interface ListPerguntasProps {
  arquivo: {
    id: number;
    nome: string;
    url: string;
  };
  lida: boolean;
  dataHoraCriacao: string;
  id: number;
  idProposta: number;
  idPropostaEntregavel: number;
  idPropostaRequisito: number;
  pessoaDestinatario: {
    id: number;
    nome: string;
    id_arquivo: string;
  };
  pessoaRemetente: {
    id: number;
    nome: string;
    id_arquivo: string;
    nome_tratamento: string;
  };
  texto: string;
}

export default function ModalAnalise({
  showModal,
  setShowModal,
  dadosEntregavel,

  type,
}: IModalAnalise) {
  const { dadosProjetos } = usePropostaConsumidor();

  const [listPerguntas, setListPerguntas] = useState<ListPerguntasProps[]>(
    [] as ListPerguntasProps[],
  );
  const [chat, setChat] = useState('');

  const { user } = useAuth();

  async function handleChat() {
    if (chat === '') {
      return;
    }
    if (type === 'envio') {
      try {
        await pessoas_api.post<any>(
          `/pessoas/${dadosProjetos.idPessoaFornecedor}/mensagens`,
          {
            texto: chat,
            // id_arquivo: 1,
            id_proposta_requisito: dadosEntregavel.id,
          },
        );
        setChat('');
        BuscaMensagem();
      } catch (error) {
        console.log(error);
      }
    }

    if (type === 'analise') {
      try {
        await pessoas_api.post<any>(
          `/pessoas/${dadosProjetos.idPessoaFornecedor}/mensagens`,
          {
            texto: chat,
            // id_arquivo: 1,
            id_proposta_entregavel: dadosEntregavel.id,
          },
        );
        setChat('');
        BuscaMensagem();
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    const markMessagesLikeRead = async () => {
      for (let pergunta of listPerguntas) {
        if (!pergunta.lida && pergunta.pessoaDestinatario.id === user.id) {
          pessoas_api.patch(`/pessoas/mensagens/${pergunta.id}/lida`, {
            lida: true,
          });
        }
      }
    };
    markMessagesLikeRead();
  }, [listPerguntas, user]);

  const BuscaMensagem = useCallback(async () => {
    if (type === 'envio') {
      try {
        const { data } = await pessoas_api.get<{
          values: ListPerguntasProps[];
        }>(
          `/pessoas/${dadosProjetos.idPessoaFornecedor}/mensagens?filter=idPropostaRequisito=${dadosEntregavel.id}&order=dataHoraCriacao=ASC`,
        );
        setListPerguntas(data.values);
      } catch (error) {
        console.log(error);
      }
    }

    if (type === 'analise') {
      try {
        const { data } = await pessoas_api.get<{
          values: ListPerguntasProps[];
        }>(
          `/pessoas/${dadosProjetos.idPessoaFornecedor}/mensagens?filter=idPropostaEntregavel=${dadosEntregavel.id}&order=dataHoraCriacao=ASC`,
        );
        setListPerguntas(data.values);
      } catch (error) {
        console.log(error);
      }
    }
  }, [dadosEntregavel.id, dadosProjetos.idPessoaFornecedor, type]);

  useEffect(() => {
    BuscaMensagem();
  }, [BuscaMensagem]);

  const handleAceitar = useCallback(async () => {
    try {
      oportunidades_api.patch(
        `/projetos/${dadosProjetos.id}/entregaveis/${dadosEntregavel.id}/analisar`,
        {
          status: 'ACEITO',
        },
      );
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  }, [dadosEntregavel.id, dadosProjetos.id, setShowModal]);

  const handleRecusar = useCallback(async () => {
    try {
      oportunidades_api.patch(
        `/projetos/${dadosProjetos.id}/entregaveis/${dadosEntregavel.id}/analisar`,
        {
          status: 'RECUSADO',
        },
      );
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  }, [dadosEntregavel.id, dadosProjetos.id, setShowModal]);

  const EnviarEntregavel = useCallback(async () => {
    try {
      oportunidades_api.patch(
        `/projetos/${dadosProjetos.id}/requisitos/${dadosEntregavel.id}/enviar`,
      );
    } catch (error) {
      console.log(error);
    }
  }, [dadosEntregavel.id, dadosProjetos.id]);

  return (
    <Content>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <ModalBody>
          <Container>
            <Row
              style={{ padding: '4px' }}
              className="d-flex align-items-center"
            >
              <Col lg={6} className="mb-3">
                <DescricaoItem>item: {dadosEntregavel.nome}</DescricaoItem>
              </Col>

              {type === 'analise' ? (
                <Col lg={6} className="mb-3">
                  <ContainerAcoes>
                    Validar:{' '}
                    <Aprovar onClick={() => handleAceitar()}>
                      Sim <BsCheckCircle color={VERDE} />
                    </Aprovar>
                    <Negar onClick={() => handleRecusar()}>
                      Não <IoMdCloseCircleOutline color={VERMELHO} />
                    </Negar>
                    <Anular onClick={() => setShowModal(false)}>
                      Anular <BsDashCircle color={AZUL} />
                    </Anular>
                  </ContainerAcoes>
                </Col>
              ) : (
                <Col lg={6} className="d-flex justify-content-end">
                  <EnviarRequisito onClick={() => EnviarEntregavel()}>
                    Enviar
                  </EnviarRequisito>
                </Col>
              )}
            </Row>

            <Row className="mb-3">
              <Col lg={12}>
                <Titulo titulo="Comentários" tamanho={24} cor={CINZA_40} />
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                {listPerguntas.length > 0 ? (
                  <ScrollContainer height={220}>
                    {listPerguntas.map((item: ListPerguntasProps) => (
                      <>
                        <UserPanel
                          key={item.id}
                          image={item.pessoaRemetente.id_arquivo}
                          name={item.pessoaRemetente.nome_tratamento}
                          text={item.texto}
                          date={item.dataHoraCriacao}
                        />
                        <Spacer size={10} />
                      </>
                    ))}
                  </ScrollContainer>
                ) : (
                  <div className="area-sem-msg">
                    <Titulo
                      titulo="Não há histórico de mensagens"
                      tamanho={16}
                      cor={CINZA_40}
                    />
                  </div>
                )}
              </Col>
            </Row>

            <Row className="mt-4">
              <Col lg={12}>
                <Titulo titulo="Anexos:" tamanho={24} cor={CINZA_40} />
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                <ScrollContainer height={200}>
                  <ArquivoAnexadoContainer>
                    <ArquivoAnexado href="#">
                      Nome_do_Arquivo_005.pdf
                    </ArquivoAnexado>
                    <ArquivoAnexado href="#">
                      Nome_do_Arquivo_005_asdasdsadsadsadasdasdasdasdasd.pdf
                    </ArquivoAnexado>
                  </ArquivoAnexadoContainer>
                </ScrollContainer>
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                <ContainerMensagem>
                  <MensagemAnexoIcone>
                    <BsPaperclip color={AZUL} size={24} />
                  </MensagemAnexoIcone>

                  <Mensagem>
                    <InputStyled
                      value={chat}
                      type="text"
                      onKeyUp={(e: any) => {
                        if (e.keyCode === 13) {
                          handleChat();
                        }
                      }}
                      placeholder="Digite aqui um comentario"
                      onChange={evt => {
                        setChat(evt.target.value);
                      }}
                    />
                  </Mensagem>

                  <MensagemEnviarIcone>
                    <BsFillArrowUpCircleFill
                      onClick={() => handleChat()}
                      color={AZUL}
                      size={24}
                    />
                  </MensagemEnviarIcone>
                </ContainerMensagem>
              </Col>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    </Content>
  );
}
