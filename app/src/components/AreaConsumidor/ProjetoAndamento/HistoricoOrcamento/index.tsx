import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import Perguntas from './Perguntas';
import Propostas from './Propostas';
import Content from './style';

interface IProps {
  id_projeto: number;
}

interface IPropostasProps {
  id: number;
  valor: number;
  dataHoraCriacao: string;
  status: {
    codigo: string;
    descricao: string;
  };
  idPessoaFornecedor: number;
  parcelas: number;
  idProjeto: number;
}

export default function HistoricoOrcamento({ id_projeto }: IProps) {
  const [propostas, setPropostas] = useState<IPropostasProps[]>([]);

  useEffect(() => {
    if (id_projeto) {
      oportunidades_api
        .get<{ values: IPropostasProps[] }>(`/projetos/${id_projeto}/propostas`)
        .then(({ data }) => {
          setPropostas(data.values);
        });
    }
  }, [id_projeto]);

  return (
    <Content>
      <Row>
        <Col lg={8} className="mt-4">
          <Perguntas />
        </Col>
        <Col lg={4} className="mt-4">
          <Propostas propostas={propostas} />
        </Col>
      </Row>
    </Content>
  );
}
