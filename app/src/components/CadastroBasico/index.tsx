import { useState, useEffect, useMemo, ChangeEvent } from 'react';
import axios from 'axios';
import {
  Col,
  Form,
  Row,
  OverlayTrigger,
  Tooltip,
  Modal,
  ModalBody,
} from 'react-bootstrap';

import LogoGyan from '../../assets/logo-pequena-azul.png';
import Google from '../../assets/google.svg';
import {
  ButtonLogin,
  ContainerInputCheck,
  ContainerTermos,
  Content,
  FormTitle,
  InputCheck,
  ItemPolitica,
  PoliticaParagrafo,
  Termos,
} from './styles';

import { Spacer } from '../Spacer';
import { pessoas_api } from '../../services/pessoas_api';
import Boia from '../../assets/boia.svg';
import Chave from '../../assets/chave.svg';
import GuardaChuva from '../../assets/guardachuva.svg';
import Escudinho from '../../assets/escudinho.svg';
import { ModalInformation } from '../ModalInformation';
import { VERMELHO } from '../../styles/variaveis';
import { useGAEventsTracker } from '../../hooks/useGAEventsTracker';
import Image from 'next/image';
import { useAuth } from 'src/contexts/auth';

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
  affiliate_id: string;
}

export function CadastroBasico() {
  const { idFiliate } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState<User>({} as User);
  const [errorName, setErrorName] = useState<string | null>(null);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [errorSenha, setErroSenha] = useState<string>('');
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

  async function handleRegistryUser(user: UserToRegistry) {
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
    try {
      await axios.post(process.env.REACT_APP_SEGURANCA_API + '/usuarios', user);
      var emBase64 = btoa(userData.email);
      window.location.replace('/confirmacao?q=' + emBase64);
    } catch (error: any) {
      if (error.response) {
        console.error(error.response);
        if (error.response.status === 422) {
          if (error.response.data.message.includes('validation error detected'))
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
    }
  }

  function handleSubmit(event: any) {
    event.preventDefault();
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
      affiliate_id: idFiliate,
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
      process.env.REACT_APP_REDIRECT_URL +
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

      <Content>
        <div id="cadastro_basico" className="form-content">
          <FormTitle>
            <div className="title">
              <h2>Olá!</h2>
              <p>Deixe-nos conhecer melhor você:</p>
            </div>
            <Image src={LogoGyan} width={100} height={100} alt="Logo" />
          </FormTitle>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg={12}>
                <Form.Group controlId="Nome">
                  <Form.Control
                    type="text"
                    placeholder="Nome"
                    name="nome"
                    onChange={(e: any) => {
                      const regValidateName =
                        /^$|^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/;
                      if (regValidateName.test(e.target.value)) {
                        setUserData({ ...userData, name: e.target.value });
                        if (!e.target.value.length)
                          setErrorName('Preenchimento obrigatório.');
                        else if (!handleValidateName(e.target.value)) {
                          setErrorName(
                            'O nome deve ser preenchido com o nome completo.',
                          );
                        } else setErrorName(null);
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
                    onChange={(e: any) => {
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
                      onChange={(e: any) => {
                        setUserData({ ...userData, password: e.target.value });
                        const validatePassword =
                          /(?=.*[}{%&$@ç!#*,.^?~=+\-/*\-+.|])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[0-9]).{8,}/gm;
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
                    onChange={(e: any) => {
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
                  {errorSenha !== '' && (
                    <span className="help-block">{errorSenha}</span>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Spacer size={10} />

            <Row onClick={() => setShowModal(true)}>
              <Col lg={12}>
                <PoliticaParagrafo>
                  Nossa Política de Privacidade em poucas palavras.
                </PoliticaParagrafo>
              </Col>
            </Row>

            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              style={{ zIndex: 9999999999 }}
            >
              <ModalBody
                style={{ boxShadow: '4px 0px 20px rgba(0, 0, 0, 0.25)' }}
              >
                <ItemPolitica>
                  <Boia className="icon-politica" />
                  <p>
                    Não compartilhamos seus dados com terceiros sem que você
                    saiba e concorde.
                  </p>
                </ItemPolitica>

                <ItemPolitica>
                  <Chave className="icon-politica" />
                  <p>
                    Temos controles e medidas de segurança para evitarmos
                    vazamento de dados.
                  </p>
                </ItemPolitica>

                <ItemPolitica>
                  <GuardaChuva className="icon-politica" />
                  <p>
                    O tratamento que damos ao seus dados é sempre informado e
                    fundamentado em bases legais.
                  </p>
                </ItemPolitica>

                <ItemPolitica>
                  <Escudinho className="icon-politica" />
                  <p>Garantimos e defendemos seus direitos sobre seus dados.</p>
                </ItemPolitica>
              </ModalBody>
            </Modal>

            <Row>
              <Col lg={12}>
                <ContainerInputCheck>
                  <InputCheck
                    type="checkbox"
                    id={`termos_de_uso`}
                    name="termos_de_uso"
                    value="true"
                    onChange={(e: any) => {
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
              <Col lg={12} className="container-register">
                <button className="btn btn-primary btn-block btn-cadastrar">
                  CADASTRAR
                </button>
                <Row>
                  <Col>
                    <div className="google">
                      <button onClick={handleGoogleRegistry}>
                        <Image
                          width={20}
                          height={20}
                          src={Google}
                          alt="Google"
                        />
                        CADASTRO COM GOOGLE
                      </button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <ButtonLogin className="" onClick={() => handleLogin()}>
                LOGIN
              </ButtonLogin>
            </Row>

            <ContainerTermos>
              <Termos>
                <a href="/termos-de-uso">Termos de uso</a>
              </Termos>
              <Termos>
                <a href="/politicas-de-privacidade">Politica de privacidade</a>
              </Termos>
            </ContainerTermos>
          </Form>
        </div>
      </Content>
    </>
  );
}

export default CadastroBasico;
