import { Container } from 'react-bootstrap';
import { Footer, Content, FooterInfo, FooterSocial } from './style';
import Image from 'next/image';
import LogoGyan from '../../assets/logo-cinza-sem-fundo.svg';
import Whatsapp from '../../assets/whatsapp.svg';
import Facebook from '../../assets/facebook.svg';
import Linkedin from '../../assets/linkedin.svg';
import Instagram from '../../assets/instagram.svg';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/auth';
import { useValorProjetoPago } from '../../contexts/valorProjetoPago';
import { IPessoa } from '../../interfaces/IPessoa';
import Link from 'next/link';

export function Rodape() {
  const router = useRouter();
  let { user, signOut } = useAuth();
  if (!user) {
    user = {} as IPessoa;
  }
  const { apagarLocalStorage } = useValorProjetoPago();

  return (
    <Footer>
      <Content>
        <Container>
          <FooterInfo>
            <article>
              <h2>Menu</h2>
              <ul>
                {user.id_pessoa && (
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

                {!user.id_pessoa && (
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
                    <li>
                      <a href="#who-we-are" className="como-funciona">
                        Como funciona
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </article>

            <article>
              <h2>Áreas</h2>
              <ul>
                <li className="li-click">
                  <Link href="https://freelas.town/detalhe-area?area=1">
                    Gráficos e Design
                  </Link>
                </li>
                <li className="li-click">
                  <Link href="https://freelas.town/detalhe-area?area=2">
                    Marketing
                  </Link>
                </li>
                <li className="li-click">
                  <Link href="https://freelas.town/detalhe-area?area=3">
                    Escrita e Tradução
                  </Link>
                </li>

                <li className="li-click">
                  <Link href="https://freelas.town/detalhe-area?area=4">
                    Vídeo e Animação
                  </Link>
                </li>
                <li className="li-click">
                  <Link href="https://freelas.town/detalhe-area?area=5">
                    Tecnologia da Informação
                  </Link>
                </li>
                <li className="li-click">
                  <Link href="https://freelas.town/detalhe-area?area=6">
                    Legal
                  </Link>
                </li>
                <li className="li-click">
                  <Link href="https://freelas.town/detalhe-area?area=7">
                    Administração
                  </Link>
                </li>
                <li className="li-click">
                  <Link href="https://freelas.town/detalhe-area?area=8">
                    Finanças e Contabilidade
                  </Link>
                </li>
              </ul>
            </article>

            <article>
              <h2>Políticas de Uso</h2>
              <ul>
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
              <h2>Suporte</h2>
              <ul>
                <li className="li-click" onClick={() => router.push('/faq')}>
                  FAQ
                </li>
              </ul>
            </article>

            <article>
              <h2>Fale conosco</h2>
              <ul>
                <li
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <a
                    target="_blank"
                    href="https://api.whatsapp.com/send/?phone=55061991053691"
                    rel="noreferrer"
                  >
                    <Image
                      className="new"
                      src={Whatsapp}
                      width={45}
                      height={45}
                      alt="Whatsapp"
                    />
                  </a>
                  Clique aqui e fale com a gente
                </li>
              </ul>
            </article>
          </FooterInfo>
        </Container>
      </Content>

      <FooterSocial>
        <Container>
          <div className="content-fale-conosco">
            <Image src={LogoGyan} alt="Logo da freelas town" width={150} />
          </div>
          <div className="content-version">
            <p>v{process.env.REACT_APP_VERSION}</p>
          </div>

          <div className="content-redes-sociais">
            <a
              href="https://www.linkedin.com/company/freelastown/"
              target="blank"
            >
              <Image src={Linkedin} width={40} height={40} alt="Linkedin" />
            </a>
            <a href="https://www.instagram.com/freelas.town/" target="blank">
              <Image src={Instagram} width={40} height={40} alt="Instagram" />
            </a>
            <a href="https://www.facebook.com/www.freelas.town" target="blank">
              <Image src={Facebook} width={40} height={40} alt="Facebook" />
            </a>
          </div>
        </Container>
      </FooterSocial>
    </Footer>
  );
}
