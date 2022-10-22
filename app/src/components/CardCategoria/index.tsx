import { useEffect, useState } from 'react';
import { Content, ContentCard, CardArea, Carrousel } from './styles';
import { AiFillStar } from 'react-icons/ai';
import { AMARELO } from '../../styles/variaveis';
import { geral_api } from '../../services/geral_api';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IArea {
  id: number;
  descricao: string;
  subareas: ISubarea[];
}

interface ISubarea {
  id: number;
  id_subarea_interesse: number;
  descricao: string;
}

interface IProps {
  title: string;
  page: 'home' | 'empresas';
}
export function CardCategory({ title, page }: IProps) {
  const router = useRouter();

  const [areas, setAreas] = useState<IArea[]>([]);
  const [sizePage, setSizePage] = useState(0);

  const settingsSlider = {
    speed: 500,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1.4,
    className: 'container-slider',
    initialSlide: 1,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 330,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    geral_api
      .get<IArea[]>('/areas')
      .then(({ data }) => {
        setAreas(data);
      })
      .catch(() => {
        setAreas([]);
      });
  }, []);

  const handleResize = (e: any) => {
    setSizePage(window.innerWidth);
  };

  useEffect(() => {
    setSizePage(window.innerWidth);
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <Content>
      <h1 className={page}>{title}</h1>
      {page === 'home' && (
        <span>
          Procurando por trabalho?
          <Link href="/fornecedor/captar-projetos">Procurar projetos</Link>
        </span>
      )}
      {sizePage > 530 ? (
        <ContentCard>
          {areas.map(area => (
            <li key={area.id}>
              <CardArea
                onClick={() => router.push(`/detalhe-area?area=${area.id}`)}
              >
                <h2>{area.descricao}</h2>

                <div className="subareas">
                  <span>{area.subareas.length} Áreas de Atuação</span>
                  <div className="content-star">
                    <AiFillStar size={20} color={AMARELO} />
                    <AiFillStar size={20} color={AMARELO} />
                    <AiFillStar size={20} color={AMARELO} />
                    <AiFillStar size={20} color={AMARELO} />
                    <AiFillStar size={20} color={AMARELO} />
                  </div>
                </div>
              </CardArea>
            </li>
          ))}
        </ContentCard>
      ) : (
        <Carrousel {...settingsSlider}>
          {areas.map(area => (
            <li key={area.id}>
              <CardArea
                onClick={() => router.push(`/detalhe-area?area=${area.id}`)}
              >
                <h2>{area.descricao}</h2>

                <div className="subareas">
                  <span>{area.subareas.length} Áreas de Atuação</span>
                  <div className="content-star">
                    <AiFillStar size={20} color={AMARELO} />
                    <AiFillStar size={20} color={AMARELO} />
                    <AiFillStar size={20} color={AMARELO} />
                    <AiFillStar size={20} color={AMARELO} />
                    <AiFillStar size={20} color={AMARELO} />
                  </div>
                </div>
              </CardArea>
            </li>
          ))}
        </Carrousel>
      )}
    </Content>
  );
}
