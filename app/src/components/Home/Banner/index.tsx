import {
  Container,
  Content,
  ContentDescription,
  ContentBox,
  BoxInfo,
  ContentSearch,
} from './style';
import { useState } from 'react';
import { CadastroBasico } from '../../CadastroBasico';
import { AZUL, LARANJA, VERDE } from '../../../styles/variaveis';
import { SearchInputHome } from '../../SearchInputHome';
import { useRouter } from 'next/router';
import IMG1 from '@public/capa-home1.png'
import IMG2 from '@public/capa-home2.png'
import IMG3 from '@public/capa-home3.png'
import IMG5 from '@public/capa-home5.png'

const dados = [
  {
    title: 'Profissionais',
    id: 1,
    img: IMG3.src,
    color: AZUL,
    text: 'Contrate profissionais com rapidez, flexibilidade e segurança',
    subText: 'Cadastre gratuitamente os projetos da sua empresa.',
  },
  {
    title: 'Voluntários',
    id: 2,
    img: IMG2.src,
    color: VERDE,
    text: 'Conte sobre sua causa e encontre a pessoa certa para trabalhar com você.',
    subText: 'Cadastre seu projeto gratuitamente e fortaleça o voluntariado.',
  },
  {
    title: 'Projetos',
    id: 3,
    img: IMG1.src,
    color: LARANJA,
    text: 'Encontre projetos facinantes que alavancarão sua carreira.',
    subText:
      'Crie seu perfil na Gyan e exponha suas habilidades profissionais para o mundo.',
  },
  {
    title: 'Ofertas',
    id: 4,
    img: IMG5.src,
    color: '#E50052',
    text: 'Encontre soluções prontas criadas pela comunidade de profissionais da Gyan.',
    subText: 'Contrate projetos com rapidez e facilidade.',
  },
];

export function Banner() {
  const router = useRouter();
  const [displayOfOverlay, setdisplayOfOverlay] = useState('none');
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [img, setImg] = useState(IMG1.src);
  const [text, setText] = useState(dados[0].text);
  const [subText, setSubText] = useState(dados[0].subText);
  const [type, setType] = useState('freelancers');
  const [positionActive, setPositionActive] = useState(1);

  function smoothscroll() {
    var currentScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.scrollTo(0, 0);
    }
  }

  const handleShowOverlay = () => {
    if (displayOfOverlay === 'none') {
      setdisplayOfOverlay('flex');
      setTimeout(() => {
        setShowRegisterForm(!showRegisterForm);
      }, 200);
    } else if (displayOfOverlay === 'flex') {
      setShowRegisterForm(!showRegisterForm);
      setTimeout(() => {
        setdisplayOfOverlay('none');
      }, 700);
    }
    smoothscroll();
  };

  function handleSearch(e: string) {
    if (e.trim() === '') return;

    if (type === 'freelancers') {
      router.push(`/consumidor/busca?filter=${e}`);
    }

    if (type === 'voluntários') {
      router.push(`/consumidor/busca?voluntario=true&filter=${e}`);
    }

    if (type === 'projetos') {
      router.push(`/fornecedor/captar-projetos?filter=${e}`);
    }

    if (type === 'ofertas') {
      router.push(`/consumidor/busca?oferta=true&filter=${e}`);
    }
  }

  return (
    <Container>
      <CadastroBasico
        isActive={showRegisterForm}
        display={displayOfOverlay}
        handleShowOverlay={handleShowOverlay}
      />
      <Content img={img}>
        <ContentDescription>
          <h1 data-testid="hero-title">{text}</h1>
          <h4>{subText}</h4>
        </ContentDescription>

        <ContentBox>
          <div className="content-box">
            {dados.map(dado => (
              <BoxInfo
                color={dado.color}
                key={dado.id}
                active={positionActive === dado.id}
                onClick={() => {
                  setImg(dado.img);
                  setPositionActive(dado.id);
                  setText(dado.text);
                  setSubText(dado.subText);
                  setType(dado.title.toLocaleLowerCase());
                }}
              >
                Encontre
                <br />
                <b>{dado.title}</b>
              </BoxInfo>
            ))}
          </div>

          <ContentSearch>
            <SearchInputHome
              placeholder="Pesquisar por palavra-chave"
              onChange={e => handleSearch(e)}
            />
          </ContentSearch>
        </ContentBox>
      </Content>
    </Container>
  );
}
