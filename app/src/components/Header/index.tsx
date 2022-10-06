import { useEffect, useRef, useState } from 'react';
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
  TT,
} from './style';
import Logo from '../../assets/logo-azul-sem-fundo.svg';
import { useAuth } from '../../contexts/auth';
import { AZUL, BRANCO, PRETO } from '../../styles/variaveis';
import { Button } from '../Form/Button';
import { IPessoa } from '../../interfaces/IPessoa';
import autoAnimate from '@formkit/auto-animate';
import Image from 'next/image';
import { Router, useRouter } from 'next/router';
import { Navbar, NavDropdown, Container as CC, Nav } from 'react-bootstrap';
interface IProps {
  esconderMsg?: boolean;
}

export function Header({ esconderMsg }: IProps): JSX.Element {
  const [esconder, setEsconder] = useState(false);
  const parent = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const { signOut } = useAuth();
  const router = useRouter();
  const [sizePage, setSizePage] = useState(0);

  const [user, setUser] = useState({} as IPessoa);
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
    let local = localStorage.getItem('@Freelas.town:id_token');
    if (local) {
      const ID_TOKEN = '@Freelas.town:id_token';
      refreshUserData(ID_TOKEN);
    }
  }, []);

  const handleResize = (e: any) => {
    setSizePage(window.innerWidth);
  };

  useEffect(() => {
    setSizePage(window.innerWidth);

    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (esconderMsg) setEsconder(true);
  }, [esconderMsg]);

  return (
    <>
      {!esconder && (
        <HeaderInfo>
          <div>
            <p>
              A Freelas.town une profissionais freelancer e voluntários em uma
              única plataforma. Contratação rápida, gratuita e segura.
              Programadores, web designers, redatores e o que mais você precisar
              para o seu negócio.
            </p>
          </div>
          <FiX onClick={() => setEsconder(true)} color={BRANCO} size={12} />
        </HeaderInfo>
      )}

      {sizePage < 991 ? (
        <TT open={open}>
          <div className="content-logo">
            <Image
              src={Logo}
              className="logo"
              alt="Freelas.town"
              onClick={() => router.push('/')}
              width={120}
              height={47}
            />
          </div>

          <div ref={parent} className="items">
            <div className="content-logo-mobile">
              <Image
                src={Logo}
                className="logo"
                alt="Freelas.town"
                onClick={() => router.push('/')}
                width={120}
                height={47}
              />
            </div>
            <div className="links">
              <Link href="/fornecedor/captar-projetos">Freelancers</Link>

              <Link href="/consumidor/busca">Empresas</Link>
              <Link href="/consumidor/busca?voluntarios=true">Voluntários</Link>
              <Link href="https://blog.gyan.com.br/">
                <a target="_blank">Blog</a>
              </Link>
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
          </div>

          {open ? (
            <FiX onClick={() => setOpen(false)} size={30} />
          ) : (
            <FiMenu onClick={() => setOpen(true)} size={30} />
          )}
        </TT>
      ) : (
        <Container>
          <Content>
            <nav>
              <div className="content-logo">
                <Image
                  src={Logo}
                  className="logo"
                  alt="Freelas.town"
                  onClick={() => router.push('/')}
                  width={120}
                  height={47}
                />

                <NavDropdown
                  title=" Para profissionais"
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href="#action/3.1">
                    Para profissionais
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Para profissionais
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Para empresas" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    Para empresas
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Para empresas
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Para Ongs" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    Para Ongs
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Para Ongs
                  </NavDropdown.Item>
                </NavDropdown>

                <Link href="https://blog.gyan.com.br/">
                  <a target="_blank">Blog</a>
                </Link>
              </div>

              <div className="menu">
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
                      {user.nome_tratamento}
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
      )}
    </>
  );
}
