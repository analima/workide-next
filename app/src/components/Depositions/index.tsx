import { Content, Container, BoxDepositions } from './styles';
export function Depositions() {
  return (
    <Container>
      <h1>DEPOIMENTOS DE ONGs</h1>
      <Content>
        <BoxDepositions>
          <span>
            “Muito satisfeita com o resultado obtido através da plataforma, ela
            foi excelente para o nosso projeto. Através dela conheci um ótimo
            profissional que contribuiu muito com a nossa instituição e que
            trouxe vários resultados positivos, como o impulsionamento das
            nossas redes sociais, atraindo assim novos doadores. Obrigado
            Freelas.town por facilitar o encontro de profissionais qualificados,
            de maneira simples e prática!“.
          </span>
          <strong>Giovanna Marques - Instituto Integridade</strong>
        </BoxDepositions>
        <BoxDepositions>
          <span>
            “Sempre tivemos muita dificuldade em encontrar pessoas qualificadas
            para nos ajudar. Na Freelas.town encontrei voluntários incríveis e
            com certificação profissional. A dedicação destas pessoas fez toda a
            diferença na qualidade do material”.
          </span>
          <strong>George Fialkovitz - Executive Director ONG ABRAMTI</strong>
        </BoxDepositions>
      </Content>
    </Container>
  );
}
