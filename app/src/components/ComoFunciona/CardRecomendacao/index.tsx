import { Content, ContentConheca, ContentComents, CardComent } from './style';
import { AZUL, LARANJA, VERDE } from '../../../styles/variaveis';

export function CardRecomendacao() {
  return (
    <Content>
      <ContentConheca>
        <h1>Quem conhece a freelas town, recomenda:</h1>

        <ContentComents>
          <CardComent color={AZUL}>
            <h2>Patricia Felix, proprietária da jsfelix.dev</h2>

            <p>
              - Tive uma ótima experiência na contratação de profissionais pela
              plataforma da freelas town para composição de nossos squads. O
              processo é muito rápido, toda a comunicação é realizada pelo site,
              com toda segurança e transparência. Os profissionais da plataforma
              são experts em suas áreas!
            </p>
          </CardComent>

          <CardComent color={LARANJA}>
            <h2>Alison Cau , Freenlancer UI Designer</h2>

            <p>
              - Encontrei com muita facilidade o projeto que precisava para
              alavancar minha carreira profissional! Além disso, a segurança com
              os pagamentos e o gerenciamento das entregas é fenomenal. Melhor
              plataforma pra trabalhar.
            </p>
          </CardComent>

          <CardComent color={VERDE}>
            <h2>George Fialkovitz, Executive Director ONG ABRAMTI</h2>

            <p>
              - Sempre tivemos muita dificuldade em encontrar pessoas
              qualificadas para nos ajudar. Na freelas town encontrei
              voluntários incríveis e com certificação profissional. A dedicação
              destas pessoas fez toda a diferença na qualidade do material.
            </p>
          </CardComent>
        </ContentComents>
      </ContentConheca>
    </Content>
  );
}
