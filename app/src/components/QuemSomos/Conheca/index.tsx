import { AZUL, LARANJA, VERDE } from '../../../styles/variaveis';
import { Content, ContentConheca, BoxContent } from './styles';
import { useRouter } from 'next/router';

export function Conheca() {
  const router = useRouter();
  return (
    <Content>
      <h1>Conheças os benefícios em se cadastrar na plataforma:</h1>
      <ContentConheca>
        <BoxContent color={AZUL}>
          <button
            onClick={() => {
              router.push('/consumidor/busca');
            }}
          >
            Empresas
          </button>
          <span>
            Livre acesso ao nosso espaço para encontrar talentos independentes
            para atuar em projetos de tecnologia.
          </span>
        </BoxContent>

        <BoxContent color={LARANJA}>
          <button
            onClick={() => {
              router.push('/fornecedor/captar-projetos');
            }}
          >
            Profissionais
          </button>
          <span>
            Seus projetos, ofertas de jobs e compartilhamento de suas
            habilidades podem ser divulgados sem nenhum custo.
          </span>
        </BoxContent>

        <BoxContent color={VERDE}>
          <button
            onClick={() => {
              router.push('/consumidor/busca?voluntario=true');
            }}
          >
            Voluntários
          </button>
          <span>
            Na Freelas.town, você pode encontrar uma ONG em busca de voluntários
            com o seu perfil e que desperte seu interesse em ajudar.
          </span>
        </BoxContent>

        <BoxContent color={VERDE}>
          <button
            onClick={() => {
              router.push('/consumidor/busca?ong=true');
            }}
          >
            ONGs
          </button>
          <span>
            Visibilidade para divulgar seus projetos sociais e atrair
            voluntários de diferentes lugares do Brasil.
          </span>
        </BoxContent>
      </ContentConheca>
    </Content>
  );
}
