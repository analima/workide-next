import {
  LabelNota,
  LabelRank,
  FotoPerfil,
  MobileCenter,
  ContainerNameUser,
  Sobre,
} from './style';
import Content from './style';
import Estrela from '../../../../assets/estrela.svg';
import { useHistory } from 'react-router-dom';
import { Titulo } from '../../../Titulo';
import { MedalhasFornecedor } from '../../../MedalhasFornecedor';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { geral_api } from '../../../../services/geral_api';
import { consultas_api } from '../../../../services/consultas_api';
import { useAuth } from '../../../../contexts/auth';
import { AvatarCadastroIncompleto } from '../../../AvatarCadastroIncompleto';
import Image from 'next/image';
import UserDefaultImageProfile from '../../../../assets/placeholderImg.png';
import { IProvider } from '../../../../interfaces/IProvider';
import { AvatarErroGeral } from '../../../AvatarErroGeral';
import { AZUL } from '../../../../styles/variaveis';
import { oportunidades_api } from '../../../../services/oportunidades_api';

interface PerfilProps {
  idUsuario: number;
  publico?: boolean;
  onChange?: (pessoa: IProvider) => void;
  provider?: IProvider;
}

export default function NovoPerfil({
  idUsuario,
  onChange,
  publico = false,
  provider,
}: PerfilProps) {
  const { user } = useAuth();

  const [dataProvider, setDataProvider] = useState<IProvider>(
    provider ? provider : ({} as IProvider),
  );
  const [erro, setErro] = useState(false);
  const [ranking, setRanking] = useState(0);
  const [evaluation, setEvaluation] = useState(0);
  const [showDenuncedAvatar, setShowDenuncedAvatar] = useState(false);
  const [projectsCount, setProjectsCount] = useState(0);

  function handleShowDenuncedAvatar() {
    setShowDenuncedAvatar(!showDenuncedAvatar);
  }

  const [showAvatarCadastroIncompleto, setShowAvatarCadastroIncompleto] =
    useState(false);

  function handleShowAvatarCadastroIncompleto() {
    setShowAvatarCadastroIncompleto(!showAvatarCadastroIncompleto);
  }

  const findPersonByUserId = async (id: number) => {
    try {
      const { data: pessoa } = await geral_api.get(`/pessoas/${id}`);
      setErro(false);
      setDataProvider(pessoa);
    } catch (err) {
      setErro(true);
      findPersonByPersonId(id);
    }
  };

  const findPersonByPersonId = async (id: number) => {
    try {
      const { data: pessoa } = await geral_api.get('/pessoas/' + id);
      setErro(false);
      setDataProvider(pessoa);
    } catch (error) {
      setErro(true);
    }
  };

  useEffect(() => {
    if (idUsuario) {
      findPersonByUserId(idUsuario);
    }
    // eslint-disable-next-line
  }, [idUsuario]);

  const history = useHistory();

  useEffect(() => {
    if (dataProvider.id_usuario) {
      consultas_api
        .get(`/consulta/fornecedores/${dataProvider.id_usuario}/ranking`)
        .then(res => setRanking(res.data.ranking));
    }
  }, [dataProvider.id_usuario]);

  useEffect(() => {
    setEvaluation(
      Number(dataProvider.ranking ? dataProvider.ranking.notaMedia : 0),
    );
  }, [dataProvider.ranking]);

  useEffect(() => {
    if (onChange) {
      onChange(dataProvider);
    }
  }, [onChange, dataProvider]);

  useEffect(() => {
    if (idUsuario && user.id_pessoa) {
      const obterNumeroProjetos = async () => {
        const { data: countConcluido } = await oportunidades_api.get(
          `/projetos/count?idPessoaFornecedor=${idUsuario}&status=CONCLUIDO`,
        );
        const { data: countIniciado } = await oportunidades_api.get(
          `/projetos/count?idPessoaFornecedor=${idUsuario}&status=INICIADO`,
        );
        setProjectsCount(countConcluido + countIniciado);
      };
      obterNumeroProjetos();
    }
  }, [idUsuario, user.id_pessoa]);

  return (
    <>
      {!erro ? (
        <Content>
          <AvatarErroGeral
            mensagem="Ops, parece que há uma denuncia procedente para o seu usuário. Por esse motivo você não pode realizar essa ação"
            mostrar={showDenuncedAvatar}
            esconderAvatar={handleShowDenuncedAvatar}
          />
          <AvatarCadastroIncompleto
            mostrar={showAvatarCadastroIncompleto}
            esconderAvatar={handleShowAvatarCadastroIncompleto}
            porcentagem={user && (user.percentageRegisterConsumer || 33)}
            isConsumer={true}
          />

          <MobileCenter>
            <FotoPerfil>
              <Image
                src={dataProvider.arquivo?.url || UserDefaultImageProfile}
                alt="Perfil"
              />
            </FotoPerfil>
          </MobileCenter>

          <ContainerNameUser
            onClick={() => {
              history.push('/fornecedor/perfil-publico/' + dataProvider.id);
            }}
            data-testid="container__name-user"
          >
            <Titulo
              titulo={dataProvider.nome_tratamento || 'Nome não informado'}
              tamanho={16}
              cor={AZUL}
            />

            <LabelNota>{evaluation}</LabelNota>
            <Estrela className="estrela" key={0} />

            <div className="content-medal">
              <MedalhasFornecedor id={dataProvider.id && dataProvider.id} />
            </div>
            {projectsCount > 0 && (
              <Sobre>Nº de projetos: {projectsCount}</Sobre>
            )}
            <Sobre>
              Estou cadastrado como Pessoa{' '}
              {dataProvider.tipo === 'PF' ? 'Física' : 'Jurídica'}
            </Sobre>

            <Sobre>
              {dataProvider.resumo_profissional || 'Descrição não informada'}
            </Sobre>
          </ContainerNameUser>

          <MobileCenter>
            <LabelRank>Ranking: {ranking}</LabelRank>
          </MobileCenter>
        </Content>
      ) : (
        <Content>
          <Container>
            <Titulo titulo="Fornecedor não encontrado" />
          </Container>
        </Content>
      )}
    </>
  );
}
