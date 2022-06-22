import { Col, Row } from 'react-bootstrap';
import { Card } from '../../../../components/Card';
import { Titulo } from '../../../../components/Titulo';

import EstrelaOff from '../../../../assets/estrela-off.svg';
import Estrela  from '../../../../assets/estrela.svg';
import PlaceholderImage from '../../../../assets/placeholderImg.png';

import { useAuth } from '../../../../contexts/auth';
import { AvatarCadastroIncompleto } from '../../../../components/AvatarCadastroIncompleto';
import Image from 'next/image'

import {
  AvaliacaoContainer,
  Button,
  ContainerAcoes,
  Content,
  FotoPerfil,
  FotoPerfilContainer,
  NomeContainer,
  Sobre,
  SobreContainer,
} from './style';
import { CINZA_40, PRETO_10 } from '../../../../styles/variaveis';
import { Spacer } from '../../../../components/Spacer';
import { useEffect, useState } from 'react';
import { pessoas_api } from '../../../../services/pessoas_api';
import { useHistory } from 'react-router-dom';
import { consultas_api } from '../../../../services/consultas_api';
import { Skeleton } from '../../../../components/Skeleton';
import { AvatarErroGeral } from '../../../../components/AvatarErroGeral';

interface IProps {
  id_fornecedor: number;
}

interface IFornecedorDados {
  nome: string;
  id_arquivo: string;
  resumo_profissional: string;
  id_usuario: number;
  nome_tratamento: string;
  id: number;
  ativo: boolean;
  arquivo: {
    url: string;
  };
}

type PessoaRanking = {
  idUsuario: number;
  ranking: number;
  notaMedia: number;
};

export function Contratado({ id_fornecedor }: IProps) {
  const [dadosFornecedor, setDadosFornecedor] = useState<IFornecedorDados>(
    {} as IFornecedorDados,
  );
  const [showAvatarCadastroIncompleto, setShowAvatarCadastroIncompleto] =
    useState(false);
  const history = useHistory();
  const { user, refreshUserData } = useAuth();
  const [dadosRanking, setDadosRanking] = useState<PessoaRanking>();
  const [showDenuncedAvatar, setShowDenuncedAvatar] = useState(false);

  function handleShowDenuncedAvatar() {
    setShowDenuncedAvatar(!showDenuncedAvatar);
  }

  function checkDenuncedUser() {
    const denunciaProcedente = user.denuncias.find(obj => obj.procede === true);
    return denunciaProcedente ? true : false;
  }

  function handleShowAvatarCadastroIncompleto() {
    setShowAvatarCadastroIncompleto(!showAvatarCadastroIncompleto);
  }

  useEffect(() => {
    pessoas_api
      .get<IFornecedorDados>(`/pessoas/${id_fornecedor}`)
      .then(({ data }) => {
        setDadosFornecedor(data);
      });
  }, [dadosFornecedor.id_arquivo, id_fornecedor]);

  useEffect(() => {
    async function getInfoUsuario() {
      if (dadosFornecedor?.id_usuario) {
        const { data: pessoaRanking } = await consultas_api.get<PessoaRanking>(
          `/consulta/fornecedores/${dadosFornecedor?.id_usuario}/ranking`,
        );
        setDadosRanking(pessoaRanking);
      }
    }
    getInfoUsuario();
  }, [dadosFornecedor.id_usuario]);

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

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
      <AvatarErroGeral
        mensagem="Ops, parece que há uma denuncia procedente para o seu usuário. Por esse motivo você não pode realizar essa ação"
        mostrar={showDenuncedAvatar}
        esconderAvatar={handleShowDenuncedAvatar}
      />
      <AvatarCadastroIncompleto
        mostrar={showAvatarCadastroIncompleto}
        esconderAvatar={handleShowAvatarCadastroIncompleto}
        porcentagem={user.percentageRegisterConsumer || 33}
        isConsumer={true}
      />
      <Titulo
        titulo="Fornecedor contratado"
        cor={PRETO_10}
        tamanho={42}
        negrito={false}
      />

      <Spacer size={24} />

      <Card>
        <Row>
          <Col lg={2}>
            {dadosFornecedor.ativo ? (
              <FotoPerfilContainer>
                {dadosFornecedor ? (
                  <FotoPerfil>
                    <Image onClick={() => {
                      history.push(
                        `/fornecedor/perfil-publico/${dadosFornecedor.id}`,
                      );
                    }}
                    src={dadosFornecedor?.arquivo.url}
                    alt="Foto contratado"/>
                  </FotoPerfil>
                ) : (
                  <Skeleton width="152px" height="152px" />
                )}
              </FotoPerfilContainer>
            ) : (
              <FotoPerfilContainer>
                <FotoPerfil>
                  <Image src={PlaceholderImage} alt="Foto contratado" />
                </FotoPerfil>
              </FotoPerfilContainer>
            )}
          </Col>
          <Col lg={10}>
            <Row>
              <Col lg={10}>
                <NomeContainer>
                  {dadosFornecedor.ativo ? (
                    <p
                      onClick={() => {
                        history.push(
                          `/fornecedor/perfil-publico/${dadosFornecedor.id}`,
                        );
                      }}
                    >
                      {dadosFornecedor.nome_tratamento}
                    </p>
                  ) : (
                    <p>{dadosFornecedor.nome_tratamento}</p>
                  )}
                </NomeContainer>
              </Col>
              <Col lg={2}>
                {dadosFornecedor.ativo && (
                  <Titulo
                    titulo={`Ranking: ${dadosRanking?.ranking}`}
                    tamanho={24}
                    cor={CINZA_40}
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                {dadosFornecedor.ativo && (
                  <AvaliacaoContainer>
                    <span>{dadosRanking?.notaMedia}</span>
                    {handleShowStars(dadosRanking?.notaMedia || 0)}
                  </AvaliacaoContainer>
                )}
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                {dadosFornecedor.ativo && (
                  <>
                    {dadosFornecedor.resumo_profissional ? (
                      <SobreContainer>
                        <Sobre>{dadosFornecedor.resumo_profissional}</Sobre>
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
        <Row>
          <Col lg={12}>
            {dadosFornecedor.ativo && (
              <ContainerAcoes>
                <Button
                  onClick={() => {
                    if (
                      user.percentageRegisterConsumer &&
                      user.percentageRegisterConsumer < 66
                    ) {
                      handleShowAvatarCadastroIncompleto();
                      return;
                    }
                    if (checkDenuncedUser()) {
                      handleShowDenuncedAvatar();
                      return;
                    }
                    history.push(
                      `/consumidor/projetos/exclusivo/${dadosFornecedor.id_usuario}`,
                      {
                        id_fornecedor: dadosFornecedor.id,
                      },
                    );
                  }}
                >
                  RECONTRATAR
                </Button>
              </ContainerAcoes>
            )}
          </Col>
        </Row>
      </Card>
    </Content>
  );
}
