import { AZUL, LARANJA, VERDE } from '../../../styles/variaveis';
import { Content, ContentConheca, BoxContent } from './styles';

export function Conheca() {
  return (
    <Content>
      <h1>Conheças os benefícios em se cadastrar na plataforma:</h1>
      <ContentConheca>
        <BoxContent color={AZUL}>
          <button>Empresas</button>
          <span>
            Livre acesso ao nosso espaço para encontrar talentos independentes
            para atuar em projetos de tecnologia.
          </span>
        </BoxContent>

        <BoxContent color={LARANJA}>
          <button>Profissionais</button>
          <span>
            Seus projetos, ofertas de jobs e compartilhamento de suas
            habilidades podem ser divulgados sem nenhum custo.
          </span>
        </BoxContent>

        <BoxContent color={VERDE}>
          <button>Voluntários</button>
          <span>
            Na Gyan, você pode encontrar uma ONG em busca de voluntários com o
            seu perfil e que desperte seu interesse em ajudar.
          </span>
        </BoxContent>

        <BoxContent color={VERDE}>
          <button>ONGs</button>
          <span>
            Visibilidade para divulgar seus projetos sociais e atrair
            voluntários de diferentes lugares do Brasil.
          </span>
        </BoxContent>
      </ContentConheca>
    </Content>
  );
}
