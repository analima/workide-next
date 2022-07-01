import { Col, Container, Row, Table } from 'react-bootstrap';
import { AZUL, VERMELHO } from '../../../../styles/variaveis';
import { formatarValor } from '../../../../utils/CurrencyFormat';
import { useAuth } from '../../../../contexts/auth';
import { ValorTotal } from './style';
import Content from './style';
import { AvatarCadastroIncompleto } from '../../../AvatarCadastroIncompleto';
import { useEffect, useState } from 'react';
import { IItens, IPacoteInfo } from '../../../../interfaces/IServicoInfo';
import { AvatarErroGeral } from '../../../AvatarErroGeral';
import { FaCheckCircle } from 'react-icons/fa';
import { FiXCircle } from 'react-icons/fi';

interface OpcoesPacoteProps {
  pacotes: IPacoteInfo[];
  itens?: IItens[];
}

export default function OpcoesPacoteNovo({
  pacotes,
  itens,
}: OpcoesPacoteProps) {
  const { user, refreshUserData } = useAuth();
  const [showDenuncedAvatar, setShowDenuncedAvatar] = useState(false);
  const [sizePage, setSizePage] = useState(0);

  const [showAvatarCadastroIncompleto, setShowAvatarCadastroIncompleto] =
    useState(false);

  function handleShowAvatarCadastroIncompleto() {
    setShowAvatarCadastroIncompleto(!showAvatarCadastroIncompleto);
  }

  function handleShowDenuncedAvatar() {
    setShowDenuncedAvatar(!showDenuncedAvatar);
  }

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  const handleResize = (e: any) => {
    setSizePage(window.innerWidth);
  };

  useEffect(() => {
    setSizePage(window.innerWidth);
    window.addEventListener('resize', handleResize);
  }, []);

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

      <Container className="p-1">
        <Row>
          <Col lg={12}>
            <Table responsive={sizePage < 768}>
              <tbody>
                <tr>
                  <td className="label-pacote">Descrição</td>

                  {pacotes &&
                    pacotes
                      .slice(0)
                      .reverse()
                      .map(pacote => (
                        <td key={pacote.id}>
                          <span>{pacote.nome}</span>
                          <p>{pacote.descricao}</p>
                        </td>
                      ))}
                </tr>

                {itens &&
                  itens.map(item => (
                    <tr key={item.id}>
                      <td className="label-pacote">{item.descricao}</td>
                      {pacotes
                        .slice(0)
                        .reverse()
                        .map(pacote => (
                          <td key={pacote.id}>
                            {(pacote.tipo === 'BASICO' && item.basico) ||
                            (pacote.tipo === 'INTERMEDIARIO' &&
                              item.intermediario) ||
                            (pacote.tipo === 'AVANCADO' && item.avancado) ? (
                              <FaCheckCircle color={AZUL} size={16} />
                            ) : (
                              <FiXCircle color={VERMELHO} size={16} />
                            )}
                          </td>
                        ))}
                    </tr>
                  ))}

                <tr>
                  <td className="label-pacote">Prazo</td>
                  {pacotes &&
                    pacotes
                      .slice(0)
                      .reverse()
                      .map(pacote => (
                        <td
                          style={{ color: '#6e6e6e', fontWeight: 'bold' }}
                          key={pacote.id}
                        >
                          {pacote.prazo} dias
                        </td>
                      ))}
                </tr>

                <tr>
                  <td className="label-pacote">Preço</td>
                  {pacotes &&
                    pacotes
                      .slice(0)
                      .reverse()
                      .map(pacote => (
                        <td key={pacote.id}>
                          <ValorTotal>
                            <p>
                              {formatarValor(
                                Number(pacote.preco) / (1 - 0.12) -
                                  Number(pacote.preco) >
                                  14
                                  ? Number(pacote.preco) / (1 - 0.12)
                                  : Number(pacote.preco) + 14,
                              )}
                            </p>
                          </ValorTotal>
                        </td>
                      ))}
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Content>
  );
}
