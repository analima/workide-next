import { FiMenu, FiBell } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import {
  AcaoBell,
  ButtonNotifications,
  ContainerHeader,
  ContentButton,
  ContentModal,
  ContentModalNotifications,
  ContentNotifications,
  ContentSession,
  GhostButton,
  ModalNotification,
  Notification,
  TitleNotification,
} from './style';
import Content from './style';
import Home from '../../../../assets/House.svg';
import { Dropdown, ModalBody } from 'react-bootstrap';
import { Titulo } from '../../../../components/Titulo';
import { AZUL, CINZA_40 } from '../../../../styles/variaveis';
import { BsCircleFill } from 'react-icons/bs';
import { useAuth } from '../../../../contexts/auth';
import { useCallback, useEffect, useState } from 'react';
import { notificacoes_api } from '../../../../services/notificacoes_api';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Button } from '../../../../components/Form/Button';
import { useGAEventsTracker } from '../../../../hooks/useGAEventsTracker';

interface INavbar {
  toggleSidebar: () => void;
  isConsumidor?: boolean;
}

interface INotification {
  data_hora_criacao: string;
  data_hora_ultima_alteracao: string;
  idNotificacao: number;
  idPessoa: number;
  idPessoaNotificacao: number;
  notificacaoLida: boolean;
  parsedNotificacao: string;
}

export default function Navbar({ toggleSidebar, isConsumidor }: INavbar) {
  const history = useHistory();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0);
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const GAEventsTracker = useGAEventsTracker('Notificações');

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
    async (id: number) => {
      await notificacoes_api.put(`/notificacao/${user.id_pessoa}/${id}`, {
        notificacao_lida: true,
      });
      loadNotifications();
    },
    [loadNotifications, user.id_pessoa],
  );

  return (
    <Content isConsumidor={isConsumidor}>
      <div className="icones">
        <FiMenu onClick={toggleSidebar} />

        <Link to={isConsumidor ? '/contratante/home' : '/fornecedor/home'}>
          <Home className="fi-icon-home" />
        </Link>
      </div>

      <ContentSession>
        <GhostButton
          onClick={() => {
            isConsumidor
              ? history.push('/contratante/busca')
              : history.push('/fornecedor/captar-projetos');
          }}
        >
          {isConsumidor ? 'BUSCAR SOLUÇÕES' : 'BUSCAR OPORTUNIDADES'}
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
              <button
                className="icon-button"
                onClick={() => {
                  GAEventsTracker('Notificações', 'Verificando notificações');
                }}
              >
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
                <ContentButton modal={false}>
                  <ButtonNotifications
                    onClick={() => handleCloseOrOpenNotifications()}
                  >
                    Ver todas as notificações
                  </ButtonNotifications>
                </ContentButton>
              </ContainerHeader>
              {notifications.length > 0 ? (
                <ContentNotifications>
                  {notifications.map(notificacao => (
                    <Dropdown.Item
                      onClick={() =>
                        handleNotification(notificacao.idPessoaNotificacao)
                      }
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
                onClick={() =>
                  handleNotification(notificacao.idPessoaNotificacao)
                }
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
                {notificacao.notificacaoLida && (
                  <BsCircleFill size={12} color={'#ffb74d'} />
                )}
              </ContentModal>
            ))}
          </ContentModalNotifications>
          <ContentButton modal={true}>
            <Button label="Fechar" onClick={handleCloseOrOpenNotifications} />
          </ContentButton>
        </ModalBody>
      </ModalNotification>
    </Content>
  );
}
