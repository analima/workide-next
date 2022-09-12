import { useState, ReactNode, useEffect, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { FeedbackChat } from '../../FeedbackChat';

import { Menu } from '../../Menu';
import { Rodape } from '../../Rodape';
import { Spacer } from '../../Spacer';
import { Titulo } from '../../Titulo';
import { useAuth } from '../../../contexts/auth';
import HeaderPublico from './HeaderPublico';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Subtitulo } from './style';
import Content from './style';
import { pessoas_api } from '../../../services/pessoas_api';

interface LayoutProps {
  titulo: string;
  subtitulo?: string;
  children: ReactNode;
  activeMenu: boolean;
  maisSolucoesIsNotVisible?: boolean;
  navbarIsNotVisible?: boolean;
}

export default function Layout({
  titulo,
  subtitulo,
  children,
  activeMenu,
  maisSolucoesIsNotVisible,
  navbarIsNotVisible,
}: LayoutProps) {
  const [sidebar, setSidebar] = useState(false);
  const [dataStorage, setDataStorage] = useState(false);
  function toggleSidebar() {
    sidebar && setSidebar(!sidebar);
  }
  const { setUser, user } = useAuth();
  const [isAuthDataLoading, setIsAuthDataLoading] = useState(true);
  const [idToken, setIdToken] = useState('');

  const refreshUserData = useCallback(
    async (ID_TOKEN: any) => {
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
    },
    [setUser],
  );

  useEffect(() => {
    const local = localStorage.getItem('@Gyan:id_token');

    setDataStorage(!!local);
    if (local) {
      const ID_TOKEN = '@Gyan:id_token';
      refreshUserData(ID_TOKEN);
    }
  }, [refreshUserData]);

  return (
    <Content>
      {!dataStorage && typeof window !== 'undefined' && !user?.id_pessoa ? (
        <>
          <HeaderPublico />
          <Spacer size={60} />
        </>
      ) : (
        <>
          <Menu />

          <Spacer size={90} />
          {!navbarIsNotVisible && (
            <Navbar
              toggleSidebar={() => setSidebar(!sidebar)}
              activeMenu={activeMenu}
              maisSolucoesIsNotVisible={maisSolucoesIsNotVisible}
            />
          )}
        </>
      )}
      {activeMenu && <Sidebar open={sidebar} />}
      <Container onClick={toggleSidebar}>
        <Spacer size={user?.id_pessoa ? 10 : 90} />
        <Subtitulo>{subtitulo}</Subtitulo>
        <Titulo titulo={titulo} />
        {children}
      </Container>
      <Spacer size={150} />
      <Rodape />
      <FeedbackChat />
    </Content>
  );
}
