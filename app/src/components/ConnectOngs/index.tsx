import { useRouter } from 'next/router';
import { Content, ContentButton, Container, ContentConect } from './styles';
import IMG from '@public/img-secundary-ong.png';
import Image from 'next/image';
export function ConnectOngs() {
  const router = useRouter();

  return (
    <Container>
      <Content>
        <div className="image-container">
          <Image
            alt="img-ong"
            layout="fill"
            className={'image'}
            src={IMG.src}
          />
        </div>
        <div className="info">
          <h1>
            Cadastre sua instituição
            <span> gratuitamente </span>
            em nossa plataforma
          </h1>
          <span>
            Voluntários e ONGs não pagam nenhum tipo de taxa para a Gyan.
            <br />
            <br />
            Nosso foco é conectar pessoas que praticam responsabilidade social.
          </span>
        </div>
      </Content>

      <ContentConect>
        <h1>Conecte-se com quem ajudará você a ajudar ainda mais</h1>
        <span>
          Apresente sua causa e as necessidades da sua instituição e encontre a
          pessoa certa para trabalhar voluntariamente e contribuir para o
          crescimento de seus projetos.
        </span>

        <ContentButton>
          <button onClick={() => router.push('/consumidor/busca')}>
            CADASTRAR MINHA INSTITUIÇÃO
          </button>
        </ContentButton>
      </ContentConect>
    </Container>
  );
}
