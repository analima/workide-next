import { LARANJA } from '../../styles/variaveis';
import { CardCarrousel, Carrousel, Content, ContentButton } from './styles';
import { PessoaProp } from '../../hooks/buscaConsumidor';
import { consultas_api } from '../../services/consultas_api';
import { useEffect, useState } from 'react';
import { ItemVitrine } from '../../components/Vitrine';
import { Container } from 'react-bootstrap';
import { useRouter } from 'next/router';

interface SampleArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function ProfessionalShowCase() {
  const [fornecedores, setFornecedores] = useState<PessoaProp[]>([]);
  const router = useRouter();

  useEffect(() => {
    consultas_api
      .post<{ values: PessoaProp[] }>(`/consulta/fornecedores`)
      .then(({ data }) => {
        setFornecedores(data.values);
      });
  }, []);

  const settingsSlider = {
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 3.2,
    className: 'container-slider',
    initialSlide: 1,
    slidesToScroll: 1,
    Infinity: true,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 390,
        settings: {
          slidesToShow: 1,
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
      <Container className="container">
        <h1>
          Profissionais que poderiam <br /> participar do seu projeto hoje
        </h1>
        <CardCarrousel>
          <Carrousel {...settingsSlider}>
            {fornecedores.map((item: PessoaProp) => (
              <li key={item.id}>
                <ItemVitrine item={item} key={item.id} />
              </li>
            ))}
          </Carrousel>
        </CardCarrousel>
        <ContentButton>
          <button onClick={() => router.push('/consumidor/busca')}>
            VER TODOS
          </button>
        </ContentButton>
      </Container>
    </Content>
  );
}
