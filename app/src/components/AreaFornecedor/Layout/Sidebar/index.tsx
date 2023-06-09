import { useState, useEffect } from 'react';
import {
  Content,
  NavItem,
  NavLink,
  Nav,
  BotaoCaptar,
  NavButton,
} from './style';
import { useAuth } from 'src/contexts/auth';
import { Dropdown as DropdownMenu } from './Dropdown';
import { useRouter } from 'next/router';

interface ISidebar {
  open: boolean;
}

export default function SidebarFornecedor({ open }: ISidebar) {
  const { user } = useAuth();
  const [display, setDisplay] = useState(open);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setDisplay(open);
    }, 400);
  }, [open]);

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
              {
                link: `/fornecedor/perfil-publico/${user.id_pessoa}`,
                descricao: 'Visualizar',
              },
            ]}
          />
        </NavItem>

        <NavItem>
          <DropdownMenu
            titulo="Atualizar Cadastro"
            itens={[
              {
                link: '/cadastro-complementar?cadastro=true&aba=0',
                descricao: 'Cadastro complementar',
                isButton: true,
              },
              {
                link: '/cadastro-complementar?cadastro=true&aba=1',
                descricao: 'Condições Gerais',
                isButton: true,
              },
              {
                link: '/cadastro-complementar?cadastro=true&aba=2',

                descricao: 'Turbine seu potencial',
                isButton: true,
              },
              {
                link: '/cadastro-complementar?cadastro=true&aba=3',
                descricao: 'Informações financeiras',
                isButton: true,
              },
            ]}
          />
        </NavItem>

        <NavItem>
          <BotaoCaptar onClick={() => router.push('captar-projetos')}>
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
            onClick={() => router.push('/turbine-seu-potencial/planos')}
          >
            Minha assinatura
          </NavButton>
        </NavItem>

        <NavItem>
          <NavButton
            onClick={() =>
              router.push('/cadastro-complementar?cadastro=true&aba=3')
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
