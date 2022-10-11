import { Content, ContentComents, CardComent } from './style';

import { FiArrowRight } from 'react-icons/fi';
import { AZUL, BRANCO, LARANJA, VERDE } from '../../styles/variaveis';
import { useRouter } from 'next/router';

export function SearchIdealProfessional() {
  const router = useRouter();

  return (
    <Content>
      <h1>
        Com três cliques você contrata o
        <br />
        profissional ideal para o seu projeto
      </h1>

      <ContentComents>
        <CardComent color="#e8e8e8">
          <span>1</span>
          <h2>Conte sobre a sua necessidade.</h2>
          <p>
            Publique um projeto em nosso sistema e defina a categoria do
            serviço, o nível de experiência profissional e as habilidades do
            freelancer que você necessita.
          </p>
        </CardComent>

        <CardComent color="#e8e8e8">
          <span>2</span>
          <h2>A freelas.town receberá seu projeto</h2>
          <p>
            Os profissionais cadastrados na plataforma receberão seu projeto e
            enviarão propostas. Você entra em contato e negocia com os
            freelancers que desejar.
          </p>
        </CardComent>

        <CardComent color="#e8e8e8">
          <span>3</span>
          <h2>Analise o perfil do profissional</h2>
          <p>
            Analise o perfil das propostas recebidas e veja se o profissional
            está de acordo com as habilidades que você definiu para o seu
            projeto.
          </p>
        </CardComent>
      </ContentComents>

      <h3>Nossa plataforma é gratuita</h3>
      <h4>
        Você não tem limites para uso e só é cobrada taxa <br /> de
        intermediação quando um projeto for finalizado com suceso.
      </h4>
    </Content>
  );
}
