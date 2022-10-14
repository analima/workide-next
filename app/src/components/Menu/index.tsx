import { Container, Nav, Navbar } from 'react-bootstrap';
import Image from 'next/image';
import userIcon from '../../assets/user_circle.svg';
import separator from '../../assets/separador.svg';
import logOutIcon from '../../assets/logout.svg';
import Center from '../../assets/center.svg';
import CenterProfissional from '../../assets/center-profissional.svg';
import CenterContratante from '../../assets/center-contratante.svg';
import separador from '../../assets/separador.svg';
import Logo from '../../assets/logo-azul-sem-fundo.svg';
import LogoMenor from '../../assets/logo-pequena-azul.png';

import {
  NavCustom,
  ButtonToggle,
  DivOptions,
  NavLink,
  ContainerCentral,
  ContainerMenuMobile,
} from './style';
import { CadastroBasico } from '../CadastroBasico';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';
import { ModalCentralMenu } from '../ModalCentralMenu';
import { useValorProjetoPago } from '../../contexts/valorProjetoPago';
import { ID_TOKEN, useAuth } from '../../contexts/auth';
import { selecionarRotaHome } from 'src/utils/selecionarRotaHome';
import { useInformacoesTipoUsuario } from 'src/hooks/informacoesTipoUsuario';
import { Select } from '../Form/Select';
import { FiMenu } from 'react-icons/fi';
import { AZUL } from 'src/styles/variaveis';

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
  const {
    optionsType,
    typeSelected,
    handleSelectedType,
    control,
    returnTypeSelected,
  } = useInformacoesTipoUsuario();

  const { signOut, user } = useAuth();
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const background = 'transparent';
  const [name, setName] = useState('');
  const { apagarLocalStorage } = useValorProjetoPago();

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

        <ModalCentralMenu
          showModal={showModal}
          type={returnTypeSelected()}
          setShowModal={setShowModal}
        />
        <Navbar expand="md">
          <Container
            style={{ paddingRight: sizePage < 768 ? '0px !important' : '10px' }}
            className="nav-container"
          >
            <Navbar.Brand
              className="logo"
              onClick={() => router.push(selecionarRotaHome(user))}
            >
              <Image
                src={sizePage > 768 ? Logo : LogoMenor}
                alt="freelas town"
                width={sizePage > 768 ? 180 : 40}
                height={sizePage > 768 ? 60 : 40}
              />
            </Navbar.Brand>

            {user.tipoPerfil !== 'VISITANTE' &&
              user.email &&
              !hiddenCenterMenu && (
                <ContainerCentral>
                  {typeSelected === 'Selecione...' && (
                    <div className="icone-center">
                      <Image
                        alt="Selecione"
                        src={Center}
                        onClick={() => {
                          setShowModal(!showModal);
                        }}
                      />
                    </div>
                  )}

                  {typeSelected === 'CONTRATANTE' && (
                    <div className="icone-center">
                      <Image
                        alt=""
                        src={CenterContratante}
                        onClick={() => {
                          setShowModal(!showModal);
                        }}
                      />
                    </div>
                  )}

                  {typeSelected === 'PROFISSIONAL' && (
                    <div className="icone-center">
                      <Image
                        alt=""
                        src={CenterProfissional}
                        onClick={() => {
                          setShowModal(!showModal);
                        }}
                      />
                    </div>
                  )}

                  <Select
                    control={control}
                    name="userType"
                    event={handleSelectedType}
                    options={optionsType}
                    value={typeSelected}
                    className="selectType"
                    noValueOption={
                      typeSelected === 'Selecione...'
                        ? 'Selecione...'
                        : returnTypeSelected()
                    }
                  />
                </ContainerCentral>
              )}

            {sizePage > 578 && <Navbar.Toggle aria-controls="navbarScroll" />}
            {sizePage < 579 && (
              <ContainerMenuMobile>
                <FiMenu onClick={() => setOpen(true)} color={AZUL} size={24} />
              </ContainerMenuMobile>
            )}

            {localStorage.getItem(ID_TOKEN) ? (
              <DivOptions>
                <Navbar.Collapse
                  id="navbarScroll"
                  className="justify-content-end"
                >
                  {sizePage <= 578 && <Image src={Logo} alt="freelas town" />}
                  <div className="separator">
                    <Image src={separator} alt="perfil" />
                  </div>
                  <Nav.Link
                    className="container-profile"
                    onClick={() => router.push(selecionarRotaHome(user))}
                  >
                    <div className="profile">
                      <Image src={userIcon} alt="perfil" />
                    </div>
                    {name}
                  </Nav.Link>
                  <Nav.Link
                    className="container-log-out"
                    href="/"
                    onClick={() => {
                      signOut();
                      apagarLocalStorage();
                    }}
                  >
                    <Image src={logOutIcon} alt="Sair" />
                    <span className="log-out-text">Sair</span>
                  </Nav.Link>
                </Navbar.Collapse>
              </DivOptions>
            ) : (
              <Navbar.Collapse
                id="navbarScroll"
                className="justify-content-end"
              >
                {!user.id_pessoa && sizePage > 767 ? (
                  <>
                    <Nav.Link>Encontre a solução para seu projeto</Nav.Link>

                    <Nav.Link>Quem somos</Nav.Link>

                    <Nav.Link>Como funciona</Nav.Link>

                    <div className="divisor">
                      <Image src={separador} alt="Separador" />
                    </div>

                    <Nav.Link href="/login">Login</Nav.Link>
                    <div className="divisor"></div>
                  </>
                ) : (
                  <>
                    <NavLink aria-controls="navbarScroll">
                      Encontre a solução para seu projeto
                    </NavLink>

                    <NavLink aria-controls="navbarScroll">Quem somos</NavLink>

                    <NavLink aria-controls="navbarScroll">
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
              </Navbar.Collapse>
            )}
          </Container>
        </Navbar>
      </NavCustom>
    </>
  );
}
