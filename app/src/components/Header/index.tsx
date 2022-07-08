import { useEffect, useState } from 'react';
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
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

export function Header(): JSX.Element {
  const history = useHistory();
  const [esconder, setEsconder] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const { user, signOut } = useAuth();
  const [sizePage, setSizePage] = useState(0);
  const router = useRouter();

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
            <div>
              <Image
                src={Logo}
                className="logo"
                alt="Gyan"
                onClick={() => router.push('/')}
              />
            </div>

            <div className="menu">
              <Link href="/fornecedor/captar-projetos">Fornecedores</Link>

              <Link href="/consumidor/busca">Empresas</Link>
              <Link href="/consumidor/busca?voluntario=true">Voluntários</Link>

              <Link href="/login" onClick={handleToggleMenu}>
                Login
              </Link>

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
                      history.push('/');
                      signOut();
                    }}
                    size={24}
                    color="#FFF"
                  />
                </ContainerLogin>
              ) : (
                <Button
                  label="CADASTRE-SE"
                  onClick={() =>
                    history.push('/cadastro-basico', { noRedirect: true })
                  }
                />
              )}
            </div>
          </nav>
        </Content>
      </Container>
    </>
  );
}
