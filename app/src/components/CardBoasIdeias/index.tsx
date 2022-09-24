import { useRouter } from 'next/router';
import { FiArrowRight } from 'react-icons/fi';
import { BRANCO } from '../../styles/variaveis';
import { Container, Content } from './styles';

export function CardBoasIdeias() {
  const router = useRouter();

  return (
    <Container>
      <Content>
        <div className="content-info">
          <h1>Tem um projeto social e precisa de boas ideias?</h1>
          <span>
            Encontre aqui pessoas dispostas a fazer a diferença como
            voluntárias.
          </span>
        </div>

        <div className="content-button">
          <button
            onClick={() => router.push('/consumidor/busca?voluntarios=true')}
          >
            BUSCAR VOLUNTÁRIOS
          </button>
          <FiArrowRight
            size={24}
            color={BRANCO}
            onClick={() => router.push('/consumidor/busca?voluntario=true')}
          />
        </div>
      </Content>
    </Container>
  );
}
