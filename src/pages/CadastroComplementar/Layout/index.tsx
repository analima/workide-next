import { useState, ReactNode } from 'react';
import { Container } from 'react-bootstrap';

import { Spacer } from '../../../components/Spacer';

import Navbar from './Navbar';
import SidebarConsumidor from '../../../pages/AreaConsumidor/Layout/Sidebar/index';
import SidebarFornecedor from '../../../pages/AreaFornecedor/Layout/Sidebar/index';
import Content from './style';

interface LayoutProps {
  titulo?: string;
  children: ReactNode;
  active: boolean;
  isConsumidor?: boolean;
}

export default function Layout({
  titulo,
  children,
  active,
  isConsumidor,
}: LayoutProps) {
  const [sidebar, setSidebar] = useState(false);
  function toggleSidebar() {
    sidebar && setSidebar(!sidebar);
  }

  return (
    <Content>
      {active && (
        <>
          <Navbar
            toggleSidebar={() => setSidebar(!sidebar)}
            isConsumidor={isConsumidor}
          />
          {isConsumidor ? (
            <SidebarConsumidor open={sidebar} />
          ) : (
            <SidebarFornecedor open={sidebar} />
          )}
        </>
      )}
      <Container onClick={toggleSidebar}>
        <Spacer size={90} />
        {children}
      </Container>
      <Spacer size={150} />
    </Content>
  );
}
