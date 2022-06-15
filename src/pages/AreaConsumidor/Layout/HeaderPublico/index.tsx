import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Image from 'next/image'
import { FiMenu } from 'react-icons/fi';
import { BiUserCircle } from 'react-icons/bi';
import { Containe, Content, ContainerLogin } from './style';
import Logo from '../../../../assets/logo-branca.svg';
import { Container } from 'react-bootstrap';
import { CadastroBasico } from '../../../../components/CadastroBasico';

export function HeaderPublico(): JSX.Element {
  const history = useHistory();

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
          
          <Image src ="/logo.svg" alt="Gyan" width={100} height={100} />
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
                {/* <Link to="/login" onClick={handleToggleMenu}>
                  <BiUserCircle />
                  Login
                </Link> */}
              </span>
            </ContainerLogin>
          </nav>
        </Content>
      </Container>
    </Containe>
  );
}
