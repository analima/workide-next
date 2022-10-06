import { Container, Content, ContentImage, ContentInfo } from './style';
import IMG from '@public/mulher-banner.png';
import Image from 'next/image';
import Link from 'next/link';

export function BannerEmpresa() {
  return (
    <Container>
      <Content>
        <ContentInfo>
          <h1>Encontre e contrate os melhores profissionais</h1>
          <span>
            Uma plataforma para voce encontrar profissionais e tirar do papel
            todos os seus projetos.
          </span>
          <button className="orange">QUERO VER PROFISSIONAIS</button>
          <button className="blue">QUERO ME CADASTRAR</button>

          <p>
            Quer ser contratado?
            <Link href="/cadastro-basico"> Inscreva-se aqui</Link>
          </p>
        </ContentInfo>

        <ContentImage>
          <Image src={IMG} quality={100} alt="Empresas" />
        </ContentImage>
      </Content>
    </Container>
  );
}
