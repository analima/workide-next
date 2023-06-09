import { useState, ReactNode, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { FeedbackChat } from '../../FeedbackChat';
import { Menu } from '../../Menu';
import { Spacer } from '../../Spacer';
import { Titulo } from '../../Titulo';
import { ID_TOKEN } from '../../../contexts/auth';
import { IPessoa } from '../../../interfaces/IPessoa';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Subtitulo } from './style';
import Content from './style';
import { pessoas_api } from '../../../services/pessoas_api';
import { Header } from 'src/components/Header';
import { Footer } from 'src/components/Footer';

interface LayoutProps {
  titulo: string;
  subtitulo?: string;
  children: ReactNode;
  activeMenu: boolean;
  maisSolucoesIsNotVisible?: boolean;
  navbarIsNotVisible?: boolean;
  versao?: string;
}

export default function Layout({
  titulo,
  subtitulo,
  children,
  activeMenu,
  maisSolucoesIsNotVisible,
  navbarIsNotVisible,
  versao,
}: LayoutProps) {
  const [sidebar, setSidebar] = useState(false);

  function toggleSidebar() {
    sidebar && setSidebar(!sidebar);
  }

  const [user, setUser] = useState({} as IPessoa);

  const refreshUserData = async (ID_TOKEN: any) => {
    const newIdToken = localStorage.getItem(ID_TOKEN);
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
    let local = localStorage.getItem('@freelas_town:id_token');
    if (local) {
      const ID_TOKEN = '@freelas_town:id_token';
      refreshUserData(ID_TOKEN);
    }
  }, []);

  return (
    <Content>
      {localStorage.getItem(ID_TOKEN) ? (
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
      ) : (
        <>
          <Header />
        </>
      )}
      {activeMenu && <Sidebar open={sidebar} />}
      <Container onClick={toggleSidebar}>
        <Spacer size={user.id_pessoa ? 10 : 90} />
        <Subtitulo>{subtitulo}</Subtitulo>
        <Titulo titulo={titulo} />
        {children}
      </Container>
      <Spacer size={150} />
      <Footer versao={versao} />
      <FeedbackChat />
    </Content>
  );
}
