import { Container, Content, Box, ContentBox } from './style';
import { FiArrowDown } from 'react-icons/fi';
import { PRETO_10 } from 'src/styles/variaveis';
import { Link } from 'react-scroll';

export function BannerComoFunciona() {
  return (
    <Container>
      <Content>
        <h1>Entenda como funciona</h1>
        <ContentBox>
          <div className="content-box">
            <Box>
              <h3>NOS CONHEÇA</h3>
              <div className="content-border">
                <hr />
              </div>
              <span>
                Navegue no nosso ambiente e observe os profissionais e desafios
                cadastrados nele. Você se conectará com várias pessoas e ideias
                bem bacanas, que estarão alinhadas, não apenas aos seus
                propósitos profissionais, mas aos seus valores e percepção de
                mundo.
              </span>
            </Box>

            <Box>
              <h3>CADASTRE-SE</h3>
              <div className="content-border">
                <hr />
              </div>
              <span>
                Ganhe acesso total a nossa plataforma. Queremos lembrar que o
                cadastro na Gyan é totalmente gratuito. Isso reforça nosso
                compromisso em garantir que aqui seja um espaço de encontro
                entre ideias, talentos e causas sociais.
              </span>
            </Box>
          </div>
          <Link
            activeClass="active"
            to="cadastrar"
            spy={true}
            smooth={true}
            offset={-100}
            duration={200}
            href=""
          >
            <FiArrowDown color={PRETO_10} />
          </Link>
        </ContentBox>
      </Content>
    </Container>
  );
}
