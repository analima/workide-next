import { useState, ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import { FeedbackChat } from '../../../components/FeedbackChat';

import { Menu } from '../../../components/Menu';
import { Rodape } from '../../../components/Rodape';
import { Spacer } from '../../../components/Spacer';
import { Titulo } from '../../../components/Titulo';
import { useAuth } from '../../../contexts/auth';
import { HeaderPublico } from './HeaderPublico';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Content, Subtitulo } from './style';

interface LayoutProps {
  titulo: string;
  subtitulo?: string;
  children: ReactNode;
  activeMenu: boolean;
  maisSolucoesIsNotVisible?: boolean;
  navbarIsNotVisible?: boolean;
}

export function Layout({
  titulo,
  subtitulo,
  children,
  activeMenu,
  maisSolucoesIsNotVisible,
  navbarIsNotVisible,
}: LayoutProps) {
  const [sidebar, setSidebar] = useState(false);

  function toggleSidebar() {
    sidebar && setSidebar(!sidebar);
  }

  const { user } = useAuth();

  return (
    <Content>
      {!user.id_pessoa ? (
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
        <Spacer size={user.id_pessoa ? 10 : 90} />
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
