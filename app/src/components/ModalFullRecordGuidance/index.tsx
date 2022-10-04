import { Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import { Titulo } from '../Titulo';
import {
  Content,
  BodyModal,
  ContentHeader,
  ContentGuidance,
  Percentage,
  MessageGuidance,
  ContentFooter,
  BidsButton,
  ModalPercentage,
} from './style';
import { info, infoConsumidor } from './configuration';
import { Spacer } from '../Spacer';
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/auth';

interface IModalRecomendacao {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  id_usuario: any;
  tipo?: string;
}

export function ModalFullRecordGuidance({
  showModal,
  setShowModal,
  tipo,
}: IModalRecomendacao) {
  // eslint-disable-next-line
  const [mensagem, setMensagem] = useState(
    'Olá amigo(a), como vai? Gostaria de compartilhar com você esse ideia. Estou usando uma plataforma muito legal chamada Freelas.town. Lá você encontrará muita coisa legal que vai te ajudar. Se cuida, abraço!',
  );
  const history = useHistory();
  const { user } = useAuth();

  const handleClose = () => setShowModal(false);

  return (
    <Content>
      <ModalPercentage
        show={showModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        {!tipo ? (
          <BodyModal>
            <ContentHeader>
              <Titulo
                titulo="Como completar meu cadastro ?"
                tamanho={25}
                cor="rgba(0, 143, 229, 1)"
              />
            </ContentHeader>

            <Row className="mb-12">
              <Col lg={12} className="mb-3">
                <Titulo
                  titulo="Confira abaixo como está seu perfil hoje"
                  tamanho={16}
                  cor="#666666"
                />
              </Col>
            </Row>
            <ContentGuidance>
              {info.map((item, index) => (
                <div key={index}>
                  <Percentage>{item.percentage} %</Percentage>
                  <MessageGuidance>{item.message}</MessageGuidance>
                </div>
              ))}
              <Titulo
                titulo="Conta verificada. Seu perfil começa a ser exibido para a busca dos consumidores."
                tamanho={12}
                cor="#00C09E"
              />
              <Spacer size={10} />
              <div>
                <Percentage isConcluded>100 %</Percentage>
                <MessageGuidance>Cadastro da primeira oferta</MessageGuidance>
              </div>
            </ContentGuidance>
            <Row>
              <ContentFooter>
                <Titulo
                  titulo="Bora deixar esse perfil lindão!?"
                  tamanho={14}
                  cor="#666666"
                />
                <BidsButton
                  onClick={() =>
                    history.push('/cadastro-complementar', {
                      cadastroCompleto: true,
                      selectAba: 0,
                      isConsumidor: false,
                      porcentagem: user.percentageRegisterProvider,
                    })
                  }
                >
                  EDITAR PERFIL
                </BidsButton>
              </ContentFooter>
            </Row>
          </BodyModal>
        ) : (
          <BodyModal>
            <ContentHeader>
              <Titulo
                titulo="Como completar meu cadastro ?"
                tamanho={25}
                cor="rgba(0, 143, 229, 1)"
              />
            </ContentHeader>

            <Row className="mb-12">
              <Col lg={12} className="mb-3">
                <Titulo
                  titulo="Confira abaixo como está seu perfil hoje"
                  tamanho={16}
                  cor="#666666"
                />
              </Col>
            </Row>
            <ContentGuidance>
              {infoConsumidor.map((item, index) => (
                <div key={index}>
                  <Percentage>{item.percentage} %</Percentage>
                  <MessageGuidance>{item.message}</MessageGuidance>
                </div>
              ))}
              <div>
                <Percentage isConcluded>100 %</Percentage>
                <MessageGuidance>Cadastro da primeira oferta</MessageGuidance>
              </div>
            </ContentGuidance>
            <Row>
              <ContentFooter>
                <Titulo
                  titulo="Bora deixar esse perfil lindão!?"
                  tamanho={14}
                  cor="#666666"
                />
                <BidsButton
                  onClick={() =>
                    history.push('/cadastro-complementar', {
                      cadastroCompleto: true,
                      selectAba: 0,
                      isConsumidor: true,
                      porcentagem: user.percentageRegisterProvider,
                    })
                  }
                >
                  EDITAR PERFIL
                </BidsButton>
              </ContentFooter>
            </Row>
          </BodyModal>
        )}
      </ModalPercentage>
    </Content>
  );
}
