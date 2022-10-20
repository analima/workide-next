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
} from './style';
import Logo from '../../assets/logo-azul-sem-fundo.svg';
import { useAuth } from '../../contexts/auth';
import { AZUL, BRANCO, PRETO } from '../../styles/variaveis';
import { Button } from '../Form/Button';
import { IPessoa } from '../../interfaces/IPessoa';
import autoAnimate from '@formkit/auto-animate';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface IProps {
  esconderMsg?: boolean;
}

export function Header({ esconderMsg }: IProps): JSX.Element {
  const [esconder, setEsconder] = useState(false);
  const parent = useRef(null);
  const [open, setOpen] = useState(false);
  const { route } = useRouter();
  const [classEmpresa, setClassEmpresa] = useState('');
  const [classOng, setClassOng] = useState('');
  const [classCaptar, setClassCaptar] = useState('');

  useEffect(() => {
    if (route === '/empresas/home') setClassEmpresa('empresas');
    if (route === '/ongs') setClassOng('ongs');
    if (route === '/fornecedor/captar-projetos')
      setClassCaptar('captar-projetos');

    parent.current && autoAnimate(parent.current);
  }, [parent, route]);

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
    let local = localStorage.getItem('@freelas_town:id_token');
    if (local) {
      const ID_TOKEN = '@freelas_town:id_token';
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
              A freelas_town une profissionais freelancer e voluntários em uma
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
                alt="freelas_town"
                onClick={() => router.push('/')}
                width={120}
                height={47}
              />
            </div>
            <div className="links">
              <Link href="/fornecedor/captar-projetos">
                <span className={classCaptar}>Para profissionais</span>
              </Link>
              <Link href="/empresas/home">
                <span className={classEmpresa}>Para empresas</span>
              </Link>
              <Link href="/ongs">
                <span className={classOng}>Para Ongs</span>
              </Link>

              <Link href="https://blog.freelas.town/">
                <a target="_blank">Blog</a>
              </Link>
              {!user?.email && <Link href="/login">Login</Link>}

              {user?.email ? (
                <ContainerLogin>
                  <Link
                    href={
                      user.tipoPerfil === 'CONSUMIDOR'
                        ? '/contratante/home'
                        : '/fornecedor/home'
                    }
                    style={{
                      color: PRETO,
                    }}
                  >
                    <span className="link-user-login">
                      {user.nome_tratamento}
                    </span>
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
                <div className="content-btn">
                  <Button
                    label={
                      classEmpresa !== 'empresas'
                        ? 'CADASTRE-SE'
                        : 'PUBLICAR PROJETO'
                    }
                    onClick={() => router.push('/cadastro-basico')}
                  />
                </div>
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
                  height={60}
                />

                <Link href="/fornecedor/captar-projetos">
                  <span className={classCaptar}>Para profissionais</span>
                </Link>
                <Link href="/empresas/home">
                  <span className={classEmpresa}>Para empresas</span>
                </Link>
                <Link href="/ongs">
                  <span className={classOng}>Para Ongs</span>
                </Link>

                <Link href="https://blog.freelas.town/">
                  <a target="_blank">Blog</a>
                </Link>
              </div>

              <div className="menu">
                {!user?.email && <Link href="/login">Login</Link>}

                {user?.email ? (
                  <ContainerLogin>
                    <Link
                      href={
                        user.tipoPerfil === 'CONSUMIDOR'
                          ? '/contratante/home'
                          : '/fornecedor/home'
                      }
                      style={{
                        color: PRETO,
                      }}
                    >
                      <>
                        <BiUserCircle size={24} color={AZUL} />
                        <span className="link-user-login">
                          {user.nome_tratamento}
                        </span>
                      </>
                    </Link>

                    <FiLogOut
                      color={AZUL}
                      onClick={() => {
                        router.push('/');
                        signOut();
                      }}
                      size={24}
                    />
                  </ContainerLogin>
                ) : (
                  <Button
                    label={
                      classEmpresa !== 'empresas'
                        ? 'CADASTRE-SE'
                        : 'PUBLICAR PROJETO'
                    }
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
