import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { IServicoInfo } from '../../interfaces/IServicoInfo';
import { ofertas_api } from '../../services/ofertas_api';
import { LARANJA } from '../../styles/variaveis';
import { formatarValor } from '../../utils/CurrencyFormat';
import { Skeleton } from '../Skeleton';
import EstrelaOff  from '../../assets/estrela-off.svg';
import Estrela from '../../assets/estrela.svg';
import { useRouter } from 'next/router'
import Image from 'next/image'

import {
  Content,
  ImageProfile,
  ImageContainer,
  ImageContainerInfos,
  ContainerServicePrice,
  DescriptionParagraph,
  ImageNameService,
  FillBlack,
  ContainerDados,
  ContainerProfile,
  ContentInfoSecundary,
} from './style';
import { pessoas_api } from '../../services/pessoas_api';

interface ServiceProps {
  nome_tratamento: string;
  arquivo: { url: string };
  ranking: {
    notaMedia: number;
  };
}

export function ServiceCard({
  service,
  isFavorite,
  setIsFavorite,
  visao,
}: {
  visao?: string;
  service: IServicoInfo;
  isFavorite: boolean;
  setIsFavorite?: (isFavorite: boolean) => void;
}) {
  const router = useRouter()
  const [dadosFornec, setDadosFornec] = useState<ServiceProps>(
    {} as ServiceProps,
  );

  const handleFavorite = useCallback(async () => {
    if (!isFavorite) {
      await ofertas_api.post(`/servicos/${service.id}/favoritos`);
    } else {
      await ofertas_api.delete(`/servicos/${service.id}/favoritos`);
    }
  }, [service, isFavorite]);

  function handleGetServicePrice(price: number) {
    const fee = price / (1 - 0.12) - price;
    return price + (fee > 14 ? fee : 14);
  }

  useEffect(() => {
    if (service?.fornecedor === undefined) {
      pessoas_api
        .get<ServiceProps>(`/pessoas/${service.idPessoa || service.id_pessoa}`)
        .then(response => {

          setDadosFornec(response.data);
        });
    }
  }, [service]);

  function handleShowStars(numberOfStars: number) {
    const stars = [];
    for (let i = 1; i <= 5; i += 1) {
      if (i <= numberOfStars) {

        if (numberOfStars === 0)
          stars.push(
            <Image src={EstrelaOff}  alt={'avaliação'} className="estrela" key={i + Math.random()} />,
          );
        else
          stars.push(<Image src={Estrela} alt={'avaliação'} className="estrela" key={i + Math.random()} />);
      } else {
        stars.push(<Image src={EstrelaOff} alt={'avaliação'} className="estrela" key={i + Math.random()} />);
      }
    }
    return stars;
  }

  return service ? (
    <Content>
      <Row>
        <Col lg={12}>
          <ImageContainer>
            <ImageContainerInfos>
              {isFavorite ? (
                <AiFillHeart
                  size={30}
                  color={LARANJA}
                  data-testid="content__heart--on"
                  className="content__heart--on"
                  onClick={async () => {
                    if (setIsFavorite !== undefined) {
                      await handleFavorite();
                      setIsFavorite(false);
                    }
                  }}
                />
              ) : (
                <AiOutlineHeart
                  size={30}
                  color={LARANJA}
                  data-testid="content__heart--off"
                  onClick={async () => {
                    if (setIsFavorite !== undefined) {
                      await handleFavorite();
                      setIsFavorite(true);
                    }
                  }}
                />
              )}
            </ImageContainerInfos>

            <ImageProfile
              onClick={() =>
                visao === 'consumidor'
                  ? router.push(
                      `/consumidor/servico/${
                        service.id_pessoa || service.idPessoa
                      }/${service.id}`,
                    )
                  : router.push(
                      `/fornecedor/servico/${
                        service.id_pessoa || service.idPessoa
                      }/${service.id}`,
                    )
              }
              data-testid="content__image-profile"
              src={service.arquivo ? service.arquivo.url : service.urlArquivo}
              alt={service.nome + ' - image'}
            />

            <ImageNameService data-testid="content__name">
              {service.nome}
            </ImageNameService>
            <FillBlack
              onClick={() =>
                visao === 'consumidor'
                  ? router.push(
                      `/consumidor/servico/${
                        service.id_pessoa || service.idPessoa
                      }/${service.id}`,
                    )
                  : router.push(
                      `/fornecedor/servico/${
                        service.id_pessoa || service.idPessoa
                      }/${service.id}`,
                    )
              }
              data-testid="fill-black"
            ></FillBlack>
          </ImageContainer>
        </Col>
      </Row>

      <ContentInfoSecundary>
        <ContainerDados>
          <DescriptionParagraph data-testid="content__description">
            {service.descricao.length > 100 ? (
              <>{service.descricao.substring(0, 100)}...</>
            ) : (
              <>{service.descricao}</>
            )}
          </DescriptionParagraph>
          <DescriptionParagraph>
            <strong>Prazo de entrega: </strong>
            {service?.prazoMaximo ||
              Math.max.apply(
                null,
                service.pacotes.map(p => p.prazo),
              )}{' '}
            dias
          </DescriptionParagraph>
          <DescriptionParagraph>
            <strong>Pacotes: </strong>
            {service.pacotes && service.pacotes.map(i => i.tipo).join(', ')}
          </DescriptionParagraph>

          <ContainerServicePrice>
            Valor: a partir de {''}
            {formatarValor(
              handleGetServicePrice(
                service.precoMinimo ||
                  Math.min.apply(
                    null,
                    service.pacotes.map(i => Number(i.preco)),
                  ),
              ),
            )}
          </ContainerServicePrice>
        </ContainerDados>

        {service?.fornecedor?.foto?.url && (
          <ContainerProfile>
            <div>
              <Image
                src={service?.fornecedor?.foto.url}
                alt={service?.fornecedor?.nome_tratamento}
                width={'40px'}
                height={'40px'}
              />
            </div>

            <div>
              <span>{service.fornecedor.nome_tratamento}</span>

               <span>{Number(service.fornecedor?.ranking?.nota_media || 0)?.toFixed(2)}</span>
              {handleShowStars(Number(service.fornecedor?.ranking?.nota_media || 0) || 0)}
            </div>
          </ContainerProfile>
        )}

        {dadosFornec?.arquivo?.url && (
          <ContainerProfile>
            <div>
              <Image src={dadosFornec?.arquivo?.url} alt=""
                width={'40px'}
                height={'40px'} />
            </div>

            <div>
              <span>{dadosFornec.nome_tratamento}</span><br />
               <span className="numberStarts">{Number(dadosFornec?.ranking?.notaMedia || 0)?.toFixed(2)}</span>
              {handleShowStars(Number(dadosFornec?.ranking?.notaMedia || 0) || 0)}
            </div>
          </ContainerProfile>
        )}
      </ContentInfoSecundary>
    </Content>
  ) : (
    <Skeleton height="310px" width="222px" />
  );
}
