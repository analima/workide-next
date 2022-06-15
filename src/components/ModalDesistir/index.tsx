import { Alert, Col, Container, Modal, ModalBody, Row } from 'react-bootstrap';
import { Titulo } from '../Titulo';

import {
  Content,
  Button,
  GhostButton,
  ContainerAcoes,
  BarraProgresso,
  Progresso,
  Porcentagem,
} from './style';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiXCircle } from 'react-icons/fi';
import { useAuth } from '../../contexts/auth';

import { PRETO_10, LARANJA } from '../../styles/variaveis';
import { oportunidades_api } from '../../services/oportunidades_api';
import { useCallback, useEffect, useState } from 'react';
import { ModalInformation } from '../ModalInformation';
import { TextArea } from '../Form/TextArea';
import { InputNumber } from '../Form/InputNumber';
import { DesistenciaProps } from '../../hooks/propostaFornecedor';
import { pessoas_api } from '../../services/pessoas_api';
import { addDays } from 'date-fns';
import { format } from 'date-fns/esm';
import { Spacer } from '../Spacer';
import { pagamentos_api } from '../../services/pagamentos_api';
import { ModalCreateSubaccount } from '../../views/AreaConsumidor/ProjetoAndamento/Detalhes/ModalCreateSubaccount';
interface IModalDesistir {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  idProjeto: number;
  progresso: number | string | undefined;
  isProBono: boolean;
  combinado?: DesistenciaProps;
  combinarNovamente?: boolean;
  idPessoa?: number;
  getProjeto: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userType: 'consumidor' | 'fornecedor';
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

export function ModalDesistir({
  showModal,
  setShowModal,
  idProjeto,
  progresso,
  isProBono,
  combinado,
  combinarNovamente,
  idPessoa,
  getProjeto,
  setLoading,
  userType,
}: IModalDesistir) {
  const [showModalInformation, setShowModalInformation] = useState(false);
  const [step, setStep] = useState(0);
  const [porcentagem, setPorcentagem] = useState(0);
  const [motivoDesistencia, setMotivoDesistencia] = useState('');
  const [mensageInformation, setMensageInformation] = useState('');
  const [msgErrorDescription, setMsgErrorDescription] = useState('');
  const [apiErrorMsg, setApiErrorMsg] = useState('');
  const [showModalSubconta, setShowModalSubconta] = useState(false);
  const { user } = useAuth();

  const [nome, setNome] = useState('');
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!isProBono) return;

