import { useCallback, useEffect, useState } from 'react';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { useAuth } from '../../../../contexts/auth';
import { Link } from 'react-router-dom';
import { ReactComponent as Home } from '../../../../assets/House.svg';
import { Container, Dropdown, ModalBody } from 'react-bootstrap';
import { BsCircleFill } from 'react-icons/bs';
import { CINZA_40, VERDE } from '../../../../styles/variaveis';
import { Titulo } from '../../../../components/Titulo';
import { Button } from '../../../../components/Form/Button';
import { notificacoes_api } from '../../../../services/notificacoes_api';
import { FiBell, FiMenu } from 'react-icons/fi';
import {
  Content,
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

interface INavbar {
  toggleSidebar: () => void;
  activeMenu: boolean;
  maisSolucoesIsNotVisible?: boolean;
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

export function Navbar({
  toggleSidebar,
  activeMenu,
  maisSolucoesIsNotVisible,
}: INavbar) {
  const { user, refreshUserData } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0);

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

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const handleReadNotificationFromIdPessoa = useCallback(
    async (idPessoa: number) => {
      notificacoes_api.patch(`/notificacao/${idPessoa}`);
      setUnreadNotifications(0);
      loadNotifications();
    },
    [loadNotifications],
  );

  const handleCloseOrOpenNotifications = useCallback(async () => {
    setShowModal(oldShowModal => {
      const newShowModal = !oldShowModal;
      return newShowModal;
    });
  }, []);

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

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  return (
    <Content>
      <Container>
        <div className="icones">
          {activeMenu && <FiMenu onClick={toggleSidebar} />}

          <Link to="/consumidor/home">
            <Home />
          </Link>
        </div>

        <ContentSession>
          <GhostButton
            to="/consumidor/busca"
            opacity={maisSolucoesIsNotVisible ? 0 : 1}
          >
            BUSCAR SOLUÇÕES
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
                        key={notificacao.idPessoaNotificacao}
                        onClick={() => handleNotification(notificacao)}
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
                      cor={VERDE}
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
                  key={notificacao.idPessoaNotificacao}
                  onClick={() => handleNotification(notificacao)}
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
