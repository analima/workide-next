import { Container, Content, Box, ContentBox } from './style';
import ImgEllipse1 from '../../../assets/elipse-1.webp';
import ImgEllipse2 from '../../../assets/elipse-2.webp';
import ImgEllipse3 from '../../../assets/elipse-3.webp';
import ImgEllipse4 from '../../../assets/elipse-4.webp';
import Image from 'next/image';
import { AZUL, CINZA_90, LARANJA, VERDE } from 'src/styles/variaveis';

export function ComoCadastrar() {
  return (
    <Container>
      <Content>
        <h1>Como cadastrar?</h1>
        <ContentBox>
          <Box color={LARANJA}>
            <div id="cadastrar" className="content-img">
              <Image
                alt="com funciona"
                width={262}
                height={262}
                src={ImgEllipse1}
                quality={100}
              />
            </div>

            <h3>É freelancer?</h3>

            <span>
              Cadastre-se como profissional e venha contribuir para materializar
              sonhos. Suas habilidades merecem ser compartilhadas e sua
              identidade pode ser impressa em projetos valiosos.
            </span>
          </Box>

          <Box color={AZUL}>
            <div className="content-img">
              <Image
                alt="com funciona"
                width={262}
                height={262}
                src={ImgEllipse2}
                quality={100}
              />
            </div>
            <h3>Tem uma empresa?</h3>

            <span>
              Se você está desenvolvendo um projeto e precisa de uma equipe para
              trabalhar remotamente, cadastre sua necessidade na Gyan e encontre
              um talento remoto incrível para te ajudar.
            </span>
          </Box>

          <Box color={VERDE}>
            <div className="content-img">
              <Image
                alt="com funciona"
                className="imag"
                width={262}
                height={262}
                src={ImgEllipse3}
                quality={100}
              />
            </div>
            <h3>Tem um projeto social?</h3>

            <span>
              Cadastre sua instituição sem fins lucrativos e seus projetos
              cativantes. Temos uma lista de voluntários esperando para dar o
              seu melhor e ajudar a transformar vidas.
            </span>
          </Box>

          <Box color={VERDE}>
            <div className="content-img">
              <Image
                alt="com funciona"
                className="imag"
                width={262}
                height={262}
                src={ImgEllipse4}
                quality={100}
              />
            </div>
            <h3>Tem interesse em ser voluntário?</h3>

            <span>
              Seu tempo e expertise podem trazer muitas melhorias para o mundo
              em que vivemos. Na Gyan, você se conecta com ONGs que atuam em
              prol das causas que você acredita.
            </span>
          </Box>
        </ContentBox>
      </Content>
    </Container>
  );
}
