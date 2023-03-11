import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { BiUserCircle } from 'react-icons/bi';
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
  const { user } = useAuth();
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
              alt="workide.com"
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
            <nav className="links">
              <Link href="/fornecedor/captar-projetos">
                <a className={classCaptar}>Para profissionais</a>
              </Link>
              <Link href="/empresas/home">
                <a className={classEmpresa}>Para empresas</a>
              </Link>
              <Link href="/ongs">
                <a className={classOng}>Para Ongs</a>
              </Link>

              <Link href="https://blog.workide.com/">
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
            </nav>
          </div>

          {open ? (
            <FiX color={AZUL} onClick={() => setOpen(false)} size={30} />
          ) : (
            <FiMenu color={AZUL} onClick={() => setOpen(true)} size={30} />
          )}
        </ContentMenuMobile>
      ) : (
        <Container>
          <Image
            src={Logo}
            className="logo"
            alt="workide.com"
            onClick={() => router.push('/')}
            height={60}
            width={155}
          />
          <Content>
            <ul>
              <li>
                <Link href="/fornecedor/captar-projetos">
                  <a className={classCaptar}>Para profissionais</a>
                </Link>
              </li>
              <li>
                <Link href="/empresas/home">
                  <span className={classEmpresa}>Para empresas</span>
                </Link>
              </li>
              <li>
                <Link href="/ongs">
                  <span className={classOng}>Para Ongs</span>
                </Link>
              </li>
              <li>
                <Link href="https://blog.workide.com/">
                  <a target="_blank">Blog</a>
                </Link>
              </li>
            </ul>
            <ul>
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
            </ul>
          </Content>
        </Container>
      )}
    </>
  );
}
