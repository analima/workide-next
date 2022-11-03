import { Content, NenhumServico, ArrowSlider, Carrousel } from './style';

import { useCallback, useEffect, useState } from 'react';
import { ServiceCard } from '../ServiceCard';
import { IServicoInfo } from '../../interfaces/IServicoInfo';
import { ofertas_api } from '../../services/ofertas_api';

export interface PacoteProps {
  id: number;
  tipo?: 'BASICO' | 'INTERMEDIARIO' | 'AVANCADO';
  nome?: string;
  descricao?: string;
  prazo?: string;
  preco: string;
  tempo?: number;
}

interface ICaseSucesso {
  titulo: string;
  problema: string;
  solucao: string;
  resultado: string;
  total_horas: number;
  setor: string;
  id: number;
}

interface ItemProps {
  id: number;
  nome: string;
  descricao: string;
  basico: boolean;
  intermediario: boolean;
  avancado: boolean;
}

export interface IVitrine {
  id: number;
  arquivo: {
    url: string;
  };
  descricao: string;
  pacotes: PacoteProps[];
  nome: string;
  cases_sucesso?: ICaseSucesso[];
  itens?: ItemProps[];
  requisitos?: IRequisito[];
}

interface IRequisito {
  status: string;
  dataHoraUltimaAtualizacao: string;
  descricao: string;
  id: number;
}

interface IDataVitrine {
  vitrineData: IServicoInfo[];
  isAllFavorite?: boolean;
  idUsuario?: number;
  numberCard?: number;
}

interface IService extends IServicoInfo {
  isFavorite: boolean;
}

export function VitrineServico({
  vitrineData,
  isAllFavorite,
  numberCard,
}: IDataVitrine) {
  const [services, setServices] = useState<IService[]>([] as IService[]);

  useEffect(() => {
    const load = async () => {
      if (isAllFavorite) {
        const processedServices: IService[] = vitrineData.map(service => {
          return {
            ...service,
            isFavorite: true,
          };
        });
        setServices(processedServices);
      } else {
        const indexArr: number[] = await handleServiceFavoriteIndex(
          vitrineData,
        );
        handleServiceIsFavorite(indexArr, vitrineData);
      }
    };
    load();
  }, [isAllFavorite, vitrineData]);

  const handleServiceFavoriteIndex = async (servicesProps: IServicoInfo[]) => {
    try {
      const servicesIndexFoundAsFavorite: number[] = [];
      const { data: favoriteServices } = await ofertas_api.get(
        `/servicos/favoritos`,
      );

      for (let favoriteService of favoriteServices) {
        const serviceIndexFoundAsFavorite = servicesProps.findIndex(
          service => service.id === favoriteService.id,
        );
        servicesIndexFoundAsFavorite.push(serviceIndexFoundAsFavorite);
      }
      return servicesIndexFoundAsFavorite;
    } catch (error: any) {
      console.error(error.response?.data);
      return [];
    }
  };

  const handleServiceIsFavorite = async (
    servicesIndexFoundAsFavorite: number[],
    servicesProps: IServicoInfo[],
  ) => {
    const processedServices: IService[] | any[] = servicesProps.map(
      (service, index) => {
        const isFoundThisIndexInFavoriteServicesArray =
          servicesIndexFoundAsFavorite.findIndex(
            indexService => indexService === index,
          ) !== -1;

        return {
          ...service,
          isFavorite: isFoundThisIndexInFavoriteServicesArray,
        };
      },
    );

    setServices(processedServices);
    return processedServices;
  };

  const handleRemoveServiceNotFavorite = async (
    servicesProps: IService[],
    isAllFavorite?: boolean,
  ) => {
    if (isAllFavorite) {
      const servicesFavoriteIService: IService[] = servicesProps.filter(
        service => {
          if (service !== undefined) {
            return service.isFavorite;
          } else {
            return false;
          }
        },
      );
      setServices(servicesFavoriteIService);
      return servicesFavoriteIService;
    }
  };

  const handleChangeServicesFavorite = useCallback(async () => {
    const indexArr: number[] = await handleServiceFavoriteIndex(vitrineData);
    const servicesFavoriteOrNot = await handleServiceIsFavorite(
      indexArr,
      vitrineData,
    );
    handleRemoveServiceNotFavorite(servicesFavoriteOrNot, isAllFavorite);
  }, [vitrineData, isAllFavorite]);

  const settingsSlider = {
    speed: 500,
    dots: numberCard ? false : true,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: vitrineData?.length > 3 ? 3.1 : vitrineData?.length,
    className: 'container-slider',
    infinite: vitrineData.length >= 3,
    initialSlide: 1,
    slidesToScroll: numberCard
      ? 1
      : vitrineData.length > 3
      ? 3.7
      : vitrineData.length,
    nextArrow: <ArrowSlider />,
    prevArrow: <ArrowSlider />,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: vitrineData?.length > 2 ? 2 : 1.4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: numberCard
            ? numberCard
            : vitrineData.length > 3
            ? 2.1
            : vitrineData.length,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: numberCard
            ? numberCard
            : vitrineData.length > 3
            ? 1.3
            : vitrineData.length,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 540,
        settings: {
          slidesToShow: vitrineData.length > 3 ? 1.3 : vitrineData.length,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Content>
      {services.length > 0 ? (
        <>
          <Carrousel size={vitrineData.length} {...settingsSlider}>
            {services.map(item => (
              <li key={item.id}>
                <ServiceCard
                  isFavorite={item.isFavorite}
                  setIsFavorite={isFavorite => {
                    handleChangeServicesFavorite();
                  }}
                  service={item}
                  visao="consumidor"
                />
              </li>
            ))}
          </Carrousel>
        </>
      ) : (
        <NenhumServico>
          <h3>Não há serviços na vitrine</h3>
        </NenhumServico>
      )}
    </Content>
  );
}
