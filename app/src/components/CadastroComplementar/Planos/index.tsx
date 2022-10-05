import { Col, Container, Row } from 'react-bootstrap';
import { Spacer } from '../../../components/Spacer';
import { Button, LinkBtn } from './style';
import Content from './style';
import CheckBranco from '../../../assets/check-branco.svg';
import CirculoCinza from '../../../assets/circulo-cinza.svg';
import Image from 'next/image';
import { Template } from '../../../components/Template';
import { useCallback, useEffect, useState } from 'react';
import { pessoas_api } from '../../../services/pessoas_api';
import { useAuth } from '../../../contexts/auth';
import { PlanoPro } from '../../../components/PlanoPro';
import { PlanoPremium } from '../../../components/PlanoPremium';
import { PlanoBasico } from '../../../components/PlanoBasico';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';

export default function Planos() {
  const { user } = useAuth();

  const [plano, setPlano] = useState('BASICO');

  useEffect(() => {
    setPlano(user.plano || 'BASICO');
  }, [user.plano]);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/planos');
  }, []);

  const handleAlterarPlano = useCallback(
    async (id_plano: number) => {
      await pessoas_api.post(`/pessoas/${user.id_pessoa}/planos`, { id_plano });

      if (id_plano === 1) {
        setPlano('BASICO');
      } else if (id_plano === 2) {
        setPlano('PRO');
      } else if (id_plano === 3) {
        setPlano('PREMIUM');
      }
    },
    [user],
  );

  return (
    <Template>
      <Helmet>
        <title>freelas town - Veja os nossos planos</title>
      </Helmet>
      <Content>
        <Container>
          <h1>
            Deseja ir ao Dashboard ou prefere potencializar suas chances <br />{' '}
            adicionando suas Informações Complementares agora?
          </h1>
          <Row className="mt-4">
            <Col lg={4}>
              <div className="box-plano">
                {plano === 'BASICO' && (
                  <div className="descricao selected">
                    VOCÊ ESTÁ AQUI
                    <Image src={CheckBranco} alt="check" />
                  </div>
                )}
                {plano !== 'BASICO' && (
                  <div
                    className="descricao"
                    onClick={() => handleAlterarPlano(1)}
                  >
                    MIGRE PARA O BASICO{' '}
                    <Image src={CirculoCinza} alt="Circulo" />
                  </div>
                )}
                <PlanoBasico />
              </div>
            </Col>
            <Col lg={4}>
              <div className="box-plano">
                {plano === 'PRO' && (
                  <div className="descricao selected">
                    VOCÊ ESTÁ AQUI
                    <Image src={CheckBranco} alt="check" />
                  </div>
                )}
                {plano !== 'PRO' && (
                  <div
                    className="descricao"
                    onClick={() => handleAlterarPlano(2)}
                  >
                    MIGRE PARA O PRO <Image src={CirculoCinza} alt="Circulo" />
                  </div>
                )}
                <PlanoPro />
              </div>
            </Col>
            <Col lg={4}>
              <div className="box-plano">
                {plano === 'PREMIUM' && (
                  <div className="descricao selected">
                    VOCÊ ESTÁ AQUI
                    <Image src={CheckBranco} alt="check" />
                  </div>
                )}
                {plano !== 'PREMIUM' && (
                  <div
                    className="descricao"
                    onClick={() => handleAlterarPlano(3)}
                  >
                    MIGRE PARA O PREMIUM{' '}
                    <Image src={CirculoCinza} alt="Circulo" />
                  </div>
                )}
                <PlanoPremium />
              </div>
            </Col>
          </Row>

          <Spacer size={80} />

          <Row>
            <Col lg={12} className="d-flex justify-content-center">
              <Button to="cadastro-complementar">
                COMPLETE SEU CADASTRO AGORA
              </Button>
            </Col>
            <LinkBtn to="consumidor/home">
              CADASTRE-SE COMO CONSUMIDOR E BUSQUE UMA SOLUÇÃO
            </LinkBtn>
          </Row>

          <Spacer size={80} />
        </Container>
      </Content>
    </Template>
  );
}
