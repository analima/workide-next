import { Col, Row } from 'react-bootstrap';
import Oferta from './Oferta';
import Fornecedor from './Fornecedor';
import { useEffect, useRef, useState } from 'react';
import { Antonio } from '../../../Antonio';
import { useBuscaFornecedorOferta } from '../../../../hooks/buscaConsumidor';
import autoAnimate from '@formkit/auto-animate';
import { Content } from './style';

export default interface IFiltroFornecedor {
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

export default function NovoFiltro() {
  const { ofertaFiltro } = useBuscaFornecedorOferta();
  const parent = useRef(null);

  const [mensagem, setMensagem] = useState<string>('');
  const [viewAntonio, setViewAntonio] = useState(false);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <Content>
      <Row>
        <Col lg={12} ref={parent}>
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
