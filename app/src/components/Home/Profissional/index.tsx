import { Container, Row } from 'react-bootstrap';
import {
  Content,
  ArrowSlider,
  Carrousel,
  CardCarrousel,
  ContentFeedback,
  ContentTitles,
  CardComoFunciona,
  ComoFunciona,
  ContentButton,
  Wrapper,
  Drapper,
} from './style';
import Alisson from '../../../assets/alisson.jpeg';
import Luiz from '../../../assets/luiz.png';
import Afonso from '../../../assets/afonso.jpeg';
import Image from 'next/image'

import NosConheca from '../../../assets/nosconheca.svg';
import CadastreSe from '../../../assets/cadastrese.svg';
import Encontre from '../../../assets/encontre.svg';
import Beneficios from '../../../assets/beneficios.svg';
import Seguranca from '../../../assets/seguranca.svg';
import { GhostButton } from '../../GhostButton';
import { useHistory } from 'react-router';

export function Profissional(): JSX.Element {
  const history = useHistory();
  const settingsSlider = {
    speed: 500,
    dots: true,
    slidesToShow: 5.05,
    className: 'container-slider',
    initialSlide: 1,
    slidesToScroll: 2,
    nextArrow: <ArrowSlider />,
    prevArrow: <ArrowSlider />,

    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 580,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 468,
        settings: {
          slidesToShow: 1.4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const dados = [
    {
      id: 1,
      image: Alisson,
      descricao:
        'Encontrei com muita facilidade o projeto que eu precisava pra alavancar minha carreira profissional!',
      nome: 'Alisson Cau',
    },
    {
      id: 2,
      image: 'https://avatars.githubusercontent.com/u/3003222?v=4',
      descricao:
        'Na GYAN eu encontrei os projetos que permitiram meu progresso profissional. Plataforma incrível!',
      nome: 'Jefferson felix',
    },
    {
      id: 3,
      image: 'https://avatars.githubusercontent.com/u/47211806?v=4',
      descricao:
        'A Gyan é diferenciada, aqui conectamos pessoas e empresas de uma forma rápida e segura.',
      nome: 'Pablo Gomes',
    },
    {
      id: 4,
      image: 'https://avatars.githubusercontent.com/u/60345415?v=4',
      descricao: 'Gratificante fazer parte na construção da Gyan.',
      nome: 'Herllon Cardoso',
    },
    {
      id: 5,
      image: 'https://avatars.githubusercontent.com/u/54159333?v=4',
      descricao:
        'A GYAN tem uma proposta muito especial sobre projetos voluntários, é muito importante pra todos nós',
      nome: 'Lucas Matos',
    },
    {
      id: 6,
      image: 'https://avatars.githubusercontent.com/u/45125835?v=4',
      descricao:
        'A Gyan é um projeto de grande impacto social! Formamos uma equipe incrível. Adoro fazer parte!',
      nome: 'Caroline Goulart',
    },
    {
      id: 7,
      image: Luiz,
      descricao:
        'Foi uma honra poder trabalhar na construção da Gyan, uma empresa comprometida com a mudança.',
      nome: 'Luiz Henrique',
    },
    {
      id: 8,
      image: 'https://avatars.githubusercontent.com/u/72868196?v=4',
      descricao:
        'As pessoas da Gyan são extremamente profissionais. O melhor lugar para arrumar um profissional.',
      nome: 'Theryston Santos',
    },
    {
      id: 9,
      image: Afonso,
      descricao:
        'Plataforma excelente! Aqui pude conhecer profissionais incríveis. É uma honra fazer parte disso!',
      nome: 'Afonso Ferreira',
    },
  ];

  const outrosDados = [
    {
      id: 1,
      img: NosConheca,
      descricao:
        'Navegue no nosso ambiente e observe os profissionais e desafios cadastrados nele. Você vai poder conhecer várias pessoas e ideias bem bacanas pra aplicar na sua necessidade.',
      titulo: 'NOS CONHEÇA',
    },
    {
      id: 2,
      img: CadastreSe,
      descricao:
        'Gostou do que viu? Cadastre como profissional e venha contribuir para materializar sonhos. Ou cadastre sua necessidade e encontre um profissional incrível para te ajudar.',
      titulo: 'CADASTRE-SE',
    },
    {
      id: 3,
      img: Encontre,
      descricao:
        'Submeta-se como profissional para trabalhar nos desafios publicados, ou convide profissional para ajudar sua empresa a materializar sonhos ou atingir objetivos.',
      titulo: 'ENCONTRE',
    },
    {
      id: 4,
      img: Beneficios,
      descricao:
        'Para fornecedores: Tenha acesso gratuito e ilimitado a todos os recursos que desenvolvemos para ajudar no seu trabalho. Para clientes: Encontre e selecione profissionais do jeito que o seu projeto precisa. Pague somente o que receber.',
      titulo: 'BENEFÍCIOS',
    },
    {
      id: 5,
      img: Seguranca,
      descricao:
        'Segurança para todos os envolvidos com projeto: na Gyan você tem a garantia que o pagamento será só efetuado quando o projeto estiver concluído e validado pelo fornecedor e cliente.',
      titulo: 'SEGURANÇA',
    },
  ];

  return (
    <Content>
      <Container>
        <CardCarrousel>
          <ContentTitles>
            <h1>
              Veja o que estão dizendo sobre a Gyan e o que você pode aproveitar
              também
            </h1>
          </ContentTitles>
          <Carrousel {...settingsSlider}>
            {dados.map(item => (
              <li key={item.id}>
                <ContentFeedback>
                  <Image src={item.image} alt="Imagem" />
                  <div>
                    <p>
                      `&quot;`{item.descricao}`&quot;` - {item.nome}
                    </p>
                  </div>
                </ContentFeedback>
              </li>
            ))}
          </Carrousel>
        </CardCarrousel>

        <Row
          style={{ marginTop: '48px', marginBottom: '48px' }}
          id="who-we-are"
        >
          <ContentTitles>
            <h1>Entenda como funciona</h1>
          </ContentTitles>
          <ComoFunciona>
            {outrosDados.map(item => (
              <CardComoFunciona key={item.id}>
                <img src={item.img} alt="Imagem" />
                <h1>{item.titulo}</h1>
                <p>{item.descricao}</p>
              </CardComoFunciona>
            ))}
          </ComoFunciona>

          <Wrapper>
            <Drapper>
              <span>Por onde começar?</span>
              <ContentButton>
                <GhostButton onClick={() => history.push('/consumidor/busca')}>
                  CONHECER PROFISSIONAIS
                </GhostButton>
                <GhostButton
                  onClick={() => history.push('/fornecedor/captar-projetos')}
                >
                  CONHECER PROJETOS
                </GhostButton>
              </ContentButton>
            </Drapper>
          </Wrapper>
        </Row>
      </Container>
    </Content>
  );
}
