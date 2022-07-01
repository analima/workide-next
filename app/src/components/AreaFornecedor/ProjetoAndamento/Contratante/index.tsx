import { Col, Row } from 'react-bootstrap';
import { Card } from '../../../../components/Card';
import { Titulo } from '../../../../components/Titulo';

import  EstrelaOff  from '../../../../assets/estrela-off.svg';
import Estrela from '../../../../assets/estrela.svg';
import PlaceholderImage from '../../../../assets/placeholderImg.png';
import Image from 'next/image'

import {
  AvaliacaoContainer,
  FotoPerfil,
  FotoPerfilContainer,
  NomeContainer,
  Sobre,
  SobreContainer,
} from './style';
import Content from './style';
import { PRETO_10 } from '../../../../styles/variaveis';
import { Spacer } from '../../../../components/Spacer';
import { useEffect, useState } from 'react';
import { pessoas_api } from '../../../../services/pessoas_api';
import { arquivos_api } from '../../../../services/arquivos_api';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { useHistory } from 'react-router-dom';
import { Skeleton } from '../../../../components/Skeleton';

interface IContratanteProps {
  idPessoaConsumidor: number;
}

interface IContratanteDados {
  id_arquivo: string;
  resumo_profissional: string;
  id_usuario: number;
  nome_tratamento: string;
  ativo: boolean;
}

export default function Contratante({ idPessoaConsumidor }: IContratanteProps) {
  const [dadosContratante, setDadosContratante] = useState<IContratanteDados>(
    {} as IContratanteDados,
  );
  const [image, setImage] = useState('');
  const [notaMedia, setNotaMedia] = useState<number>(0);
  const history = useHistory();
  useEffect(() => {
    pessoas_api
      .get<IContratanteDados>(`/pessoas/${idPessoaConsumidor}`)
      .then(({ data }) => {
        setDadosContratante(data);
      });

    if (dadosContratante.id_arquivo) {
      arquivos_api
        .get(`/arquivos/${dadosContratante.id_arquivo}`)
        .then(({ data }) => {
          setImage(data.url);
        });
    }
  }, [dadosContratante.id_arquivo, idPessoaConsumidor]);

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
    if (idPessoaConsumidor) {
      oportunidades_api
        .get(`/projetos/avaliacoes-consumidor/${idPessoaConsumidor}/count`)
        .then(({ data }) => {
          data?.media ? setNotaMedia(data?.media) : setNotaMedia(0);
        });
    }
  }, [idPessoaConsumidor]);

  return (
    <Content>
      <Titulo titulo="Cliente" cor={PRETO_10} tamanho={42} negrito={false} />

      <Spacer size={24} />

      <Card>
        <Row>
          <Col lg={2}>
            <FotoPerfilContainer>
              {dadosContratante.ativo ? (
                <>
                  {image ? (

                    <FotoPerfil >
                    <Image   onClick={() =>
                        history.push(`/consumidor/perfil-publico/`, {
                          id: idPessoaConsumidor,
                        })
                      }
                      src={image}
                      alt="Foto Contrantante" />
                    </FotoPerfil>
                  ) : (
                    <Skeleton width="152px" height="152px" />
                  )}
                </>
              ) : (

                <FotoPerfil  >
                <Image src={PlaceholderImage} alt="Foto Contrantante" />
                </FotoPerfil>
              )}
            </FotoPerfilContainer>
          </Col>
          <Col lg={10}>
            <Row>
              <Col lg={12}>
                {dadosContratante.ativo ? (
                  <>
                    {dadosContratante.nome_tratamento ? (
                      <NomeContainer>
                        <p
                          onClick={() =>
                            history.push(`/consumidor/perfil-publico/`, {
                              id: idPessoaConsumidor,
                            })
                          }
                        >
                          {dadosContratante.nome_tratamento}
                        </p>
                      </NomeContainer>
                    ) : (
                      <Skeleton width="100%" height="20px" />
                    )}
                  </>
                ) : (
                  <NomeContainer>
                    <p>{dadosContratante.nome_tratamento}</p>
                  </NomeContainer>
                )}
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                {dadosContratante.ativo && (
                  <AvaliacaoContainer>
                    <span>{notaMedia?.toFixed(2)}</span>
                    {handleShowStars(notaMedia)}
                  </AvaliacaoContainer>
                )}
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                {dadosContratante.ativo && (
                  <>
                    {dadosContratante.resumo_profissional ? (
                      <SobreContainer>
                        <Sobre>{dadosContratante.resumo_profissional}</Sobre>
                      </SobreContainer>
                    ) : (
                      <>
                        <Skeleton width="100%" height="20px" />
                        <Skeleton width="100%" height="20px" />
                        <Skeleton width="100%" height="20px" />
                      </>
                    )}
                  </>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Content>
  );
}
