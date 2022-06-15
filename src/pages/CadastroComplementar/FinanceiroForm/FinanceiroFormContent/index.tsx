import { Alert, Col, Container, Row } from 'react-bootstrap';

import { Button } from '../../../../components/Form/Button';
import { useCadastroComplementar } from '../../../../hooks/cadastroComplementar';
import { useHistory } from 'react-router-dom';
import { IoMdHelpCircle } from 'react-icons/io';

import { Content, Actions, Subtitle, SubtitleSecondary } from './style';
import { pessoas_api } from '../../../../services/pessoas_api';
import { useAuth } from '../../../../contexts/auth';
import DadosBancarios from '../DadosBancarios';
import { Titulo } from '../../../../components/Titulo';
import { AZUL, PRETO_10 } from '../../../../styles/variaveis';
import { Spacer } from '../../../../components/Spacer';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AvatarCadastroIncompleto } from '../../../../components/AvatarCadastroIncompleto';
import { useGAEventsTracker } from '../../../../hooks/useGAEventsTracker';
import { getUserData } from '../../../../utils/getUserData';
import { useInformacoesFinanceiras } from '../../../../hooks/informacoesFinanceiras';
import { handleFormatDocument } from '../../../../helpers/formatsHelper';
import { AvatarAssinaturaInicial } from '../../../../components/AvatarAssinaturaInicial';
import { AvatarContaBancaria } from '../../../../components/AvatarContaBancaria';

import { pagamentos_api } from '../../../../services/pagamentos_api';
import { FiXCircle } from 'react-icons/fi';

interface IFormProps {
  agencia: string;
  banco: string;
  contaCorrente: string;
  tipoConta: string;
}

const schema = Yup.object().shape({
  agencia: Yup.string().required('Agência é obrigatória'),
  banco: Yup.string().required('Banco é obrigatório'),
  contaCorrente: Yup.string().required('Número da conta é obrigatória'),
  tipoConta: Yup.string().required('tipo da conta é obrigatória'),
});

