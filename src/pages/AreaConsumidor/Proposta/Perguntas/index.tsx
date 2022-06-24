import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Card } from '../../../../components/Card';
import { CardPergunta } from '../../../../components/CardPergunta';
import { ToggleSwitch } from '../../../../components/Form/ToggleSwitch';
import { ScrollContainer } from '../../../../components/ScrollContainer';
import { Spacer } from '../../../../components/Spacer';
import { Titulo } from '../../../../components/Titulo';
import { usePropostaConsumidor } from '../../../../hooks/propostaConsumidor';
import { LARANJA, VERDE } from '../../../../styles/variaveis';
import { NumeroRegistros } from './style';
import Content from './style';

interface IPergunta {
  perguntas: IPerguntaRespostaProps[];
}

interface IPerguntaRespostaProps {
  pergunta: IPerguntaProps;
  resposta?: IRespostaProps;
}

interface IPerguntaProps {
  id: number;
  data: string;
  texto: string;
  autor: string;
}

interface IRespostaProps {
  id?: number;
  id_pergunta?: number;
  data?: string;
  texto?: string;
  autor?: string;
}

export default function Perguntas({ perguntas }: IPergunta) {
  const [loading, setLoading] = useState(true);
  const { control, getValues } = usePropostaConsumidor();

  const [desabilita, setDesabilita] = useState(false);

  const excluir = () => {
    alert('Excluiu');
  };

  const desabilitaPerguntas = () => {
    setDesabilita(getValues('desabilita_perguntas'));
  };

  return (
    <Content>
      <Card>
        <Row className="d-flex align-items-center">
          <Col lg={5} xs={12}>
            <Titulo titulo="Perguntas" cor={VERDE} tamanho={24} />
          </Col>
          <Col lg={6} xs={9}>
            <ToggleSwitch
              control={control}
              name="desabilita_perguntas"
              label="Permitir perguntas"
              change={desabilitaPerguntas}
            />
          </Col>
          <Col lg={1} xs={1}>
            <NumeroRegistros>2</NumeroRegistros>
          </Col>
        </Row>

        <Spacer size={52} />

        <Row>
          <ScrollContainer height={400}>
            {desabilita ? (
              <Titulo
                titulo="As perguntas foram desativadas"
                cor={LARANJA}
                tamanho={24}
              />
            ) : (
              <>
                {perguntas.map((item, index) => (
                  <div key={index}>
                    <Col lg={12}>
                      <CardPergunta
                        setLoading={setLoading}
                        loading={loading}
                        inputProps={{
                          control: control,
                          name: `pergunta-${item.pergunta.id}`,
                        }}
                        perguntas={{
                          id: 1,
                          idProjeto: 1,
                          descricao: 'Descrição aqui',
                          resposta: 'Resposta aqui',
                          quemPergunta: { id: 1, nomeTratamento: 'João' },
                          dataHoraCriacao: '21/01/2022',
                          dataHoraResposta: '21/01/2022',
                        }}
                        excluir={excluir}
                      />
                    </Col>

                    <Spacer size={32} />
                  </div>
                ))}
              </>
            )}
          </ScrollContainer>
        </Row>
      </Card>
    </Content>
  );
}
