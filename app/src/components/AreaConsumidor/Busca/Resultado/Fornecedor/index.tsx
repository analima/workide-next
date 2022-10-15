import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { CardContainer } from './style';
import Content from './style';
import { useAuth } from '../../../../../contexts/auth';
import { AvatarCadastroIncompleto } from '../../../../AvatarCadastroIncompleto';
import { Card } from '../../../../Card';
import autoAnimate from '@formkit/auto-animate';
import { ItemVitrine } from '../../../../Vitrine';
import { Col, Row } from 'react-bootstrap';
import Paginacao from '../../../Home/MeusProjetos/Paginacao';
import Image from 'next/image';
import {
  AvatarContainer,
  ContentAvatar,
  Dialogo,
} from '../../../../Vitrine/style';
import Avatar from '../../../../CadastroComplementar/Apresentacao/style';
import Carol from '../../../../../assets/carol-full.svg';
import iconSelectPosition from '../../../../../assets/IconSelectPositionGrey.svg';
import { useBuscaFornecedorOferta } from '../../../../../hooks/buscaConsumidor';

export default function Fornecedor() {
  const parent = useRef(null);
  const [typeOrdenation, setTypeOrdenation] = useState(false);

  const history = useHistory();
  const {
    people,
    paginaPerfis,
    setOrder,
    setPaginaPerfis,
    totalPaginasPerfis,
  } = useBuscaFornecedorOferta();
  const { user } = useAuth();

  const [showAvatarCadastroIncompleto, setShowAvatarCadastroIncompleto] =
    useState(false);

  function handleShowAvatarCadastroIncompleto() {
    setShowAvatarCadastroIncompleto(!showAvatarCadastroIncompleto);
  }

  const handleRedirect = (type: string) => {
    if (type === 'geral') {
      history.push('/contratante/projetos/geral');
    } else if (type === 'exclusivo') {
      history.push('/contratante/projetos/exclusivo');
    }
  };

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  function handleOrderXp(ordered: boolean) {
    if (ordered) setOrder('&order=nivelExperienciaPeso=asc');
    if (!ordered) setOrder('&order=nivelExperienciaPeso=desc');
  }

  function handleOrder(ordered: boolean) {
    if (ordered) setOrder('&order=avaliacaoFornecedor=asc');
    if (!ordered) setOrder('&order=avaliacaoFornecedor=desc');
  }

  return (
    <Content>
      <AvatarCadastroIncompleto
        mostrar={showAvatarCadastroIncompleto}
        esconderAvatar={handleShowAvatarCadastroIncompleto}
        porcentagem={user.percentageRegisterConsumer || 33}
        isConsumer={true}
      />
      <Row className="d-flex align-items-center justify-content-center">
        <Col lg={12}>
          {people.length > 0 ? (
            <>
              <div className="ordenation">
                <div
                  className="nivel"
                  onClick={() => {
                    setTypeOrdenation(!typeOrdenation);
                    handleOrderXp(typeOrdenation);
                  }}
                >
                  <Image
                    className="icone"
                    src={iconSelectPosition}
                    alt="Ordernation"
                    width={20}
                    height={20}
                  />
                  <span>Nível de Experiência</span>
                </div>

                <div className="avaliation">
                  <Image
                    className="icone"
                    src={iconSelectPosition}
                    alt="Ordernation"
                    width={20}
                    height={20}
                    onClick={() => {
                      setTypeOrdenation(!typeOrdenation);
                      handleOrder(typeOrdenation);
                    }}
                  />
                  <span>Avaliações</span>
                </div>
              </div>
              <CardContainer ref={parent} quantidadeItem={people.length}>
                {people.length > 0 &&
                  people.map(item => <ItemVitrine item={item} key={item.id} />)}
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
                  <Image src={Carol} alt="avatar carol" />
                </Avatar>
              </AvatarContainer>
            </Card>
          )}
        </Col>
      </Row>
    </Content>
  );
}
