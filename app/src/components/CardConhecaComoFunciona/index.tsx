import { Container, ContentHowItWorks, ImagesHowItWork } from './styles';
import Publique from '../../assets/group-publique1.png';
import Contrate from '../../assets/group-contrate1.png';
import Pague from '../../assets/group-pague1.png';
import { AZUL, LARANJA, LARANJA_10 } from '../../styles/variaveis';
import Link from 'next/link';
import Image from 'next/image';

export function CardConhecaComoFunciona() {
  return (
    <Container>
      <ContentHowItWorks>
        <div className="content-title">
          <h1>Como funciona?</h1>

          <span>
            Anuncie o seu trabalho facilmente, {''}
            <Link href="/consumidor/busca">
              <>
                contrate <br /> freelancers e pague com segurança.
              </>
            </Link>
          </span>
        </div>

        <div className="content-images">
          <ImagesHowItWork color={AZUL}>
            <div className="imagem">
              <Image
                src={Publique.src}
                width={193}
                height={201}
                alt="publique"
              />
            </div>
            <h2>Publique um projeto</h2>
            <span>
              Publique a sua vaga para milhares de profissionais. Você irá
              receber propostas de freelancers talentosos em poucos minutos.
            </span>

            <span className="number-circle">1</span>
          </ImagesHowItWork>

          <ImagesHowItWork color={LARANJA}>
            <div className="imagem">
              <Image
                src={Contrate.src}
                width={179}
                height={211}
                alt="contrate"
              />
            </div>
            <h2>Contrate um profissional</h2>
            <span>
              Analise o histórico de trabalho, feedback de clientes e
              portfólios. Converse pelo chat e escolha o melhor candidato para a
              sua vaga.
            </span>
            <span className="number-circle">2</span>
          </ImagesHowItWork>

          <ImagesHowItWork color={LARANJA_10}>
            <div className="imagem">
              <Image src={Pague.src} width={151} height={202} alt="pague" />
            </div>
            <h2>Pague com segurança</h2>

            <span>
              O pagamento será repassado somente depois de o projeto ter sido
              concluído. Esta é uma garantia da GYAN para tornar o processo mais
              seguro.
            </span>
            <span className="number-circle">3</span>
          </ImagesHowItWork>
        </div>
      </ContentHowItWorks>
    </Container>
  );
}
