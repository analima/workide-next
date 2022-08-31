import { Container, Nav, Navbar } from 'react-bootstrap';
import Image from 'next/image'
import userIcon from '../../assets/user_circle.svg';
import separator from '../../assets/separador.svg';
import logOutIcon from '../../assets/logout.svg';
import  Center  from '../../assets/center.svg';
import separador from '../../assets/separador.svg';
import Logo from '../../assets/logo.svg';

import { NavCustom, ButtonToggle, NavLink } from './style';
import { CadastroBasico } from '../CadastroBasico';
import { useHistory } from 'react-router-dom';
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react';
import { ModalCentralMenu } from '../ModalCentralMenu';
import { useValorProjetoPago } from '../../contexts/valorProjetoPago';
import { useAuth } from '../../contexts/auth';
import { IPessoa } from 'src/interfaces/IPessoa';
import { pessoas_api } from '../../services/pessoas_api';

export function Menu({
  hiddenCenterMenu,
  hiddenBackground,
}: {
  hiddenCenterMenu?: boolean;
  hiddenBackground?: boolean;
}) {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [displayOfOverlay, setdisplayOfOverlay] = useState('none');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sizePage, setSizePage] = useState(0);

  const { signOut } = useAuth();
  const history = useHistory();
  const router = useRouter();
  const background = 'transparent';
  const [name, setName] = useState('');
  const { apagarLocalStorage } = useValorProjetoPago();
  
  const [user, setUser] = useState({} as IPessoa);
  const [isAuthDataLoading, setIsAuthDataLoading] = useState(true);
  const [idToken, setIdToken] = useState('');

  const refreshUserData = async (ID_TOKEN: any) => {
    console.log('entrou')
    const newIdToken = localStorage.getItem(ID_TOKEN);
    setIdToken(newIdToken || '');
    console.log(newIdToken)
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
   
  }

  useEffect(() => {
    let local = localStorage.getItem('@Gyan:id_token')
    if(local){
      const ID_TOKEN = '@Gyan:id_token'
      refreshUserData(ID_TOKEN)
    }
    
  }, [])

  const handleResize = (e: any) => {
    setSizePage(window.innerWidth);
  };

  useEffect(() => {
    setSizePage(window.innerWidth);
    window.addEventListener('resize', handleResize);
  }, []);

  function smoothscroll() {
    var currentScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.scrollTo(0, currentScroll - currentScroll);
    }
  }

  useEffect(() => {
    if (user.nome) {
      if (user.nome.indexOf('@') !== -1) {
        const nome = user.nome.replace(
          user.nome.substring(user.nome.indexOf('@'), user.nome.length),
          '',
        );
        setName(nome);
      } else {
        setName(user.nome);
      }
    }
  }, [user]);

  const handleShowOverlay = () => {
    if (displayOfOverlay === 'none') {
      setdisplayOfOverlay('flex');
      setTimeout(() => {
        setShowRegisterForm(!showRegisterForm);
      }, 200);
    } else if (displayOfOverlay === 'flex') {
      setShowRegisterForm(!showRegisterForm);
      setTimeout(() => {
        setdisplayOfOverlay('none');
      }, 700);
    }
    smoothscroll();
  };

  function handleScrollTo(
    link: 'find-solution' | 'who-we-are' | 'how-it-works',
  ) {
    if (link === 'find-solution') {
      router.push(`/#find-solution`);
    } else if (link === 'who-we-are') {
      router.push(`/#who-we-are`);
    } else if (link === 'how-it-works') {
      router.push(`/#how-it-works`);
    }
  }

  return (
    <>
      <NavCustom hiddenBackground={hiddenBackground} className={background}>
        <CadastroBasico
          isActive={showRegisterForm}
          display={displayOfOverlay}
          handleShowOverlay={handleShowOverlay}
        />

        <ModalCentralMenu showModal={showModal} setShowModal={setShowModal} />
        <Navbar expand="md">
          <Container className="nav-container">
            <Navbar.Brand
              className="logo"
              onClick={() => router.push('/')}
            >
              <Image src={Logo} alt="Gyan" />
            </Navbar.Brand>

            {!user.visitante && user.email && !hiddenCenterMenu && (
              <Image src={Center}className="icone-center"
              onClick={() => {
                setShowModal(!showModal);
              }} />
            
        
            )}

            <Navbar.Toggle aria-controls="navbarScroll" />

            {user.email ? (
              <>
                <Navbar.Collapse
                  id="navbarScroll"
                  className="justify-content-end"
                >
                  <Image className="separator" src={separator} alt="perfil" />
                  <Nav.Link
                    className="container-profile"
                    onClick={() => router.push('/persona')}
                  >
                    <Image className="profile" src={userIcon} alt="perfil" />
                    {name}
                  </Nav.Link>
                  <Nav.Link
                    className="container-log-out"
                    href="#"
                    onClick={() => {
                      router.push('/');
                      signOut();
                      apagarLocalStorage();
                    }}
                  >
                    <Image src={logOutIcon} alt="Sair" />
                    <span className="log-out-text">Sair</span>
                  </Nav.Link>
                </Navbar.Collapse>
              </>
            ) : (
              <Navbar.Collapse
                id="navbarScroll"
                className="justify-content-end"
              >
                {sizePage > 767 ? (
                  <>
                    <Nav.Link onClick={() => handleScrollTo('find-solution')}>
                      Encontre a solução para seu projeto
                    </Nav.Link>

                    <Nav.Link onClick={() => handleScrollTo('who-we-are')}>
                      Quem somos
                    </Nav.Link>

                    <Nav.Link onClick={() => handleScrollTo('how-it-works')}>
                      Como funciona
                    </Nav.Link>

                    <div className="divisor">
                      <Image src={separador} alt="Separador" />
                    </div>

                    <Nav.Link href="/login">Login</Nav.Link>
                    <div className="divisor"></div>
                  </>
                ) : (
                  <>
                    <NavLink
                      aria-controls="navbarScroll"
                      onClick={() => handleScrollTo('find-solution')}
                    >
                      Encontre a solução para seu projeto
                    </NavLink>

                    <NavLink
                      aria-controls="navbarScroll"
                      onClick={() => handleScrollTo('who-we-are')}
                    >
                      Quem somos
                    </NavLink>

                    <NavLink
                      aria-controls="navbarScroll"
                      onClick={() => handleScrollTo('how-it-works')}
                    >
                      Como funciona
                    </NavLink>

                    <div className="divisor">
                      <Image src={separador} alt="Separador" />
                    </div>

                    <Nav.Link href="/login">Login</Nav.Link>
                    <div className="divisor"></div>
                  </>
                )}

                <ButtonToggle
                  aria-controls="navbarScroll"
                  onClick={() => handleShowOverlay()}
                  className="cadastre-se text-center"
                >
                  {' '}
                  CADASTRE-SE{' '}
                </ButtonToggle>
                {/* Cartão 062
                <Nav.Link href="/login">
                  <Image src={user_circle} alt="login icon" />
                </Nav.Link> */}

              </Navbar.Collapse>
            )}
          </Container>
        </Navbar>
      </NavCustom>
    </>
  );
}
