import { useCallback, useEffect, useState } from 'react';
import { FiHeart, FiShare2 } from 'react-icons/fi';

import Estrela from '../../assets/estrela.svg';

import { AZUL_60, LARANJA } from '../../styles/variaveis';
import defaultImage from '../../assets/profileImage.svg';
import {
  Content,
  CardContent,
  ContentInfo,
  ContentButton,
  Button,
} from './style';

import { Card } from '../../components/Card';
import { Titulo } from '../../components/Titulo';
import { Spacer } from '../Spacer';
import { ModalRecomendacao } from '../ModalRecomendacao';
import { Medalha } from '../Medalha';
import { pessoas_api } from '../../services/pessoas_api';
import { useAuth } from '../../contexts/auth';
import { AvatarCadastroIncompleto } from '../../components/AvatarCadastroIncompleto';
import { AvatarErroGeral } from '../AvatarErroGeral';
import Image from 'next/image';

type PerfilFornecedorProps = {
  dataProps: {
    nome: string;
    resumo_profissional: string;
    url_video_apresentacao: string | null;
    usuario: UserProps;
  };
};
type UserProps = {
  id: number;
  email: string;
  tipo: string;
};

export function PerfilFornecedor({ dataProps }: PerfilFornecedorProps) {
  const [showRecomendacaoModal, setShowRecomendacaoModal] = useState(false);
  const [evaluation, setEvaluation] = useState(0);
  const [ranking, setRanking] = useState(0);
  const [medals, setMedals] = useState<string>('');
  const [link, setLink] = useState('');
  const [showAvatarCadastroIncompleto, setShowAvatarCadastroIncompleto] =
    useState(false);
  const { user, refreshUserData } = useAuth();
  const [showDenuncedAvatar, setShowDenuncedAvatar] = useState(false);

  function handleShowDenuncedAvatar() {
    setShowDenuncedAvatar(!showDenuncedAvatar);
  }

  function handleShowAvatarCadastroIncompleto() {
    setShowAvatarCadastroIncompleto(!showAvatarCadastroIncompleto);
  }

  useEffect(() => {
    setEvaluation(0);
    setRanking(0);
    setMedals('');
    refreshUserData();
  }, [refreshUserData]);

  function handleShowMedals() {
    const arrayMedals: Array<JSX.Element> = [];
    if (medals.length) {
      const arrayMedalsString = medals.split('|');
      arrayMedalsString.map(obj => arrayMedals.push(<Medalha chave={obj} />));
    }

    return arrayMedals;
  }

  const handleOpenRecomendacao = useCallback(
    (event: any) => {
      pessoas_api
        .get<string>(`/pessoas/indicacao`, {
          params: {
            idUsuario: dataProps?.usuario.id,
          },
        })
        .then(response => {
          setLink(response.data);
        });
      setShowRecomendacaoModal(true);
    },
    [dataProps],
  );

  function checkDenuncedUser() {
    const denunciaProcedente = user.denuncias.find(obj => obj.procede === true);
    return denunciaProcedente ? true : false;
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
      <Card>
        <CardContent>
          <div className="foto">
            {dataProps?.url_video_apresentacao ? (
              <iframe
                src={`https://www.youtube.com/embed/${
                  dataProps?.url_video_apresentacao.split('=')[1]
                }`}
                title="Video"
              />
            ) : (
              <Image src={defaultImage} alt="Foto do perfil" />
            )}
          </div>

          <ContentInfo>
            <div className="info-header">
              <Titulo titulo={dataProps?.nome} tamanho={48} cor={AZUL_60} />
              <div className="info-content">
                <span>Ranking: {ranking}</span>
                <FiShare2
                  size={32}
                  color={AZUL_60}
                  onClick={handleOpenRecomendacao}
                />
                <ModalRecomendacao
                  showModal={showRecomendacaoModal}
                  setShowModal={setShowRecomendacaoModal}
                  link={link}
                />
              </div>
            </div>
            <div className="info-body">
              <span>{dataProps?.resumo_profissional}</span>
              <FiHeart size={32} color={LARANJA} />
            </div>
            <div className="info-star">
              <div className="content-star">
                <span>{evaluation}</span>
                <Estrela className="estrela" key={0} />
              </div>
              <div className="content-medal">
                {medals && <>{handleShowMedals().map(obj => obj)}</>}
              </div>
            </div>

            <ContentButton>
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
                }}
              >
                SOLICITAR ORÇAMENTO
              </Button>
            </ContentButton>
          </ContentInfo>
        </CardContent>
        <Spacer size={32} />
      </Card>
    </Content>
  );
}
