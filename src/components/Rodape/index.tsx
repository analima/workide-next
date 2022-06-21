import { Container } from 'react-bootstrap';
import { Footer, Content, FooterInfo, FooterSocial } from './style';
import Image from 'next/image'
import LogoGyan from '../../assets/logo-offset.svg';
import Whatsapp from '../../assets/whatsapp.svg';
import Facebook from '../../assets/facebook.svg';
import Linkedin from '../../assets/linkedin.svg';
import Instagram from '../../assets/instagram.svg';
import { useHistory } from 'react-router';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/auth';
import { useValorProjetoPago } from '../../contexts/valorProjetoPago';
import { IPessoa } from '../../interfaces/IPessoa';

export function Rodape() {
  const history = useHistory();
  const router = useRouter();
  let { user, signOut } = useAuth();
  if(!user){
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
                <li
                  className="li-click"
                  onClick={() => router.push('/')}
                >
                  Home
                </li>
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
                      onClick={() => history.push('/login')}
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
                <li style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <a
                    target="_blank"
                    href="https://api.whatsapp.com/send/?phone=55061991053691"
                    rel="noreferrer"
                  >
                    <Image className="new" src={Whatsapp} width={45} height={45} alt="Whatsapp" />
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
            <Image src={LogoGyan} alt="Logo da GYAN" width={260} />
          </div>
          <div className="content-version">
            <p>v{process.env.REACT_APP_VERSION}</p>
          </div>

          <div className="content-redes-sociais">
            <a
              href="https://www.linkedin.com/company/gyan-plataforma-de-servi%C3%A7os/?viewAsMember=true"
              target="blank"
            >
              <Image src={Linkedin} width={40} height={40} alt="Linkedin" />
            </a>
            <a href="https://www.instagram.com/gyan.br/" target="blank">
              <Image src={Instagram} width={40} height={40} alt="Instagram" />
            </a>
            <a
              href="https://www.facebook.com/Gyan-101972215654187"
              target="blank"
            >
              <Image src={Facebook} width={40} height={40} alt="Facebook" />
            </a>
          </div>
        </Container>
      </FooterSocial>
    </Footer>
  );
}
