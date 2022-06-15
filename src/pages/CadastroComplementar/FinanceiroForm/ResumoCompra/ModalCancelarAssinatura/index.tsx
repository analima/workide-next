import { Alert, Col, Modal, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ButtonBack,
  ButtonConfirm,
  ContainerButtons,
  ContainerCheckbox,
  ContainerInputs,
  ContainerTextArea,
  Content,
  ExpirationDate,
  ModalContent,
  TextDeleteSuccess,
} from './style';
import { Titulo } from '../../../../../components/Titulo';
import { Spacer } from '../../../../../components/Spacer';
import { InputCheck } from '../../../../../components/Form/InputCheck';
import { TextArea } from '../../../../../components/Form/TextArea';
import { useState } from 'react';
import { FiXCircle } from 'react-icons/fi';
import { pagamentos_api } from '../../../../../services/pagamentos_api';
import { useAuth } from '../../../../../contexts/auth';
import {
  IAssinaturaCriada,
  IAssinaturaEscolhida,
  useInformacoesFinanceiras,
} from '../../../../../hooks/informacoesFinanceiras';
import { geral_api } from '../../../../../services/geral_api';
interface IModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const schema = Yup.object().shape({});

export function ModalCancelarAssinatura({
  show,
  setShow,
}: IModal): JSX.Element {
  const [confirmCancelletion, setConfirmCancelletion] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const { user } = useAuth();
  const {
    dadosClienteIugu,
    setAssinaturaCriada,
    setAssinaturaEscolhida,
    buscarAssinatura,
    assinaturaEscolhida,
  } = useInformacoesFinanceiras();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    getValues,
    // eslint-disable-next-line
    formState: { errors },
  } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  function handleValidadeFields() {
    if (
      !getValues('preco') &&
      !getValues('poucos_projetos') &&
      !getValues('poucas_vendas') &&
      !getValues('continuar_pagando') &&
      !getValues('meio_pagamento') &&
      !getValues('pouco_intuitiva') &&
      !getValues('outros')
    ) {
      setError('Você deve selecionar pelo menos um motivo');
      return false;
    }
    if (getValues('outros')) {
      if (!getValues('comentario') || !getValues('comentario').length) {
        setError('Comentário é obrigatório');
        return false;
      }
      if (getValues('comentario').length < 30) {
        setError('O comentário precisa ter pelo menos 30 letras');
        return false;
      }
    }
    return true;
  }

  function handleConfirmCancellation() {
    if (getValues('confirmar_cancelamento')) {
      setConfirmCancelletion(true);
      setError('');
    } else setError('Você deve concordar com as condições para cancelamento.');
  }

  async function handleDeleteSubscription() {
    try {
      const motivosCancelamentoData = {
        preco_plano_alto: getValues('preco'),
        plataforma_nao_intuitiva: getValues('poucos_projetos'),
        poucas_vendas_servico: getValues('poucas_vendas'),
        nao_vale_preco: getValues('continuar_pagando'),
        falta_meio_de_pagamento: getValues('meio_pagamento'),
        poucos_projetos: getValues('poucos_projetos'),
        outros: getValues('outros'),
        ds_outros: getValues('comentario'),
        id_usuario: user.id_usuario,
        id_pessoa: user.id_pessoa,
      };
      setError('');
      if (!handleValidadeFields()) return;
      setIsLoading(true);
      await pagamentos_api.delete(`/assinaturas/${dadosClienteIugu.cpf_cnpj}`);
      buscarAssinatura(dadosClienteIugu.cpf_cnpj);
      await geral_api.post('/cancelar-assinatura', motivosCancelamentoData);
      setAssinaturaCriada({} as IAssinaturaCriada);
      setAssinaturaEscolhida({} as IAssinaturaEscolhida);
      setSuccess('Assinatura cancelada com sucesso.');
      setShowModalSuccess(true);
      setShow(false);
    } catch (error: any) {
      console.log(error.response);
      if (
        error.response.data.message ===
        'O cliente informado não possui assinaturas para suspender'
      )
        setError('Você não possui uma assinatura ativa para cancelar.');
      else setError('Ocorreu um erro ao cancelar a assinatura.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleGetExpiredDate() {
    if (!assinaturaEscolhida.dh_expiracao) return '';
    return `${assinaturaEscolhida.dh_expiracao.slice(
      8,
      10,
    )}/${assinaturaEscolhida.dh_expiracao.slice(
      5,
      7,
    )}/${assinaturaEscolhida.dh_expiracao.slice(0, 4)}`;
  }

  return (
    <div>
      <ModalContent
        style={{ backgroundColor: 'rgba(128, 128, 128, 0.4)' }}
        show={show}
        onHide={() => setShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalContent.Body>
          <Content>
            <Row>
              <Col lg={12}>
                <Titulo
                  titulo="Cancelamento de assinatura"
                  negrito
                  tamanho={26}
                />
              </Col>
              <Spacer size={30} />
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
              {success.length ? (
                <Alert
                  variant="success"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  {success}
                  <FiXCircle
                    className="fechar"
                    onClick={() => setShow(false)}
                    size={20}
                    color="#3fbe0d"
                  />
                </Alert>
              ) : (
                <></>
              )}
            </Row>

            {confirmCancelletion ? (
              <>
                <Row>
                  <Col lg={12}>
                    <p>
                      Estamos quase acabando. Para finalizar, pedimos por
                      gentileza que nos informe o(s) motivo(s) do cancelamento
                      para podermos melhorar nosso atendimento.
                    </p>
                  </Col>
                </Row>
                <Row>
                  <ContainerInputs>
                    <ContainerCheckbox>
                      <InputCheck
                        control={control}
                        name="preco"
                        type="checkbox"
                        label="Acho os preços dos planos muito alto."
                      />
                      <InputCheck
                        control={control}
                        name="poucos_projetos"
                        type="checkbox"
                        label="Tenho recebido poucos projetos."
                      />
                      <InputCheck
                        control={control}
                        name="poucas_vendas"
                        type="checkbox"
                        label="Poucas vendas dos meus serviços."
                      />
                      <InputCheck
                        control={control}
                        name="continuar_pagando"
                        type="checkbox"
                        label="Não compensa continuar pagando."
                      />
                      <InputCheck
                        control={control}
                        name="meio_pagamento"
                        type="checkbox"
                        label="Não tem o meio de pagamento que costumo usar."
                      />
                      <InputCheck
                        control={control}
                        name="pouco_intuitiva"
                        type="checkbox"
                        label="Acho a plataforma pouco intuitiva."
                      />
                    </ContainerCheckbox>
                    <ContainerTextArea>
                      <InputCheck
                        control={control}
                        name="outros"
                        type="checkbox"
                        label="Outros"
                      />
                      <TextArea
                        control={control}
                        name="comentario"
                        placeholder="Obrigatório"
                      />
                    </ContainerTextArea>
                  </ContainerInputs>
                </Row>
                <Row>
                  <ContainerButtons>
                    <ButtonBack onClick={() => setConfirmCancelletion(false)}>
                      VOLTAR
                    </ButtonBack>
                    <ButtonConfirm onClick={() => handleDeleteSubscription()}>
                      {isLoading ? 'CARREGANDO...' : 'CANCELAR ASSINATURA'}
                    </ButtonConfirm>
                  </ContainerButtons>
                </Row>
              </>
            ) : (
              <>
                <Col lg={12}>
                  <p>
                    Ao cancelar sua assinatura, todos os seus dados, ferramentas
                    e projetos serão readequados com o plano Degustação. Isso
                    significa que seu perfil será reduzido e poderá afetar
                    significamente no seu desempenho e visibilidade na
                    plataforma.
                  </p>
                </Col>
                <Spacer size={30} />
                {assinaturaEscolhida.dh_expiracao ? (
                  <Row>
                    <Col lg={12}>
                      <p>
                        Se você cancelar seu plano agora ele se manterá ativo
                        até dia{' '}
                        <ExpirationDate>
                          {handleGetExpiredDate()}
                        </ExpirationDate>
                      </p>
                    </Col>
                  </Row>
                ) : (
                  <></>
                )}
                <Spacer size={30} />
                <Row>
                  <Col lg={12}>
                    <InputCheck
                      control={control}
                      name="confirmar_cancelamento"
                      type="checkbox"
                      label="Concordo, e estou ciente que ao cancelar meu plano de assinatura, meu perfil e projetos poderão sofrer atualizações impactantes ao meu desempenho e visibilidade na plataforma."
                    />
                  </Col>
                </Row>
                <Row>
                  <ContainerButtons>
                    <ButtonBack onClick={() => setShow(false)}>
                      VOLTAR
                    </ButtonBack>
                    <ButtonConfirm onClick={() => handleConfirmCancellation()}>
                      QUERO CANCELAR
                    </ButtonConfirm>
                  </ContainerButtons>
                </Row>
              </>
            )}
          </Content>
        </ModalContent.Body>
      </ModalContent>
      <Modal
        show={showModalSuccess}
        onHide={() => setShowModalSuccess(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Row>
          <Col lg={12}>
            <TextDeleteSuccess>
              Assinatura cancelada com sucesso
            </TextDeleteSuccess>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
