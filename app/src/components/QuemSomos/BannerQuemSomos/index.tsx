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
              A Gyan é uma plataforma que elimina barreiras geográficas, unindo
              freelancers, empresas, ONGs e pessoas interessadas em uma nova
              forma de trabalho. É dirigida a profissionais em busca de
              <b> desafios instigantes</b> e que com eles, possam gerar uma
              renda extra com rápida negociação.
            </p>
            <p>
              Nosso propósito é conectar pessoas incríveis com projetos e causas
              apaixonantes para viabilizar objetivos e realizar sonhos, em
              qualquer lugar do mundo.
            </p>
            <p>
              Curiosidade: Gyan vem do sânscrito que significa Caminho do
              Conhecimento e a sua pronúncia é Guiã.
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
