import { Container, Content, CardInfo } from './styles';

export function WhyInvestInVolunteers() {
  return (
    <Content>
      <h1>POR QUE INVESTIR EM VOLUNTÁRIOS?</h1>
      <Container>
        <CardInfo>
          <h2>Mãos com força de vontade</h2>
          <div className="linha-vertical"></div>
          <hr />
          <span>
            O investimento de tempo e cuidado com voluntários traz muitos
            benefícios. Com mais mãos para ajudar o seu projeto social, um
            voluntário consegue desenvolver diversas atividades, fazendo com que
            o seu trabalho impacte ainda mais.
          </span>
        </CardInfo>

        <CardInfo>
          <h2>Inovação para o seu projeto</h2>
          <div className="linha-vertical"></div>
          <hr />
          <span>
            O voluntário traz um olhar de fora, diferente e sem vícios, com
            outra experiência pessoal e profissional, e por isso pode trazer
            soluções criativas para os seus problemas.
          </span>
        </CardInfo>

        <CardInfo>
          <h2>Agente multiplicador</h2>
          <div className="linha-vertical"></div>
          <hr />
          <span>
            O voluntáriado traz mais pessoas para a sua organização, tornando-se
            um multiplicador da causa e ampliador de rede.
          </span>
        </CardInfo>
      </Container>
    </Content>
  );
}
