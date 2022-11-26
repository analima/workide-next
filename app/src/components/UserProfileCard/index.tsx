import Estrela from '../../assets/estrela.svg';
import defaultImage from '../../assets/profileImage.svg';
import { Titulo } from '../Titulo';
import { AZUL_60, PRETO_10 } from '../../styles/variaveis';
import { FiEye } from 'react-icons/fi';

import {
  Content,
  Body,
  Avaliacao,
  Ranking,
  NumProjetos,
  Footer,
  Info,
  Profissao,
  FotoPerfil,
  Foto,
  ResumoProfissional,
  GhostButton,
  ContainerProfile,
  EyeContent,
  AreasInteresse,
  InfoFooter,
} from './style';
import { useHistory } from 'react-router-dom';
import Link from 'next/link';
import { ModalFullRecordGuidance } from '../ModalFullRecordGuidance';
import { useState } from 'react';
import { useAuth } from '../../contexts/auth';
import { MedalhasFornecedor } from '../../components/MedalhasFornecedor';

interface IVitrine {
  nome: string;
  imagem: string;
  estrelas: number;
  medalhas: string;
  ranking: number;
  notaMedia: number;
  projetos: number | null;
  profissao: Array<string> | null;
  areas_interesse: Array<string>;
  resumo_profissional: undefined | string;
}

type UserProfileCardProps = {
  dataVitrine: IVitrine;
  percentageRegister: number;
};

export function UserProfileCard({
  dataVitrine,
  percentageRegister,
}: UserProfileCardProps): JSX.Element {
  const { user } = useAuth();
  const [showRecomendacaoModal, setShowRecomendacaoModal] = useState(false);
  const history = useHistory();

  function handleFormatProfessions() {
    let stringProfissoes = '';
    if (!dataVitrine.profissao || !dataVitrine.profissao.length) return '';
    for (let i = 0; i < 3; i++) {
      if (dataVitrine.profissao[i])
        stringProfissoes += `${dataVitrine.profissao[i]}`;
      if (dataVitrine.profissao[i + 1]) stringProfissoes += `, `;
    }
    if (dataVitrine.profissao.length > 3)
      stringProfissoes += `+ ${dataVitrine.profissao.length - 3}`;

    return stringProfissoes !== '' ? stringProfissoes : 'Não informado';
  }

  return (
    <Content>
      <Body>
        <ContainerProfile>
          <Info>
            <Titulo titulo={dataVitrine.nome} tamanho={24} cor={PRETO_10} />
            <Avaliacao>
              <span>{dataVitrine.notaMedia ? dataVitrine.notaMedia : 0}</span>
              <Estrela className="estrela" key={0} />
            </Avaliacao>
            <Ranking>
              Ranking: {dataVitrine.ranking ? dataVitrine.ranking : 0}
            </Ranking>
            <NumProjetos>
              Nº de projetos: {dataVitrine.projetos ? dataVitrine.projetos : 0}
            </NumProjetos>

            <MedalhasFornecedor id={user?.id ? user?.id : 0} />
            <Profissao>
              <Titulo
                titulo={handleFormatProfessions()}
                cor={PRETO_10}
                tamanho={24}
              />
            </Profissao>
          </Info>

          <FotoPerfil>
            {!dataVitrine.imagem?.length ? (
              <Foto src={defaultImage} alt={dataVitrine.nome} />
            ) : (
              <Foto src={dataVitrine.imagem} alt={dataVitrine.nome} />
            )}
          </FotoPerfil>
        </ContainerProfile>
      </Body>

      <Footer>
        <AreasInteresse>
          <ResumoProfissional>
            {dataVitrine.resumo_profissional}
          </ResumoProfissional>
        </AreasInteresse>

        <InfoFooter>
          <h3
            onClick={evt => setShowRecomendacaoModal(true)}
            className="cadastro-completo mt-4 mb-4"
          >
            Cadastro completo em {percentageRegister}%
          </h3>
          <ModalFullRecordGuidance
            showModal={showRecomendacaoModal}
            setShowModal={setShowRecomendacaoModal}
            id_usuario={user.id_usuario}
          />

          <div className="botoes">
            <EyeContent>
              <Link href="/fornecedor/perfil">
                <FiEye size={30} color={AZUL_60} />
              </Link>
              <p>Veja como estão te vendo</p>
            </EyeContent>

            {percentageRegister === 20 && (
              <GhostButton
                onClick={() => history.push('/turbine-seu-potencial/planos')}
              >
                ATUALIZAR
              </GhostButton>
            )}

            {percentageRegister !== 20 && (
              <GhostButton
                onClick={() =>
                  history.push('/cadastro-complementar', {
                    selectAba: 0,
                    progresso: 20,
                    turbineSeuPotencial: true,
                    cadastroCompleto: true,
                  })
                }
              >
                ATUALIZAR
              </GhostButton>
            )}
          </div>
        </InfoFooter>
      </Footer>
    </Content>
  );
}
