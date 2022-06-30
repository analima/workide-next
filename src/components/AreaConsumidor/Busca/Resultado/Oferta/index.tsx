import {
  AvatarContainer,
  ContentAvatar,
  Dialogo,
} from '../../../../Vitrine/style';
import { ContainerCard } from './style';
import Content from './style';
import Carol from '../../../../../assets/carol-full.svg';
import Avatar from '../../../../CadastroComplementar/Apresentacao/style';
import Paginacao from '../../../Home/MeusProjetos/Paginacao';
import { useCallback, useEffect, useState } from 'react';
import { IServicoInfo } from '../../../../../interfaces/IServicoInfo';
import { ofertas_api } from '../../../../../services/ofertas_api';
import { ServiceCard } from '../../../../ServiceCard';
import { useAuth } from '../../../../../contexts/auth';
import { useBuscaFornecedorOferta } from '../../../../../hooks/buscaConsumidor';

export interface IUsuario {
  id?: number;
  plano?: string;
}

interface IService extends IServicoInfo {
  isFavorite: boolean;
}

export default function Oferta() {
  const [services, setServices] = useState<IService[]>([] as IService[]);
  const { user } = useAuth();
  const { service, pagina, totalPaginas, setPagina } =
    useBuscaFornecedorOferta();

  useEffect(() => {
    setServices(service);
  }, [service]);

  useEffect(() => {
    const load = async () => {
      if (!user.id_pessoa) return;
      const indexArr: number[] = await handleServiceFavoriteIndex(service);
      handleServiceIsFavorite(indexArr, service);
    };
    load();
  }, [service, user]);

  const handleServiceFavoriteIndex = async (servicesProps: IServicoInfo[]) => {
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

  const handleChangeServicesFavorite = useCallback(async () => {
    const indexArr: number[] = await handleServiceFavoriteIndex(service);
    await handleServiceIsFavorite(indexArr, service);
  }, [service]);

  return (
    <Content isEmpty={services.length === 0}>
      {services.length !== 0 && (
        <>
          <ContainerCard>
            {services.map(item => (
              <>
                {item !== undefined && (
                  <div key={item.id} className="item">
                    <ServiceCard
                      visao="consumidor"
                      isFavorite={
                        item.isFavorite !== undefined ? item.isFavorite : false
                      }
                      setIsFavorite={isFavorite => {
                        handleChangeServicesFavorite();
                      }}
                      service={item}
                    />
                  </div>
                )}
              </>
            ))}
          </ContainerCard>
          <Paginacao
            pagina={pagina}
            totalPaginas={totalPaginas}
            setPagina={setPagina}
          />
        </>
      )}
      {services.length === 0 && (
        <AvatarContainer full>
          <Dialogo>
            <ContentAvatar>
              <p>
                Opa.. Parece que não encontramos uma solução pro seu problema
                agora. O que acha de fazer uma nova busca ?!
                <br />
                <br />
                Ou se o seu problema for bem específico fique a vontade para
                publicar um novo projeto.
              </p>
            </ContentAvatar>
          </Dialogo>
          <Avatar>
            <Carol />
          </Avatar>
        </AvatarContainer>
      )}
    </Content>
  );
}