    if (isProBono) {
      setStep(3);
    }
  }, [isProBono]);

  useEffect(() => {
    if (!idPessoa) return;
    pessoas_api.get(`/pessoas/${idPessoa}`).then(({ data }) => {
      setNome(data.nome_tratamento);
    });
  }, [idPessoa]);

  useEffect(() => {
    watch(value => {
      setMotivoDesistencia(value.motivo_desistencia);
      if (Number(value.porcentagem) > 100) {
        setValue('porcentagem', 100);
        setPorcentagem(100);
      }

      setPorcentagem(Number(control._formValues.porcentagem));
    });
  }, [control._formValues.porcentagem, setValue, watch]);

  const handleDesistir = useCallback(
    async (idProjeto: number) => {
      try {
        if (!motivoDesistencia) {
          setMsgErrorDescription('Motivo de desistência é obrigatório');
          return;
        }

        await oportunidades_api.post(`/projetos/${idProjeto}/desistencia`, {
          descricao: motivoDesistencia,
          porcentagem_combinada: porcentagem,
        });
        setMensageInformation('Termos para desistência enviados com sucesso!');
        setShowModalInformation(true);

        setTimeout(() => {
          setShowModal(false);
          setShowModalInformation(false);
          getProjeto();
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    },

    [getProjeto, motivoDesistencia, porcentagem, setShowModal],
  );

  const handleDesistirProBono = useCallback(
    async (idProjeto: number) => {
      if (motivoDesistencia === '') {
        setMsgErrorDescription('Motivo de desistência é obrigatório');
        return;
      }
      try {
        await oportunidades_api.post(`/projetos/${idProjeto}/desistencia`, {
          descricao: motivoDesistencia,
          porcentagem_combinada: 0,
        });
        setMensageInformation('Termos para desistência enviados com sucesso!');
        setShowModalInformation(true);

        setTimeout(() => {
          setShowModal(false);
          setShowModalInformation(false);
          getProjeto();
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    },

    [getProjeto, motivoDesistencia, setShowModal],
  );

  const checkExistSubaccount = useCallback(async () => {
    try {
      const { data: subconta } = await pagamentos_api.get(
        `/subcontas/${user.id}`,
      );
      if (!subconta.verificada) {
        setShowModalSubconta(true);
        return false;
      }
      return true;
    } catch (error: any) {
      console.error(error.response.data);
      if (error.response.data.message === 'Subconta não encontrada')
        setShowModalSubconta(true);

      return false;
    }
  }, [user.id]);

  const handleAceitarCombinado = useCallback(
    async (idProjeto: number) => {
      if (userType === 'consumidor') {
        const existeSubconta = await checkExistSubaccount();
        if (!existeSubconta) return;
      }

      try {
        await oportunidades_api.patch(
          `/projetos/${idProjeto}/desistencia/aceitar`,
        );
        setMensageInformation('Termos para desistência aceitos com sucesso!');
        setShowModalInformation(true);

        setTimeout(() => {
          setShowModal(false);
          setShowModalInformation(false);
          getProjeto();
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    },
    [checkExistSubaccount, getProjeto, setShowModal, userType],
  );

  const handleRecusarDesistencia = useCallback(
    async (idProjeto: number) => {
      try {
        await oportunidades_api.patch(
          `/projetos/${idProjeto}/desistencia/recusar`,
        );
        setMensageInformation('Você recusou os termos de desistência');
        setShowModalInformation(true);

        setTimeout(() => {
          setShowModalInformation(false);
          setShowModal(false);
          if (getProjeto) getProjeto();
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    },

    [getProjeto, setShowModal],
  );

  const handleCombinarNovamente = useCallback(
    async (idProjeto: number) => {
      try {
        await oportunidades_api.patch(`/projetos/${idProjeto}/desistencia`, {
          porcentagem_combinada: porcentagem,
        });
        setMensageInformation(
          'Novos termos de desistência enviados com sucesso',
        );
        setShowModalInformation(true);

        setTimeout(() => {
          setShowModal(false);
          setShowModalInformation(false);
          getProjeto();
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    },
    [getProjeto, porcentagem, setShowModal],
  );

  return (
    <Content>
      <ModalCreateSubaccount
        show={showModalSubconta}
        setShow={setShowModalSubconta}
      />
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setLoading(false);
        }}
        size="lg"
        centered
      >
        <ModalBody>
          {!!apiErrorMsg.length && (
            <Row>
              <Col lg={12}>
                <Alert
                  variant="danger"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  Erro ao desistir do projeto: {apiErrorMsg}
                  <FiXCircle
                    className="fechar"
                    onClick={() => setApiErrorMsg('')}
                    size={20}
                    color="#c53030"
                  />
                </Alert>
              </Col>
            </Row>
          )}
          {!combinado && !combinarNovamente && step === 0 && (
            <Container className="p-3">
              <Row className="mb-3">
                <Col lg={12} className="mb-3">
                  <Titulo
                    titulo="Desistir do Projeto"
                    cor={PRETO_10}
                    tamanho={24}
                  />
                </Col>
                <Col lg={12} className="mb-3">
                  <Titulo
                    titulo="Este projeto já está em andamento."
                    cor={LARANJA}
                    tamanho={24}
                  />
                </Col>
                <Col lg={12}>
                  <p>
                    Você já combinou as regras de desistência com a outra parte,
                    incluindo as entregas e o pagamento parcial? Se ainda não,
                    recomendamos que o faça antes de prosseguir para evitar mal
                    entendidos.
                  </p>
                </Col>
              </Row>

              <Row>
                <Col lg={12}>
                  <ContainerAcoes>
                    <GhostButton
                      onClick={() => {
                        setShowModal(false);
                        setLoading(false);
                      }}
                    >
                      AINDA NÃO
                    </GhostButton>

                    <Button onClick={() => setStep(1)}>SIM, JÁ COMBINEI</Button>
                  </ContainerAcoes>
                </Col>
              </Row>
            </Container>
          )}

          {!combinado && step === 1 && (
            <Container className="p-3">
              <Row className="mb-3">
                <Col lg={12} className="mb-3">
                  <Titulo
                    titulo="Desistir do Projeto"
                    cor={PRETO_10}
                    tamanho={24}
                  />
                </Col>
                <Col lg={12} className="mb-3">
                  <p>Confira o andamento do projeto</p>
                </Col>
                <Col lg={12}>
                  <BarraProgresso>
                    <Progresso porcentagem={progresso} cor={LARANJA}>
                      <Porcentagem>{progresso}%</Porcentagem>
                    </Progresso>
                  </BarraProgresso>
                </Col>
                <Col lg={12}>
                  <p>
                    Lembramos que se você desitir agora, o projeto ficará
                    bloqueado para envio de Metodos de Entrega/Entregáveis e/ou
                    Requisitos.
                  </p>
                </Col>

                <Col lg={12} className="mb-3">
                  <Titulo
                    titulo="CUIDADO: Essa ação pode reduzir seu ranking e 
                    comprometer sua reputação. Tem certeza que quer continuar 
                    com o desitência do projeto?"
                    cor={PRETO_10}
                    tamanho={18}
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={12}>
                  <ContainerAcoes>
                    <GhostButton
                      onClick={() => {
                        setShowModal(false);
                        setStep(0);
                        setLoading(false);
                      }}
                    >
                      CANCELAR
                    </GhostButton>

                    <Button onClick={() => setStep(2)}>OK, DESISTIR</Button>
                  </ContainerAcoes>
                </Col>
              </Row>
            </Container>
          )}

          {!combinado && step === 2 && (
            <Container className="p-2">
              <Row>
                <Col lg={12}>
                  <Titulo
                    titulo="Negociação da Desistência"
                    cor={PRETO_10}
                    tamanho={24}
                  />
                </Col>
                <Col lg={12} className="mt-4">
                  <p>Quantos porcento ficou combinado que irá ser pago?</p>
                  <Col lg={2}>
                    <InputNumber
                      control={control}
                      name="porcentagem"
                      placeholder="%"
                      maxLength={3}
                      error={errors.porcentagem && errors.porcentagem.message}
                    />
                  </Col>
                </Col>
                <Col lg={12} className="mt-2">
                  <p>Qual o motivo da desistência?</p>
                  <TextArea
                    control={control}
                    name="motivo_desistencia"
                    placeholder="Descrição"
                    error={
                      errors.motivo_desistencia &&
                      errors.motivo_desistencia.message
                    }
                    maxLength={250}
                  />
                  <span className="text-danger">{msgErrorDescription}</span>
                </Col>

                <Col lg={12} className="mt-2">
                  <p>
                    A outra parte tem até {''}
                    <strong>
                      {format(addDays(new Date(), 7), 'dd/MM/yyyy')}
                    </strong>{' '}
                    para responder. Em caso de não posicionamento sua
                    solicitação será acatada.
                  </p>
                </Col>
              </Row>

              <Row>
                <Col lg={12}>
                  <ContainerAcoes>
                    <GhostButton
                      onClick={() => {
                        setShowModal(false);
                        setStep(0);
                        setLoading(false);
                      }}
                    >
                      CANCELAR
                    </GhostButton>

                    <Button onClick={() => handleDesistir(idProjeto)}>
                      COMBINAR
                    </Button>
                  </ContainerAcoes>
                </Col>
              </Row>
            </Container>
          )}

          {combinado?.idPessoa !== idPessoa && step === 3 && (
            <Container className="p-2">
              <Row>
                <Col lg={12}>
                  <Titulo
                    titulo="Negociação da Desistência"
                    cor={PRETO_10}
                    tamanho={24}
                  />
                </Col>
                <Col lg={12} className="mt-2">
                  <p>Qual o motivo da desitência?</p>
                  <TextArea
                    control={control}
                    name="motivo_desistencia"
                    placeholder="Descrição"
                    error={
                      errors.motivo_desistencia &&
                      errors.motivo_desistencia.message
                    }
                    maxLength={250}
                  />
                  <span className="text-danger">{msgErrorDescription}</span>
                </Col>
              </Row>

              <Row>
                <Col lg={12}>
                  <ContainerAcoes>
                    <GhostButton
                      onClick={() => {
                        setShowModal(false);
                        setLoading(false);
                      }}
                    >
                      CANCELAR
                    </GhostButton>

                    <Button onClick={() => handleDesistirProBono(idProjeto)}>
                      DESISTIR
                    </Button>
                  </ContainerAcoes>
                </Col>
              </Row>
            </Container>
          )}

          {combinado?.idPessoa !== idPessoa && (
            <>
              {combinarNovamente && (
                <Container className="p-4">
                  <Row>
                    <Col lg={12}>
                      <Titulo
                        titulo={`${nome} não aceitou sua negociação do pagamento parcial`}
                        cor={PRETO_10}
                        tamanho={24}
                      />
                    </Col>
                    <Col lg={12} className="mt-4">
                      <p>Quantos porcento ficou combinado que irá ser pago?</p>
                      <Col lg={2}>
                        <InputNumber
                          control={control}
                          name="porcentagem"
                          placeholder="%"
                          maxLength={3}
                          error={
                            errors.porcentagem && errors.porcentagem.message
                          }
                        />
                      </Col>
                    </Col>

                    <Col lg={12} className="mt-2">
                      <p>
                        A outra parte tem até{' '}
                        <strong>
                          {format(addDays(new Date(), 7), 'dd/MM/yyyy')}
                        </strong>{' '}
                        para responder. Em caso de não posicionamento sua
                        solicitação será acatada.
                      </p>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={12}>
                      <ContainerAcoes>
                        <Button
                          onClick={() => handleCombinarNovamente(idProjeto)}
                        >
                          COMBINAR NOVAMENTE
                        </Button>
                      </ContainerAcoes>
                    </Col>
                  </Row>
                </Container>
              )}
            </>
          )}

          {combinado?.idPessoa === idPessoa && !isProBono && (
            <Container className="p-2">
              <Row>
                <Col lg={12}>
                  <Titulo
                    titulo={`${nome} desisitu do projeto e enviou a negociação do pagamento parcial`}
                    cor={PRETO_10}
                    tamanho={24}
                  />
                </Col>

                <Col lg={12} className="mt-4">
                  <Titulo
                    titulo={`Pagamento parcial combinado: ${combinado?.porcentagemCombinada}%`}
                    cor={LARANJA}
                    tamanho={16}
                  />
                </Col>
                <Col lg={12} className="mt-4">
                  <p>Você confirma que foi esse o combinado?</p>
                </Col>

                <Col lg={12} className="mt-4">
                  <p>
                    Você tem até{' '}
                    <strong>
                      {format(addDays(new Date(), 7), 'dd/MM/yyyy')}
                    </strong>{' '}
                    para responder. Após esta data, não será possível modificar
                    o valor e prosseguiremos com o pagamento parcial.
                  </p>
                </Col>
              </Row>

              <Row>
                <Col lg={12} className="mt-4">
                  <ContainerAcoes>
                    <GhostButton
                      onClick={() => {
                        handleRecusarDesistencia(idProjeto);
                        setLoading(false);

                        setMensageInformation(
                          'Você recusou a negociação do pagamento parcial.',
                        );
                      }}
                    >
                      RECUSAR
                    </GhostButton>

                    <Button onClick={() => handleAceitarCombinado(idProjeto)}>
                      ACEITAR COMBINADO
                    </Button>
                  </ContainerAcoes>
                </Col>
              </Row>
            </Container>
          )}

          {combinado?.idPessoa === idPessoa && isProBono && (
            <Container className="p-2">
              <Row>
                <Col lg={12}>
                  <Titulo
                    titulo={`${nome} desisitu do projeto`}
                    cor={PRETO_10}
                    tamanho={24}
                  />
                </Col>

                <Col lg={12} className="mt-4">
                  <Titulo
                    titulo={`Motivo da desistencia: "${combinado?.descricao}"`}
                    cor={LARANJA}
                    tamanho={18}
                  />
                </Col>
              </Row>
              <Spacer size={40} />
              <Row>
                <Col lg={12} className="mt-4">
                  <ContainerAcoes>
                    <Button onClick={() => handleAceitarCombinado(idProjeto)}>
                      ESTOU DE ACORDO
                    </Button>
                  </ContainerAcoes>
                </Col>
              </Row>
            </Container>
          )}
        </ModalBody>
      </Modal>

      <ModalInformation
        showModal={showModalInformation}
        title={mensageInformation}
        color={LARANJA}
      />
    </Content>
  );
}
