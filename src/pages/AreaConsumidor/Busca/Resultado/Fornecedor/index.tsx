import { useState } from 'react';
import { useHistory } from 'react-router';
import { ContainerHeader, Button, CardContainer } from './style';
import Content from './style';
import { useAuth } from '../../../../../contexts/auth';
import { AvatarCadastroIncompleto } from '../../../../../components/AvatarCadastroIncompleto';
import { Card } from '../../../../../components/Card';
import { ItemVitrine } from '../../../../../components/Vitrine';
import { Col, Row } from 'react-bootstrap';
import Paginacao from '../../../Home/MeusProjetos/Paginacao';
import {
  AvatarContainer,
  ContentAvatar,
  Dialogo,
} from '../../../../../components/Vitrine/style';
import Avatar from '../../../../CadastroComplementar/Apresentacao/style';
import Carol from '../../../../../assets/carol-full.svg';
import { useBuscaFornecedorOferta } from '../../../../../hooks/buscaConsumidor';

export default function Fornecedor() {
  const history = useHistory();
  const { people, paginaPerfis, setPaginaPerfis, totalPaginasPerfis } =
    useBuscaFornecedorOferta();

  const { user } = useAuth();
  const [showAvatarCadastroIncompleto, setShowAvatarCadastroIncompleto] =
    useState(false);

  function handleShowAvatarCadastroIncompleto() {
    setShowAvatarCadastroIncompleto(!showAvatarCadastroIncompleto);
  }

  const handleRedirect = (type: string) => {
    if (type === 'geral') {
      history.push('/consumidor/projetos/geral');
    } else if (type === 'exclusivo') {
      history.push('/consumidor/projetos/exclusivo');
    }
  };
  return (
    <Content>
      <AvatarCadastroIncompleto
        mostrar={showAvatarCadastroIncompleto}
        esconderAvatar={handleShowAvatarCadastroIncompleto}
        porcentagem={user.percentageRegisterConsumer || 33}
        isConsumer={true}
      />
      <Row className="d-flex align-items-center justify-content-center">
        <Col lg={11}>
          {people.length > 0 ? (
            <>
              <CardContainer quantidadeItem={people.length}>
                {people.map(item => (
                  <ItemVitrine item={item} key={item.id} />
                ))}
              </CardContainer>
              <Row className="mt-3">
                <Col lg={12}>
                  <Paginacao
                    totalPaginas={totalPaginasPerfis}
                    pagina={paginaPerfis}
                    setPagina={setPaginaPerfis}
                  />
                </Col>
              </Row>
            </>
          ) : (
            <Card>
              <AvatarContainer full>
                <Dialogo>
                  <ContentAvatar>
                    <p>
                      Opa.. Parece que não encontramos uma o que você procurava.
                      O que acha de fazer uma nova busca ?
                      <br />
                      <br />
                      Ou se o seu problema for bem específico fique a vontade
                      para publicar um novo projeto.
                    </p>
                  </ContentAvatar>
                </Dialogo>
                <Avatar>
                  <Carol />
                </Avatar>
              </AvatarContainer>
            </Card>
          )}
        </Col>
      </Row>
      <ContainerHeader>
        <p>Não encontrou o que procurava ?</p>
        <Button
          onClick={() => {
            if (!user.id_pessoa) {
              history.push('/cadastro-basico');

              return;
            }
            if (
              user.percentageRegisterConsumer &&
              user.percentageRegisterConsumer < 66
            ) {
              handleShowAvatarCadastroIncompleto();
              return;
            }
            handleRedirect('geral');
          }}
        >
          PUBLIQUE UM NOVO PROJETO
        </Button>
      </ContainerHeader>
    </Content>
  );
}
