import { NavItem, Nav, NavLink } from './style';
import Content from './style';
import DropdownMenu from './Dropdown';
import { useAuth } from '../../../../contexts/auth';
import { IPessoa } from '../../../../interfaces/IPessoa';

interface ISidebar {
  open: boolean;
}

export default function SidebarConsumidor({ open }: ISidebar) {
  const { user } = useAuth();

  return (
    <Content open={open}>
      <Nav>
        <NavItem>
          <DropdownMenu
            titulo="Meu perfil"
            itens={[
              {
                link: `/contratante/perfil-publico?apelido=${user.nome_tratamento}`,
                descricao: `Visualizar`,
              },
            ]}
          />
        </NavItem>
        <NavItem>
          <DropdownMenu
            titulo="Atualizar Cadastro"
            itens={[
              {
                link: '/cadastro-complementar?cadastro=true&aba=0&consumidor=true',
                descricao: 'Informações Pessoais',
                isButton: true,
              },
              {
                link: '/cadastro-complementar?cadastro=true&aba=3&consumidor=true',
                descricao: 'Informações financeiras',
                isButton: true,
              },
            ]}
          />
        </NavItem>
        <NavItem>
          <NavLink href="/contratante/minhas-compras">Minhas Compras</NavLink>
        </NavItem>
        <NavItem>
          <div className="em-breve">
            <NavLink>Financeiro</NavLink>
            <span>EM BREVE</span>
          </div>
        </NavItem>
        <NavItem>
          <DropdownMenu
            titulo="Suporte"
            itens={[
              {
                link: '/FAQ#isContratante',
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
                link: '/opcoes-conta#isContratante',
                descricao: 'Alterar Senha',
              },
              {
                link: '/opcoes-conta#isContratante',
                descricao: 'Excluir Conta',
              },
            ]}
          />
        </NavItem>
      </Nav>
    </Content>
  );
}
