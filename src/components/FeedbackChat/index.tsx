import { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { FiPaperclip, FiCheck, FiLoader, FiX } from 'react-icons/fi';

import { Select } from '../Select';
import {
  Content,
  Button,
  Wrapper,
  ContentFinish,
  MsgError,
  MsgSucess,
  ContentThais,
  ContainerThais,
} from './style';
import chat from '../../assets/thais.svg';
import optionsFeedback from './configuration';
import { geral_api } from '../../services/geral_api';
import { arquivos_api } from '../../services/arquivos_api';
import { AZUL_60 } from '../../styles/variaveis';
import { Alert } from 'react-bootstrap';
import { typeFile } from '../../utils/typeFile';
import { useAuth } from '../../contexts/auth';

export function FeedbackChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [finish, setFinish] = useState(false);
  const [text, setText] = useState('');
  const [feedbackSelected, setFeedbackSelectetd] = useState<string>('');
  const [loadingFile, setLoadingFile] = useState(false);
  const [error, setError] = useState('');
  const [idImage, setIdImage] = useState('');
  const [sucessImage, setSucessImage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [urlAtual, setUrlAtual] = useState('');
  const { user } = useAuth();
  const handleSelectedFeedback = (
    evt: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFeedbackSelectetd(evt.target.value);
  };

  function handleOpen() {
    setIsOpen(!isOpen);
    setFinish(false);
    setText('');
    setSucessImage('');
    setError('');
    setIdImage('');
  }

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setLoadingFile(true);
      try {
        setLoadingFile(true);
        if (!event.target.files) throw new Error('Nenhum arquivo selecionado');

        const newFile = event.target.files[0];

        if (newFile && typeFile.includes(newFile.type)) {
          const file = new FormData();
          file.append('file', newFile);

          const { data } = await arquivos_api.post('/arquivos', file);
          setIdImage(data.id);
          setSucessImage('Arquivo anexado com sucesso');
          setError('');
          setLoadingFile(false);
        } else {
          setError('Envie uma imagem do tipo PNG ou JPEG!');
          setSucessImage('');
        }
      } catch (err: any) {
        setError(err.response.data.error);
      } finally {
        setLoadingFile(false);
      }
    },
    [],
  );

  const handleClick = useCallback(
    async (conteudo: string, tipo: string, id: string) => {
      if (conteudo.length > 0 && tipo.length > 0) {
        let data = {
          conteudo: conteudo,
          ds_tipo: tipo,
          id_arquivo: id.length > 0 ? id : undefined,
          url_rota: urlAtual,
        };
        await geral_api.post('/feedbacks', data);
        setFinish(oldState => !oldState);
      }
    },
    [urlAtual],
  );

  function nameButton() {
    if (loadingFile) {
      return <FiLoader />;
    }
    return 'Enviar';
  }

  useEffect(() => {
    if (text.length === 1500) setShowAlert(true);
    else setShowAlert(false);
  }, [text]);

  useEffect(() => {
    setUrlAtual(window.location.href);
  }, [setUrlAtual]);

  return (
    <Content>
      {user.id_usuario && (
        <>
          <Wrapper open={isOpen}>
            {finish ? (
              <ContentFinish>
                <FiX size={32} color={AZUL_60} onClick={() => handleOpen()} />
                <span>
                  <FiCheck size={32} color="#fff" />
                </span>
                <h2>Obrigada!</h2>
              </ContentFinish>
            ) : (
              <>
                <p>
                  <span>Olá, eu sou a Thaís! </span>
                  Seja muito bem-vindo a nossa plataforma. Para nós é muito
                  importante saber o que você está achando. Gostaria de
                  compartilhar conosco? Pode deixar aqui a qualquer momento sua
                  sugestão, elogio ou se sentiu falta de algo.
                </p>
                <Select
                  name="Feedback"
                  setter={handleSelectedFeedback}
                  options={optionsFeedback}
                  value={feedbackSelected}
                />

                <textarea
                  value={text}
                  onChange={e => {
                    if (e.target.value.length <= 1500) setText(e.target.value);
                  }}
                  placeholder="Deixe-nos seu feedback"
                />
                {showAlert && (
                  <Alert
                    key={1}
                    variant="danger"
                    style={{
                      marginTop: '15px',
                      height: '50px',
                      padding: '5px',
                    }}
                  >
                    A mensagem deve conter no máximo 1500 caracteres
                  </Alert>
                )}

                <div className="content-data">
                  <label htmlFor="file">
                    <FiPaperclip />
                    <input
                      id="file"
                      name="file"
                      type="file"
                      onChange={handleFileChange}
                    />
                  </label>
                  <Button
                    onClick={() => handleClick(text, feedbackSelected, idImage)}
                  >
                    {nameButton()}
                  </Button>
                </div>

                {sucessImage !== '' && <MsgSucess>{sucessImage}</MsgSucess>}
                {error && <MsgError>{error}</MsgError>}
              </>
            )}
          </Wrapper>
          <ContainerThais>
            <ContentThais onClick={handleOpen}>
              <img id="chat" src={chat} alt="" />
            </ContentThais>
          </ContainerThais>
        </>
      )}
    </Content>
  );
}
