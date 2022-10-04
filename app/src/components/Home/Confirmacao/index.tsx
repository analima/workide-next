import React from 'react';

import { Col, Container, Row, Form } from 'react-bootstrap';
import Button from '../../Button';
import { Content } from './style';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { Spacer } from '../../Spacer';

class Confirmacao extends React.Component<any, any> {
  email = '';
  usuario = {};

  constructor(props: any) {
    super(props);
    const value = queryString.parse(this.props.location.search);

    const email64 = value.q;
    this.email = atob('' + email64);
    this.usuario = {
      email: this.email,
    };
    this.state = {
      mensagens: [],
    };
  }

  reenviar = () => {
    var mensagens: any = [];

    axios
      .post(
        process.env.REACT_APP_SEGURANCA_API + '/usuarios/reenviar-codigo',
        this.usuario,
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then(async res => {
        mensagens['sucesso'] =
          'Código reenviado com sucesso para o email [' + this.email + '].';
        mensagens.push('sucesso');
        this.setState({
          mensagens: mensagens,
        });
        return false;
      })
      .catch(error => {
        mensagens['erro'] =
          'Erro ao reenviar código.' + error.response.data.message;
        mensagens.push('erro');
        this.setState({
          mensagens: mensagens,
        });
        return false;
      });
  };

  render() {
    return (
      <Content>
        <Container>
          <Row>
            <Col lg={12}>
              <Form action="">
                <div>
                  <h1>Confirme seu e-mail</h1>
                  <p>
                    Bem-vindo ao Freelas.town! Enviamos um e-mail de confirmação
                    para: <br />
                    <b>{this.email}</b>
                  </p>
                  <strong>
                    Se não receber em 05 minutos, verifique a sua caixa de Spam
                    ou clique no botão abaixo para enviar novamente.
                  </strong>
                  <span className="help-block">
                    {' '}
                    {this.state.mensagens.erro}{' '}
                  </span>
                  <span className="sucesso-block">
                    {' '}
                    {this.state.mensagens.sucesso}{' '}
                  </span>
                </div>
                <Button
                  className="btn btn-primary btn-block btn-cadastrar"
                  onClick={this.reenviar}
                >
                  REEVIAR E-MAIL DE CONFIRMAÇÃO
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
        <Spacer size={40} />
      </Content>
    );
  }
}
export default withRouter(Confirmacao);
