import { Col, Row } from 'react-bootstrap';
import { Card } from '../../../../components/Card';
import { Titulo } from '../../../../components/Titulo';

import EstrelaOff from '../../../../assets/estrela-off.svg';
import Estrela from '../../../../assets/estrela.svg';

import {
  AvaliacaoContainer,
  FotoPerfil,
  FotoPerfilContainer,
  NomeContainer,
  Sobre,
  SobreContainer,
} from './style';
import Content from './style';
import { VERDE } from '../../../../styles/variaveis';
import { Spacer } from '../../../../components/Spacer';
import { usePropostaFornecedor } from '../../../../hooks/propostaFornecedor';
import { useEffect, useState } from 'react';
import { pessoas_api } from '../../../../services/pessoas_api';
import { arquivos_api } from '../../../../services/arquivos_api';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { useHistory } from 'react-router';
import { Skeleton } from '../../../../components/Skeleton';

interface ConsumidorProps {
  id: number;
  nome: string;
  resumo_profissional: string;
  id_arquivo: string;
  id_usuario: number;
  moderacao: boolean;
  nome_tratamento: string;
}

export default function Contratante() {
  const { project } = usePropostaFornecedor();
  const [dadosConsumidor, setDadosConsumidor] = useState<ConsumidorProps>(
    {} as ConsumidorProps,
  );
  const [image, setImage] = useState<string>('');
  const history = useHistory();
  const [notaMedia, setNotaMedia] = useState<number>(0);

  useEffect(() => {
    if (project.idPessoaConsumidor) {
      oportunidades_api
        .get(
          `/projetos/avaliacoes-consumidor/${project.idPessoaConsumidor}/count`,
        )
        .then(({ data }) => {
          data?.media ? setNotaMedia(data?.media) : setNotaMedia(0);
        });
    }
  }, [project.idPessoaConsumidor]);

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

  useEffect(() => {
    if (project.idPessoaConsumidor) {
      pessoas_api
        .get(`/pessoas/${project.idPessoaConsumidor}`)
        .then(response => {
          setDadosConsumidor(response.data);
        });
    }
  }, [project.idPessoaConsumidor]);

  useEffect(() => {
    if (dadosConsumidor.id_arquivo) {
      arquivos_api
        .get(`/arquivos/${dadosConsumidor.id_arquivo}`)
        .then(response => {
          const { url } = response.data;
          setImage(url);
        });
    }
  }, [dadosConsumidor.id_arquivo]);

  return (
    <Content>
      <Titulo titulo="Cliente" cor={VERDE} tamanho={42} negrito={false} />

      <Spacer size={24} />
      <Card>
        <Row>
          <Col lg={2}>
            <FotoPerfilContainer
              onClick={() => {
                history.push(`/contratante/perfil-publico/`, {
                  id: dadosConsumidor.id,
                });
              }}
            >
              {image ? (
                <FotoPerfil src={image} alt="Foto Contrantante" />
              ) : (
                <Skeleton width="152px" height="152px" />
              )}
            </FotoPerfilContainer>
          </Col>
          <Col lg={10}>
            <Row>
              <Col lg={12}>
                <NomeContainer
                  onClick={() => {
                    history.push(`/contratante/perfil-publico`, {
                      id: dadosConsumidor.id,
                    });
                  }}
                  data-testid="consumer-name"
                >
                  <Titulo
                    titulo={
                      project.pessoaConsumidor
                        ? project.pessoaConsumidor.nomeTratamento
                        : ''
                    }
                    cor={VERDE}
                    tamanho={24}
                  />
                </NomeContainer>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <AvaliacaoContainer>
                  <span>{notaMedia?.toFixed(2)}</span>
                  {handleShowStars(notaMedia)}
                </AvaliacaoContainer>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <SobreContainer>
                  <Sobre>{dadosConsumidor.resumo_profissional}</Sobre>
                </SobreContainer>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Content>
  );
}
