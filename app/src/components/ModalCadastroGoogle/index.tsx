import { useState } from 'react';
import { ModalBody } from 'react-bootstrap';
import { Titulo } from '../Titulo';
import  Boia  from '../../assets/boia.svg';
import  Chave  from '../../assets/chave.svg';
import  GuardaChuva  from '../../assets/guardachuva.svg';
import  Escudinho  from '../../assets/escudinho.svg';
import  {Button}  from '../Form/Button';

import {
  Content,
  ModalConfirmation,
  Container,
  ContainerInputCheck,
  InputCheck,
  ContainerInformacoes,
  ContainerButton,
} from './style';

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  policyTerms: boolean;
}

interface IModalRecomendacao {
  showModal: boolean;
  color: string;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  userData?: User;
  selectedCheckbox?: (e: any) => void;
}

export function ModalCadastroGoogle({
  showModal,
  color,
  setShowModal,
  selectedCheckbox,
  userData,
}: IModalRecomendacao) {
  const [errorPolicyTerms, setErrorPolicyTerms] = useState<string | null>(null);

  const handleGoogleRegistry = (event: any) => {
    event?.preventDefault();
    if (!userData?.policyTerms) {
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
  return (
    <Content>
      <ModalConfirmation
        show={showModal}
        centered
        onHide={() => {
          if (setShowModal) {
            setShowModal(false);
          }
        }}
      >
        <ModalBody style={{ boxShadow: '4px 0px 20px rgba(0, 0, 0, 0.25)' }}>
          <Container>
            <div>
              <Titulo
                titulo={'Cadastre-se com o google'}
                cor={color}
                tamanho={16}
              />
              <p className="subtitulo">
                Conheça nossa Politica de Privacidade em poucas palavras.
              </p>

              <ContainerInformacoes>
                <Boia />
                <span>
                  Não compartilhamos seus dados com terceiros sem que você saiba
                  e controle.
                </span>
              </ContainerInformacoes>
              <ContainerInformacoes>
                <Chave />
                <span>
                  Temos controles e medidas de segurança para evitarmos
                  vazamento de dados.
                </span>
              </ContainerInformacoes>
              <ContainerInformacoes>
                <GuardaChuva />
                <span>
                  O tratamento que damos ao seus dados é sempre informado e
                  fundamentado em bases legais.
                </span>
              </ContainerInformacoes>
              <ContainerInformacoes>
                <Escudinho />
                <span>
                  Garantimos e defendemos seus direitos sobre seus dados.
                </span>
              </ContainerInformacoes>
            </div>
            {userData && (
              <ContainerInputCheck>
                <InputCheck
                  type="checkbox"
                  id={`termos_de_uso`}
                  checked={userData?.policyTerms}
                  name="termos_de_uso"
                  value="true"
                  onChange={e => {
                    if (selectedCheckbox) selectedCheckbox(e);
                  }}
                />
                <span>
                  Ao se cadastrar, você concorda com o nosso{' '}
                  <a href="/termos-de-uso">Termos de Uso</a>,{' '}
                  <a href="/politicas-de-privacidade">
                    Políticas de Privacidade
                  </a>{' '}
                  e <a href="/politicas-de-cookies">Políticas de Cookies</a> da
                  nossa plataforma .
                </span>
              </ContainerInputCheck>
            )}
            {errorPolicyTerms && (
              <span className="help-block">{errorPolicyTerms}</span>
            )}
            <ContainerButton>
              <Button label="CONTINUAR" onClick={handleGoogleRegistry} />
            </ContainerButton>
          </Container>
        </ModalBody>
      </ModalConfirmation>
    </Content>
  );
}
