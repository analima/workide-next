import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Spacer } from '../../../../components/Spacer';
import { ListaRequisito } from '../ListaRequisito';
import { MaisOfertas } from '../MaisOfertas';
import { Oferta } from '../Oferta';
import { ServicoExtra } from '../ServicoExtra';
import { useCarrinhoConsumidor } from '../../../../hooks/carrinhoConsumidor';
import { Button, ContainerAcoes, Content, GhostButton } from './style';
import { IServicoInfo } from '../../../../interfaces/IServicoInfo';
import { AvatarErroGeral } from '../../../../components/AvatarErroGeral';
import { useAuth } from '../../../../contexts/auth';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { ModalAcceptProposal } from '../../../../components/ModalAcceptProposal';

import { Helmet } from 'react-helmet';

interface IProps {
  pacoteId: number;
  servicoInfo: IServicoInfo;
}

export function CarrinhoContent({ pacoteId, servicoInfo }: IProps) {
  const history = useHistory();
  const { user } = useAuth();
  const [showAvatar, setShowAvatar] = useState(false);
  const [showModalPagamento, setShowModalPagamento] = useState(false);
  const [idProjeto, setIdProjeto] = useState(0);
  const { setPacote, setServicoInfo, pacote, getValues } =
    useCarrinhoConsumidor();

  useEffect(() => {
    const pacoteEscolhido = servicoInfo.pacotes.filter(
      pacote => pacote.id === pacoteId,
    );
    setPacote(pacoteEscolhido[0]);
    setServicoInfo(servicoInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pacoteId]);

  function handleGetExtraServicesId() {
    const ids: number[] = [];
    servicoInfo?.servicos_extra?.forEach(extra => {
      if (getValues(`extra-${extra.id}`)) ids.push(extra.id);
    });
    return ids;
  }

  function handleShowAvatar() {
    setShowAvatar(!showAvatar);
  }

  async function handleCreateProject() {
    try {
      if (!getValues('acordo') && servicoInfo.requisitos.length) {
        handleShowAvatar();
        window.scrollTo(0, 800);
        throw new Error('Você precisa aceitar os requisitos');
      }
      const body = {
        id_servico: servicoInfo.id,
        id_pacote_servico: pacote.id,
        ids_servicos_extra: handleGetExtraServicesId(),
      };
      const response = await oportunidades_api.post('/projetos/servico', body);
      setIdProjeto(response.data.id);
      setShowModalPagamento(true);
    } catch (error: any) {
      console.error(error.response);
    }
  }

  return (
    <Content>
      <Helmet>
        <title>Gyan - Mais detalhes do serviço</title>
      </Helmet>
      <ModalAcceptProposal
        showModal={showModalPagamento}
        setShowModal={setShowModalPagamento}
        valor={Number(pacote.preco)}
        parcelas={1}
        tipo="servico"
        idPessoaConsumidor={user.id_pessoa}
        idPessoaFornecedor={servicoInfo.id_pessoa}
        descricao={`Pagamento de serviço - ${servicoInfo.nome}`}
        idProjeto={idProjeto}
        nomeProjeto={servicoInfo.nome}
      />
      <AvatarErroGeral
        mostrar={showAvatar}
        esconderAvatar={handleShowAvatar}
        mensagem="Você deve estar de acordo com todos requisitos do serviço."
      />
      <Row>
        <Col lg={12}>
          <Oferta />
        </Col>
      </Row>

      <Spacer size={64} />

      <Row>
        <Col lg={12}>
          <ListaRequisito />
        </Col>
      </Row>

      <Spacer size={64} />

      <Row>
        <Col lg={12}>
          <ServicoExtra />
        </Col>
      </Row>

      <Spacer size={64} />

      <Row>
        <Col lg={12}>
          <ContainerAcoes>
            <GhostButton onClick={() => history.goBack()}>VOLTAR</GhostButton>

            <Button
              onClick={() => {
                handleCreateProject();
              }}
            >
              IR PARA O PAGAMENTO
            </Button>
          </ContainerAcoes>
        </Col>
      </Row>

      <Spacer size={64} />

      <Row>
        <Col lg={12}>
          <MaisOfertas />
        </Col>
      </Row>
    </Content>
  );
}
