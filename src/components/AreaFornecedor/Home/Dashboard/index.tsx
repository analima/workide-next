import { CardPercentage, Button, ContentButton } from './style';
import Content from './style';
import { Titulo } from '../../../../components/Titulo';
import { useAuth } from '../../../../contexts/auth';
import Antonio from '../../../../assets/antonio-full.svg';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { pagamentos_api } from '../../../../services/pagamentos_api';
import { formatToPrice } from '../../../../helpers/formatsHelper';
import Image from 'next/image'

export default function Dashboard() {
  const { user, refreshUserData } = useAuth();
  const history = useHistory();
  const [propostas, setPropostas] = useState([]);
  const [meusGanhos, setMeusGanhos] = useState<number>(0);
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    refreshUserData();
    const load = async () => {
      const { data: allPropostas } = await oportunidades_api.get<any>(
        `/projetos/propostas`,
      );
      setPropostas(allPropostas.values);
      const { data: allProjetos } = await oportunidades_api.get<any>(
        `/projetos/fornecedor`,
      );
      setProjetos(allProjetos.values);
    };
    load();
  }, [refreshUserData]);

  async function handleGetMyEarnings() {
    try {
      const { data } = await pagamentos_api.get(
        `/repasse/fornecedor/ganhos/${user?.id_pessoa}`,
      );
      setMeusGanhos(data.repasseEnviado);
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetMyEarnings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id_pessoa]);

  return (
    <Content>
      {user.percentageRegisterProvider === 20 && !user.moderacao && (
        <CardPercentage>
          <div onClick={() => history.push('/fornecedor/dashboard')}>
            <Titulo titulo="Dashboard" />
            <div className="card-msg-percentage">
              <div>
                <p>Você ainda não tem nada por aqui.</p>
                <p>O primeiro passo é concluir seu cadastro. Vamos nessa?</p>
              </div>
              <Image src={Antonio} alt="Antonio" />
            </div>
          </div>
          <ContentButton>
            <Button onClick={() => history.push('/cadastro-complementar')}>
              CONCLUIR CADASTRO
            </Button>
          </ContentButton>
        </CardPercentage>
      )}

      {user.percentageRegisterProvider === 40 && !user.moderacao && (
        <CardPercentage>
          <div onClick={() => history.push('/fornecedor/dashboard')}>
            <Titulo titulo="Dashboard" />
            <div className="card-msg-percentage">
              <div>
                <p>Você ainda não tem nada por aqui.</p>
                <p className="msg-segundo-passo">
                  O segundo passo é mostrar a todos o seu potencial. Você já fez
                  isso?
                </p>
              </div>
              <Image src={Antonio} alt="Antonio" />
            </div>
          </div>
        </CardPercentage>
      )}

      {user.percentageRegisterProvider === 60 && !user.moderacao && (
        <>
          <CardPercentage>
            <div onClick={() => history.push('/fornecedor/dashboard')}>
              <Titulo titulo="Dashboard" />
              <div className="card-msg-percentage">
                <div>
                  <p>Você ainda não tem nada por aqui.</p>
                  <p className="msg-segundo-passo">
                    O terceiro passo é adicionar suas informações financeiras.
                    Você já fez isso?
                  </p>
                </div>
                <Image src={Antonio} alt="Antonio" />
              </div>
            </div>
          </CardPercentage>
          <ContentButton>
            <Button
              onClick={() =>
                history.push('/cadastro-complementar', {
                  selectAba: 3,
                  progresso: 60,
                  turbineSeuPotencial: true,
                  cadastroCompleto: true,
                })
              }
            >
              INFORMAÇÕES FINANCEIRAS
            </Button>
          </ContentButton>
        </>
      )}

      {(user.moderacao || user.percentageRegisterProvider === 80) && (
        <>
          <CardPercentage>
            <div onClick={() => history.push('/fornecedor/dashboard')}>
              <Titulo titulo="Dashboard" />
              <ul>
                <li>
                  <span>Meus ganhos</span>
                  <span className="success">
                    {formatToPrice(meusGanhos / 100)}
                  </span>
                </li>
                <li>
                  <span>Propostas enviadas</span>{' '}
                  <span>{propostas.length}</span>
                </li>
                <li>
                  <span>Projetos em andamento</span>{' '}
                  <span>
                    {
                      projetos.filter(
                        (p: any) => p.status.codigo === 'INICIADO',
                      ).length
                    }
                  </span>
                </li>
                <li>
                  <span>Projetos concluídos</span>{' '}
                  <span>
                    {' '}
                    {
                      projetos.filter(
                        (p: any) => p.status.codigo === 'CONCLUIDO',
                      ).length
                    }
                  </span>
                </li>
                <li>
                  <span>Quantidade de visualizações</span> <span>0</span>
                </li>
              </ul>
            </div>
          </CardPercentage>
        </>
      )}
    </Content>
  );
}
