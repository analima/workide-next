import { useCallback, useEffect, useState } from 'react';
import { Col, Container, OverlayTrigger, Row } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import {
  IPacoteInfo,
  IItens,
  IServicoInfo,
} from '../../../../interfaces/IServicoInfo';
import { AZUL, CINZA_50, LARANJA } from '../../../../styles/variaveis';
import { formatarValor } from '../../../../utils/CurrencyFormat';
import { FiHeart, FiShare2 } from 'react-icons/fi';
import Venda from '../../../../assets/venda.svg';

import {
  Descricao,
  DescricaoRodape,
  DescricaoTexto,
  ButtonPacote,
  ContentValue,
  ContentInfo,
  Button,
  LabelInfo,
  TooltipMember,
  ContentButton,
} from './style';
import Content from './style';
import { useAuth } from '../../../../contexts/auth';
import { useHistory } from 'react-router';
import { ModalRecomendacao } from '../../../ModalRecomendacao';
import { salvarOrigemAcesso } from 'src/utils/origemAcesso';

interface IItem {
  pacote: IPacoteInfo[];
  open?: boolean;
  itens?: IItens[];
  favoritos: number;
  compartilhamentos: number;
  projetosIniciados: number;
  servicoInfo: IServicoInfo;
  loadServico: () => void;
}

export default function TooltipPacotes({
  pacote,
  itens,
  favoritos,
  compartilhamentos,
  open = false,
  projetosIniciados,
  servicoInfo,
  loadServico,
}: IItem) {
  const { user } = useAuth();
  const history = useHistory();
  const [idPacote, setIdPacote] = useState(0);
  const [sizePage, setSizePage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [link, setLink] = useState('');

  useEffect(() => {
    if (pacote) {
      setIdPacote(pacote[0].id);
    }
  }, [pacote]);

  const handleResize = (e: any) => {
    setSizePage(window.innerWidth);
  };

  useEffect(() => {
    setSizePage(window.innerWidth);
    window.addEventListener('resize', handleResize);
  }, []);

  const handleOpenShareLink = useCallback(() => {
    const urlAtual = window.location.href;
    setLink(urlAtual);
    setShowModal(true);
  }, []);

  useEffect(() => {
    if (showModal) {
      loadServico();
    }
  }, [loadServico, showModal]);

  return (
    <Content sizePage={sizePage} user={!user.id_pessoa}>
      <ModalRecomendacao
        showModal={showModal}
        setShowModal={setShowModal}
        link={link}
        serviceId={servicoInfo.id}
        loadServico={loadServico}
      />
      <Container>
        <Row>
          <Col lg={12} className="d-flex gap-2 col-btn-descricao">
            <ContentButton>
              {pacote.map((item: IPacoteInfo) => (
                <ButtonPacote
                  key={item.id}
                  active={item.id === idPacote}
                  onClick={() => setIdPacote(item.id)}
                >
                  {item.nome}
                </ButtonPacote>
              ))}
            </ContentButton>
          </Col>

          {pacote
            .filter(pac => pac.id === idPacote)
            .map(i => (
              <Col lg={12} className="col-box-descricao" key={i.id}>
                <Descricao>
                  <DescricaoTexto>{i.descricao}</DescricaoTexto>

                  <DescricaoRodape>
                    {itens
                      ?.filter(f => f.basico && i.tipo === 'BASICO')
                      .map(item => (
                        <div key={item.id}>
                          <FaCheckCircle color={AZUL} size={16} />
                          <span>{item.descricao}</span>
                        </div>
                      ))}

                    {itens
                      ?.filter(
                        f => f.intermediario && i.tipo === 'INTERMEDIARIO',
                      )
                      .map(item => (
                        <div key={item.id}>
                          <FaCheckCircle color={AZUL} size={16} />
                          <span>{item.descricao}</span>
                        </div>
                      ))}

                    {itens
                      ?.filter(f => f.avancado && i.tipo === 'AVANCADO')
                      .map(item => (
                        <div key={item.id}>
                          <FaCheckCircle color={AZUL} size={16} />
                          <span>{item.descricao}</span>
                        </div>
                      ))}
                  </DescricaoRodape>
                  <ContentValue>
                    <span>
                      Prazo de entrega: <b>{i.prazo} dias</b>
                    </span>
                    <strong>
                      {formatarValor(
                        Number(i.preco) / (1 - 0.12) - Number(i.preco) > 14
                          ? Number(i.preco) / (1 - 0.12)
                          : Number(i.preco) + 14,
                      )}
                    </strong>
                  </ContentValue>

                  <ContentInfo>
                    <div>
                      <OverlayTrigger
                        key={1}
                        overlay={
                          <TooltipMember>Negócios fechados</TooltipMember>
                        }
                      >
                        <Venda />
                      </OverlayTrigger>
                      <LabelInfo cor={CINZA_50}>{projetosIniciados}</LabelInfo>
                    </div>
                    <div>
                      <OverlayTrigger
                        key={2}
                        overlay={<TooltipMember>Favoritos</TooltipMember>}
                      >
                        <FiHeart size={32} color={LARANJA} />
                      </OverlayTrigger>
                      <LabelInfo cor={LARANJA}>{favoritos}</LabelInfo>
                    </div>

                    <div>
                      <OverlayTrigger
                        key={3}
                        overlay={<TooltipMember>Compartilhar</TooltipMember>}
                      >
                        <FiShare2
                          size={32}
                          color={AZUL}
                          onClick={() => handleOpenShareLink()}
                        />
                      </OverlayTrigger>
                      <LabelInfo cor={AZUL}>{compartilhamentos}</LabelInfo>
                    </div>

                    {user.id_pessoa !== servicoInfo.id_pessoa && (
                      <Button
                        onClick={() => {
                          if (!user.id_pessoa) {
                            salvarOrigemAcesso();
                            history.push('/cadastro-basico');
                            return;
                          }

                          if (user && user.id === undefined) {
                            salvarOrigemAcesso();
                            history.push('/login');
                          } else {
                            history.push('/contratante/detalhes-oferta', {
                              pacoteId: i.id,
                              servicoInfo: servicoInfo,
                            });
                          }
                        }}
                      >
                        COMPRAR AGORA
                      </Button>
                    )}
                  </ContentInfo>
                </Descricao>
              </Col>
            ))}
        </Row>
      </Container>
    </Content>
  );
}
