import { useCallback, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { Card } from '../../../../../components/Card';
import { ModalRecomendacao } from '../../../../../components/ModalRecomendacao';
import { Spacer } from '../../../../../components/Spacer';
import { Titulo } from '../../../../../components/Titulo';
import { useAuth } from '../../../../../contexts/auth';
import { useCadastroServico } from '../../../../../hooks/cadastroServico';
import { ofertas_api } from '../../../../../services/ofertas_api';
import { AZUL, CINZA_40, LARANJA } from '../../../../../styles/variaveis';

import { Button, ButtonLink, Content } from './style';

export function Compartilhe() {
  const [showModalRecomendacao, setShowModalRecomendacao] =
    useState<boolean>(false);
  const [link, setLink] = useState('');
  const { user } = useAuth();
  const { idServico } = useCadastroServico();

  const handleCompartilharServico = useCallback(
    (id_servico: any) => {
      ofertas_api
        .get<string>('/servicos/indicacao', {
          params: {
            idUsuario: user.id_usuario,
            idServico: id_servico,
          },
        })
        .then(response => {
          setLink(response.data);
          setShowModalRecomendacao(true);
        });
    },
    [user.id_usuario],
  );

  return (
    <Content>
      <ModalRecomendacao
        showModal={showModalRecomendacao}
        setShowModal={setShowModalRecomendacao}
        link={link}
      />
      <Titulo titulo="Compartilhe seu oferta" cor={AZUL} />

      <Spacer size={32} />

      <Row className="justify-content-center">
        <Col lg={6}>
          <Card>
            <Container>
              <Row>
                <Col lg={12} className="mb-3">
                  <Titulo titulo="Parabéns!" cor={LARANJA} />
                </Col>

                <Col lg={12} className="mb-3">
                  <Titulo
                    titulo="Seu serviço já está online. O que acha de divulgá-lo para
                    impulsionar suas vendas?"
                    cor={CINZA_40}
                    negrito={false}
                  />
                </Col>
              </Row>
            </Container>
          </Card>
        </Col>
      </Row>

      <Spacer size={52} />

      <Row>
        <Col lg={12} className="d-flex justify-content-center">
          <Button
            onClick={() => {
              handleCompartilharServico(idServico);
            }}
          >
            Compartilhar Oferta
          </Button>
        </Col>
        <Col lg={12} className="d-flex justify-content-center mt-2">
          <ButtonLink to="/fornecedor/meus-servicos">
            VOLTAR PARA MEUS SERVIÇOS
          </ButtonLink>
        </Col>
      </Row>

      <Spacer size={100} />
    </Content>
  );
}
