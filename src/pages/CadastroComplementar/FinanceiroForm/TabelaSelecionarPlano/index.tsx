import { useEffect, useState, memo, useCallback } from 'react';
import checkAzul from '../../../../assets/check-azul.svg';
import { IoMdHelpCircle } from 'react-icons/io';
import { AZUL } from '../../../../styles/variaveis';
import { useAuth } from '../../../../contexts/auth';
import { useInformacoesFinanceiras } from '../../../../hooks/informacoesFinanceiras';
import Image from 'next/image'
import {
  ContainerPlans,
  TablePlans,
  GhostButtonPlano,
  PrecoPlano,
} from './style';
import Container from './style';
import AvatarDowngradePlano from './AvatarDowngradePlano';
import AvatarUpgradePlano from './AvatarUpgradePlano';
import { pagamentos_api } from '../../../../services/pagamentos_api';
import {
  handleFormatDocument,
  handleGetDddOfPhone,
  handleGetFormatedCep,
  handleGetFormatedPhone,
} from '../../../../helpers/formatsHelper';
import { IRegistryClientData } from '../../../../interfaces/iuguInterfaces';
import { AvatarErroGeral } from '../../../../components/AvatarErroGeral';
import { useLimitacoesPlanos } from '../../../../contexts/planLimitations';

interface IProps {
  planoInicial: boolean;
  setPlanoPreSelecionado?: React.Dispatch<React.SetStateAction<number>>;
}

type IdentificadorPlano =
  | 'degustacao'
  | 'estudante'
  | 'profissional'
  | 'premium';

