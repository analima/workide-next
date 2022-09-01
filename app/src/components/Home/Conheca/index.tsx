import {
  Content,
  ContentBanner,
  ContentConheca,
  ContentComents,
  CardComent,
} from './style';

import { FiArrowRight } from 'react-icons/fi';
import { AZUL, BRANCO, LARANJA, VERDE } from '../../../styles/variaveis';
import { useRouter } from 'next/router';

export function Conheca() {
  const router = useRouter();

  return (
    <Content>
      <ContentBanner>
        <div className="content-titles">
          <span>#paraclientes</span>

          <h1>Encontre um profissional para o seu projeto</h1>

          <p>
            Navegue em nosso ambiente e observe os profissionais e suas
            habilidades.
          </p>

          <p>
            Você terá a oportunidade de conhecer várias pessoas e ideias bem
            bacanas que poderão ser aplicadas às suas necessidades
            profissionais.
          </p>
        </div>

        <div className="content-solution">
          <div>
            <h2>Publique um projeto e encontre seu freela</h2>

            <span>
              Nossos profissionais
              <FiArrowRight
                color={BRANCO}
                size={16}
                onClick={() => router.push('/consumidor/busca')}
              />
            </span>
          </div>

          <div>
            <h2>Soluções GYAN para o seu projeto</h2>

            <span>
              Conheça nosso catálogo de serviços
              <FiArrowRight
                color={BRANCO}
                size={16}
                onClick={() => router.push('/consumidor/busca?oferta=true')}
              />
            </span>
          </div>
        </div>
      </ContentBanner>

      <ContentConheca>
        <h1>Quem conhece a Gyan, recomenda:</h1>

        <ContentComents>
          <CardComent color={AZUL}>
            <h2>Patricia Felix, proprietária da jsfelix.dev</h2>

            <p>
              “Tive uma ótima experiência na contratação de profissionais pela
              plataforma da GYAN para composição de nossos squads. O processo é
              muito rápido, toda a comunicação é realizada pelo site, com toda
              segurança e transparência. Os profissionais da plataforma são
              experts em suas áreas!“.
            </p>
          </CardComent>

          <CardComent color={LARANJA}>
            <h2>Alison Cau , Freenlancer UI Designer</h2>

            <p>
              “Encontrei com muita facilidade o projeto que precisava para
              alavancar minha carreira profissional! Além disso, a segurança com
              os pagamentos e o gerenciamento das entregas é fenomenal. Melhor
              plataforma pra trabalhar“.
            </p>
          </CardComent>

          <CardComent color={VERDE}>
            <h2>George Fialkovitz, Executive Director ONG ABRAMTI</h2>

            <p>
              “Sempre tivemos muita dificuldade em encontrar pessoas
              qualificadas para nos ajudar. Na Gyan encontrei voluntários
              incríveis e com certificação profissional. A dedicação destas
              pessoas fez toda a diferença na qualidade do material“.
            </p>
          </CardComent>
        </ContentComents>
      </ContentConheca>
    </Content>
  );
}
