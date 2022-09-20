import { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import { Menu } from '../../../components/Menu';
import { Rodape } from '../../../components/Rodape';
import { Spacer } from '../../../components/Spacer';
import { Titulo } from '../../../components/Titulo';

import NavbarFornecedor from '../../AreaFornecedor/Layout/Navbar/index';
import NavbarConsumidor from '../../AreaConsumidor/Layout/Navbar/index';
import SidebarFornecedor from '../../AreaFornecedor/Layout/Sidebar/index';
import SidebarConsumidor from '../../AreaConsumidor/Layout/Sidebar/index';
import { Subtitulo } from './style';
import Content from './style';
import { useAuth } from '../../../contexts/auth';
import HeaderPublico from '../../AreaConsumidor/Layout/HeaderPublico';
import { FeedbackChat } from '../../../components/FeedbackChat';
import { IPessoa } from '../../../interfaces/IPessoa';
import { pessoas_api } from '../../../services/pessoas_api';

interface LayoutProps {
  titulo?: string;
  children: ReactNode;
  titleIsNotBold?: boolean;
  hinddenOportunidades?: boolean;
  subtitulo?: string;
  isConsumidor?: boolean;
}

export default function Layout({
  subtitulo,
  titulo,
  titleIsNotBold,
  children,
  hinddenOportunidades,
  isConsumidor,
}: LayoutProps) {
  const [sidebar, setSidebar] = useState(false);

  function toggleSidebar() {
    sidebar && setSidebar(!sidebar);
  }
  
  const [user, setUser] = useState({} as IPessoa);
  const [isAuthDataLoading, setIsAuthDataLoading] = useState(true);
  const [idToken, setIdToken] = useState('');


  const refreshUserData = async (ID_TOKEN: any) => {
    console.log('entrou')

    const newIdToken = localStorage.getItem(ID_TOKEN);
    
    setIdToken(newIdToken || '');
    console.log(newIdToken)
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
   
  }

  useEffect(() => {
    let local = localStorage.getItem('@Gyan:id_token')
    if(local){
      const ID_TOKEN = '@Gyan:id_token'
      refreshUserData(ID_TOKEN)
    }
    
  }, [])

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
