import { useEffect, useState } from 'react';
import { useQuery } from '../../../../hooks/geral';
import { VitrineServico } from '../../../VitrineServico';

import { Card } from '../../../Card';
import { Titulo } from '../../../Titulo';
import Content from './style';
import { PRETO_10 } from '../../../../styles/variaveis';

import { ofertas_api } from '../../../../services/ofertas_api';
import { IServicoInfo } from '../../../../interfaces/IServicoInfo';

export default function ServicosFavoritos() {
  const [vitrineData, setVitrineData] = useState([] as IServicoInfo[]);
  const query = useQuery();

  async function handleData() {
    const services = [];
    const { data } = await ofertas_api.get('/servicos/favoritos');

    for (let i = 0; i < data.length; i++) {
      const service = data[i];
      const { data: serviceData } = await ofertas_api.get(
        '/servicos/' + service.id,
      );
      if (serviceData.itens?.length > 0) {
        serviceData.itens.sort(function (a: any, b: any) {
          if (a.id > b.id) {
            return 1;
          }
          if (a.id < b.id) {
            return -1;
          }
          return 0;
        });
      }
      services.push(serviceData);
    }
    setVitrineData(services);
  }

  useEffect(() => {
    handleData();

    const section = query.get('section');
    if (section === 'favoritos') {
      window.scrollTo(0, 1400);
    }
  }, [query]);

  return (
    <Content id="serviços-favoritos">
      <Card>
        <div className="header">
          <Titulo
            titulo="Meus Serviços Favoritos"
            cor={PRETO_10}
            negrito={false}
          />
        </div>

        <div className="px-5">
          <VitrineServico vitrineData={vitrineData} isAllFavorite={true} />
        </div>
      </Card>
    </Content>
  );
}
