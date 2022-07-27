import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Col, Form, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import LogoGyan from '../../assets/g-gyan.svg';
import Google from '../../assets/google.svg';
import {
  ButtonLogin,
  Content,
  FormTitle,
  InputCheck,
  ContainerInputCheck,
  ItemPolitica,
  PoliticaParagrafo,
  ContainerButtons,
  ContentModal,
} from '../../components/CadastroBasico/_old';
import { Spacer } from '../../components/Spacer';
import { FiX } from 'react-icons/fi';
import { pessoas_api } from '../../services/pessoas_api';
import Boia from '../../assets/boia.svg';
import Chave from '../../assets/chave.svg';
import GuardaChuva from '../../assets/guardachuva.svg';
import Escudinho from '../../assets/escudinho.svg';
import { ModalInformation } from '../../components/ModalInformation';
import { VERMELHO } from '../../styles/variaveis';
import { useGAEventsTracker } from '../../hooks/useGAEventsTracker';
import Image from 'next/image';

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  policyTerms: boolean;
}

interface UserToRegistry {
  nome: string;
  tipo: string;
  email: string;
  password: string;
  password_confirmation: string;
  consumidor: boolean;
}

interface DefaultProps {
  isActive: boolean;
  display: string;
  handleShowOverlay: () => void;
}

