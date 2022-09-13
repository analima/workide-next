import React from 'react';
import axios from 'axios';
import { Col, Form, Row, Button } from 'react-bootstrap';

import ContainerLogin from '../../components/Login/style';

import Google from '../../assets/google.svg';
import Logo from '../../assets/logo.svg';
import { seguranca_api } from '../../services/seguranca_api';
import { pessoas_api } from '../../services/pessoas_api';
import { updateToken } from '../../services';
import { AZUL } from '../../styles/variaveis';
import { Helmet } from 'react-helmet';
import Image from 'next/image';
import { selecionarRotaHome } from 'src/utils/selecionarRotaHome';

export default class Login extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: props.email,
      senha: props.senha,
      conectado: undefined,
      errors: [],
      serviceMessage: '',
      reenviarCodigo: false,
      loading: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  hasError(key: any) {
    return this.state.errors.indexOf(key) !== -1;
  }

  handleInputChange(event: any) {
    var key = event.target.name;
    var value = event.target.value;
    var obj: any = {};
    obj[key] = value.trim();
    this.setState(obj);
  }

  handleSubmit(event: any) {
    this.setState({
      loading: true,
    });
    event.preventDefault();

    //VALIDATE
    var errors: any = [];

    //email
    const expression = /\S+@\S+/;
    var validEmail = expression.test(String(this.state.email).toLowerCase());

    if (this.state.email === undefined || this.state.email === '') {
      errors['email'] = 'Preenchimento é obrigatório';
      errors.push('email');
    } else if (!validEmail) {
      errors['email'] = 'Formato inválido';
      errors.push('email');
    }

    //Senha
    if (this.state.senha === undefined || this.state.senha === '') {
      errors['senha'] = 'Preenchimento é obrigatório';
      errors.push('senha');
    }

    const validatePassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+-_])[A-Za-z\d@$#.!%*?&+-_]{8,}$/;
    if (!validatePassword.test(this.state.senha)) {
      errors['senha'] =
        'A senha deve possuir pelo menos 8 caracteres, dígitos, letras maíusculas e minúsculas e caractere especial.';
      errors.push('senha');
    }

    this.setState({
      errors: errors,
    });

    if (errors.length > 0) {
      this.setState({
        loading: false,
      });
      return false;
    }

    this.enviarFormulario();
  }

  handleConectadoChanged(event: any) {
    var key = event.target.name;
    var obj: any = {};
    var modifiedValue = event.target.value;
    if (!this.state.conectado) {
      obj[key] = modifiedValue;
    } else {
      obj[key] = undefined;
    }
    this.setState(obj);
  }

  enviarFormulario = () => {
    var usuario = {
      email: this.state.email,
      password: this.state.senha,
    };
    this.postar(usuario);
  };

  async postar(usuario: any) {
    //VALIDATE
    var errors: any = [];
    this.setState({
      reenviarCodigo: false,
    });

    //--> Criar Sessao
    axios
      .post(process.env.REACT_APP_SEGURANCA_API + '/sessoes', usuario)
      .then(async res => {
        const { email } = usuario;
        const { id_token, refresh_token } = res.data;

        localStorage.setItem('@Gyan:id_token', id_token);
        localStorage.setItem('@Gyan:refresh_token', refresh_token);

        updateToken();

        const usuarioResponse = await seguranca_api.get(
          `/usuarios?email=${email}`,
        );
        const { id: id_usuario } = usuarioResponse.data;

        const pessoaResponse = await pessoas_api.get(
          `/pessoas?id_usuario=${id_usuario}`,
        );
        const { id: id_pessoa, nome } = pessoaResponse.data;

        const usuarioData = {
          nome,
          email,
          id_usuario,
          id_pessoa,
        };

        localStorage.setItem('@Gyan:user', JSON.stringify(usuarioData));
        // --> Redireciona para a Home
        this.setState({
          loading: false,
        });
        if (pessoaResponse.data.percentageRegisterProvider > 20)
          window.location.replace(
            selecionarRotaHome(pessoaResponse.data.tipoPerfil),
          );
        else window.location.replace('/apresentacao');
      })
      .catch(async error => {
        errors['serviceMessage'] = error.response?.data?.message;
        this.setState({
          reenviarCodigo: true,
        });
        console.error(error.response?.data);
        this.setState({ errors: errors });
        this.setState({
          loading: false,
        });
      });
  }

  cadastroGoogle = () => {
    var url =
      process.env.REACT_APP_AWS_COGNITO_CLIENT_DOMAIN +
      '/login?redirect_uri=' +
      process.env.REACT_APP_REDIRECT_URL +
      '/cadastroGoogle/signIn&response_type=code&client_id=' +
      process.env.REACT_APP_AWS_COGNITO_CLIENT_ID +
      '&scope=profile+email+aws.cognito.signin.user.admin+openid';
    window.location.replace('/confirmacao?t=login');
    window.location.replace(url);
  };

  showCadastroBasico = () => {
    const element = document.getElementById('cadastro_basico');
    if (element) {
      element.style.display = 'block';
    }
  };

  reenviar = () => {
    var mensagens: any = [];

    axios
      .post(
        process.env.REACT_APP_SEGURANCA_API + '/usuarios/reenviar-codigo',
        { email: this.state.email },
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then(async res => {
        mensagens['sucesso'] =
          'Código reenviado com sucesso para o email [' +
          this.state.email +
          '].';
        mensagens.push('sucesso');
        this.setState({
          mensagens: mensagens,
        });
        this.setState({ errors: {} });
        return false;
      })
      .catch((error: any) => {
        mensagens['erro'] =
          'Erro ao reenviar código.' + error.response.data.message;
        mensagens.push('erro');
        this.setState({
          mensagens: mensagens,
        });
        console.error(error.response);
        return false;
      });
  };

  render() {
    return (
      <ContainerLogin>
        <Helmet>
          <title>Gyan - Faça login em sua conta</title>
        </Helmet>
        <div className="form-content">
          <div className="form-title">
            <div className="logo">
              <Image src={Logo} alt="Logo Gyan" />
            </div>
            <br />
            <br />
            <h2>Bem-vindo!</h2>
          </div>

          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col lg={12}>
                <div className="google">
                  <a onClick={this.cadastroGoogle} href="# ">
                    <Image src={Google} alt="Google" /> LOGIN COM GOOGLE
                  </a>
                </div>
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                <Form.Group controlId="E-mail">
                  <Form.Control
                    type="text"
                    placeholder="E-mail"
                    name="email"
                    onChange={this.handleInputChange}
                    value={this.state.email}
                    maxLength={100}
                    minLength={3}
                  />
                  <span className="help-block">{this.state.errors.email}</span>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                <Form.Group controlId="senha">
                  <Form.Control
                    type="password"
                    placeholder="Senha"
                    onChange={this.handleInputChange}
                    name="senha"
                    value={this.state.senha}
                    maxLength={255}
                    minLength={3}
                    autoComplete="current-password"
                  />
                  <span className="help-block">{this.state.errors.senha}</span>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <span className="help-block">
                  {this.state.errors.serviceMessage}
                  {this.state.reenviarCodigo &&
                    !this.state.mensagens &&
                    this.state.errors.serviceMessage ===
                      'Cadastro não confirmando. Acesse seu seu email e confirme seu cadastro.' && (
                      <button
                        onClick={this.reenviar}
                        style={{
                          border: 'none',
                          backgroundColor: 'transparent',
                          color: AZUL,
                          textDecoration: 'underline',
                        }}
                      >
                        Ou solicite um novo código
                      </button>
                    )}
                  {this.state.mensagens?.sucesso && (
                    <span>{this.state.mensagens.sucesso}</span>
                  )}
                </span>
              </Col>
            </Row>
            <Row>
              <div className="d-inline-flex p-1">
                <div className="esqueci">
                  <a href="/esqueci" className="esqueci">
                    Esqueci minha senha
                  </a>
                </div>
                <div className="conectado">
                  <Form.Check
                    type="checkbox"
                    label={`Continuar conectado`}
                    name="conectado"
                    onChange={this.handleConectadoChanged.bind(this)}
                  />
                </div>
              </div>
            </Row>

            <Row>
              <Col lg={12}>
                <Button
                  type="submit"
                  className="btn btn-primary btn-block btn-cadastrar"
                >
                  {this.state.loading ? 'CARREGANDO...' : 'LOGIN'}
                </Button>
              </Col>
              <Col lg={12}>
                <Button
                  className="btn btn-default btn-login"
                  href="/cadastro-basico"
                  onClick={this.showCadastroBasico}
                >
                  CADASTRAR
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </ContainerLogin>
    );
  }
}
