import { useState } from 'react';
import { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import { Menu } from '../../../components/Menu';
import { Rodape } from '../../../components/Rodape';
import { Spacer } from '../../../components/Spacer';
import { Titulo } from '../../../components/Titulo';

import { Navbar as NavbarFornecedor } from '../../AreaFornecedor/Layout/Navbar/index';
import { Navbar as NavbarConsumidor } from '../../AreaConsumidor/Layout/Navbar/index';
import { Sidebar as SidebarFornecedor } from '../../AreaFornecedor/Layout/Sidebar/index';
import { Sidebar as SidebarConsumidor } from '../../AreaConsumidor/Layout/Sidebar/index';
import { Content, Subtitulo } from './style';
import { useAuth } from '../../../contexts/auth';
import { HeaderPublico } from '../../AreaConsumidor/Layout/HeaderPublico';
import { FeedbackChat } from '../../../components/FeedbackChat';
import { IPessoa } from '../../../interfaces/IPessoa';

interface LayoutProps {
  titulo?: string;
  children: ReactNode;
  titleIsNotBold?: boolean;
  hinddenOportunidades?: boolean;
  subtitulo?: string;
  isConsumidor?: boolean;
}

export function Layout({
  subtitulo,
  titulo,
  titleIsNotBold,
  children,
  hinddenOportunidades,
  isConsumidor,
}: LayoutProps) {
  const [sidebar, setSidebar] = useState(false);
  let { user } = useAuth();
  
  if(!user){
    user = {} as IPessoa;
  }

  function toggleSidebar() {
    sidebar && setSidebar(!sidebar);
  }

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
          {isConsumidor ? (
            <NavbarConsumidor
              activeMenu={true}
              toggleSidebar={() => setSidebar(!sidebar)}
              maisSolucoesIsNotVisible={hinddenOportunidades}
            />
          ) : (
            <NavbarFornecedor
              toggleSidebar={() => setSidebar(!sidebar)}
              hinddenOportunidades={hinddenOportunidades}
            />
          )}
          {isConsumidor ? (
            <SidebarConsumidor open={sidebar} />
          ) : (
            <SidebarFornecedor open={sidebar} />
          )}
        </>
      )}
      <Container onClick={toggleSidebar}>
        <Spacer size={90} />
        <Subtitulo>{subtitulo}</Subtitulo>
        <Titulo titulo={titulo} negrito={!titleIsNotBold} />
        {children}
      </Container>
      <Spacer size={150} />
      <Rodape />
      <FeedbackChat />
    </Content>
  );
}
