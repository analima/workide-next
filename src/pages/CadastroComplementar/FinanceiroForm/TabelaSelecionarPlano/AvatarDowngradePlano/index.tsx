import {
  Content,
  AndreContainer,
  AndreMensagem,
  AndrePersonagem,
  AndreIconClose,
  ContainerButtons,
  ButtonCancel,
  ButtonConfirm,
} from './style';
import Andre from '../../../../../assets/andre-full-downgrade.svg';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { AZUL } from '../../../../../styles/variaveis';
import { useLimitacoesPlanos } from '../../../../../contexts/planLimitations';
import { useInformacoesFinanceiras } from '../../../../../hooks/informacoesFinanceiras';
import { pagamentos_api } from '../../../../../services/pagamentos_api';
import { handleFormatDocument } from '../../../../../helpers/formatsHelper';
import { useAuth } from '../../../../../contexts/auth';

type AndreProps = {
  mostrar: boolean;
  esconderAvatar: () => void;
  planoEscolhido: IdentificadorPlano;
};

type IdentificadorPlano =
  | 'degustacao'
  | 'estudante'
  | 'profissional'
  | 'premium';

export function AvatarDowngradePlano({
  mostrar,
  esconderAvatar,
  planoEscolhido,
}: AndreProps) {
  const { buscarLimitacoes } = useLimitacoesPlanos();
  const {
    setAssinaturaEscolhida,
    buscarAssinatura,
    assinaturaEscolhida,
    suspenderAssinatura,
    setPlanoSelecionado,
  } = useInformacoesFinanceiras();
  const { user } = useAuth();

  const mensagem = `
    Você pode alterar seu plano a qualquer momento. Mas você precisa saber de uma coisa: ao fazer isso
    sua conta será ajustada para os limites do novo plano. Isso significa que as informações excedentes
    serão perdidas, ok?
    `;

  // Buscando assinatura do cliente na Iugu
  async function handleGetPlan() {
    try {
      await buscarAssinatura(handleFormatDocument(user.codigo_cadastro || ''));
      buscarLimitacoes();
      if (assinaturaEscolhida.suspensa) {
        setPlanoSelecionado('degustacao');
        return;
      }
    } catch (error: any) {
      console.log(error.response);
    }
  }

  // Alterando o plano do cliente (válido apenas para a primeira assinatura, que ainda não foi paga)
  async function handleSetFirstPlan(plano: IdentificadorPlano) {
    try {
      // gratuidade vem aki no retorno
      const response = await pagamentos_api.post(
        '/assinaturas/assinatura-inicial',
        {
          cpf_cnpj: handleFormatDocument(user.codigo_cadastro || ''),
          identificador_plano: plano,
        },
      );
      setAssinaturaEscolhida(response.data);
      await handleGetPlan();
    } catch (error: any) {
      console.log(error.response);
    }
  }

  // Alterando assinatura que já está ativa
  async function handleSetCurrentPlan(plano: IdentificadorPlano) {
    try {
      await pagamentos_api.put(
        `/assinaturas/${handleFormatDocument(
          user.codigo_cadastro || '',
        )}/alterar-plano`,
        {
          identificador_plano: plano,
        },
      );

      await handleGetPlan();
    } catch (error: any) {
      console.log(error.response);
    } finally {
      buscarAssinatura(handleFormatDocument(user.codigo_cadastro || ''));
    }
  }

  function handleSetPlan() {
    if (
      planoEscolhido === assinaturaEscolhida.identificador_plano &&
      !assinaturaEscolhida.suspensa
    )
      return;

    if (assinaturaEscolhida.id_assinatura_iugu && assinaturaEscolhida.ativa) {
      if (planoEscolhido === 'degustacao') {
        suspenderAssinatura(handleFormatDocument(user.codigo_cadastro || ''));
      } else handleSetCurrentPlan(planoEscolhido);
    } else {
      if (assinaturaEscolhida.ativa) handleSetCurrentPlan(planoEscolhido);
      else handleSetFirstPlan(planoEscolhido);
    }
    setPlanoSelecionado(planoEscolhido);
  }

  return (
    <Content>
      <AndreContainer mostrarAvatar={mostrar}>
        <AndreIconClose>
          <IoMdCloseCircleOutline
            onClick={() => esconderAvatar()}
            color={AZUL}
            size={24}
          />
        </AndreIconClose>

        <AndreMensagem>
          <p>{mensagem}</p>
          <ContainerButtons>
            <ButtonCancel onClick={() => esconderAvatar()}>VOLTAR</ButtonCancel>
            <ButtonConfirm
              onClick={() => {
                handleSetPlan();
                esconderAvatar();
              }}
            >
              FAZER MESMO ASSIM
            </ButtonConfirm>
          </ContainerButtons>
        </AndreMensagem>

        <AndrePersonagem>
          <Andre className="avatar-upgrade" />
        </AndrePersonagem>
      </AndreContainer>
    </Content>
  );
}