function TabelaSelecionarPlano({
  planoInicial,
  setPlanoPreSelecionado,
}: IProps): JSX.Element {
  const [mensagemEssencial, setMensagemEssencial] = useState(false);
  const [mensagemRecebimento, setMensagemRecebimento] = useState(false);
  const [mensagemServico, setMensagemServico] = useState(false);
  const [showAvatarUpgrade, setShowAvatarUpgrade] = useState(false);
  const [showAvatarDowngrade, setShowAvatarDowngrade] = useState(false);
  const [planoEscolhido, setPlanoEscolhido] =
    useState<IdentificadorPlano>('degustacao');
  const [clientData, setClientData] = useState<IRegistryClientData>(
    {} as IRegistryClientData,
  );
  const { user } = useAuth();
  const [showAvatarError, setShowAvatarError] = useState(false);
  const { buscarLimitacoes } = useLimitacoesPlanos();
  const [textoBotaoDegustacao, setTextoBotaoDegustacao] =
    useState('DEGUSTAÇÃO');
  const [textoBotaoEstudante, setTextoBotaoEstudante] = useState('ESTUDANTE');
  const [textoBotaoProfissional, setTextoBotaoProfissional] = useState('PRO');
  const [textoBotaoPremium, setTextoBotaoPremium] = useState('PREMIUM');

  const messageAvatarError = `Ops, você não pode escolher o plano estudante usando um CNPJ.`;

  function handleShowAvatarError() {
    setShowAvatarError(!showAvatarError);
  }

  const {
    setDadosClientIugu,
    dadosClienteIugu,
    buscarAssinatura,
    assinaturaEscolhida,
    planoSelecionado,
    setPlanoSelecionado,
    setAssinaturaEscolhida,
    possuiAssinatura,
  } = useInformacoesFinanceiras();
  function handleShowAvatarUpgrade() {
    setShowAvatarUpgrade(!showAvatarUpgrade);
    setShowAvatarDowngrade(false);
  }

  function handleShowAvatarDowngrade() {
    setShowAvatarDowngrade(!showAvatarDowngrade);
    setShowAvatarUpgrade(false);
  }

  // Buscando dados do usuário na plataforma e depois buscando o cliente cadastrado na Iugu
  async function handleGetUserData() {
    try {
      setClientData({
        cep: handleGetFormatedCep(user.endereco?.cep || ''),
        complemento: user.endereco?.complemento || '',
        cpf_cnpj: handleFormatDocument(user.codigo_cadastro || ''),
        email: user.email || '',
        nome: user.nome || '',
        numero: user.endereco?.numero.toString() || '',
        bairro: user.endereco?.bairro || '',
        rua: user.endereco?.endereco || '',
        ddd: handleGetDddOfPhone(user.telefone_fornecedor || ''),
        telefone: handleGetFormatedPhone(user.telefone_fornecedor || ''),
        fundador: true,
        id_pessoa: user.id?.toString() || '',
      });

      if (clientData.complemento === '') delete clientData.complemento;
      // Buscando cliente na Iugu
      const response = await pagamentos_api.get<any>(
        `/clientes/${handleFormatDocument(user.codigo_cadastro || '')}`,
      );
      setDadosClientIugu(response.data);
    } catch (error: any) {
      if (error.response?.data?.message === 'Cliente não encontrado')
        // Caso o cliente não estja cadastrado na Iugu ainda, será feito o cadastro
        handleRegistryClient();
    }
  }

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

  // Criando o cadstro do cliente na Iugu
  async function handleRegistryClient() {
    try {
      let client: IRegistryClientData = {
        cep: handleGetFormatedCep(user.endereco?.cep || ''),
        complemento: user.endereco?.complemento || '',
        cpf_cnpj: handleFormatDocument(user.codigo_cadastro || ''),
        email: user.email || '',
        nome: user.nome || '',
        numero: user.endereco?.numero.toString() || '',
        bairro: user.endereco?.bairro || '',
        rua: user.endereco?.endereco || '',
        ddd: handleGetDddOfPhone(user.telefone_fornecedor || ''),
        telefone: handleGetFormatedPhone(user.telefone_fornecedor || ''),
        fundador: true,
        id_pessoa: user.id?.toString() || '',
      };
      // Caso esteja vazio, o complemento deve ser deletado para não dar problema na API
      if (client.complemento === '') delete client.complemento;
      await pagamentos_api.post('/clientes', client);

      // Busca novamente os dados do cliente depois de cadastrado
      await handleGetUserData();
    } catch (error: any) {
      console.log(error.response);
    }
  }

  const handleChangeTextPlanButton = useCallback(() => {
    if (setPlanoPreSelecionado) {
      if (
        planoSelecionado === 'degustacao' &&
        assinaturaEscolhida.identificador_plano === 'degustacao'
      ) {
        setPlanoPreSelecionado(1);
        setTextoBotaoDegustacao('ESTOU AQUI');
      } else {
        setTextoBotaoDegustacao('DEGUSTAÇÃO');
      }
      if (
        planoSelecionado === 'estudante' &&
        assinaturaEscolhida.identificador_plano === 'estudante'
      ) {
        setPlanoPreSelecionado(2);
        setTextoBotaoEstudante('ESTOU AQUI');
      }
      if (
        planoSelecionado === 'profissional' &&
        assinaturaEscolhida.identificador_plano === 'profissional'
      ) {
        setPlanoPreSelecionado(3);
        setTextoBotaoProfissional('ESTOU AQUI');
      }
      if (
        planoSelecionado === 'premium' &&
        assinaturaEscolhida.identificador_plano === 'premium'
      ) {
        setPlanoPreSelecionado(4);
        setTextoBotaoPremium('ESTOU AQUI');
      }
    }
  }, [
    assinaturaEscolhida.identificador_plano,
    planoSelecionado,
    setPlanoPreSelecionado,
  ]);

  useEffect(() => {
    handleChangeTextPlanButton();
  }, [handleChangeTextPlanButton, planoSelecionado, setPlanoPreSelecionado]);

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

  // Primeira etapa da troca de plano
  function handleSetPlan(selectedPlan: IdentificadorPlano) {
    const numberOfNewPlan = getPlanNumberStrategy(selectedPlan);
    if (!possuiAssinatura && planoInicial) {
      handleSetFirstPlan(selectedPlan);
      return;
    }

    if (
      selectedPlan === assinaturaEscolhida.identificador_plano &&
      !assinaturaEscolhida.suspensa
    )
      return;
    setPlanoEscolhido(selectedPlan);
    if (
      numberOfNewPlan >
        getPlanNumberStrategy(assinaturaEscolhida.identificador_plano) &&
      !planoInicial
    )
      handleShowAvatarUpgrade();
    else if (
      numberOfNewPlan <
        getPlanNumberStrategy(assinaturaEscolhida.identificador_plano) &&
      !planoInicial
    )
      handleShowAvatarDowngrade();
  }

  function getPlanNumberStrategy(identificadorPlano: IdentificadorPlano) {
    const planNumber = {
      degustacao: 1,
      estudante: 2,
      profissional: 3,
      premium: 4,
    };

    return planNumber[identificadorPlano] || 1;
  }

  useEffect(() => {
    handleGetUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dadosClienteIugu]);

  useEffect(() => {
    setPlanoSelecionado(
      assinaturaEscolhida.identificador_plano || 'degustacao',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assinaturaEscolhida]);

  return (
    <Container>
      <AvatarUpgradePlano
        mostrar={showAvatarUpgrade}
        esconderAvatar={handleShowAvatarUpgrade}
        planoEscolhido={planoEscolhido}
      />
      <AvatarDowngradePlano
        mostrar={showAvatarDowngrade}
        esconderAvatar={handleShowAvatarDowngrade}
        planoEscolhido={planoEscolhido}
      />
      <AvatarErroGeral
        mostrar={showAvatarError}
        esconderAvatar={handleShowAvatarError}
        mensagem={messageAvatarError}
      />
      <ContainerPlans>
        <TablePlans mensagemEssencial={mensagemEssencial}>
          <thead>
            <tr>
              <td></td>
              <td>
                <GhostButtonPlano
                  onClick={() => {
                    handleSetPlan('degustacao');
                  }}
                  selected={planoSelecionado === 'degustacao'}
                  onMouseOver={() => setTextoBotaoDegustacao('DESGUSTAÇÃO')}
                  onMouseOut={() =>
                    setTextoBotaoDegustacao(
                      planoSelecionado === 'degustacao'
                        ? 'ESTOU AQUI'
                        : 'DESGUSTAÇÃO',
                    )
                  }
                >
                  {textoBotaoDegustacao}
                </GhostButtonPlano>
                {planoInicial ? (
                  <span className="gratuito">
                    Para você que está começando, conheça nossa plataforma e
                    seus benefícios.
                  </span>
                ) : (
                  <PrecoPlano>
                    <span>R$</span>0
                  </PrecoPlano>
                )}
              </td>
              <td>
                <GhostButtonPlano
                  onClick={() => {
                    handleSetPlan('estudante');
                  }}
                  selected={planoSelecionado === 'estudante'}
                  onMouseOver={() => setTextoBotaoEstudante('ESTUDANTE')}
                  onMouseOut={() =>
                    setTextoBotaoEstudante(
                      planoSelecionado === 'estudante'
                        ? 'ESTOU AQUI'
                        : 'ESTUDANTE',
                    )
                  }
                >
                  {textoBotaoEstudante}
                </GhostButtonPlano>
                {planoInicial ? (
                  <span className="estudante">
                    Para você que está se formando e quer ganhar experiências,
                    desenvolver suas habilidades e criar um portifólio
                    profissional.
                  </span>
                ) : (
                  <PrecoPlano>
                    <span>R$</span>
                    19,90
                  </PrecoPlano>
                )}
              </td>
              <td>
                <GhostButtonPlano
                  onClick={() => handleSetPlan('profissional')}
                  selected={planoSelecionado === 'profissional'}
                  onMouseOver={() => setTextoBotaoProfissional('PRO')}
                  onMouseOut={() =>
                    setTextoBotaoProfissional(
                      planoSelecionado === 'profissional'
                        ? 'ESTOU AQUI'
                        : 'PRO',
                    )
                  }
                >
                  {textoBotaoProfissional}
                </GhostButtonPlano>
                {planoInicial ? (
                  <span className="pro">
                    Para você que já é profissional na área ou está procurando
                    uma renda extra, novos projetos inspiradores ou divulgar o
                    seu trabalho.
                  </span>
                ) : (
                  <PrecoPlano>
                    <span>R$</span>
                    49,90
                  </PrecoPlano>
                )}
              </td>
              <td>
                <GhostButtonPlano
                  onClick={() => handleSetPlan('premium')}
                  selected={planoSelecionado === 'premium'}
                  onMouseOver={() => setTextoBotaoPremium('PREMIUM')}
                  onMouseOut={() =>
                    setTextoBotaoPremium(
                      planoSelecionado === 'premium' ? 'ESTOU AQUI' : 'PREMIUM',
                    )
                  }
                >
                  {textoBotaoPremium}
                </GhostButtonPlano>
                {planoInicial ? (
                  <span className="premium">
                    Para você que já é experiente, quer ampliar sua lista de
                    clientes, conseguir projetos recorrentes ou divulgar seu
                    conhecimento com acesso ilimitado.
                  </span>
                ) : (
                  <PrecoPlano>
                    <span>R$</span>
                    79,90
                  </PrecoPlano>
                )}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="ajuda">
                <span>
                  Ferramentas essenciais
                  <IoMdHelpCircle
                    color={AZUL}
                    size={24}
                    onClick={() => {
                      setMensagemEssencial(!mensagemEssencial);
                      setMensagemRecebimento(false);
                      setMensagemServico(false);
                    }}
                  />
                </span>
                {mensagemEssencial && (
                  <div className="mensagem-essencial">
                    <strong>
                      Ferramentas essenciais são os itens que acreditamos que
                      você não pode ficar sem. <br />
                      Por exemplo:
                    </strong>
                    <p>Conexões ilimitadas</p>
                    <p>Dashboard</p>
                    <p>Painel de oportunidades da sua competência</p>
                    <p>Propostas exclusivas</p>
                    <p>Verificação da Pessoa</p>
                    <p>Feedback das habilidades percebidas</p>
                  </div>
                )}
              </td>
              <td>
                <Image src={checkAzul} alt="possui" />
              </td>
              <td>
                <Image src={checkAzul} alt="possui" />
              </td>
              <td>
                <Image src={checkAzul} alt="possui" />
              </td>
              <td>
                <Image src={checkAzul} alt="possui" />
              </td>
            </tr>
            <tr>
              <td>Visibilidade na busca</td>
              <td>
                <Image src={checkAzul} alt="possui" />
              </td>
              <td>
                <Image src={checkAzul} alt="possui" />
              </td>
              <td>
                <Image src={checkAzul} alt="possui" />
              </td>
              <td>
                <Image src={checkAzul} alt="possui" />
              </td>
            </tr>
            <tr>
              <td>Gestão de reputação</td>
              <td>
                <Image src={checkAzul} alt="possui" />
              </td>
              <td>
                <Image src={checkAzul} alt="possui" />
              </td>
              <td>
                <Image src={checkAzul} alt="possui" />
              </td>
              <td>
                <Image src={checkAzul} alt="possui" />
              </td>
            </tr>

            <tr>
              <td className="ajuda">
                <span>
                  Prazo de recebimento
                  <IoMdHelpCircle
                    color={AZUL}
                    size={24}
                    onClick={() => {
                      setMensagemEssencial(false);
                      setMensagemRecebimento(!mensagemRecebimento);
                      setMensagemServico(false);
                    }}
                  />
                </span>
                {mensagemRecebimento && (
                  <div className="mensagem-recebimento">
                    <p>
                      O recebimento deve respeitar a conclusão do projeto e
                      prazos do pagamento.
                    </p>
                  </div>
                )}
              </td>
              <td>
                <span>Imediato</span>
              </td>
              <td>
                <span>Imediato</span>
              </td>
              <td>
                <span>Imediato</span>
              </td>
              <td>
                <span>Imediato</span>
              </td>
            </tr>
            <tr>
              <td>Habilidades e competências</td>
              <td>
                <span>10</span>
              </td>
              <td>
                <span>15</span>
              </td>
              <td>
                <span>30</span>
              </td>
              <td>
                <span>50</span>
              </td>
            </tr>
            <tr>
              <td>Áreas e subáreas de atuação</td>
              <td>
                <span>03</span>
              </td>
              <td>
                <span>05</span>
              </td>
              <td>
                <span>15</span>
              </td>
              <td>
                <span>30</span>
              </td>
            </tr>
            <tr>
              <td>Projetos simultâneos</td>
              <td>
                <span>02</span>
              </td>
              <td>
                <span>02</span>
              </td>
              <td>
                <span>15</span>
              </td>
              <td>
                <span>Ilimitado</span>
              </td>
            </tr>
            <tr>
              <td>Favoritar projetos</td>
              <td>
                <span>03</span>
              </td>
              <td>
                <span>06</span>
              </td>
              <td>
                <span>10</span>
              </td>
              <td>
                <span>15</span>
              </td>
            </tr>
            <tr>
              <td>Oferecer serviços, pacotes e cases</td>
              <td>
                <span>01</span>
              </td>
              <td>
                <span>01</span>
              </td>
              <td>
                <span>10</span>
              </td>
              <td>
                <span>20</span>
              </td>
            </tr>
            <tr>
              <td className="ajuda">
                <span>
                  Serviços voluntários
                  <IoMdHelpCircle
                    color={AZUL}
                    size={24}
                    onClick={() => {
                      setMensagemEssencial(false);
                      setMensagemRecebimento(false);
                      setMensagemServico(!mensagemServico);
                    }}
                  />
                </span>
                {mensagemServico && (
                  <div className="mensagem-servico">
                    <p>Conta mensal.</p>
                  </div>
                )}
              </td>
              <td>01</td>
              <td>
                <span>03</span>
              </td>
              <td>
                <span>Ilimitado</span>
              </td>
              <td>
                <span>Ilimitado</span>
              </td>
            </tr>
            <tr>
              <td>Taxa administrativa</td>
              <td>
                <span>15%</span>
              </td>
              <td>
                <span>15%</span>
              </td>
              <td>
                <span>10%</span>
              </td>
              <td>
                <span>5%</span>
              </td>
            </tr>
            <tr>
              <td>Tempo de espera para acessar as ofertas</td>
              <td>
                <span>4h</span>
              </td>
              <td>
                <span>3h</span>
              </td>
              <td>
                <span>2h</span>
              </td>
              <td>
                <span>Imediato</span>
              </td>
            </tr>
          </tbody>
        </TablePlans>
      </ContainerPlans>
    </Container>
  );
}

export default memo(TabelaSelecionarPlano);
