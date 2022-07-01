import { memo, useCallback, useEffect, useState } from 'react';
import {
  ChatUserHeader,
  Container,
  ContainerMessages,
  ContainerProjectInfo,
  ContainerSandMessage,
  GhostButton,
  InputUpload,
  Message,
  OnlineStatus,
  OverlayUploadOptions,
} from './style';
import { AZUL, VERDE } from '../../styles/variaveis';
import { Spacer } from '../Spacer';
import { BsPaperclip } from 'react-icons/bs';
import { HiOutlineArrowCircleUp } from 'react-icons/hi';
import { readUploadedFile } from '../../utils/uploadImage';

interface Chat {
  id: string;
  projectName: string;
  userName: string;
  status: 'sent' | 'resent' | 'open' | 'accepted' | 'new';
  online: boolean;
}

interface ChatProps {
  chat: Chat;
}

interface Messages {
  id: string;
  from: 'me' | 'user';
  message: string;
}

function ChatWithUser({ chat }: ChatProps): JSX.Element {
  const [messages, setMessages] = useState<Array<Messages>>(
    [] as Array<Messages>,
  );
  const [showUploadOptions, setShowOploadOptions] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>();
  const [uploadFile, setUploadFile] = useState<File>();
  const [messageToSend, setMessageToSend] = useState('');

  useEffect(() => {
    const handleProcess = async () => {
      try {
        if (uploadFile) {
          const promise = await readUploadedFile(uploadFile);
          setSelectedFile(promise);
        }
        setShowOploadOptions(false);
      } catch (err) {
        console.error(err);
      }
    };

    if (uploadFile) handleProcess();
  }, [uploadFile, selectedFile]);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (e.target.files) {
        const { files } = e.target;
        setUploadFile(files[0]);
      }
    },
    [],
  );

  useEffect(() => {
    setMessages([
      {
        id: '1',
        from: 'me',
        message: 'Olá, tudo bem?',
      },
      {
        id: '2',
        from: 'user',
        message: 'Bom dia, tudo sim e vc?',
      },
      {
        id: '3',
        from: 'me',
        message: 'Tbm',
      },
      {
        id: '4',
        from: 'me',
        message: 'Podemos alinhar alguns pontos do projeto?',
      },
      {
        id: '5',
        from: 'user',
        message: 'Claro, vamos lá',
      },
      {
        id: '5',
        from: 'user',
        message: 'Claro, vamos lá',
      },
      {
        id: '5',
        from: 'user',
        message: 'Claro, vamos lá',
      },
      {
        id: '5',
        from: 'user',
        message: 'Claro, vamos lá',
      },
      {
        id: '5',
        from: 'user',
        message: 'Claro, vamos lá',
      },
      {
        id: '5',
        from: 'user',
        message: 'Claro, vamos lá',
      },
      {
        id: '5',
        from: 'user',
        message: 'Claro, vamos lá',
      },
      {
        id: '5',
        from: 'user',
        message: 'Claro, vamos lá',
      },
      {
        id: '5',
        from: 'user',
        message: 'Claro, vamos lá',
      },
      {
        id: '5',
        from: 'user',
        message: 'Claro, vamos lá',
      },
    ]);
  }, []);

  return (
    <Container>
      <ChatUserHeader>
        <div className="user">
          <div className="image" />
          <span className="name">{chat.userName}</span>
        </div>
        <div className="icons">
          <OnlineStatus theme={{ color: chat.online ? VERDE : '#aaaaaa' }} />
        </div>
      </ChatUserHeader>
      <ContainerMessages>
        {messages.map(obj => {
          if (obj.from === 'me')
            return (
              <div className="container-message-me" key={obj.id}>
                <Message>{obj.message}</Message>
              </div>
            );
          else
            return (
              <div className="container-message-user" key={obj.id}>
                <Message>{obj.message}</Message>
              </div>
            );
        })}
      </ContainerMessages>
      <ContainerProjectInfo>
        <div className="container-name">
          <span>{chat.projectName}</span>
          <span>R$ 150,00</span>
        </div>
        <Spacer size={20} />
        <div className="container-fast-actions">
          <GhostButton>Abrir negociação</GhostButton>
        </div>
        <ContainerSandMessage>
          {showUploadOptions && (
            <OverlayUploadOptions>
              <button>
                <label htmlFor="upload-image">Imagem</label>
              </button>
              <button>
                <label htmlFor="upload-file">Arquivo</label>
              </button>
              <button onClick={() => setShowOploadOptions(false)}>
                Cancelar
              </button>
            </OverlayUploadOptions>
          )}
          <InputUpload
            name="upload-image"
            type="file"
            id="upload-image"
            accept="image/*"
            onChange={e => handleImageChange(e)}
          />
          <InputUpload
            name="upload-file"
            type="file"
            id="upload-file"
            accept=".pdf, .docx"
          />
          <BsPaperclip
            fill={AZUL}
            size={40}
            cursor="pointer"
            onClick={() => setShowOploadOptions(!showUploadOptions)}
          />
          <textarea
            placeholder="Digite aqui sua mensagem"
            value={messageToSend}
            onChange={e => setMessageToSend(e.target.value)}
          />
          <HiOutlineArrowCircleUp
            fill={AZUL}
            size={50}
            cursor="pointer"
            stroke="#fff"
          />
        </ContainerSandMessage>
      </ContainerProjectInfo>
    </Container>
  );
}

export default memo(ChatWithUser);
