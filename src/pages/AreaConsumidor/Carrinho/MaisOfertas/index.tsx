import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Card } from '../../../../components/Card';
import { Spacer } from '../../../../components/Spacer';
import { Titulo } from '../../../../components/Titulo';
import { VitrineServico } from '../../../../components/VitrineServico';
import { IServicoInfo } from '../../../../interfaces/IServicoInfo';
import { ofertas_api } from '../../../../services/ofertas_api';
import { AZUL } from '../../../../styles/variaveis';
import { Content } from './style';
import { useCarrinhoConsumidor } from '../../../../hooks/carrinhoConsumidor';

export function MaisOfertas() {
  const [vitrineData, setVitrineData] = useState([] as IServicoInfo[]);
  const { servicoInfo } = useCarrinhoConsumidor();

  useEffect(() => {
    async function handleData() {
      await ofertas_api
        .get(`/servicos?filter=id_pessoa=${servicoInfo.id_pessoa}`)
        .then(res => {
          const { data } = res.data;

          setVitrineData(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    handleData();
  }, [servicoInfo.id_pessoa]);

  return (
    <Content>
      <Row>
        <Col lg={12}>
          <Titulo titulo="Do fornecedor" cor={AZUL} />
        </Col>
      </Row>

      <Spacer size={24} />

      <Row>
        <Col lg={12}>
          <Titulo
            titulo="Mais produtos que podem ser do seu interesse"
            cor={AZUL}
            tamanho={24}
          />
        </Col>
      </Row>

      <Spacer size={24} />

      <Card>
        <Row>
          <Col lg={12}>
            <Titulo titulo="Vitrine" cor={AZUL} />
          </Col>
        </Row>

        <Spacer size={24} />

        <Row>
          <Col lg={12}>
            <VitrineServico vitrineData={vitrineData} />
          </Col>
        </Row>
      </Card>
    </Content>
  );
}
