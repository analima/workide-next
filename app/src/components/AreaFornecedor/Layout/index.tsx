import { useState } from 'react';
import { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import { Menu } from '../../../components/Menu';
import { Spacer } from '../../../components/Spacer';
import { Titulo } from '../../../components/Titulo';

import NavbarFornecedor from '../../AreaFornecedor/Layout/Navbar/index';
import NavbarConsumidor from '../../AreaConsumidor/Layout/Navbar/index';
import SidebarConsumidor from '../../AreaConsumidor/Layout/Sidebar/index';
import { Subtitulo } from './style';
import Content from './style';
import { useAuth } from '../../../contexts/auth';
import { FeedbackChat } from '../../../components/FeedbackChat';
import { Header } from 'src/components/Header';
import { Footer } from 'src/components/Footer';
import { useInformacoesTipoUsuario } from 'src/hooks/informacoesTipoUsuario';
import { Sidebar as SidebarFornecedor } from './Sidebar';

interface LayoutProps {
  titulo?: string;
  children: ReactNode;
  titleIsNotBold?: boolean;
  hinddenOportunidades?: boolean;
  subtitulo?: string;
  isConsumidor?: boolean;
  versao?: string;
}

export default function Layout({
  subtitulo,
  titulo,
  titleIsNotBold,
  children,
  hinddenOportunidades,
  isConsumidor,
  versao,
}: LayoutProps) {
  const [sidebar, setSidebar] = useState(false);
  const { user } = useAuth();
  const { typeSelected } = useInformacoesTipoUsuario();

  function toggleSidebar() {
    sidebar && setSidebar(!sidebar);
  }

  return (
    <Content>
      {!user?.id_pessoa ? (
        <>
          <Header />
        </>
      ) : (
        <>
          <Menu />
          <Spacer size={90} />
          {isConsumidor || typeSelected === 'CONTRATANTE' ? (
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
          {isConsumidor || typeSelected === 'CONTRATANTE' ? (
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
      <Footer versao={versao} />
      <FeedbackChat />
    </Content>
  );
}
