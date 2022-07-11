import { FooterBody, Content, FooterInfo, FooterSocial } from './style';
import LogoGyan from '../../assets/logo-branca.svg';
import Whatsapp from '../../assets/whatsapp-borda.svg';
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/auth';
import { useValorProjetoPago } from '../../contexts/valorProjetoPago';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
} from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

export function Footer() {
  const { user, signOut } = useAuth();
  const { apagarLocalStorage } = useValorProjetoPago();
  const [abrirOpcoesMenu, setAbrirOpcoesMenu] = useState<string>('abrir');
  const [abrirOpcoesAreas, setAbrirOpcoesAreas] = useState<string>('abrir');
  const [abrirOpcoesPoliticas, setAbrirOpcoesPoliticas] =
    useState<string>('abrir');
  const [abrirOpcoesSuporte, setAbrirOpcoesSuporte] = useState<string>('abrir');
  const router = useRouter();
  return (
    <FooterBody>
      <Content>
        <FooterInfo>
          <article>
            <h2
              onClick={() =>
                abrirOpcoesMenu === 'normal'
                  ? setAbrirOpcoesMenu('abrir')
                  : setAbrirOpcoesMenu('normal')
              }
            >
              Menu
            </h2>
            <ul className={abrirOpcoesMenu}>
              <li className="li-click" onClick={() => router.push('/')}>
                Home
              </li>
              {user?.id_pessoa && (
                <li
                  className="li-click"
                  onClick={() => {
                    signOut();
                    apagarLocalStorage();
                  }}
                >
                  Logout
                </li>
              )}

              {!user?.id_pessoa && (
                <>
                  <li
                    className="li-click"
                    onClick={() => router.push('/login')}
                  >
                    Login
                  </li>

                  <li
                    className="li-click"
                    onClick={() => router.push('/cadastro-basico')}
                  >
                    Cadastre-se
                  </li>

                  <li
                    className="li-click"
                    onClick={() => router.push('/quem-somos')}
                  >
                    Quem Somos
                  </li>

                  <li>
                    <Link href="/?section=como-funciona">Como funciona</Link>
                  </li>
                </>
              )}
            </ul>
          </article>

          <article>
            <h2
              onClick={() =>
                abrirOpcoesAreas === 'normal'
                  ? setAbrirOpcoesAreas('abrir')
                  : setAbrirOpcoesAreas('normal')
              }
            >
              Áreas
            </h2>
            <ul className={abrirOpcoesAreas}>
              <li className="li-click" onClick={() => router.push('/areas')}>
                Gráficos e Design
              </li>
              <li className="li-click" onClick={() => router.push('/areas')}>
                Marketing Digital
              </li>
              <li className="li-click" onClick={() => router.push('/areas')}>
                Escrita e Tradução
              </li>
              <li className="li-click" onClick={() => router.push('/areas')}>
                Vídeo e Animação
              </li>
              <li className="li-click" onClick={() => router.push('/areas')}>
                Programação & Tecnologia
              </li>
            </ul>
          </article>

          <article>
            <h2
              onClick={() =>
                abrirOpcoesPoliticas === 'normal'
                  ? setAbrirOpcoesPoliticas('abrir')
                  : setAbrirOpcoesPoliticas('normal')
              }
            >
              Políticas de Uso
            </h2>
            <ul className={abrirOpcoesPoliticas}>
              <li
                className="li-click"
                onClick={() => router.push('/termos-de-uso')}
              >
                Termos de Uso
              </li>
              <li
                className="li-click"
                onClick={() => router.push('/politicas-de-privacidade')}
              >
                Políticas de Privacidade
              </li>
              <li
                className="li-click"
                onClick={() => router.push('/politicas-de-cookies')}
              >
                Políticas de Cookies
              </li>
            </ul>
          </article>

          <article>
            <h2
              onClick={() =>
                abrirOpcoesSuporte === 'normal'
                  ? setAbrirOpcoesSuporte('abrir')
                  : setAbrirOpcoesSuporte('normal')
              }
            >
              Suporte
            </h2>
            <ul className={abrirOpcoesSuporte}>
              <li className="li-click" onClick={() => router.push('/faq')}>
                FAQ
              </li>
            </ul>
          </article>
        </FooterInfo>

        <FooterSocial>
          <div className="whats">
            <div className="content-fale-conosco">
              <div>
                <span>Siga-nos</span>
                <a
                  href="https://www.facebook.com/Gyan-101972215654187"
                  target="blank"
                >
                  <FaFacebookSquare size={30} color="#fff" />
                </a>
                <a href="https://www.instagram.com/gyan.br/" target="blank">
                  <FaInstagramSquare size={30} color="#fff" />
                </a>
                <a
                  href="https://www.linkedin.com/company/gyan-plataforma-de-servi%C3%A7os/?viewAsMember=true"
                  target="blank"
                >
                  <FaLinkedin size={30} color="#fff" />
                </a>
              </div>
              <hr />
            </div>

            <a
              target="_blank"
              href="https://api.whatsapp.com/send/?phone=55061991053691"
              rel="noopener noreferrer"
            >
              <Image width={94} height={94} src={Whatsapp} alt="Whatsapp" />
            </a>
          </div>

          <div className="content-version">
            <Image width={122} height={48} src={LogoGyan} alt="Logo da GYAN" />
            <p>v{process.env.REACT_APP_VERSION}</p>
          </div>
        </FooterSocial>
      </Content>
    </FooterBody>
  );
}
