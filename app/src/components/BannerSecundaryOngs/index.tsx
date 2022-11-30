import { Container, Content } from './style';
import ImgOng from '@public/blue.webp';

export function BannerSecundaryOngs() {
  return (
    <Container img={ImgOng.src}>
      <Content>
        <div className="content">
          <div className="primary">
            <h1>PLATAFORMA GRATUITA</h1>

            <span>
              <strong>Voluntários e ONGs</strong> utilizam nossos serviços de forma gratuita, sem
              gerar custo.
            </span>
          </div>
          <div className="secundary">
            <h1>ALÉM DA TECNOLOGIA</h1>

            <span>
              Utilize a tecnologia de forma estratégica na sua ONG para expandir
              seus recursos.
            </span>
          </div>
        </div>

        <div className="content">
          <div className="primary">
            <h1>REDE DE PROFISSIONAIS</h1>

            <span>
              Encontre um espaço para divulgação dos seus projetos de
              voluntariado para milhares de profissionais.
            </span>
          </div>
          <div className="secundary">
            <h1>ATENDIMENTO E SUPORTE</h1>

            <span>
              Receba materiais de apoio que ajudarão você a mobilizar, engajar e
              gerir seus voluntários,
            </span>
          </div>
        </div>
      </Content>
    </Container>
  );
}
