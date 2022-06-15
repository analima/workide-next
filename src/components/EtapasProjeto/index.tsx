import { Col, Row } from 'react-bootstrap';
import { AZUL } from '../../styles/variaveis';
import { dataValidation } from '../../utils/DateValidator';
import { ScrollContainer } from '../ScrollContainer';
import { Titulo } from '../Titulo';
import {
  Content,
  Etapa,
  EtapaData,
  EtapaDescricao,
  EtapasLista,
  EtapasProjetoContainer,
  EtapaStatus,
} from './style';

interface EtapasProps {
  id: number;
  idProjeto: number;
  status: {
    codigo: string;
    descricao: string;
  };
  dataOcorrencia: string;
}

interface EtapasProjetoProps {
  status: {
    codigo: string;
    descricao: string;
  };
  dataOcorrencia: string;
}

export interface IEtapasProjeto {
  etapas?: EtapasProps[];
  etapasProjeto?: EtapasProjetoProps;
  titulo?: string;
  cor?: string;
  height?: number;
}

export function EtapasProjeto({
  etapas,
  etapasProjeto,
  titulo = 'Etapas',
  cor = AZUL,
  height = 900,
}: IEtapasProjeto) {
  return (
    <Content>
      <EtapasProjetoContainer>
        <Titulo titulo={titulo} tamanho={28} />

        <ScrollContainer height={height}>
          {etapas ? (
            <EtapasLista>
              {etapas?.map(etapa => (
                <Etapa key={etapa.id}>
                  <Row>
                    <Col xs={3}>
                      <EtapaStatus concluida={etapa.status ? true : false} />
                    </Col>
                    <Col xs={4}>
                      <EtapaData>
                        {dataValidation(etapa.dataOcorrencia)}
                      </EtapaData>
                    </Col>
                    <Col xs={5}>
                      <EtapaDescricao>{etapa.status.descricao}</EtapaDescricao>
                    </Col>
                  </Row>
                </Etapa>
              ))}
            </EtapasLista>
          ) : (
            <EtapasLista>
              <Etapa>
                <Row>
                  <Col xs={3}>
                    <EtapaStatus
                      concluida={etapasProjeto?.status ? true : false}
                    />
                  </Col>
                  <Col xs={4}>
                    <EtapaData>
                      {etapasProjeto?.dataOcorrencia &&
                        dataValidation(etapasProjeto.dataOcorrencia)}
                    </EtapaData>
                  </Col>
                  <Col xs={5}>
                    <EtapaDescricao>
                      {etapasProjeto?.status?.descricao}
                    </EtapaDescricao>
                  </Col>
                </Row>
              </Etapa>
            </EtapasLista>
          )}
        </ScrollContainer>
      </EtapasProjetoContainer>
    </Content>
  );
}
