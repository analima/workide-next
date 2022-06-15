import { useCallback, useState, useEffect } from 'react';

import { Col, Container, Form, FormCheck, Row } from 'react-bootstrap';
import { Spacer } from '../../../../components/Spacer';
import { useAuth } from '../../../../contexts/auth';
import { useCadastroComplementar } from '../../../../hooks/detalheFornecedor';
import { pessoas_api } from '../../../../services/pessoas_api';
import { FormError } from '../../../../utils/FormError';
import { ErrorMessages } from '../../../../utils/ValidationError';
import { Content } from './style';

export function CondicaoGeralForm() {
  const { user } = useAuth();
  // eslint-disable-next-line
  const { pessoa, setPessoa, updateFornecedor, setAbaSelecionada } =
    useCadastroComplementar();

  const [errors, setErrors] = useState<ErrorMessages>({} as ErrorMessages);
  const [aceiteContrato, setAceiteContrato] = useState(false);
  const [emailNovidades, setEmailNovidades] = useState(false);
  const [emailComprado, setEmailComprado] = useState(false);
  const [emailAlertaChat, setEmailAlertaChat] = useState(false);
  const [emailAlertaProjetos, setEmailAlertaProjetos] = useState(false);
  const [emailAlertaOrcamento, setEmailAlertaOrcamento] = useState(false);
  const [mensagensWhatapp, setMensagensWhatapp] = useState(false);
  const [mensagensChat, setMensagensChat] = useState(false);
  const [concordaTermos, setConcordaTermos] = useState(false);

  useEffect(() => {
    pessoas_api.get(`/pessoas?id_usuario=${user.id_usuario}`).then(response => {
      const data = response.data.termo_aceite;

      if (data) {
        setAceiteContrato(data.aceite_contrato);
        setEmailNovidades(data.email_novidades);
        setEmailComprado(data.email_comprado);
        setEmailAlertaChat(data.email_alerta_chat);
        setEmailAlertaProjetos(data.email_alerta_projetos);
        setEmailAlertaOrcamento(data.email_alerta_orcamento);
        setMensagensWhatapp(data.mensagens_whatapp);
        setMensagensChat(data.mensagens_chat);
      }
    });
  }, [user, pessoa, setPessoa]);

  const handleSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();
      setErrors({});

      try {
        if (!concordaTermos) {
          throw new FormError(
            'concordaTermos',
            'É preciso concordar com os termos de uso para efetuar o cadastro',
          );
        }

        const termo_aceite = {
          aceite_contrato: aceiteContrato,
          email_novidades: emailNovidades,
          email_comprado: emailComprado,
          email_alerta_chat: emailAlertaChat,
          email_alerta_projetos: emailAlertaProjetos,
          email_alerta_orcamento: emailAlertaOrcamento,
          mensagens_whatapp: mensagensWhatapp,
          mensagens_chat: mensagensChat,
        };

        const pessoaState = { ...pessoa, termo_aceite };

        setPessoa(pessoaState);
        await updateFornecedor(pessoaState);
      } catch (error) {
        if (error instanceof FormError) {
          setErrors({ ...errors, [error.field]: error.message });
          window.scrollTo(0, 0);
        }

        console.error(error);
      } finally {
        window.scrollTo(0, 0);
      }
    },
    [
      errors,
      pessoa,
      concordaTermos,
      aceiteContrato,
      emailNovidades,
      emailComprado,
      emailAlertaChat,
      emailAlertaProjetos,
      emailAlertaOrcamento,
      mensagensWhatapp,
      mensagensChat,
      setPessoa,
      updateFornecedor,
    ],
  );

  return (
    <Content>
      <Container>
        <Spacer size={80} />
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={2}></Col>
            <Col lg={8}>
              <div className="form-check form-switch">
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  E-mail com novidade da plataforma
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  checked={emailNovidades}
                  onChange={event => setEmailNovidades(event.target.checked)}
                />
              </div>
              <div>
                {errors.emailNovidades && (
                  <div className="error-message">{errors.emailNovidades}</div>
                )}
              </div>
              <div className="form-check form-switch">
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Receber e-mail quando produto for comprado
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  checked={emailComprado}
                  onChange={event => setEmailComprado(event.target.checked)}
                />
              </div>
              <div>
                {errors.emailComprado && (
                  <div className="error-message">{errors.emailComprado}</div>
                )}
              </div>
              <div className="form-check form-switch">
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Receber e-mails quando mensagens forem enviadas no chat da
                  plataforma.
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  checked={emailAlertaChat}
                  onChange={event => setEmailAlertaChat(event.target.checked)}
                />
              </div>
              <div>
                {errors.emailAlertaChat && (
                  <div className="error-message">{errors.emailAlertaChat}</div>
                )}
              </div>
              <div className="form-check form-switch">
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Receber e-mail quando projetos da minha área forem
                  solicitados.
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  checked={emailAlertaProjetos}
                  onChange={event =>
                    setEmailAlertaProjetos(event.target.checked)
                  }
                />
              </div>
              <div>
                {errors.emailAlertaProjetos && (
                  <div className="error-message">
                    {errors.emailAlertaProjetos}
                  </div>
                )}
              </div>
              <div className="form-check form-switch">
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Receber e-mail quando orçamento for solicitado a mim.
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  checked={emailAlertaOrcamento}
                  onChange={event =>
                    setEmailAlertaOrcamento(event.target.checked)
                  }
                />
              </div>
              <div>
                {errors.emailAlertaOrcamento && (
                  <div className="error-message">
                    {errors.emailAlertaOrcamento}
                  </div>
                )}
              </div>
              <div className="form-check form-switch">
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Receber notificação por WhatsApp.
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  checked={mensagensWhatapp}
                  onChange={event => setMensagensWhatapp(event.target.checked)}
                />
              </div>
              <div>
                {errors.mensagensWhatapp && (
                  <div className="error-message">{errors.mensagensWhatapp}</div>
                )}
              </div>
              <div className="form-check form-switch">
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Receber notificação via chat interno
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  checked={mensagensChat}
                  onChange={event => setMensagensChat(event.target.checked)}
                />
              </div>
              <div>
                {errors.mensagensChat && (
                  <div className="error-message">{errors.mensagensChat}</div>
                )}
              </div>
              <div className="form-check form-switch">
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Permite que cliente indique e divulgue nas redes sociais o seu
                  serviço?
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  checked={aceiteContrato}
                  onChange={event => setAceiteContrato(event.target.checked)}
                />
              </div>
              <div>
                {errors.aceiteContrato && (
                  <div className="error-message">{errors.aceiteContrato}</div>
                )}
              </div>

              <FormCheck
                id="possui-autoria"
                label="Ao se cadastrar, você concorda com o nosso Termos de Uso,
              Política de Privacidade e Política de Cookies da nossa plataforma."
                checked={concordaTermos}
                onChange={event => setConcordaTermos(event.target.checked)}
              />
              <div>
                {errors.concordaTermos && (
                  <div className="error-message">{errors.concordaTermos}</div>
                )}
              </div>
            </Col>

            <Col lg={2}></Col>
          </Row>

          <Row className="mt-5">
            <Col lg={10} className="acoes">
              <a href="#voltar">VOLTAR</a>
              <button type="submit" className="btn btn-primary">
                SALVAR
              </button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Content>
  );
}
