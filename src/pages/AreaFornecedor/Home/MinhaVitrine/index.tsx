import { useEffect, useState } from 'react';
import { VitrineServico } from '../../../../components/VitrineServico';

import { Card } from '../../../../components/Card';
import { Titulo } from '../../../../components/Titulo';
import { ContentButton, Button } from './style';
import Content from './style';
import { ofertas_api } from '../../../../services/ofertas_api';

import { useAuth } from '../../../../contexts/auth';
import { IServicoInfo } from '../../../../interfaces/IServicoInfo';

export default function MinhaVitrine() {
  const [vitrineData, setVitrineData] = useState([] as IServicoInfo[]);
  const { user } = useAuth();

  useEffect(() => {
    async function handleData() {
      const { data } = await ofertas_api.get(
        `/servicos?filter=id_pessoa=${user.id_pessoa}&size=999`,
      );
      setVitrineData(data.data);
    }
    handleData();
  }, [user]);

  return (
    <Content>
      <Card>
        <div className="header">
          <Titulo titulo="Minha Vitrine" />
        </div>

        <VitrineServico vitrineData={vitrineData} />

        <ContentButton>
          <Button to="/fornecedor/meus-servicos">MINHAS OFERTAS</Button>
        </ContentButton>
      </Card>
    </Content>
  );
}
