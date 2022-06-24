import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Card } from '../../../../components/Card';
import { Spacer } from '../../../../components/Spacer';
import { Titulo } from '../../../../components/Titulo';
import { VitrineServico } from '../../../../components/VitrineServico';
import { IServicoInfo } from '../../../../interfaces/IServicoInfo';
import { ofertas_api } from '../../../../services/ofertas_api';
import Content from './style';

interface Props {
  id: number;
}

export default function Vitrine({ id }: Props) {
  const [vitrineData, setVitrineData] = useState([] as IServicoInfo[]);
  useEffect(() => {
    async function handleData() {
      const { data } = await ofertas_api.get(
        `/servicos?filter=id_pessoa=${id}`,
      );
      setVitrineData(data.data);
    }
    handleData();
  }, [id]);

  return (
    <Content>
      <Card>
        <Row>
          <Col lg={12}>
            <Titulo titulo="Vitrine" />
            <Spacer size={32} />
          </Col>
          <Col lg={12}>
            <VitrineServico vitrineData={vitrineData} />
          </Col>
        </Row>
      </Card>
    </Content>
  );
}
