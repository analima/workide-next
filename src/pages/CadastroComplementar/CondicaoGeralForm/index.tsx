import { useCallback, useEffect } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Spacer } from '../../../components/Spacer';
import { useAuth } from '../../../contexts/auth';
import { useHistory } from 'react-router-dom';

import { pessoas_api } from '../../../services/pessoas_api';
import { useCadastroComplementar } from '../../../hooks/cadastroComplementar';
import { Condicao, Actions } from './style';
import Content from './style';
import { Button } from '../../../components/Form/Button';
import { ToggleSwitch } from '../../../components/Form/ToggleSwitch';
import { useGAEventsTracker } from '../../../hooks/useGAEventsTracker';

interface IFormProps {
  email_novidades: boolean;
  email_compra_produto: boolean;
  email_chat: boolean;
  email_projetos_area: boolean;
  email_orcamento: boolean;
  notificacao_acesso_produto: boolean;
  notificacao_whatsapp: boolean;
  permite_indicacao_redes_sociais: boolean;
}

const schema = Yup.object().shape({
  email_novidades: Yup.boolean(),
  email_compra_produto: Yup.boolean(),
  email_chat: Yup.boolean(),
  email_projetos_area: Yup.boolean(),
  email_orcamento: Yup.boolean(),
  notificacao_acesso_produto: Yup.boolean(),
  notificacao_whatsapp: Yup.boolean(),
  permite_indicacao_redes_sociais: Yup.boolean(),
});

interface IProps {
  cadastroCompleto: boolean;
  isConsumidor: boolean;
}

export default function CondicaoGeralForm({ cadastroCompleto, isConsumidor }: IProps) {
  const { user, refreshUserData } = useAuth();
  const { setAbaSelecionada } = useCadastroComplementar();
  const history = useHistory();
  const GAEventsTracker = useGAEventsTracker('Cadastro Complementar');
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  const loadInitialData = useCallback(async () => {
    try {
      const response = await pessoas_api.get(
        `/pessoas/${user.id_pessoa}/configuracoes`,
      );
      if (response.data === '') {
        reset({
          email_novidades: true,
          email_compra_produto: true,
          email_chat: true,
          email_projetos_area: true,
          email_orcamento: true,
          notificacao_acesso_produto: true,
          permite_indicacao_redes_sociais: true,
        });
      } else {
        const configuracao_fornecedor = response.data;

        reset({
          email_novidades: configuracao_fornecedor?.email_novidades,
          email_compra_produto: configuracao_fornecedor?.email_compra_produto,
          email_chat: configuracao_fornecedor?.email_chat,
          email_projetos_area: configuracao_fornecedor?.email_projetos_area,
          email_orcamento: configuracao_fornecedor?.email_orcamento,
          notificacao_acesso_produto:
            configuracao_fornecedor?.notificacao_acesso_produto,
          permite_indicacao_redes_sociais:
            configuracao_fornecedor?.permite_indicacao_redes_sociais,
        });
      }
    } catch (error: any) {
      console.log(error.response);
    }
  }, [user, reset]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handleSalvarConfiguracao = useCallback(
    async (form: IFormProps) => {
      const {
        email_novidades,
        email_compra_produto,
        email_chat,
        email_projetos_area,
        email_orcamento,
        notificacao_acesso_produto,
        permite_indicacao_redes_sociais,
      } = form;

      const data = {
        email_novidades: email_novidades || false,
        email_compra_produto: email_compra_produto || false,
        email_chat: email_chat || false,
        email_projetos_area: email_projetos_area || false,
        email_orcamento: email_orcamento || false,
        notificacao_acesso_produto: notificacao_acesso_produto || false,
        notificacao_whatsapp: false,
        permite_indicacao_redes_sociais:
          permite_indicacao_redes_sociais || false,
      };
      try {
        await pessoas_api.post(
          `/pessoas/${user.id_pessoa}/configuracoes`,
          data,
        );
        await refreshUserData();

        if (isConsumidor) {
          setAbaSelecionada({ indice: 3, porcentagem: 75 });
        } else if (cadastroCompleto)
          setAbaSelecionada({ indice: 2, porcentagem: 75 });
        else history.push('/persona');
      } catch (error: any) {
        console.log(error.response);
      }
      GAEventsTracker('Botao cadastro compelementar', 'Aba condições gerais');
    },
    [
      GAEventsTracker,
      user.id_pessoa,
      refreshUserData,
      isConsumidor,
      cadastroCompleto,
      setAbaSelecionada,
      history,
    ],
  );

  return (
    <Content>
      <Container>
        <Spacer size={80} />
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <Condicao>
              <label>
                Receber notificações com novidades sobre a plataforma.
              </label>

              <ToggleSwitch
                control={control}
                name="email_novidades"
                label=""
                error={errors.email_novidades && errors.email_novidades.message}
              />
            </Condicao>
            <Condicao>
              <label>Receber notificações via chat interno.</label>

              <ToggleSwitch
                control={control}
                name="email_chat"
                label=""
                error={errors.email_chat && errors.email_chat.message}
              />
            </Condicao>
            <Condicao>
              <label>Receber notificações sobre produtos e serviços.</label>

              <ToggleSwitch
                control={control}
                name="notificacao_acesso_produto"
                label=""
                error={
                  errors.notificacao_acesso_produto &&
                  errors.notificacao_acesso_produto.message
                }
              />
            </Condicao>
            <Condicao>
              <label>Receber e-mail sobre a compra de um produto.</label>

              <ToggleSwitch
                control={control}
                name="email_compra_produto"
                label=""
                error={
                  errors.email_compra_produto &&
                  errors.email_compra_produto.message
                }
              />
            </Condicao>

            <Condicao>
              <label>Receber e-mail sobre os negociação de projetos.</label>

              <ToggleSwitch
                control={control}
                name="email_projetos_area"
                label=""
                error={
                  errors.email_projetos_area &&
                  errors.email_projetos_area.message
                }
              />
            </Condicao>
            <Condicao>
              <label>Receber e-mail sobre os projetos em andamento.</label>

              <ToggleSwitch
                control={control}
                name="email_orcamento"
                label=""
                error={errors.email_orcamento && errors.email_orcamento.message}
              />
            </Condicao>
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            <Actions>
              <Button
                label="VOLTAR"
                color="ghost"
                onClick={() => {
                  setAbaSelecionada({ indice: 0, porcentagem: 50 });
                  window.scrollTo(0, 0);
                }}
              />
              &nbsp;&nbsp;
              <Button
                label={cadastroCompleto ? 'SALVAR' : 'CONCLUÍDO'}
                onClick={handleSubmit(handleSalvarConfiguracao as any)}
              />
            </Actions>
          </Col>
        </Row>
      </Container>
    </Content>
  );
}
