import { useCallback, useEffect, useState } from 'react';
import { Link, Router, useHistory } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Container, Dropdown, ModalBody } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../../../contexts/auth';
import Image from 'next/image';
import { pessoas_api } from '../../../../services/pessoas_api';
import {
  ContentSession,
  GhostButton,
  AcaoBell,
  Notification,
  ContentNotifications,
  ButtonNotifications,
  ModalNotification,
  ContentModal,
  TitleNotification,
  ContentModalNotifications,
  ContentButton,
  ContainerHeader,
} from './style';
import Content from './style';
import Home from '../../../../assets/House.svg';
import { BsCircleFill } from 'react-icons/bs';
import { AZUL, CINZA_40 } from '../../../../styles/variaveis';
import { Titulo } from '../../../../components/Titulo';
import { Button } from '../../../../components/Form/Button';
import { notificacoes_api } from '../../../../services/notificacoes_api';
import { FiMenu, FiBell } from 'react-icons/fi';
import { IPessoa } from 'src/interfaces/IPessoa';

interface INavbar {
  toggleSidebar: () => void;
  hinddenOportunidades?: boolean;
}

interface INotification {
  data_hora_criacao: string;
  data_hora_ultima_alteracao: string;
  idNotificacao: number;
  idPessoa: number;
  idPessoaNotificacao: number;
  notificacaoLida: boolean;
  parsedNotificacao: string;
  link?: string;
}

