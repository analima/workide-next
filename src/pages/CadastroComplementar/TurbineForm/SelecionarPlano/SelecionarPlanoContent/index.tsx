import { useEffect, useState } from 'react';
import { Layout } from '../../../Layout';
import {
  Container,
  Subtitle,
  TituloGradiente,
  ContainerButtons,
  GhostButtonVoltar,
  GhostButtonContinuar,
} from './style';
import { useHistory } from 'react-router-dom';
import TabelaSelecionarPlano from '../../../FinanceiroForm/TabelaSelecionarPlano';
import { ModalFundador } from '../../../../../components/ModalFundador';
import { useInformacoesFinanceiras } from '../../../../../hooks/informacoesFinanceiras';
import { useAuth } from '../../../../../contexts/auth';
import { pagamentos_api } from '../../../../../services/pagamentos_api';
import { handleFormatDocument } from '../../../../../helpers/formatsHelper';
export function SelecionarPlanoContent(): JSX.Element {
  const history = useHistory();
  const { user } = useAuth();
  const [showModalFundador, setShowModalFundador] = useState(false);
  const { assinaturaEscolhida, setAssinaturaEscolhida } =
    useInformacoesFinanceiras();

  useEffect(() => {
    if (user.fundador) setShowModalFundador(true);
  }, [user.fundador]);

  async function handleSetFirstPlan() {
    try {
      const response = await pagamentos_api.post(
        '/assinaturas/assinatura-inicial',
        {
          cpf_cnpj: handleFormatDocument(user.codigo_cadastro || ''),
          identificador_plano: 'degustacao',
        },
      );
      setAssinaturaEscolhida(response.data);
    } catch (error: any) {
      console.log(error.response);
    }
  }

  return (
    <Layout active={true}>
      <ModalFundador show={showModalFundador} setShow={setShowModalFundador} />
      <Container>
        <TituloGradiente>
          Vamos ajudar você a mostrar ao mundo seu potencial
        </TituloGradiente>
        <Subtitle>Escolha o plano que mais se encaixa com você</Subtitle>
        <TabelaSelecionarPlano planoInicial={true} />
        <ContainerButtons>
          <GhostButtonVoltar onClick={() => history.goBack()}>
            Voltar
          </GhostButtonVoltar>
          <GhostButtonContinuar
            onClick={() => {
              if (!assinaturaEscolhida.id_assinatura) handleSetFirstPlan();
              history.push('/cadastro-complementar', {
                selectAba: 2,
                cadastroCompleto: true,
              });
            }}
          >
            Continuar
          </GhostButtonContinuar>
        </ContainerButtons>
      </Container>
    </Layout>
  );
}
