import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useHistory } from 'react-router';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { BiUserCircle } from 'react-icons/bi';
import {
  HeaderInfo,
  Container,
  Content,
  ContainerLogin,
  ContainerMenuMobile,
} from './style';
import Logo from '../../assets/logo.svg';
import { useAuth } from '../../contexts/auth';
import { AZUL, BRANCO, PRETO } from '../../styles/variaveis';
import { Button } from '../Form/Button';
import { IPessoa } from '../../interfaces/IPessoa';
import Image from 'next/image';
import { Router, useRouter } from 'next/router';

export function Header(): JSX.Element {
  const [esconder, setEsconder] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const { signOut } = useAuth();
  const router = useRouter();
  const [sizePage, setSizePage] = useState(0);
  let { user } = useAuth();

  if (!user) {
    user = {} as IPessoa;
  }

  function handleToggleMenu() {
    setIsMobile(prevState => !prevState);
    setMostrarMenu(prevState => !prevState);
  }

  const handleResize = (e: any) => {
    setSizePage(window.innerWidth);
  };

  useEffect(() => {
    setSizePage(window.innerWidth);
    if (window.innerWidth < 478) {
      setIsMobile(true);
    }

    if (window.innerWidth > 478) {
      setIsMobile(false);
      setMostrarMenu(false);
    }
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {!esconder && (
        <HeaderInfo>
          <div>
            <p>
              Na Gyan, seus projetos podem ser publicados gratuitamente. Não
              cobramos pela divulgação de projetos de fornecedores, ONGs e
              empresas.
            </p>
          </div>
          <FiX onClick={() => setEsconder(true)} color={BRANCO} size={12} />
        </HeaderInfo>
      )}
      {sizePage < 478 && (
        <ContainerMenuMobile>
          <FiMenu onClick={handleToggleMenu} color={AZUL} size={24} />
        </ContainerMenuMobile>
      )}

      <Container isMobile={isMobile} mostrarMenu={mostrarMenu}>
        <Content isMobile={isMobile} mostrarMenu={mostrarMenu}>
          <nav>
            <div className="content-logo">
              <Image
                src={Logo}
                className="logo"
                alt="Gyan"
                onClick={() => router.push('/')}
                width={200}
                height={50}
              />
            </div>

            <div className="menu">
              <Link href="/fornecedor/captar-projetos">Profissional</Link>

              <Link href="/consumidor/busca">Empresas</Link>
              <Link href="/consumidor/busca?voluntario=true">Voluntários</Link>

              <Link href="/login">Login</Link>

              {user?.email ? (
                <ContainerLogin>
                  <Link
                    className="link-user-login"
                    href="/fornecedor/perfil"
                    style={{
                      color: PRETO,
                    }}
                  >
                    <BiUserCircle size={24} />
                    {user.nome && (
                      <>
                        {user.nome?.indexOf('@') !== -1 && (
                          <>
                            {user.nome.replace(
                              user.nome.substring(
                                user.nome.indexOf('@'),
                                user.nome.length,
                              ),
                              '',
                            )}
                          </>
                        )}
                        {user.nome?.indexOf('@') === -1 && <>{user.nome}</>}
                      </>
                    )}
                  </Link>
                  <FiLogOut
                    onClick={() => {
                      router.push('/');
                      signOut();
                    }}
                    size={24}
                    color="#FFF"
                  />
                </ContainerLogin>
              ) : (
                <Button
                  label="CADASTRE-SE"
                  onClick={() => router.push('/cadastro-basico')}
                />
              )}
            </div>
          </nav>
        </Content>
      </Container>
    </>
  );
}
