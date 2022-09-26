import { Container } from 'react-bootstrap';
import {
  Content,
  ContentTitles,
  Carrousel,
  CardCarrousel,
  Title,
  Button,
  ContainerButton,
} from './style';
import { useEffect, useState } from 'react';
import { consultas_api } from '../../../services/consultas_api';
import { IServicoInfo } from '../../../interfaces/IServicoInfo';
import { ServiceCard } from '../../ServiceCard';
import { LARANJA } from '../../../styles/variaveis';
import { useRouter } from 'next/router';

interface SampleArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function Vitrine() {
  const [vitrineData, setVitrineData] = useState([] as IServicoInfo[]);
  const [sizePage, setSizePage] = useState(0);
  const router = useRouter();
  useEffect(() => {
    consultas_api.post(`/consulta/ofertas?limit=12`).then(({ data }) => {
      setVitrineData(data.values);
    });
  }, []);

  const handleResize = (e: any) => {
    setSizePage(window.innerWidth);
  };

  useEffect(() => {
    setSizePage(window.innerWidth);
    window.addEventListener('resize', handleResize);
  }, []);

  const settingsSlider = {
    speed: 500,
    dots: vitrineData.length > 10 && sizePage > 500 ? true : false,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 3.4,
    className: 'container-slider',
    initialSlide: 1,
    slidesToScroll: 2,
    nextArrow: <SampleArrow />,
    prevArrow: <SampleArrow />,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2.8,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 468,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 410,
        settings: {
          slidesToShow: 0.9,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 390,
        settings: {
          slidesToShow: 0.85,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 340,
        settings: {
          slidesToShow: 0.8,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 0.75,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 310,
        settings: {
          slidesToShow: 0.65,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function SampleArrow({ className, style, onClick }: SampleArrowProps) {
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
          background: LARANJA,
          borderRadius: '50%',
          border: `1px solid ${LARANJA}`,
        }}
        onClick={onClick}
      />
    );
  }

  return (
    <Content>
      <Container>
        <CardCarrousel>
          <ContentTitles>
            <h1>Ofertas</h1>
            <Title>
              Acelere seu negócio com soluções prontas, mas totalmente
              adaptaveis, na hora em que você precisa.
              <br />
              hora em que você precisa.
            </Title>
          </ContentTitles>

          <Carrousel {...settingsSlider}>
            {vitrineData.map(item => (
              <li key={item.id}>
                <ServiceCard isFavorite={false} service={item} />
              </li>
            ))}
          </Carrousel>
        </CardCarrousel>
        <ContainerButton>
          <Button onClick={() => router.push('/consumidor/busca?ofertas=true')}>
            <span>VER TODOS</span>
          </Button>
        </ContainerButton>
      </Container>
    </Content>
  );
}
