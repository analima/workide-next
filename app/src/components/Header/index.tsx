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
  ContentMenuMobile,
  AccordionPrimary,
  AccordionSecondary,
  DropdownItem,
} from './style';
import Logo from '../../assets/logo-azul-sem-fundo.svg';
import { useAuth } from '../../contexts/auth';
import { AZUL, BRANCO, PRETO, PRETO_10 } from '../../styles/variaveis';
import { Button } from '../Form/Button';
import { IPessoa } from '../../interfaces/IPessoa';
import autoAnimate from '@formkit/auto-animate';
import Image from 'next/image';
import { Router, useRouter } from 'next/router';
import {
  Navbar,
  NavDropdown,
  Container as CC,
  Nav,
  Accordion,
} from 'react-bootstrap';
import { IoIosArrowDown } from 'react-icons/io';
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
  const [active, setActive] = useState(false);
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
        <ContentMenuMobile open={open}>
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
              <AccordionPrimary key="1" id="headingOne">
                <AccordionSecondary
                  id="headingOne"
                  eventKey="1"
                  onClick={() => {}}
                >
                  <span>Para profissionais</span>
                  <IoIosArrowDown size={20} color={PRETO_10} />
                </AccordionSecondary>

                <AccordionPrimary.Collapse eventKey="1">
                  <div className="collapse-itens">
                    <Link href="/consumidor/busca">Empresas</Link>
                    <Link href="/consumidor/busca?voluntarios=true">
                      Voluntários
                    </Link>
                    <Link href="https://blog.gyan.com.br/">
                      <a target="_blank">Blog</a>
                    </Link>
                  </div>
                </AccordionPrimary.Collapse>
              </AccordionPrimary>

              <AccordionPrimary key="1" id="headingOne">
                <AccordionSecondary
                  id="headingOne"
                  eventKey="1"
                  onClick={() => {}}
                >
                  <span>Para empresas</span>
                  <IoIosArrowDown size={20} color={PRETO_10} />
                </AccordionSecondary>

                <AccordionPrimary.Collapse eventKey="1">
                  <div className="collapse-itens">
                    <span>
                      <Link href="/consumidor/busca">Empresas</Link>
                    </span>
                    <Link href="/consumidor/busca?voluntarios=true">
                      Voluntários
                    </Link>
                    <Link href="https://blog.gyan.com.br/">
                      <a target="_blank">Blog</a>
                    </Link>
                  </div>
                </AccordionPrimary.Collapse>
              </AccordionPrimary>

              <AccordionPrimary key="1" id="headingOne">
                <AccordionSecondary
                  id="headingOne"
                  eventKey="1"
                  onClick={() => {}}
                >
                  <span>Para Ongs</span>
                  <IoIosArrowDown size={20} color={PRETO_10} />
                </AccordionSecondary>

                <AccordionPrimary.Collapse eventKey="1">
                  <div className="collapse-itens">
                    <span>
                      <Link href="/consumidor/busca">Empresas</Link>
                    </span>
                    <Link href="/consumidor/busca?voluntarios=true">
                      Voluntários
                    </Link>
                    <Link href="https://blog.gyan.com.br/">
                      <a target="_blank">Blog</a>
                    </Link>
                  </div>
                </AccordionPrimary.Collapse>
              </AccordionPrimary>

              <AccordionPrimary key="1" id="headingOne">
                <AccordionSecondary
                  id="headingOne"
                  eventKey="1"
                  onClick={() => {}}
                >
                  <Link href="https://blog.gyan.com.br/">
                    <a target="_blank">Blog</a>
                  </Link>
                </AccordionSecondary>
              </AccordionPrimary>
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
            <FiX color={AZUL} onClick={() => setOpen(false)} size={30} />
          ) : (
            <FiMenu color={AZUL} onClick={() => setOpen(true)} size={30} />
          )}
        </ContentMenuMobile>
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
                  <DropdownItem href="#action/3.1">
                    Para profissionais
                  </DropdownItem>
                  <DropdownItem href="#action/3.2">
                    Para profissionais
                  </DropdownItem>
                </NavDropdown>

                <NavDropdown title="Para empresas" id="collasible-nav-dropdown">
                  <DropdownItem href="#action/3.1">Para empresas</DropdownItem>
                  <DropdownItem href="#action/3.2">Para empresas</DropdownItem>
                </NavDropdown>

                <NavDropdown title="Para Ongs" id="collasible-nav-dropdown">
                  <DropdownItem href="#action/3.1">Para Ongs</DropdownItem>
                  <DropdownItem href="#action/3.2">Para Ongs</DropdownItem>
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
