import { Container, ContainerText, Content, ContentButton } from './style';
import { FiArrowRight } from 'react-icons/fi';
import { BRANCO } from 'src/styles/variaveis';
import { useRouter } from 'next/router';

export function ImpactfulProject() {
  const router = useRouter();

  return (
    <Container>
      <Content>
        <ContainerText>
          <h1>Projetos que irão causar impacto social.</h1>
          <span>
            Cadastre-se e encontre projetos sociais para atuar como freelancer.
          </span>
        </ContainerText>
        <ContentButton>
          <button
            onClick={() =>
              router.push('/fornecedor/captar-projetos?voluntario=true')
            }
          >
            Seja voluntário
            <FiArrowRight color={BRANCO} size={30} />
          </button>
        </ContentButton>
      </Content>
    </Container>
  );
}
