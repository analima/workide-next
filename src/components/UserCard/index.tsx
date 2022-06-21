import { useEffect, useState } from 'react';
import {
  EvaluationStyled,
  ContainerImageStyled,
  ContainerStyled,
  ContentCardStyled,
  HeaderStyled,
  RankingStyled,
  ContentTextStyled,
  TypographyProjectsStyled,
  ContainerActionsStyled,
  GhostButtonStyled,
  ButtonMainStyled,
} from './style';
import Image from 'next/image'
import { ReactComponent as EstrelaOff } from '../../assets/estrela-off.svg';
import { ReactComponent as Estrela } from '../../assets/estrela.svg';
import PlaceholderImage from '../../assets/placeholderImg.png';

import { useAuth } from '../../contexts/auth';
import { AvatarCadastroIncompleto } from '../../components/AvatarCadastroIncompleto';
import { useHistory } from 'react-router';
import { Skeleton } from '../Skeleton';
import { AvatarErroGeral } from '../AvatarErroGeral';

type Props = {
  image: string;
  altImage?: string;
  name: string;
  ranking?: number;
  isRanking?: boolean;
  text: string;
  isProject?: boolean;
  amountProjects?: number;
  isAction?: boolean;
  notaMedia?: number;
  tipo?: string;
  solicitandoOrcamento?: boolean;
  id?: number;
  id_usuario?: number;
  visao?: string;
  ativo: boolean;
};

export const UserCard = ({
  image,
  altImage,
  name,
  ranking,
  isRanking,
  text,
  amountProjects,
  isProject,
  isAction,
  notaMedia,
  tipo,
  solicitandoOrcamento,
  id,
  id_usuario,
  visao,
  ativo,
}: Props): JSX.Element => {
  const [showAvatarCadastroIncompleto, setShowAvatarCadastroIncompleto] =
    useState(false);
  const { user, refreshUserData } = useAuth();
  const history = useHistory();
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
    refreshUserData();
  }, [refreshUserData]);

  return (
    <ContainerStyled>
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
      {ativo ? (
        <ContainerImageStyled
          onClick={() => {
            visao === 'fornecedor'
              ? history.push(`/consumidor/perfil-publico/`, {
                  id,
                })
              : history.push(`/fornecedor/perfil-publico/${id}`);
          }}
        >
          {image ? (
            <Image src={image} alt={altImage} />
          ) : (
            <Skeleton width="152px" height="152px" />
          )}
        </ContainerImageStyled>
      ) : (
        <ContainerImageStyled>
          <Image src={PlaceholderImage} alt={altImage} />
        </ContainerImageStyled>
      )}
      <ContentCardStyled>
        <HeaderStyled visao={visao}>
          {ativo ? (
            <>
              {name ? (
                <p
                  onClick={() => {
                    visao === 'consumidor'
                      ? history.push(`/fornecedor/perfil-publico/${id}`)
                      : history.push(`/consumidor/perfil-publico/`, {
                          id,
                        });
                  }}
                >
                  {name}
                </p>
              ) : (
                <Skeleton width="100%" height="20px" />
              )}
            </>
          ) : (
            <p>{name}</p>
          )}
          {ativo && (
            <>
              {isRanking && (
                <RankingStyled>
                  <p>Ranking: {ranking}</p>
                </RankingStyled>
              )}
            </>
          )}
        </HeaderStyled>
        <EvaluationStyled>
          {ativo && (
            <>
              <p>{notaMedia?.toFixed(2)}</p>
              {handleShowStars(notaMedia || 0)}
            </>
          )}
        </EvaluationStyled>
        {isProject && (
          <TypographyProjectsStyled>
            N° de projetos: {amountProjects} (
            {tipo && tipo === 'PF'
              ? 'Este profissional está cadastrando como Pessoa Física'
              : 'Este profissional está cadastrando como Pessoa Jurídica'}
            )
          </TypographyProjectsStyled>
        )}
        {ativo && (
          <>
            {text ? (
              <ContentTextStyled>{text}</ContentTextStyled>
            ) : (
              <>
                <Skeleton width="100%" height="20px" />
                <Skeleton width="100%" height="20px" />
                <Skeleton width="100%" height="20px" />
              </>
            )}
          </>
        )}
        {isAction && (
          <>
            {!solicitandoOrcamento && (
              <ContainerActionsStyled>
                <GhostButtonStyled>AGENDAR REUNIÃO</GhostButtonStyled>
                <GhostButtonStyled
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
                </GhostButtonStyled>
                <ButtonMainStyled>ENVIAR MENSAGEM</ButtonMainStyled>
              </ContainerActionsStyled>
            )}
          </>
        )}
      </ContentCardStyled>
    </ContainerStyled>
  );
};
