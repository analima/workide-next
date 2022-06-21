import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Card } from '../../../../../components/Card';
import { ProposalCard } from '../../../../../components/ProposalCard';
import { ScrollContainer } from '../../../../../components/ScrollContainer';
import { Spacer } from '../../../../../components/Spacer';
import { Titulo } from '../../../../../components/Titulo';
import { usePropostaConsumidor } from '../../../../../hooks/propostaConsumidor';
import { PRETO_10, VERDE } from '../../../../../styles/variaveis';
import { Content, MobileCenter, NumeroRegistros } from './style';

interface IProposta {
  propostas: IPropostasProps[];
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

export function Propostas({ propostas }: IProposta) {
  const { dadosProjetos } = usePropostaConsumidor();
  const [propostasComTaxas, setPropostasComTaxas] = useState(propostas);

  useEffect(() => {
    (async function getDadosProjetosComTaxa() {
      const taxas = await Promise.all(
        propostas.map(async proposta => {
          return {
            ...proposta,
            valor: proposta.valor / (1 - 0.12) - proposta.valor > 14 ? proposta.valor / (1 - 0.12) : proposta.valor + 14,
          };
        }),
      );
      setPropostasComTaxas(taxas);
    })();
  }, [propostas]);

  return (
    <Content>
      <Card>
        <Row>
          <Col lg={10}>
            <Titulo titulo="Propostas" cor={PRETO_10} tamanho={24} />
          </Col>
          <Col lg={2}>
            <MobileCenter>
              <NumeroRegistros>
                {!dadosProjetos.origemServico ? propostas.length : 0}
              </NumeroRegistros>
            </MobileCenter>
          </Col>
        </Row>

        <Spacer size={52} />

        {propostasComTaxas.length > 0 && !dadosProjetos.origemServico ? (
          <ScrollContainer height={400}>
            {propostasComTaxas.map((item: any) => (
              <Row className="mb-4" key={item.id}>
                <Col lg={12}>
                  <ProposalCard
                    portion={item.parcelas}
                    value={item.valor}
                    status={item.status.codigo}
                    date={item.dataHoraCriacao}
                    id_fornecedor={item.idPessoaFornecedor}
                    id_projeto={item.idProjeto}
                    id_proposta={item.id}
                    isProbono={dadosProjetos.proBono}
                  />
                </Col>
              </Row>
            ))}
          </ScrollContainer>
        ) : (
          <Row className="mb-3">
            <Col lg={12} className="d-flex justify-content-center">
              <Titulo
                titulo="Nenhuma proposta encontrada"
                cor={VERDE}
                tamanho={16}
              />
            </Col>
          </Row>
        )}
      </Card>
    </Content>
  );
}
