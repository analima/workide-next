import { Container, Content, ContentImage, ContentInfo } from './style';
import IMG from '@public/mulher-banner.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function BannerEmpresa() {
  const router = useRouter();
  return (
    <Container>
      <Content>
        <ContentInfo>
          <h1>Encontre e contrate os melhores profissionais</h1>
          <span>
            Uma plataforma para voce encontrar profissionais e tirar do papel
            todos os seus projetos.
          </span>
          <button
            onClick={() => router.push('/cadastro-basico')}
            className="orange"
          >
            PUBLICAR MEU PRIMEIRO PROJETO
          </button>

          <p>
            Quer ser contratado?
            <Link href="/cadastro-basico"> Inscreva-se aqui</Link>
          </p>
        </ContentInfo>

        <ContentImage>
          <div className="content-img">
            <Image src={IMG} quality={100} alt="Empresas" />
          </div>
        </ContentImage>
      </Content>
    </Container>
  );
}