const CadastroBasico =({
  isActive,
  display,
  handleShowOverlay,
}: DefaultProps): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState<User>({} as User);
  const [errorName, setErrorName] = useState<string | null>(null);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<
    string | null
  >(null);
  const [errorPolicyTerms, setErrorPolicyTerms] = useState<string | null>(null);
  const [showModalPolitica, setShowModalPolitica] = useState(false);
  const GAEventsTracker = useGAEventsTracker('Home Publica tela cadastro');

  const handleValidateName = (name: string): boolean => {
    const hasSpace = name?.split(' ');
    return hasSpace?.length >= 2;
  };

  const resultValidateName = useMemo(
    () => handleValidateName(userData.name),
    [userData.name],
  );

  const handleValidateEmail = (email: string): boolean => {
    email = email.replace(/_/gi, '');
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return emailRegex.test(email);
  };

  useEffect(() => {
    setUserData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      policyTerms: false,
    });



  }, []);

  function handleRegistryUser(user: UserToRegistry) {
    if (userData) {
      if (!userData.policyTerms) {
        setErrorPolicyTerms(
          'É necessário o aceite dos termos e políticas da plataforma.',
        );
        return;
      }
      !resultValidateName &&
        setErrorName('O nome deve ser preenchido com o nome completo.');
      !handleValidateName(user.nome) && setErrorName('Digite o nome completo');
      !handleValidateEmail(user.email) &&
        setErrorEmail('Digite um e-mail válido.');
      !user.email && setErrorEmail('Preenchimento obrigatório.');
      !user.password && setErrorPassword('Preenchimento obrigatório.');
      !user.password_confirmation &&
        setErrorConfirmPassword('Preenchimento obrigatório.');
    }
    axios
      .post(process.env.REACT_APP_SEGURANCA_API + '/usuarios', user)
      .then(async res => {
        // --> Consulta Usuario
        axios
          .get(
            process.env.REACT_APP_SEGURANCA_API +
              '/usuarios?email=' +
              user.email,
          )
          .then(async res => {
            const pessoa = {
              id_usuario: res.data.id,
              nome: userData.name,
              tipo_pessoa: 'PF',
              tipo_cadastro: 'VISITANTE',
            };
            await axios
              .post(process.env.REACT_APP_PESSOAS_API + '/pessoas', pessoa)
              .then(async res => {
                await pessoas_api.post(`/politicas/${res.data.id}`);
                var emBase64 = btoa(userData.email);
                window.location.replace('/confirmacao?q=' + emBase64);
              })
              .catch(async error => {
                if (error.response.data.message)
                  console.error(error.response.data.message);
                else console.log(error);
              });
          })
          .catch(async error => {
            console.error(error);
          });
      })
      .catch(async error => {
        if (error.response) {
          console.error(error.response);
          if (error.response.status === 422) {
            if (
              error.response.data.message.includes('validation error detected')
            )
              setErrorEmail(
                'Erro ao prosseguir com o cadastro. Preencha o campo com um formato válido.',
              );
            else setErrorEmail(error.response.data.message);
            setUserData({ ...userData, email: '' });
          }
          if (error.response.status === 500) {
            if (
              error.response.data.message.includes(
                'An account with the given email already exists',
              )
            ) {
              setErrorEmail('Erro esse email já está cadastrado.');
            }
            setUserData({ ...userData, email: '' });
          }
        } else {
          console.log(error);
        }
      });
  }

  function handleSubmit() {
    if (
      errorName ||
      errorEmail ||
      errorPassword ||
      errorConfirmPassword ||
      errorPolicyTerms
    ) {
      return;
    }

    const user: UserToRegistry = {
      nome: userData.name,
      tipo: 'REGISTRO',
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.confirmPassword,
      consumidor: false,
    };
    handleRegistryUser(user);
    GAEventsTracker('Modal cadastro', 'Concluindo cadastro');
  }

  const handleGoogleRegistry = () => {
    if (!userData.policyTerms) {
      setShowModalPolitica(true);
      setTimeout(() => {
        setShowModalPolitica(false);
      }, 10000);
      setErrorPolicyTerms(
        'É necessário o aceite dos termos e políticas da plataforma.',
      );
      return;
    }
    var url =
      process.env.REACT_APP_AWS_COGNITO_CLIENT_DOMAIN +
      '/login?redirect_uri=' +
      process.env.REACT_APP_URL +
      '/cadastroGoogle/signUp&response_type=code&client_id=' +
      process.env.REACT_APP_AWS_COGNITO_CLIENT_ID +
      '&scope=profile+email+aws.cognito.signin.user.admin+openid';
    window.location.replace('/confirmacao?t=login');
    window.location.replace(url);
  };

  const handleLogin = () => {
    window.location.replace('/login');
  };

  const handleRenderTooltip = () =>
    !errorPassword ? (
      <Tooltip id="button-tooltip">
        A senha deve conter no mínimo 8 dígitos com letras maiúsculas,
        minúsculas e caracteres especiais.
      </Tooltip>
    ) : (
      <Tooltip id="button-tooltip" style={{ display: 'none' }}></Tooltip>
    );

  return (
    <>

      <ModalInformation
        showModal={showModalPolitica}
        setShowModal={setShowModalPolitica}
        color={VERMELHO}
        text="Para continuar o cadastro é necessário confirmar que está de acordo com o nosso Termo de uso, Política de privacidade e Política de cookies."
      />

      <Content isActive={true} display={display}>
        <div id="cadastro_basico" className="form-content">
          <FormTitle>
            <FiX onClick={() => handleShowOverlay()} size={24} />
            <div className="title">
              <h2>Olá</h2>
              <p>Deixe-nos conhecer melhor você:</p>
            </div>
            <Image src={LogoGyan} alt="Logo" />
          </FormTitle>

          <Row>
            <Col lg={12}>
              <div className="google">
                <button
                 onClick={() => handleGoogleRegistry()}>
                  <Image src={Google} alt="Google" /> CADASTRO COM GOOGLE
                </button>
              </div>
            </Col>
          </Row>

          <Form action="">
            <Row>
              <Col lg={12}>
                <Form.Group controlId="Nome">
                  <Form.Control
                    type="text"
                    placeholder="Nome"
                    name="nome"
                    onChange={e => {
                      const regValidateName =
                        /^$|^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/;
                      if (regValidateName.test(e.target.value)) {
                        setUserData({ ...userData, name: e.target.value });
                        if (!e.target.value.length)
                          setErrorName('Preenchimento obrigatório.');
                        else setErrorName(null);
                      }
                    }}
                    value={userData.name}
                    maxLength={120}
                    minLength={3}
                  />
                  {errorName && <span className="help-block">{errorName}</span>}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                <Form.Group controlId="E-mail">
                  <Form.Control
                    type="text"
                    placeholder="E-mail"
                    name="email"
                    onChange={e => {
                      setUserData({ ...userData, email: e.target.value });
                      if (!e.target.value.length)
                        setErrorEmail('Preenchimento obrigatório.');
                      else setErrorEmail(null);
                    }}
                    onBlur={() => {
                      if (
                        !handleValidateEmail(userData.email) &&
                        userData.email?.length > 3
                      ) {
                        setErrorEmail('O email não é válido');
                      } else {
                        setErrorEmail(null);
                      }
                    }}
                    value={userData.email}
                    maxLength={100}
                    minLength={3}
                  />
                  {errorEmail && (
                    <span className="help-block">{errorEmail}</span>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                 <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={handleRenderTooltip()}
                >
                  <Form.Group controlId="senha">
                    <Form.Control
                      type="password"
                      placeholder="Senha"
                      onChange={e => {
                        setUserData({ ...userData, password: e.target.value });
                        const validatePassword =
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+-_])[A-Za-z\d@$#.!%*?&+-_]{8,}$/;
                        if (!e.target.value.length)
                          setErrorPassword('Preenchimento obrigatório.');
                        else if (!validatePassword.test(e.target.value))
                          setErrorPassword(
                            'A senha deve possuir pelo menos 8 caracteres, dígitos, letras maíusculas e minúsculas e caractere especial.',
                          );
                        else setErrorPassword(null);
                      }}
                      name="senha"
                      value={userData.password}
                      maxLength={255}
                      minLength={3}
                    />
                    {errorPassword && (
                      <span className="help-block">{errorPassword}</span>
                    )}
                  </Form.Group>
                 </OverlayTrigger>
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                <Form.Group controlId="confirme-senha">
                  <Form.Control
                    type="password"
                    placeholder="Confirme a senha"
                    onChange={e => {
                      setUserData({
                        ...userData,
                        confirmPassword: e.target.value,
                      });
                      if (!e.target.value.length)
                        setErrorConfirmPassword('Preenchimento obrigatório.');
                      else if (e.target.value !== userData.password)
                        setErrorConfirmPassword('As senhas não coincidem.');
                      else setErrorConfirmPassword(null);
                    }}
                    name="senha2"
                    value={userData.confirmPassword}
                    maxLength={255}
                    minLength={3}
                  />
                  {errorConfirmPassword && (
                    <span className="help-block">{errorConfirmPassword}</span>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Spacer size={12} />

            <Row
              onMouseEnter={() => setShowModal(true)}
              onMouseLeave={() => setShowModal(false)}
            >
              <Col lg={12}>
                <PoliticaParagrafo>
                  Veja nossa Política de Privacidade em poucas palavras:
                </PoliticaParagrafo>
              </Col>
            </Row>

            <Spacer size={12} />
            <ContentModal showModal={showModal}>
              <ItemPolitica>
                <Image src={Boia} className="icon-politica" alt="icon-boia" />
                <p>
                  Não compartilhamos seus dados com terceiros sem que você saiba
                  e concorde.
                </p>
              </ItemPolitica>

              <ItemPolitica>
                <Image
                  src={Chave}
                  className="icon-politica"
                  alt="icon-politica"
                />
                <p>
                  Temos controles e medidas de segurança para evitarmos
                  vazamento de dados.
                </p>
              </ItemPolitica>

              <ItemPolitica>
                <Image
                  src={GuardaChuva}
                  className="icon-politica"
                  alt="icon-guarda-chuva"
                />
                <p>
                  O tratamento que damos ao seus dados é sempre informado e
                  fundamentado em bases legais.
                </p>
              </ItemPolitica>

              <ItemPolitica>
                <Image
                  src={Escudinho}
                  className="icon-politica"
                  alt="icon-escudo"
                />
                <p>Garantimos e defendemos seus direitos sobre seus dados.</p>
              </ItemPolitica>
            </ContentModal>

            <Row>
              <Col lg={12}>
                <ContainerInputCheck>
                  <InputCheck
                    type="checkbox"
                    id={`termos_de_uso`}
                    checked={userData?.policyTerms}
                    name="termos_de_uso"
                    value="true"
                    onChange={e => {
                      setUserData({
                        ...userData,
                        policyTerms: e.target.checked,
                      });
                      if (!e.target.checked)
                        setErrorPolicyTerms(
                          'É necessário o aceite de todos os termos e políticas da plataforma.',
                        );
                      else setErrorPolicyTerms(null);
                    }}
                  />
                  <span>
                    Ao se cadastrar, você concorda com o nosso{' '}
                    <a href="/termos-de-uso">Termos de Uso</a>,{' '}
                    <a href="/politicas-de-privacidade">
                      Políticas de Privacidade
                    </a>{' '}
                    e <a href="/politicas-de-cookies">Políticas de Cookies</a>{' '}
                    da nossa plataforma .
                  </span>
                </ContainerInputCheck>
              </Col>
              {errorPolicyTerms && (
                <span className="help-block">{errorPolicyTerms}</span>
              )}
            </Row>

            <Row>
              <ContainerButtons>
                <ButtonLogin
                  className="btn btn-primary"
                  onClick={() => handleSubmit()}
                >
                  CADASTRAR
                </ButtonLogin>

                <ButtonLogin
                  className="btn btn-default btn-login"
                  onClick={() => handleLogin()}
                >
                  LOGIN
                </ButtonLogin>
              </ContainerButtons>
            </Row>
          </Form>
        </div>
      </Content>
    </>
  );
}

export default CadastroBasico;
