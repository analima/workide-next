import { useState, useEffect } from 'react';
import {
  NavItem,
  NavLink,
  Nav,
  BotaoCaptar,
  NavButton,
} from './style';
import Content from './style';
import { useAuth } from '../../../../contexts/auth';
import { useHistory } from 'react-router-dom';
import { IPessoa } from '../../../../interfaces/IPessoa';
import { pessoas_api } from '../../../../services/pessoas_api';

import DropdownMenu from './Dropdown';

interface ISidebar {
  open: boolean;
}

export default function Sidebar({ open }: ISidebar) {
 
  const [display, setDisplay] = useState(open);
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      setDisplay(open);
    }, 400);
  }, [open]);

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
    <Content open={open} display={display}>
      <Nav>
        <NavItem>
          <DropdownMenu
            titulo="Meu perfil"
            itens={[
              {
                link: '#',
                descricao: `Completo em ${user.percentageRegisterProvider}%`,
                onClick: true,
              },
              { link: '/fornecedor/perfil', descricao: 'Visualizar' },
            ]}
          />
        </NavItem>

        <NavItem>
          <DropdownMenu
            titulo="Atualizar Cadastro"
            itens={[
              {
                link: '/cadastro-complementar',
                descricao: 'Cadastro complementar',
                isButton: true,
                props: { cadastroCompleto: true, selectAba: 0 },
              },
              {
                link: '/cadastro-complementar',
                descricao: 'Condições Gerais',
                isButton: true,
                props: { cadastroCompleto: true, selectAba: 1 },
              },
              {
                link: '/cadastro-complementar',
                descricao: 'Turbine seu potencial',
                isButton: true,
                props: { cadastroCompleto: true, selectAba: 2 },
              },
              {
                link: '/cadastro-complementar',
                descricao: 'Informações financeiras',
                isButton: true,
                props: { cadastroCompleto: true, selectAba: 3 },
              },
            ]}
          />
        </NavItem>

        <NavItem>
          <BotaoCaptar onClick={() => history.push('captar-projetos')}>
            BUSCAR
          </BotaoCaptar>
          <DropdownMenu
            titulo="Projetos"
            itens={[
              { link: '/fornecedor/meus-projetos', descricao: 'Meus projetos' },
            ]}
          />
        </NavItem>

        <NavItem>
          <NavLink href="/fornecedor/meus-servicos">Minhas Ofertas</NavLink>
        </NavItem>

        <NavItem>
          <DropdownMenu
            titulo="Dashboard"
            itens={[
              { link: '/fornecedor/dashboard', descricao: 'Contadores' },
              { link: '/fornecedor/meus-ganhos', descricao: 'Meus ganhos' },
            ]}
          />
        </NavItem>

        <NavItem>
          <DropdownMenu
            titulo="Reputação"
            itens={[
              {
                link: '/minhas-recomendacoes',
                descricao: 'Minhas recomendações',
              },
            ]}
          />
        </NavItem>
        <NavItem>
          <NavButton
            onClick={() => history.push('/turbine-seu-potencial/planos')}
          >
            Minha assinatura
          </NavButton>
        </NavItem>

        <NavItem>
          <NavButton
            onClick={() =>
              history.push('/cadastro-complementar', {
                cadastroCompleto: true,
                selectAba: 3,
              })
            }
          >
            Minha Carteira
          </NavButton>
        </NavItem>
        <NavItem>
          <DropdownMenu
            titulo="Suporte"
            itens={[
              { link: '/faq', descricao: 'FAQ - Perguntas e Respostas' },
              {
                link: 'https://api.whatsapp.com/send/?phone=55061991053691&text=Tenho interesse em conhecer o produto',
                descricao: 'Fale Conosco',
              },
              {
                link: '/termos-de-uso',
                descricao: `Termos de uso`,
              },
              {
                link: '/politicas-de-privacidade',
                descricao: `Politicas de privacidade`,
              },
              {
                link: '/politicas-de-cookies',
                descricao: `Politicas de Cookies`,
              },
            ]}
          />
        </NavItem>

        <NavItem>
          <DropdownMenu
            titulo="Opções de Conta"
            itens={[
              { link: '/opcoes-conta', descricao: 'Bloqueio de conta' },
              { link: '/opcoes-conta', descricao: 'Alterar Senha' },
              { link: '/opcoes-conta', descricao: 'Excluir Conta' },
            ]}
          />
        </NavItem>
      </Nav>
    </Content>
  );
}
