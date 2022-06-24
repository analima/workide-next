import { useForm } from 'react-hook-form';
import { Card } from '../../../../components/Card';
import { CardExperiencia } from '../../../../components/CardExperiencia';
import { ButtonCancel } from './style';
import Content from './style';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Layout from '../../Layout';
import { Col, Row } from 'react-bootstrap';
import { Anexo } from '../../../../components/Anexo';
import { Spacer } from '../../../../components/Spacer';
import { ModalExcludConfirmation } from '../../../../components/ModalExcludConfirmation';
import { useCallback, useEffect, useState } from 'react';
import { Titulo } from '../../../../components/Titulo';
import { CardPergunta } from '../../../../components/CardPergunta';
import { ScrollContainer } from '../../../../components/ScrollContainer';
import { Label } from '../../../../components/Label';
import { InputRange } from '../../../../components/Form/InputRange';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';

export default function Novo() {
  const schema = Yup.object().shape({});
  const [loading, setLoading] = useState(true);

  const [showModalConfirmation, setShowModalConfirmation] =
    useState<boolean>(false);
  const {
    control,
    setValue,
    // handleSubmit,
    // reset,
    // watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const excluir = useCallback(() => {
    setShowModalConfirmation(true);
  }, []);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/consumidor/projeto/novo');
  }, []);

  return (
    <Content>
      <Helmet>
        <title>Gyan - Crie um novo projeto</title>
      </Helmet>
      <Layout titulo="ESTA TELA É APENAS PARA DEBUG" activeMenu={true}>
        <Card>
          <Row>
            <Col lg={3}>
              <CardExperiencia
                control={control}
                name="basico"
                titulo="Básico"
                descricao="Profissional iniciante. Você vai encontrar bom preço, mas talvez
                necessite paciencia para lidar com prazos e retrabalhos."
              />
            </Col>

            <Col lg={3}>
              <CardExperiencia
                control={control}
                name="intermediario"
                titulo="Intermediário"
                descricao="Profissional iniciante. Você vai encontrar bom preço, mas talvez
                necessite paciencia para lidar com prazos e retrabalhos."
              />
            </Col>

            <Col lg={3}>
              <CardExperiencia
                control={control}
                name="avancado"
                titulo="Avançado "
                descricao="Profissional iniciante. Você vai encontrar bom preço, mas talvez
                necessite paciencia para lidar com prazos e retrabalhos."
              />
            </Col>

            <Col lg={3}>
              <CardExperiencia
                control={control}
                name="especialista"
                titulo="Especialista"
                descricao="Profissional iniciante. Você vai encontrar bom preço, mas talvez
                necessite paciencia para lidar com prazos e retrabalhos."
              />
            </Col>
          </Row>

          <Spacer size={24} />

          <Row>
            <Col lg={12}>
              <Anexo
                control={control}
                name="anexo"
                setValue={setValue}
                label="Anexe aqui um arquivo que deseja enviar para esse projeto."
                error={errors.anexo && errors.anexo.message}
              />
            </Col>
          </Row>
          <Spacer size={20} />
          <Titulo titulo="Modais" tamanho={28} />
          <Spacer size={20} />

          <ButtonCancel
            onClick={() => {
              setShowModalConfirmation(!showModalConfirmation);
            }}
          >
            Confirmar exclusão
          </ButtonCancel>

          <Spacer size={24} />

          <Row>
            <ScrollContainer height={400}>
              <Col lg={7}>
                <CardPergunta
                  inputProps={{ control: control, name: 'pergunta-1' }}
                  setLoading={setLoading}
                  loading={loading}
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

              <Col lg={7}>
                <CardPergunta
                  inputProps={{ control: control, name: 'pergunta-1' }}
                  setLoading={setLoading}
                  loading={loading}
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
            </ScrollContainer>
          </Row>

          <Spacer size={32} />

          <Row>
            <Col lg={6}>
              <Label label="Figma" negrito={true} />
              <Label label="Design System" />
              <Label label="Paleta de Cores" />
              <Label label="Componentização" />
              <Label label="Pontualidade" />
              <Label label="Figma" negrito={true} />
              <Label label="Design System" />
              <Label label="Paleta de Cores" />
              <Label label="Componentização" />
              <Label label="Pontualidade" />
            </Col>
          </Row>

          <Spacer size={32} />

          <Row>
            <Col lg={6}>
              <InputRange
                label="Valor mínimo"
                control={control}
                name="minimo"
                min={0}
                max={1000}
              />
            </Col>
            <Col lg={6}>
              <InputRange
                label="Valor máximo"
                control={control}
                name="maximo"
                min={0}
                max={1000}
              />
            </Col>
          </Row>
        </Card>
      </Layout>

      {/* MODAIS */}

      <ModalExcludConfirmation
        showModal={showModalConfirmation}
        setShowModal={setShowModalConfirmation}
        id_usuario={1}
        title="Confirmar exclusão"
        text="Todas as proostas serão perdida. Tem certeza que deseja excluir ?"
      />

      <ModalExcludConfirmation
        showModal={showModalConfirmation}
        setShowModal={setShowModalConfirmation}
        id_usuario={1}
        title="Deseja confirmar a resposta?"
        text="Uma vez confirmada a resposta não poderá ser alterada."
      />
    </Content>
  );
}
