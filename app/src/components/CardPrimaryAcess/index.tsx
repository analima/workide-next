import { AZUL, LARANJA, VERDE } from 'src/styles/variaveis';
import { Container, Content, Card } from './style';
import Image from 'next/image';
import Logo from '../../assets/logo-pequena-azul.png';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
export function CardPrimaryAcess({ setStep }: IProps) {
  const router = useRouter();
  return (
    <Container>
      <Content>
        <div className="content-logo">
          <Image
            src={Logo}
            alt="Freelas.town"
            width={152}
            height={152}
            layout="intrinsic"
          />
        </div>
        <div className="info-center">
          <h1>Seja bem vindo(a) a comunidade Freelas Town!</h1>
          <p>Selecione a opção que você se encaixa abaixo:</p>
        </div>
        <div className="content-cards">
          <Card onClick={() => router.push('cadastro-basico')} color={LARANJA}>
            <h2>QUERO TRABALHAR</h2>
            <span>
              Estou buscando <br />
              por projetos
            </span>
          </Card>

          <Card onClick={() => setStep(2)} color={AZUL}>
            <h2>QUERO CONTRATAR</h2>
            <span>
              Estou contratando <br />
              para um projeto
            </span>
          </Card>

          <Card onClick={() => setStep(2)} color={VERDE}>
            <h2>QUERO VOLUNTÁRIO</h2>
            <span>
              Estou buscando voluntários <br />
              para o meu projeto!
            </span>
          </Card>
        </div>

        <div className="info-footer">
          <p>
            já tem uma conta? Faça <Link href="/login">Login</Link>
          </p>
        </div>
      </Content>
    </Container>
  );
}
