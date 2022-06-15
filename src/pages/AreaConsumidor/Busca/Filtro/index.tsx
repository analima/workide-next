import { Content } from './style';
import { Col, Row } from 'react-bootstrap';
import { Oferta } from './Oferta';
import { Fornecedor } from './Fornecedor';
import { useState } from 'react';
import { Antonio } from '../../../../components/Antonio';
import { useBuscaFornecedorOferta } from '../../../../hooks/buscaConsumidor';

export interface IFiltroFornecedor {
  inVoluntariado?: boolean;
  subareas?: string[];
  habilidades?: string[];
  causas?: any[];
}

export interface IFiltroOferta {
  subareas?: string[];
  habilidades?: string[];
  preco_minimo?: number;
  preco_maximo?: number;
  prazo?: number;
}

export interface ITipoResultado {
  onChangeFiltroAvancadoOferta: (filtro: IFiltroOferta) => void;
}

export function Filtro() {
  const { ofertaFiltro } = useBuscaFornecedorOferta();

  const [mensagem, setMensagem] = useState<string>('');
  const [viewAntonio, setViewAntonio] = useState(false);

  return (
    <Content>
      <Row>
        <Col lg={12}>
          {ofertaFiltro ? (
            <Oferta />
          ) : (
            <Fornecedor
              setMensagem={setMensagem}
              setViewAntonio={setViewAntonio}
              viewAntonio={viewAntonio}
            />
          )}
        </Col>
      </Row>
      <Antonio
        mensagem={mensagem}
        dica={viewAntonio}
        setDica={setViewAntonio}
      />
    </Content>
  );
}
