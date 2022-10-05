import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { BiUserCircle } from 'react-icons/bi';
import { pessoas_api } from '../../services/pessoas_api';
import {
  HeaderInfo,
  Container,
  Content,
  ContainerLogin,
  ContainerMenuMobile,
} from './style';
import Logo from '../../assets/logo-azul-sem-fundo.svg';
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

  const [user, setUser] = useState({} as IPessoa);
  const [isAuthDataLoading, setIsAuthDataLoading] = useState(true);
  const [idToken, setIdToken] = useState('');

  const refreshUserData = async (ID_TOKEN: any) => {
    const newIdToken = localStorage.getItem(ID_TOKEN);
    setIdToken(newIdToken || '');
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
  };

  useEffect(() => {
    //NewAuth()
    let local = localStorage.getItem('@freelas_town:id_token');
    if (local) {
      const ID_TOKEN = '@freelas_town:id_token';
      refreshUserData(ID_TOKEN);
    }
  }, []);

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
              A freelas_town une profissionais freelancer e voluntários em uma
              única plataforma. Contratação rápida, gratuita e segura.
              Programadores, web designers, redatores e o que mais você precisar
              para o seu negócio.
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
                alt="freelas_town"
                onClick={() => router.push('/')}
                width={200}
                height={50}
              />
            </div>

            <div className="menu">
              <Link href="https://blog.gyan.com.br/">
                <a target="_blank">Blog</a>
              </Link>
              <Link href="/fornecedor/captar-projetos">Freelancers</Link>

              <Link href="/consumidor/busca">Empresas</Link>
              <Link href="/consumidor/busca?voluntarios=true">Voluntários</Link>

              {!user?.email && <Link href="/login">Login</Link>}

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
                    {/* {user.nome && (
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
                    )} */}
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
