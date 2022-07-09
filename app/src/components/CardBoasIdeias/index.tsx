import { FiArrowRight } from 'react-icons/fi';
import { useHistory } from 'react-router';
import { BRANCO } from '../../styles/variaveis';
import { Container, Content } from './styles';

export function CardBoasIdeias() {
  const history = useHistory();

  return (
    <Container>
      <Content>
        <div className="content-info">
          <h1>Tem um projeto social e precisa de boas ideias?</h1>
          <span>
            Encontre aqui pessoas dispostas a fazer a diferença como volutárias.
          </span>
        </div>

        <div className="content-button">
          <button
            onClick={() => {
              history.push('/consumidor/busca?voluntario=true');
            }}
          >
            BUSCAR VOLUNTÁRIOS
          </button>
          <FiArrowRight size={24} color={BRANCO} />
        </div>
      </Content>
    </Container>
  );
}
