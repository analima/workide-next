import { Col, Row } from 'react-bootstrap';
import { Card } from '../../../../Card';
import { CardPergunta } from '../../../../CardPergunta';
import { ScrollContainer } from '../../../../ScrollContainer';
import { Spacer } from '../../../../Spacer';
import { Titulo } from '../../../../Titulo';
import { PRETO_10, VERDE } from '../../../../../styles/variaveis';
import { MobileCenter, NumeroRegistros } from './style';
import Content from './style';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePropostaConsumidor } from '../../../../../hooks/propostaConsumidor';
import { oportunidades_api } from '../../../../../services/oportunidades_api';
import { useEffect, useState } from 'react';
import { ToggleSwitch } from '../../../../ToggleSwitch';

interface IPerguntasProps {
  id: number;
  idProjeto: number;
  descricao: string;
  resposta: string;
  quemPergunta: QuemPerguntaProps;
  dataHoraCriacao: string;
  dataHoraResposta: string;
}

interface QuemPerguntaProps {
  id: number;
  nomeTratamento: string;
}

export default function Perguntas() {
  const [perguntas, setPerguntas] = useState<IPerguntasProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [exibirPerguntas, setExibirPerguntas] = useState<boolean>(true);
  const schema = Yup.object().shape({});
  const { dadosProjetos } = usePropostaConsumidor();

  const {
    control,
    // formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handlePermitePerguntas() {
    const res = await oportunidades_api.patch(
      `projetos/${dadosProjetos.id}/permitir-perguntas`,
    );
    if (res.status === 204) {
      setExibirPerguntas(!exibirPerguntas);
    }
  }

  useEffect(() => {
    setExibirPerguntas(dadosProjetos.permitePerguntas);
  }, [dadosProjetos.permitePerguntas]);

  useEffect(() => {
    if (dadosProjetos.id) {
      oportunidades_api
        .get<{ values: IPerguntasProps[] }>(
          `/projetos/${dadosProjetos.id}/perguntas`,
        )
        .then(({ data }) => {
          setPerguntas(data.values);
          setLoading(false);
        });
    }
  }, [dadosProjetos, dadosProjetos.id, loading]);

  return (
    <Content>
      <Card>
        <Row className="d-flex align-items-center">
          <Col lg={5} xs={12}>
            <Titulo titulo="Perguntas" cor={PRETO_10} tamanho={24} />
          </Col>
          <Col lg={6} xs={12}>
            <ToggleSwitch
              label="Permitir Perguntas"
              change={() => handlePermitePerguntas()}
              checked={exibirPerguntas}
            />
          </Col>
          <Col lg={1} xs={12}>
            <MobileCenter>
              <NumeroRegistros>{perguntas.length}</NumeroRegistros>
            </MobileCenter>
          </Col>
        </Row>

        <Spacer size={52} />

        <Row>
          {perguntas.length > 0 && exibirPerguntas ? (
            <ScrollContainer height={400}>
              {perguntas.map((item, index) => (
                <div key={index}>
                  <Col lg={12}>
                    <CardPergunta
                      inputProps={{
                        control: control,
                        name: `pergunta`,
                      }}
                      perguntas={item}
                      id_projeto={dadosProjetos.id}
                      setLoading={setLoading}
                      loading={loading}
                    />
                  </Col>
                  <Spacer size={32} />
                </div>
              ))}
            </ScrollContainer>
          ) : (
            <Row className="mb-3">
              <Col lg={12} className="d-flex justify-content-center">
                <Titulo
                  titulo={
                    !exibirPerguntas
                      ? 'As perguntas foram desativadas'
                      : 'Nenhuma pergunta encontrada'
                  }
                  cor={VERDE}
                  tamanho={16}
                />
              </Col>
            </Row>
          )}
        </Row>
      </Card>
    </Content>
  );
}