export function FinanceiroFormContent() {
  const {
    setAbaSelecionada,
    isConsumer,
    porcentagem,
    setMensagemAvatar,
    handleShowAvatar,
    isEqual,
  } = useCadastroComplementar();
  const { user, refreshUserData } = useAuth();
  const history = useHistory();
  const [isLoading, setIsloading] = useState(false);
  const [, setModeracaoData] = useState(false);
  const [jaPossuiDados, setJaPossuiDados] = useState(false);
  const [erroDadosBancarios, setErroDadosBancarios] = useState(false);
  const [showAvatarAssinaturaInicial, setShowAvatarAssinaturaInicial] =
    useState(false);
  const [showAvatarContaBancaria, setShowAvatarContaBancaria] = useState(false);
  const GAEventsTracker = useGAEventsTracker('Cadastro Complementar');
  const { buscarClienteIugu } = useInformacoesFinanceiras();

  const mensagemFinanceiro = `
    Informe a conta bancária onde você deseja receber seus depósitos ao
    concluir seus negócios. Dinheiro é assunto sério. Por isso, é muito
    importante e obrigatório que voçê inclua essa informação com atenção
    e da maneira correta. Se seu banco possuir o dígito X, substitua-o
    por 0
  `;

  const {
    control,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  const [showAvatarCadastroIncompleto, setShowAvatarCadastroIncompleto] =
    useState(false);
  function handleShowAvatarCadastroIncompleto() {
    setShowAvatarCadastroIncompleto(!showAvatarCadastroIncompleto);
  }

  const handleShowAvatarAssinaturaInicial = useCallback(() => {
    setShowAvatarAssinaturaInicial(!showAvatarAssinaturaInicial);
  }, [showAvatarAssinaturaInicial]);

  useEffect(() => {
    if (porcentagem === 20) {
      setShowAvatarCadastroIncompleto(true);
    }
  }, [porcentagem]);

  async function handleGetIsModerate() {
    try {
      const responseUser = await getUserData(user.id_usuario);
      setModeracaoData(responseUser.moderacao);
    } catch (error: any) {
      console.error(error.response);
    }
  }

  useEffect(() => {
    handleGetIsModerate();
    buscarClienteIugu(handleFormatDocument(user.codigo_cadastro || ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleGetFinancesInformation() {
    try {
      const response = await pessoas_api.get('/pessoas/dados-recebimento');
      setJaPossuiDados(true);
      reset({
        agencia: response.data.agencia,
        banco: response.data.banco,
        contaCorrente: response.data.contaCorrente,
        tipoConta: response.data.tipoConta,
      });
    } catch (error: any) {
      setJaPossuiDados(false);
      console.error(error);
    }
  }

  const handleSaveInformations = useCallback(
    async (form: IFormProps) => {
      setErroDadosBancarios(false);
      setIsloading(true);

      if (!isEqual) {
        setShowAvatarContaBancaria(true);
        setIsloading(false);
        return;
      }

      try {
        const { data: subconta } = await pagamentos_api.get(
          `/subcontas/${user.id}`,
        );

        const bodySubcontaPf = {
          agencia: form.agencia,
          conta: form.contaCorrente,
          id_banco: Number(form.banco),
          tipo_conta:
            form.tipoConta === 'conta_corrente' ? 'Corrente' : 'Poupança',
          descricao: `subconta do usuário ${user.nome}`,
        };

        const bodySubcontaPj = {
          agencia: form.agencia,
          conta: form.contaCorrente,
          id_banco: Number(form.banco),
          tipo_conta:
            form.tipoConta === 'conta_corrente' ? 'Corrente' : 'Poupança',
          nome_empresa: user.nome,
          descricao: `subconta do usuário ${user.nome}`,
        };
        if (subconta.verificada) {
          await pagamentos_api.post(`/subcontas/${user.id}/alterar-conta`, {
            agencia: form.agencia,
            conta: form.contaCorrente,
            id_banco: Number(form.banco),
            tipo_conta:
              form.tipoConta === 'conta_corrente' ? 'Corrente' : 'Poupança',
          });
        } else {
          await pagamentos_api.post(
            `/subcontas/${user.id_pessoa}/solicitar-verificacao`,
            user.tipo === 'PJ' ? bodySubcontaPj : bodySubcontaPf,
          );
        }

        if (jaPossuiDados) {
          await pessoas_api.put('/pessoas/dados-recebimento', form);
        } else await pessoas_api.post('/pessoas/dados-recebimento', form);
        if (isConsumer) {
          history.push('/consumidor/home');
        } else {
          history.push('/');
        }
      } catch (error: any) {
        console.error(error.response.data);

        setErroDadosBancarios(true);
      } finally {
        setIsloading(false);
        refreshUserData();
      }
      GAEventsTracker(
        'Botao cadastro compelementar',
        'Aba informações financeiras',
      );
    },
    [
      isEqual,
      GAEventsTracker,
      jaPossuiDados,
      isConsumer,
      user.id_pessoa,
      user.id,
      user.nome,
      user.tipo,
      history,
      refreshUserData,
    ],
  );

  const createSubaccount = useCallback(async () => {
    try {
      await pagamentos_api.post(`/subcontas/${user.id_pessoa}`);
    } catch (error: any) {
      console.error(error.response.data);
    }
  }, [user.id_pessoa]);

  const checkExistSubaccount = useCallback(async () => {
    try {
      await pagamentos_api.get(`/subcontas/${user.id}`);
    } catch (error: any) {
      console.error(error.response.data);
      if (error.response.data.message === 'Subconta não encontrada')
        createSubaccount();
    }
  }, [createSubaccount, user.id]);

  useEffect(() => {
    verificarPrimeiraAssinatura();
    checkExistSubaccount();
    handleGetFinancesInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verificarPrimeiraAssinatura = useCallback(async () => {
    try {
      await pessoas_api.get(
        `/assinaturas/${handleFormatDocument(user.codigo_cadastro || '')}`,
      );
    } catch (error: any) {
      if (
        error.response?.data?.message === 'Assinatura não encontrada' &&
        !isConsumer
      )
        handleShowAvatarAssinaturaInicial();
      console.error(error.response);
    }
  }, [user.codigo_cadastro, isConsumer, handleShowAvatarAssinaturaInicial]);

  return (
    <Content>
      <Container>
        <AvatarAssinaturaInicial
          mostrar={showAvatarAssinaturaInicial}
          esconderAvatar={handleShowAvatarAssinaturaInicial}
        />

        <AvatarContaBancaria
          mostrar={showAvatarContaBancaria}
          esconderAvatar={setShowAvatarContaBancaria}
        />

        <AvatarCadastroIncompleto
          mostrar={showAvatarCadastroIncompleto}
          esconderAvatar={handleShowAvatarCadastroIncompleto}
          setAbaSelecionada={setAbaSelecionada}
          porcentagem={porcentagem}
          isConsumer={false}
        />
        <Spacer size={50} />
        <Row className="mt-4 mb-4">
          <Col lg={11}>
            <Titulo
              titulo="Dados bancários para repasse/reembolso"
              tamanho={24}
              cor={PRETO_10}
            />
          </Col>
          <Col lg={1}>
            <IoMdHelpCircle
              color={AZUL}
              size={24}
              onClick={() => {
                setMensagemAvatar(mensagemFinanceiro);
                handleShowAvatar();
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Subtitle>
              Essa informação é muito importante. É através dessa conta que você
              irá receber seus pagamentos e reembolsos. Por isso, adicione uma
              conta válida.
            </Subtitle>
            <Spacer size={20} />
            <SubtitleSecondary>
              Atenção: A conta bancária deve estar em nome e CPF (ou CNPJ) da
              mesma pessoa do cadastro
            </SubtitleSecondary>
            <Spacer size={20} />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <DadosBancarios
              control={control}
              errorsControl={errors}
              watch={watch}
              getValues={getValues}
            />
          </Col>
        </Row>
        {erroDadosBancarios && (
          <Row>
            <Col lg={12}>
              <Alert
                variant="danger"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                Os dados informados são inválidos
                <FiXCircle
                  className="fechar"
                  onClick={() => setErroDadosBancarios(false)}
                  size={20}
                  color="#c53030"
                />
              </Alert>
            </Col>
          </Row>
        )}

        <Row>
          <Col lg={12}>
            <Actions>
              <Button
                label="VOLTAR"
                color="ghost"
                onClick={() => {
                  setAbaSelecionada({ indice: 2, porcentagem: 80 });
                  window.scrollTo(0, 0);
                }}
              />
              <Button
                label={isLoading ? 'CARREGANDO...' : 'SALVAR'}
                onClick={handleSubmit(handleSaveInformations)}
              />
            </Actions>
          </Col>
        </Row>
      </Container>
    </Content>
  );
}
