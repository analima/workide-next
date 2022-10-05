import { Container, Content, ContentDescription, ContentBox } from './style';
import ImgBanner from '../../../assets/img-banner-quem-somos.png';
import Image from 'next/image';

export function BannerQuemSomos() {
  return (
    <Container>
      <Content>
        <ContentDescription>
          <h1>Quem somos</h1>
          <div className="descricao">
            <p>
              <b>
                A freelas town conecta pessoas incríveis a projetos e causas
                apaixonantes.
              </b>
              Nossa plataforma elimina barreiras geográficas e permite a conexão
              entre profissionais, empresas e ONGs.
            </p>
            <p>
              Profissionais que já trabalham neste novo modelo, que querem fazer
              uma renda extra ou que se dispõem ao trabalho voluntário pro bono
              cadastram sua disponibilidade, conhecimento e experiência de
              atuação.
            </p>
            <p>
              Empresas que buscam uma forma flexível de contratação cadastram
              seus projetos para atrair os profissionais que precisam.
            </p>
            <p>
              As ONGs e instituições sem fins lucrativos sabem que o trabalho
              pro bono é a forma mais efetiva de voluntariado!
            </p>
            <p>
              Na freelas town, acreditamos muito no bom senso e na capacidade de
              entendimento das pessoas. Criar relações de confiança é
              fundamental para nós.
            </p>
          </div>
          <h1 className="title-border">
            Pessoas & Projetos
            <hr />
          </h1>
        </ContentDescription>

        <ContentBox>
          <Image
            alt="quem somos banner"
            className="imag"
            width={'587px'}
            height={'631px'}
            src={ImgBanner}
          />
        </ContentBox>
      </Content>
    </Container>
  );
}
