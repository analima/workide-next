import { Container, ContainerText, Content, ContentButton } from './style';
import ImgBanner from '@public/banner-hours.jpg';
import { FiArrowRight } from 'react-icons/fi';
import { BRANCO } from 'src/styles/variaveis';

export function BannerHours() {
  return (
    <Container img={ImgBanner.src}>
      <Content>
        <ContainerText>
          <h1>Suas horas valem muito para quem precisa</h1>
          <span>
            Ganhe experiência dedicando algumas horas para uma causa que você
            acredita.
          </span>
        </ContainerText>
        <ContentButton>
          <button>Seja um voluntário online</button>
          <FiArrowRight color={BRANCO} size={30} />
        </ContentButton>
      </Content>
    </Container>
  );
}
