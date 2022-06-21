import React, { useCallback, useEffect, useState } from 'react';
import { ReactComponent as CoracaoOff } from '../../../../../../../assets/coracao-off.svg';
import { ReactComponent as CoracaoOn } from '../../../../../../../assets/coracao.svg';
import { Container, ContentFooter, ContentService, LabelPrice } from './styled';
import { useHistory } from 'react-router';
import { IUsuario } from '../..';
import { ofertas_api } from '../../../../../../../services/ofertas_api';
import { formatToPrice } from '../../../../../../../helpers/formatsHelper';
import { ItemsService } from '../../../../ContentBusca';

type Props = {
  service: ItemsService;
  usuario: IUsuario;
};

export const Card = ({ service, usuario }: Props): JSX.Element => {
  const [favoriteItem, setFavoriteItem] = useState<
    Array<Number | undefined | null>
  >([]);

  const history = useHistory();

  useEffect(() => {
    const load = async () => {
      const { data: favoriteServices } = await ofertas_api.get(
        `/servicos/favoritos`,
      );
      const idFavoriteSevices = [];
      for (let favoriteService of favoriteServices) {
        idFavoriteSevices.push(favoriteService.id);
      }
      setFavoriteItem(idFavoriteSevices);
    };
    load();
  }, []);

  const handleFavorite = async (
    event: React.MouseEvent,
    serviceId: number | null | undefined,
  ) => {
    event.stopPropagation();
    const check = favoriteItem.find(item => item === serviceId);
    if (favoriteItem.length > 0) {
      if (!check) {
        await ofertas_api.post(`/servicos/${serviceId}/favoritos`);
        setFavoriteItem([...favoriteItem, serviceId]);
      } else {
        await ofertas_api.delete(`/servicos/${serviceId}/favoritos`);
        setFavoriteItem(favoriteItem.filter(elm => elm !== serviceId));
      }
    } else {
      await ofertas_api.post(`/servicos/${serviceId}/favoritos`);
      setFavoriteItem([serviceId]);
    }
  };

  const handleOpenService = useCallback(() => {
    ofertas_api
      .get('/servicos/indicacao', {
        params: {
          idUsuario: service?.idUsuario,
          idServico: service?.idServico,
          includeDomain: false,
        },
      })
      .then(res => {
        history.push(res.data);
      });
  }, [history, service]);

  return (
    <Container onClick={handleOpenService}>
      <ContentService isBlocked={false} imgUrl={service.urlArquivo}>
        <header>
          <div
            onClick={event => {
              handleFavorite(event, service?.idServico);
            }}
          >
            {favoriteItem.findIndex(element => {
              return service?.idServico === element;
            }) !== -1 ? (
              <CoracaoOn />
            ) : (
              <CoracaoOff />
            )}
          </div>
          <LabelPrice>
            {formatToPrice(service?.precoMinimo)} a{' '}
            {formatToPrice(service?.precoMaximo)}
          </LabelPrice>
        </header>
        <p>{service?.nome}</p>
      </ContentService>
      <ContentFooter>
        <p>{service?.descricao}</p>
      </ContentFooter>
    </Container>
  );
};
