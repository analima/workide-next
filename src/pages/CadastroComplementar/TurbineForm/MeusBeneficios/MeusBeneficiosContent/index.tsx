import { useState, useEffect } from 'react';
import checkAzul from '../../../../../assets/check-azul.svg';
import { IoMdHelpCircle } from 'react-icons/io';
import { AZUL } from '../../../../../styles/variaveis';
import { useAuth } from '../../../../../contexts/auth';
import { useInformacoesFinanceiras } from '../../../../../hooks/informacoesFinanceiras';
import { FiArrowRightCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import Image from 'next/image'
import {
  ContainerPlans,
  TablePlans,
  Title,
  Subtitle,
  ContainerButtons,
  GhostButtonBranco,
  GhostButtonAzul,
} from './style';
import Container from './style';
import { pagamentos_api } from '../../../../../services/pagamentos_api';
import { handleFormatDocument } from '../../../../../helpers/formatsHelper';
import Layout from '../../../Layout';
import { ModalFundador } from '../../../../../components/ModalFundador';
import { AvatarCadastroIncompleto } from '../../../../../components/AvatarCadastroIncompleto';

export default function MeusBeneficiosContent(): JSX.Element {
  const [mensagemEssencial, setMensagemEssencial] = useState(false);
  const [mensagemRecebimento, setMensagemRecebimento] = useState(false);
  const [taxaAdministrativa, setTaxaAdministrativa] = useState(false);
  const { user } = useAuth();
  const history = useHistory();
  const [showModalFundador, setShowModalFundador] = useState(false);
  const [showAvatarCadastro, setShowAvatarCadastro] = useState(false);

  function handleShowAvatarCadastro() {
    setShowAvatarCadastro(!showAvatarCadastro);
  }

  useEffect(() => {
    if (user.percentageRegisterProvider === 20) setShowAvatarCadastro(true);
    else if (user.fundador) setShowModalFundador(true);
  }, [user.fundador, user.percentageRegisterProvider]);

  const { setAssinaturaEscolhida, assinaturaEscolhida, buscarAssinatura } =
    useInformacoesFinanceiras();

  useEffect(() => {
    buscarAssinatura(handleFormatDocument(user.codigo_cadastro || ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSavePlan() {
    try {
      if (user.percentageRegisterProvider === 20) {
        handleShowAvatarCadastro();
        return;
      }
      if (!assinaturaEscolhida.ativa) {
        const response = await pagamentos_api.post(
          '/assinaturas/assinatura-inicial',
          {
            cpf_cnpj: handleFormatDocument(user.codigo_cadastro || ''),
            identificador_plano: 'free',
          },
        );
        await pagamentos_api.post('/assinaturas', {
          cpf_cnpj: handleFormatDocument(user.codigo_cadastro || ''),
          identificador_plano: 'free',
          cobranca_recorrente: true,
        });
        setAssinaturaEscolhida(response.data);
      }
      history.push('/cadastro-complementar', {
        selectAba: 2,
        cadastroCompleto: true,
      });
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <Layout titulo="Meus Benefícios" isConsumidor={false} active={true}>
      <Container>
        <AvatarCadastroIncompleto
          mostrar={showAvatarCadastro}
          esconderAvatar={handleShowAvatarCadastro}
          porcentagem={user.percentageRegisterProvider || 100}
          isConsumer={false}
        />
        <ModalFundador
          show={showModalFundador}
          setShow={setShowModalFundador}
        />
        <Title>Vamos ajudar você a mostrar ao mundo o seu potencial</Title>
        <Subtitle>
          Com a Gyan você pode ir mais longe. Confira seus benefícios{' '}
          <span className="azul">totalmente grátis.</span>
        </Subtitle>
        <ContainerPlans>
          <TablePlans mensagemEssencial={mensagemEssencial}>
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
                        setTaxaAdministrativa(false);
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
                      <p>Compartilhar seu perfil e ofertas</p>
                      <p>Feedback das habilidades percebidas</p>
                    </div>
                  )}
                </td>

                <td className="align-end">
                  <Image src={checkAzul} alt="possui" />
                </td>
              </tr>
              <tr>
                <td>Visibilidade na busca</td>

                <td className="align-end">
                  <Image src={checkAzul} alt="possui" />
                </td>
              </tr>
              <tr>
                <td>Gestão de reputação</td>
                <td className="align-end">
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
                        setTaxaAdministrativa(false);
                      }}
                    />
                  </span>
                  {mensagemRecebimento && (
                    <div className="mensagem-recebimento">
                      <p>
                        O recebimento deve respeitar a conclusão do projeto e
                        prazos da condição de pagamento
                      </p>
                    </div>
                  )}
                </td>

                <td className="align-end">
                  <span>Imediato</span>
                </td>
              </tr>
              <tr>
                <td>Habilidades e competências</td>

                <td className="align-end">
                  <span>50</span>
                </td>
              </tr>
              <tr>
                <td>Áreas e subáreas de atuação</td>

                <td className="align-end">
                  <span>30</span>
                </td>
              </tr>
              <tr>
                <td>Projetos simultâneos</td>

                <td className="align-end">
                  <span>Ilimitado</span>
                </td>
              </tr>
              <tr>
                <td>Favoritar projetos</td>

                <td className="align-end">
                  <span>15</span>
                </td>
              </tr>
              <tr>
                <td>Oferecer serviços, pacotes e cases</td>

                <td className="align-end">
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
                        setTaxaAdministrativa(!taxaAdministrativa);
                      }}
                    />
                  </span>
                  {taxaAdministrativa && (
                    <div className="mensagem-servico">
                      <p>Cota mensal</p>
                    </div>
                  )}
                </td>

                <td className="align-end">
                  <span>Ilimitado</span>
                </td>
              </tr>
              <tr>
                <td className="ajuda">
                  <span>Taxa administrativa para projetos</span>
                </td>

                <td className="align-end">
                  <span>12%</span>
                </td>
              </tr>
              <tr>
                <td className="ajuda">
                  <span>
                    Taxa administrativa para ofertas (Condição especial de
                    lançamento)
                  </span>
                </td>

                <td className="align-end">
                  <span>12%</span>
                </td>
              </tr>
              <tr>
                <td>Tempo de espera para captar projetos</td>

                <td className="align-end">
                  <span>Imediato</span>
                </td>
              </tr>
            </tbody>
          </TablePlans>
        </ContainerPlans>
        <ContainerButtons>
          <GhostButtonBranco onClick={() => history.goBack()}>
            VOLTAR
          </GhostButtonBranco>
          <GhostButtonAzul onClick={() => handleSavePlan()}>
            CONTINUAR <FiArrowRightCircle color="#fff" size={23} />
          </GhostButtonAzul>
        </ContainerButtons>
      </Container>
    </Layout>
  );
}
