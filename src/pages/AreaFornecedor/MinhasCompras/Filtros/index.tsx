import { Col, Row } from 'react-bootstrap';
import { Select } from '../../../../components/Form/Select';
import { useMinhasComprasFornecedor } from '../../../../hooks/minhasComprasFornecedor';
import {
  ContainerFiltro,
  ContainerMesAno,
  Content,
  Filtrar,
  Filtro,
} from './style';

export function Filtros() {
  const { filtroDias, selecionaFiltroDias, control } =
    useMinhasComprasFornecedor();

  const mesAno = [
    { value: '01/2021', label: 'jan/2021' },
    { value: '02/2021', label: 'fev/2021' },
    { value: '03/2021', label: 'mar/2021' },
    { value: '04/2021', label: 'abr/2021' },
    { value: '05/2021', label: 'mai/2021' },
    { value: '06/2021', label: 'jun/2021' },
    { value: '07/2021', label: 'jul/2021' },
    { value: '08/2021', label: 'ago/2021' },
    { value: '09/2021', label: 'set/2021' },
    { value: '10/2021', label: 'out/2021' },
    { value: '11/2021', label: 'nov/2021' },
    { value: '12/2021', label: 'dez/2021' },
  ];

  return (
    <Content>
      <Row className="align-items-center">
        <Col lg={2}>
          <span>Exibir compras dos últimos: </span>
        </Col>
        <Col lg={5}>
          <ContainerFiltro>
            <Filtro
              onClick={() => selecionaFiltroDias('hoje')}
              checked={filtroDias.includes('hoje')}
            >
              <label>Hoje</label>
              <input id="filtro_hoje" name="filtro_hoje" type="checkbox" />
            </Filtro>
            <Filtro
              onClick={() => selecionaFiltroDias('30_dias')}
              checked={filtroDias.includes('30_dias')}
            >
              <label>30 dias</label>
              <input
                id="filtro_30_dias"
                name="filtro_30_dias"
                type="checkbox"
              />
            </Filtro>
            <Filtro
              onClick={() => selecionaFiltroDias('60_dias')}
              checked={filtroDias.includes('60_dias')}
            >
              <label>60 dias</label>
              <input
                id="filtro_60_dias"
                name="filtro_60_dias"
                type="checkbox"
              />
            </Filtro>
            <Filtro
              onClick={() => selecionaFiltroDias('90_dias')}
              checked={filtroDias.includes('90_dias')}
            >
              <label>90 dias</label>
              <input
                id="filtro_90_dias"
                name="filtro_90_dias"
                type="checkbox"
              />
            </Filtro>
            <Filtro
              onClick={() => selecionaFiltroDias('outro')}
              checked={filtroDias.includes('outro')}
            >
              <label>Outro</label>
              <input id="filtro_outro" name="filtro_outro" type="checkbox" />
            </Filtro>
          </ContainerFiltro>
        </Col>

        {filtroDias.includes('outro') && (
          <Col lg={5}>
            <ContainerMesAno>
              <Row>
                <Col lg={5}>
                  <Select
                    control={control}
                    name="inicio"
                    options={mesAno}
                    noValueOption="Início"
                  />
                </Col>
                <Col lg={5}>
                  <Select
                    control={control}
                    name="fim"
                    options={mesAno}
                    noValueOption="Fim"
                  />
                </Col>
                <Col lg={2}>
                  <Filtrar>Aplicar</Filtrar>
                </Col>
              </Row>
            </ContainerMesAno>
          </Col>
        )}
      </Row>
    </Content>
  );
}
