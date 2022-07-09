import React from 'react';

import { Content } from './style';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { seguranca_api } from '../../../services/seguranca_api';
import { pessoas_api } from '../../../services/pessoas_api';

class CadastroBasicoGoogle extends React.Component<any, any> {
  email = '';
  decoded = '';
  constructor(props: any) {
    super(props);
    const value = queryString.parse(this.props.location.search);
    const { action } = props.match.params;
    var usuario = {
      tipo: 'GOOGLE',
      signUp: action === 'signUp',
      codigo: value.code,
      nome: 'nome',
    };

    seguranca_api
      .post(`/usuarios`, usuario)
      .then(async response => {
        const { username, id_token, refresh_token } = response.data;
        // --> Recuperar o Usuario
        const usuarioResponse = await seguranca_api.get(
          `/usuarios?email=${username}`,
        );
        const { id: id_usuario } = usuarioResponse.data;

        var id_pessoa_tmp = '';
        var nm_pessoa_tmp = '';
        try {
          const pessoaResponse1 = await pessoas_api.get(
            `/pessoas?id_usuario=${id_usuario}`,
          );
          const { id: id_pessoa, nome } = pessoaResponse1.data;
          id_pessoa_tmp = id_pessoa;
          nm_pessoa_tmp = nome;
        } catch (error) {
          // --> Inserir a Pessoa se nao houver
          var pessoa = {
            id_usuario: id_usuario,
            nome: '',
            tipo_pessoa: 'PF',
            tipo_cadastro: 'VISITANTE',
          };

          await pessoas_api.post(`/pessoas`, pessoa);

          // --> Recuperar a pessoa novamente
          const pessoaResponse2 = await pessoas_api.get(
            `/pessoas?id_usuario=${id_usuario}`,
          );
          const { id: id_pessoa, nome } = pessoaResponse2.data;
          id_pessoa_tmp = id_pessoa;
          nm_pessoa_tmp = nome;
        }
        const usuarioData = {
          nome: nm_pessoa_tmp,
          email: username,
          id_usuario: id_usuario,
          id_pessoa: id_pessoa_tmp,
        };

        localStorage.setItem('@Gyan:id_token', id_token);
        localStorage.setItem('@Gyan:refresh_token', refresh_token);
        localStorage.setItem('@Gyan:user', JSON.stringify(usuarioData));
        window.location.replace('/apresentacao');
      })
      .catch(async error => {
        this.props.history.push('/cadastro-basico', {
          error: error.response.data.message,
        });
      });
  }

  render() {
    return <Content></Content>;
  }
}
export default withRouter(CadastroBasicoGoogle);
