import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Image from 'next/image';
import { FiMenu } from 'react-icons/fi';
import { BiUserCircle } from 'react-icons/bi';
import { Containe, ContainerLogin } from './style';
import Content from './style';
import Logo from '../../../../assets/logo-branca.svg';
import { Container } from 'react-bootstrap';
import { CadastroBasico } from '../../../CadastroBasico';
import { useRouter } from 'next/router';

export default function HeaderPublico(): JSX.Element {
  const history = useHistory();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [displayOfOverlay, setdisplayOfOverlay] = useState('none');
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  function handleToggleMenu() {
    setOpen(prevState => !prevState);
  }

  function smoothscroll() {
    var currentScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.scrollTo(0, 0);
    }
  }

  const handleShowOverlay = () => {
    setOpen(false);
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

  return (
    <Containe>
      {/* <CadastroBasico
        isActive={showRegisterForm}
        display={displayOfOverlay}
        handleShowOverlay={handleShowOverlay}
      /> */}
      <Container className="container">
        <Content>
          <Image src={Logo} alt="Gyan" width={200} height={60} />
          <button type="button" onClick={handleToggleMenu}>
            <FiMenu size={34} color="#fff" />
          </button>

          <nav className={open ? 'active' : ''}>
            <a id="nav-to-part-1" href="fornecedor/captar-projetos">
              Fornecedores
            </a>
            <a id="nav-to-part-2" href="/consumidor/busca">
              Clientes
            </a>
            <a
              id="nav-to-part-3"
              href="/#who-we-are"
              onClick={() =>
                history.push('/#who-we-are', {
                  type: 'conheca',
                })
              }
            >
              Como funciona
            </a>

            <ContainerLogin>
              <span onClick={() => handleShowOverlay()}>Cadastre-se</span>

              <span>
                <div
                  onClick={() => {
                    handleToggleMenu;
                    router.push('/login');
                  }}
                >
                  <BiUserCircle />
                  Login
                </div>
              </span>
            </ContainerLogin>
          </nav>
        </Content>
      </Container>
    </Containe>
  );
}
