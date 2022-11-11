import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FooterBody, Content, FooterInfo, FooterSocial } from './style';
import LogoGyan from '../../assets/logo-cinza-sem-fundo.svg';
import Whatsapp from '../../assets/whatsapp-borda.svg';
import { useAuth } from '../../contexts/auth';
import { useValorProjetoPago } from '../../contexts/valorProjetoPago';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
} from 'react-icons/fa';
import Link from 'next/link';

interface IProps {
  versao?: string;
}

export function Footer({ versao }: IProps) {
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
                </>
              )}

              <li
                className="li-click"
                onClick={() => router.push('/empresas/home')}
              >
                Para Empresas
              </li>

              <li
                className="li-click"
                onClick={() => router.push('/quem-somos')}
              >
                Quem Somos
              </li>

              <li className="li-click" onClick={() => router.push('/ongs')}>
                Para Ongs
              </li>

              <li
                className="li-click"
                onClick={() => router.push('https://blog.freelas.town/')}
              >
                Blog freelas town
              </li>

              <li
                className="li-click"
                onClick={() => router.push('/como-funciona')}
              >
                Como funciona
              </li>
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
              <li className="li-click">
                <Link href="/detalhe-area?area=1">Gráficos e Design</Link>
              </li>
              <li className="li-click">
                <Link href="/detalhe-area?area=2">Marketing</Link>
              </li>
              <li className="li-click">
                <Link href="/detalhe-area?area=3">Escrita e Tradução</Link>
              </li>

              <li className="li-click">
                <Link href="/detalhe-area?area=4">Vídeo e Animação</Link>
              </li>
              <li className="li-click">
                <Link href="/detalhe-area?area=5">
                  Tecnologia da Informação
                </Link>
              </li>
              <li className="li-click">
                <Link href="/detalhe-area?area=6">Legal</Link>
              </li>
              <li className="li-click">
                <Link href="/detalhe-area?area=7">Administração</Link>
              </li>
              <li className="li-click">
                <Link href="/detalhe-area?area=8">
                  Finanças e Contabilidade
                </Link>
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
                  aria-label="Facebook"
                  href="https://www.facebook.com/freellas.town"
                  target="blank"
                >
                  <FaFacebookSquare size={30} color="#6E6E6E" />
                </a>
                <a
                  href="https://www.instagram.com/freelas.town/"
                  aria-label="Instagram"
                  target="blank"
                >
                  <FaInstagramSquare size={30} color="#6E6E6E" />
                </a>
                <a
                  aria-label="Linkedin"
                  href="https://www.linkedin.com/company/freelastown/"
                  target="blank"
                >
                  <FaLinkedin size={30} color="#6E6E6E" />
                </a>
              </div>
              <hr />
            </div>

            <a
              target="_blank"
              aria-label="WhatsApp"
              href="https://api.whatsapp.com/send/?phone=55061991053691"
              rel="noopener noreferrer"
              className={!user?.id_pessoa ? 'imageWpp' : undefined}
            >
              <Image width={94} height={94} src={Whatsapp} alt="Whatsapp" />
            </a>
          </div>

          <div className="content-version">
            <Image
              width={122}
              height={48}
              src={LogoGyan}
              alt="Logo da freelas town"
            />
            <p>{versao}</p>
          </div>
        </FooterSocial>
      </Content>
    </FooterBody>
  );
}
