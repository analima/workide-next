import { Content, NavItem, Nav, NavLink } from './style';

import { Dropdown as DropdownMenu } from './Dropdown';
import { useAuth } from '../../../../contexts/auth';
import { IPessoa } from '../../../../interfaces/IPessoa';

interface ISidebar {
  open: boolean;
}

export function Sidebar({ open }: ISidebar) {
  let { user } = useAuth();
  if(!user){
    user = {} as IPessoa;
  }

  return (
    <Content open={open}>
      <Nav>
        <NavItem>
          <DropdownMenu
            titulo="Meu perfil"
            itens={[
              {
                link: '/consumidor/perfil-publico',
                descricao: `Visualizar`,
              },
              {
                link: '#',
                descricao: `Completo em ${user.percentageRegisterConsumer}%`,
                isShowCadastro: true,
              },
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
                props: {
                  cadastroCompleto: true,
                  selectAba: 0,
                  isConsumidor: true,
                },
              },
              {
                link: '/cadastro-complementar',
                descricao: 'Condições Gerais',
                isButton: true,
                props: {
                  cadastroCompleto: true,
                  selectAba: 1,
                  isConsumidor: true,
                },
              },
              {
                link: '/cadastro-complementar',
                descricao: 'Informações financeiras',
                isButton: true,
                props: {
                  cadastroCompleto: true,
                  selectAba: 3,
                  isConsumidor: true,
                },
              },
            ]}
          />
        </NavItem>
        <NavItem>
          <NavLink href="/consumidor/minhas-compras">Minhas Compras</NavLink>
        </NavItem>

        <NavItem>
          <DropdownMenu
            titulo="Suporte"
            itens={[
              {
                link: '/FAQ#isConsumidor',
                descricao: 'FAQ - Perguntas e Respostas',
              },
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
              {
                link: '/opcoes-conta#isConsumidor',
                descricao: 'Alterar Senha',
              },
              {
                link: '/opcoes-conta#isConsumidor',
                descricao: 'Excluir Conta',
              },
            ]}
          />
        </NavItem>
      </Nav>
    </Content>
  );
}
