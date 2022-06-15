import { Container } from 'react-bootstrap';
import { Footer, Content, FooterInfo, FooterSocial } from './style';
import LogoGyan from '../../assets/logo-offset.svg';
import Whatsapp from '../../assets/whatsapp.svg';
import Facebook from '../../assets/facebook.svg';
import Linkedin from '../../assets/linkedin.svg';
import Instagram from '../../assets/instagram.svg';
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/auth';
import { useValorProjetoPago } from '../../contexts/valorProjetoPago';
import { IPessoa } from '../../interfaces/IPessoa';

export function Rodape() {
  const history = useHistory();
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
                  onClick={() => history.push('/', { noRedirect: true })}
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
                      onClick={() => history.push('/cadastro-basico')}
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
                <li className="li-click" onClick={() => history.push('/areas')}>
                  Gráficos e Design
                </li>
                <li className="li-click" onClick={() => history.push('/areas')}>
                  Marketing Digital
                </li>
                <li className="li-click" onClick={() => history.push('/areas')}>
                  Escrita e Tradução
                </li>
                <li className="li-click" onClick={() => history.push('/areas')}>
                  Vídeo e Animação
                </li>
                <li className="li-click" onClick={() => history.push('/areas')}>
                  Programação & Tecnologia
                </li>
              </ul>
            </article>

            <article>
              <h2>Políticas de Uso</h2>
              <ul>
                <li
                  className="li-click"
                  onClick={() => history.push('/termos-de-uso')}
                >
                  Termos de Uso
                </li>
                <li
                  className="li-click"
                  onClick={() => history.push('/politicas-de-privacidade')}
                >
                  Políticas de Privacidade
                </li>
                <li
                  className="li-click"
                  onClick={() => history.push('/politicas-de-cookies')}
                >
                  Políticas de Cookies
                </li>
              </ul>
            </article>

            <article>
              <h2>Suporte</h2>
              <ul>
                <li className="li-click" onClick={() => history.push('/faq')}>
                  FAQ
                </li>
              </ul>
            </article>

            <article>
              <h2>Fale conosco</h2>
              <ul>
                <li>
                  <a
                    target="_blank"
                    href="https://api.whatsapp.com/send/?phone=55061991053691"
                    rel="noreferrer"
                  >
                    <img className="new" src={Whatsapp} alt="Whatsapp" />
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
            <img src={LogoGyan} alt="Logo da GYAN" />
          </div>
          <div className="content-version">
            <p>v{process.env.REACT_APP_VERSION}</p>
          </div>

          <div className="content-redes-sociais">
            <a
              href="https://www.linkedin.com/company/gyan-plataforma-de-servi%C3%A7os/?viewAsMember=true"
              target="blank"
            >
              <img src={Linkedin} alt="Linkedin" />
            </a>
            <a href="https://www.instagram.com/gyan.br/" target="blank">
              <img src={Instagram} alt="Instagram" />
            </a>
            <a
              href="https://www.facebook.com/Gyan-101972215654187"
              target="blank"
            >
              <img src={Facebook} alt="Facebook" />
            </a>
          </div>
        </Container>
      </FooterSocial>
    </Footer>
  );
}
