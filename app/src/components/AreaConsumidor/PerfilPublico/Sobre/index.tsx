import { Col, Container, Row } from 'react-bootstrap';
import { Titulo } from '../../../Titulo';
import {
  Avaliacao,
  FotoPerfil,
  Medalhas,
  SobreDrescricao,
  ContentImg,
} from './style';
import Content from './style';
import EstrelaOff from '../../../../assets/estrela-off.svg';
import Estrela from '../../../../assets/estrela.svg';
import { AZUL } from '../../../../styles/variaveis';
import { Card } from '../../../Card';
import { Medalha } from '../../../Medalha';
import { useEffect, useState } from 'react';
import { arquivos_api } from '../../../../services/arquivos_api';
import { useAuth } from '../../../../contexts/auth';
import { geral_api } from '../../../../services/geral_api';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { Skeleton } from '../../../Skeleton';
import { SeloMembro } from '../../../SeloMembro';
import { IS_EMPTY } from 'src/const';

type PerfilConsumidorProps = {
  dataProps: {
    id: number;
    nome: string;
    nome_tratamento: string;
    resumo_profissional: string;
    url_video_apresentacao: string | null;
    usuario: UserProps;
    id_arquivo?: string | null;
    idPessoa: number;
    is_membro: boolean;
  };
};
type UserProps = {
  id: number;
  email: string;
  tipo: string;
};

export default function Sobre({ dataProps }: PerfilConsumidorProps) {
  const [img, setImg] = useState('');
  const [hasPrimeiroProjetoMedal, setHasPrimeiroProjeto] = useState(false);
  const [hasFeedbackMedal, setHasFeedbackMedal] = useState(false);
  const { user } = useAuth();
  const [notaMedia, setNotaMedia] = useState<number>(0);

  useEffect(() => {
    oportunidades_api
      .get(`/projetos/avaliacoes-consumidor/${dataProps?.idPessoa || IS_EMPTY}/count`)
      .then(({ data }) => {
        setNotaMedia(data.media || 0);
      });
  }, [dataProps]);

  useEffect(() => {
    const userHasPrimeiroProjeto = async () => {
      try {
        const { data: projetosIniciados } = await oportunidades_api.get(
          `/projetos/count?idPessoaConsumidor=${dataProps?.idPessoa}&status=INICIADO`,
        );
        if (projetosIniciados) {
          return setHasPrimeiroProjeto(true);
        }
        const { data: projetosConcluidos } = await oportunidades_api.get(
          `/projetos/count?idPessoaConsumidor=${dataProps?.idPessoa}&status=CONCLUIDO`,
        );
        if (projetosConcluidos) {
          return setHasPrimeiroProjeto(true);
        }
        return setHasPrimeiroProjeto(false);
      } catch (error) {}
    };
    userHasPrimeiroProjeto();
  }, [dataProps?.idPessoa]);

  useEffect(() => {
    const userHasFeedback = async () => {
      if (user?.id_usuario) {
        const { data: feedbacks } = await geral_api.get(
          `/feedbacks/${user?.id_usuario || 0}`,
        );
        if (feedbacks.length) {
          return setHasFeedbackMedal(true);
        }
        return setHasFeedbackMedal(false);
      }
    };
    userHasFeedback();
  }, [user?.id_usuario]);

  useEffect(() => {
    async function handleImg() {
      const { data } = await arquivos_api.get(
        `arquivos/${dataProps?.id_arquivo}`,
      );
      setImg(data.url);
    }
    handleImg();
  }, [dataProps]);

  function handleShowStars(numberOfStars: number) {
    const stars = [];
    for (let i = 1; i <= 5; i += 1) {
      if (i <= numberOfStars) {
        if (numberOfStars === 0)
          stars.push(
            <EstrelaOff className="estrela" key={i + Math.random()} />,
          );
        else
          stars.push(<Estrela className="estrela" key={i + Math.random()} />);
      } else {
        stars.push(<EstrelaOff className="estrela" key={i + Math.random()} />);
      }
    }
    return stars;
  }

  return (
    <Content>
      <Card>
        <Container>
          <Row>
            <Col
              lg={3}
              className="d-flex justify-content-center container-sobre__image"
            >
              {img ? (
                <>
                  <ContentImg>
                    <FotoPerfil src={img} alt="Foto de perfil" />
                    {dataProps?.is_membro && <SeloMembro id={dataProps.id} />}
                  </ContentImg>
                </>
              ) : (
                <Skeleton width="280px" height="280px" />
              )}
            </Col>
            <Col lg={8}>
              <Row>
                <Col lg={12}>
                  {img ? (
                    <Titulo titulo={dataProps?.nome_tratamento} cor={AZUL} />
                  ) : (
                    <Skeleton width="100%" height="30px" />
                  )}
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  {img ? (
                    <Medalhas>
                      <Medalha chave="feedback" isActive={hasFeedbackMedal} />
                      <Medalha
                        chave="primeiro-projeto"
                        isActive={hasPrimeiroProjetoMedal}
                      />
                    </Medalhas>
                  ) : (
                    <Skeleton width="100%" height="30px" />
                  )}
                </Col>
              </Row>

              <Row>
                <Col lg={12}>
                  {img ? (
                    <Avaliacao>
                      <span>{notaMedia?.toFixed(2)}</span>
                      {handleShowStars(notaMedia)}
                    </Avaliacao>
                  ) : (
                    <Skeleton width="50%" height="20px" />
                  )}
                </Col>
              </Row>

              <Row>
                <Col lg={12}>
                  <SobreDrescricao>
                    {img ? (
                      dataProps?.resumo_profissional
                    ) : (
                      <>
                        <Skeleton width="100%" height="20px" />
                        <Skeleton width="100%" height="20px" />
                        <Skeleton width="100%" height="20px" />
                      </>
                    )}
                  </SobreDrescricao>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Card>
    </Content>
  );
}
