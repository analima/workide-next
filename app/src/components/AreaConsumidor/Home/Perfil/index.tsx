import {
  GhostButton,
  PerfilSelos,
  PerfilContainer,
  PerfilBody,
  PerfilFoto,
  PerfilAvaliacao,
  PerfilFooter,
  PerfilInfo,
  EyeContent,
  PorcentageCompleted,
  ContentPerfilData,
} from './style';
import Content from './style';
import Image from 'next/image';
import Estrela from '../../../../assets/estrela.svg';
import { AZUL_60, CINZA_40 } from '../../../../styles/variaveis';
import { Card } from '../../../Card';
import { Titulo } from '../../../Titulo';

import { FiEye } from 'react-icons/fi';

import { useAuth } from '../../../../contexts/auth';

import { Medalha } from '../../../Medalha';
import { useEffect, useState } from 'react';

import defaultImage from '../../../../assets/profileImage.svg';
import { ModalFullRecordGuidance } from '../../../ModalFullRecordGuidance';
import { useHistory } from 'react-router-dom';
import { geral_api } from '../../../../services/geral_api';
import { oportunidades_api } from '../../../../services/oportunidades_api';

interface IProps {
  isConsumidor: boolean;
}

export default function Perfil({ isConsumidor }: IProps) {
  const { user } = useAuth();
  const [showRecomendacaoModal, setShowRecomendacaoModal] = useState(false);
  const [hasPrimeiroProjetoMedal, setHasPrimeiroProjeto] = useState(false);
  const [hasFeedbackMedal, setHasFeedbackMedal] = useState(false);
  const [notaMedia, setNotaMedia] = useState<number>(0);

  useEffect(() => {
    oportunidades_api
      .get('/projetos/avaliacoes-consumidor/count')
      .then(({ data }) => {
        setNotaMedia(data.media);
      });
  }, []);

  const history = useHistory();

  useEffect(() => {
    const userHasPrimeiroProjeto = async () => {
      try {
        const { data: projetosIniciados } = await oportunidades_api.get(
          `/projetos/count?idPessoaConsumidor=${user.id_pessoa}&status=INICIADO`,
        );
        if (projetosIniciados) {
          return setHasPrimeiroProjeto(true);
        }
        const { data: projetosConcluidos } = await oportunidades_api.get(
          `/projetos/count?idPessoaConsumidor=${user.id_pessoa}&status=CONCLUIDO`,
        );
        if (projetosConcluidos) {
          return setHasPrimeiroProjeto(true);
        }
        return setHasPrimeiroProjeto(false);
      } catch (error) {}
    };
    userHasPrimeiroProjeto();
  }, [user.id_pessoa]);

  useEffect(() => {
    const userHasFeedback = async () => {
      if (user?.id_usuario) {
        const { data: feedbacks } = await geral_api.get(
          `/feedbacks/${user?.id_usuario}`,
        );
        if (feedbacks.length) {
          setHasFeedbackMedal(true);
        }
      }
    };
    userHasFeedback();
  }, [user?.id_usuario]);

  return (
    <Content>
      <Card>
        <Titulo titulo="Perfil" negrito={false} />

        <PerfilContainer>
          <PerfilBody>
            <ContentPerfilData>
              <PerfilInfo>
                <Titulo
                  titulo={user.nome_tratamento}
                  cor={CINZA_40}
                  tamanho={24}
                />
                <PerfilAvaliacao>
                  <span>{notaMedia ? notaMedia?.toFixed(2) : '0.00'}</span>
                  <Estrela className="estrela" key={0} />
                </PerfilAvaliacao>

                <PerfilSelos>
                  <Medalha chave="feedback" isActive={hasFeedbackMedal} />
                  <Medalha
                    chave="primeiro-projeto"
                    isActive={hasPrimeiroProjetoMedal}
                  />
                </PerfilSelos>
              </PerfilInfo>

              <PerfilFoto>
                <Image
                  src={user.url_avatar || defaultImage}
                  alt="Foto Perfil"
                />
              </PerfilFoto>
            </ContentPerfilData>
            <PorcentageCompleted
              onClick={evt => setShowRecomendacaoModal(true)}
            >
              Perfil completo em {user.percentageRegisterConsumer}%
            </PorcentageCompleted>
            <ModalFullRecordGuidance
              showModal={showRecomendacaoModal}
              setShowModal={setShowRecomendacaoModal}
              id_usuario={user.id_usuario}
              tipo="consumidor"
            />
          </PerfilBody>

          <PerfilFooter>
            <EyeContent>
              <button
                onClick={() =>
                  history.push('/contratante/perfil-publico', {
                    id: user.id_pessoa,
                  })
                }
              >
                <FiEye size={30} color={AZUL_60} />
              </button>
              {/* <p>Veja como estão te vendo</p> */}
            </EyeContent>
            <GhostButton
              onClick={() =>
                history.push('/cadastro-complementar', {
                  cadastroCompleto: true,
                  selectAba: 0,
                  isConsumidor: isConsumidor,
                  porcentagem: user.percentageRegisterConsumer,
                })
              }
            >
              ATUALIZAR
            </GhostButton>
          </PerfilFooter>
        </PerfilContainer>
      </Card>
    </Content>
  );
}
