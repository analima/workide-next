import { useRouter } from 'next/router';
import Image from 'next/image';
import { Content, ContentButton, Container } from './styles';
import IMG from '@public/last-img-ong.png';
export function ConnectOngs() {
  const router = useRouter();

  return (
    <Container>
      <Content>
        <div className="image-container">
          <Image
            alt="img-ong"
            layout="intrinsic"
            className={'image'}
            src={IMG}
            width={688}
            height={458}
          />
        </div>
        <div className="info">
          <h1>Conecte-se com quem ajudará você a ajudar ainda mais</h1>
          <span>
            Apresente sua causa e as necessidades da sua instituição e encontre
            a pessoa certa para trabalhar voluntariamente e contribuir para o
            crescimento de seus projetos.
          </span>
          <ContentButton>
            <button onClick={() => router.push('/primeiro-acesso')}>
              CADASTRE SUA NECESSIDADE
            </button>
          </ContentButton>
        </div>
      </Content>
    </Container>
  );
}
