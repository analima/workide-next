import { Content, ContentComents, CardComent } from './style';

import { FiArrowRight } from 'react-icons/fi';
import { AZUL, BRANCO, LARANJA, VERDE } from '../../styles/variaveis';
import { useRouter } from 'next/router';

export function RecommendationComment() {
  const router = useRouter();

  return (
    <Content>
      <h1>Comentários de quem ja usa e recomenda.</h1>

      <ContentComents>
        <CardComent color="#0384d1">
          <h2>Patricia Felix, proprietária da jsfelix.dev</h2>

          <p>
            “Tive uma ótima experiência na contratação de profissionais pela
            plataforma da workide.com para composição de nossos squads. O
            processo é muito rápido, toda a comunicação é realizada pelo site,
            com toda segurança e transparência. Os profissionais da plataforma
            são experts em suas áreas!“.
          </p>
        </CardComent>

        <CardComent color="#0384d1">
          <h2>Alison Cau , Freenlancer UI Designer</h2>

          <p>
            “Encontrei com muita facilidade o projeto que precisava para
            alavancar minha carreira profissional! Além disso, a segurança com
            os pagamentos e o gerenciamento das entregas é fenomenal. Melhor
            plataforma pra trabalhar“.
          </p>
        </CardComent>

        <CardComent color="#0384d1">
          <h2>George Fialkovitz, Executive Director ONG ABRAMTI</h2>

          <p>
            “Sempre tivemos muita dificuldade em encontrar pessoas qualificadas
            para nos ajudar. Na workide.com encontrei voluntários incríveis e
            com certificação profissional. A dedicação destas pessoas fez toda a
            diferença na qualidade do material“.
          </p>
        </CardComent>
      </ContentComents>
    </Content>
  );
}