export default function Navbar({
  toggleSidebar,
  hinddenOportunidades,
}: INavbar) {
  const history = useHistory();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0);

  const [showModal, setShowModal] = useState(false);

  const [user, setUser] = useState({} as IPessoa);
  const [isAuthDataLoading, setIsAuthDataLoading] = useState(true);
  const [idToken, setIdToken] = useState('');

  const router = useRouter();

  const refreshUserData = async (ID_TOKEN: any) => {
    const newIdToken = localStorage.getItem(ID_TOKEN);
    setIdToken(newIdToken || '');

    if (newIdToken) {
      const res = await pessoas_api.get('/pessoas/me', {
        headers: {
          Authorization: `Bearer ${newIdToken}`,
        },
      });
      if (res) {
        const { data: newUser } = res;
        setUser({
          ...newUser,
          id_pessoa: newUser.id,
          email: newUser.usuario?.email,
          url_avatar: newUser.arquivo?.url,
          admin: newUser.usuario?.admin,
        });
      }
    }
  };

  useEffect(() => {
    let local = localStorage.getItem('@Freelas.town:id_token');
    if (local) {
      const ID_TOKEN = '@Freelas.town:id_token';
      refreshUserData(ID_TOKEN);
    }
  }, []);

  const handleCloseOrOpenNotifications = useCallback(async () => {
    setShowModal(oldShowModal => {
      const newShowModal = !oldShowModal;
      return newShowModal;
    });
  }, []);

  const loadNotifications = useCallback(async () => {
    try {
      const { data } = await notificacoes_api.get<{ values: INotification[] }>(
        `/notificacao/${user.id_pessoa}?order=data_hora_criacao=DESC`,
      );
      setNotifications(data.values);
      setUnreadNotifications(
        data.values.filter(i => i.notificacaoLida === false).length,
      );
    } catch (error) {
      console.log(error);
    }
  }, [user.id_pessoa]);

  const handleReadNotificationFromIdPessoa = useCallback(
    async (idPessoa: number) => {
      notificacoes_api.patch(`/notificacao/${idPessoa}`);
      setUnreadNotifications(0);
      loadNotifications();
    },
    [loadNotifications],
  );

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const handleNotification = useCallback(
    async (notificacao: INotification) => {
      await notificacoes_api.put(
        `/notificacao/${user.id_pessoa}/${notificacao.idPessoaNotificacao}`,
        {
          notificacao_lida: true,
        },
      );
      if (notificacao.link) {
        window.location.href = notificacao.link;
      }
      loadNotifications();
    },
    [loadNotifications, user.id_pessoa],
  );

  return (
    <Content>
      <Container>
        <div className="icones">
          {/* <Image src={FiMenu} onClick={toggleSidebar}/> */}
          <FiMenu onClick={toggleSidebar} />

          {/* <Link to="/fornecedor/home"> */}
          <Image
            alt="Home fornecedor"
            src={Home}
            className="fi-icon-home"
            onClick={() => {
              router.push('/fornecedor/home');
            }}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <ContentSession>
          <GhostButton
            onClick={() => router.push('/fornecedor/captar-projetos')}
            opacity={hinddenOportunidades ? 0 : 1}
          >
            BUSCAR OPORTUNIDADES
          </GhostButton>

          <AcaoBell>
            <Dropdown
              onToggle={isOpen => {
                if (!isOpen) {
                  handleReadNotificationFromIdPessoa(user.id_pessoa || 0);
                }
              }}
            >
              <Dropdown.Toggle key="toggle" variant="none" id="dropdown-basic">
                <button className="icon-button">
                  <FiBell size={28} className="material-icons" />
                  {unreadNotifications > 0 && (
                    <span className="icon-button__badge">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
              </Dropdown.Toggle>

              <Dropdown.Menu key="menu">
                <ContainerHeader>
                  <Titulo titulo="Notificações" cor={CINZA_40} tamanho={20} />
                  {notifications.length > 0 && (
                    <ContentButton modal={false}>
                      <ButtonNotifications
                        onClick={() => handleCloseOrOpenNotifications()}
                      >
                        Ver todas as notificações
                      </ButtonNotifications>
                    </ContentButton>
                  )}
                </ContainerHeader>
                {notifications.length > 0 ? (
                  <ContentNotifications>
                    {notifications.map(notificacao => (
                      <Dropdown.Item
                        onClick={() => handleNotification(notificacao)}
                        key={notificacao.idPessoaNotificacao}
                      >
                        <Notification>
                          <div className="info">
                            <span>{notificacao.parsedNotificacao}</span>
                            <p>
                              há{' '}
                              {formatDistance(
                                new Date(notificacao.data_hora_criacao),
                                new Date(),
                                {
                                  locale: pt,
                                },
                              )}
                            </p>
                          </div>
                          <div className="icon-notification">
                            {!notificacao.notificacaoLida && (
                              <BsCircleFill size={8} color={'#ffb74d'} />
                            )}
                          </div>
                        </Notification>
                      </Dropdown.Item>
                    ))}
                  </ContentNotifications>
                ) : (
                  <ContentButton modal={false}>
                    <Titulo
                      titulo="Você não possui notificações"
                      cor={AZUL}
                      tamanho={14}
                    />
                  </ContentButton>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </AcaoBell>
        </ContentSession>

        <ModalNotification
          className="modal-denuncia"
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-dialog modal-lg"
          show={showModal}
          centered
          onHide={handleCloseOrOpenNotifications}
        >
          <ModalBody>
            <TitleNotification>Todas as notificações</TitleNotification>
            <ContentModalNotifications>
              {notifications.map(notificacao => (
                <ContentModal
                  onClick={() => handleNotification(notificacao)}
                  key={notificacao.idPessoaNotificacao}
                >
                  <div className="info">
                    <span>{notificacao.parsedNotificacao}</span>
                    <p>
                      há{' '}
                      {formatDistance(
                        new Date(notificacao.data_hora_criacao),
                        new Date(),
                        {
                          locale: pt,
                        },
                      )}
                    </p>
                  </div>
                  <div className="icon-notification">
                    {!notificacao.notificacaoLida && (
                      <BsCircleFill size={12} color={'#ffb74d'} />
                    )}
                  </div>
                </ContentModal>
              ))}
            </ContentModalNotifications>
            <ContentButton modal={true}>
              <Button label="Fechar" onClick={handleCloseOrOpenNotifications} />
            </ContentButton>
          </ModalBody>
        </ModalNotification>
      </Container>
    </Content>
  );
}
