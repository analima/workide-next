import { Col, Container, FormCheck, Row, Table } from 'react-bootstrap';
import { Spacer } from '../../../Spacer';
import { Titulo } from '../../../Titulo';
import { AZUL, LARANJA, VERDE } from '../../../../styles/variaveis';
import { formatarValor } from '../../../../utils/CurrencyFormat';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../../contexts/auth';
import { Button, ValorTotal, ItemTipo } from './style';
import Content from './style';
import { AvatarCadastroIncompleto } from '../../../AvatarCadastroIncompleto';
import { useEffect, useState } from 'react';
import {
  IItens,
  IPacoteInfo,
  IServicoInfo,
} from '../../../../interfaces/IServicoInfo';
import { AvatarErroGeral } from '../../../AvatarErroGeral';

interface OpcoesPacoteProps {
  pacotes: IPacoteInfo[];
  itens?: IItens[];
  servicoInfo: IServicoInfo;
}

export default function OpcoesPacote({
  pacotes,
  itens,
  servicoInfo,
}: OpcoesPacoteProps) {
  const history = useHistory();
  const { user, refreshUserData } = useAuth();
  const [showDenuncedAvatar, setShowDenuncedAvatar] = useState(false);

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
      <Titulo
        titulo="Pacotes e Preços"
        tamanho={32}
        cor={AZUL}
        negrito={false}
      />

      <Spacer size={42} />

      <Container>
        <Row>
          <Col lg={12}>
            <Table responsive>
              <tbody>
                <tr>
                  <td className="label-pacote">Opções de Pacote</td>
                  {pacotes
                    .slice(0)
                    .reverse()
                    .map(pacote => (
                      <ItemTipo name={pacote.tipo} key={pacote.id}>
                        {pacote.tipo}
                      </ItemTipo>
                    ))}
                </tr>
                <tr>
                  <td className="label-pacote">Nome</td>
                  {pacotes
                    .slice(0)
                    .reverse()
                    .map(pacote => (
                      <td key={pacote.id}>{pacote.nome}</td>
                    ))}
                </tr>

                <tr>
                  <td className="label-pacote">Descrição</td>
                  {pacotes
                    .slice(0)
                    .reverse()
                    .map(pacote => (
                      <td key={pacote.id}>{pacote.descricao}</td>
                    ))}
                </tr>

                <tr>
                  <td className="label-pacote">Prazo</td>
                  {pacotes
                    .slice(0)
                    .reverse()
                    .map(pacote => (
                      <td style={{ textAlign: 'center' }} key={pacote.id}>
                        {pacote.prazo} dias
                      </td>
                    ))}
                </tr>

                {itens &&
                  itens.map(item => (
                    <tr key={item.id}>
                      <td>{item.descricao}</td>
                      {pacotes
                        .slice(0)
                        .reverse()
                        .map(pacote => (
                          <td key={pacote.id}>
                            <FormCheck
                              className="check-pacote"
                              name="link"
                              checked={
                                (pacote.tipo === 'BASICO' && item.basico) ||
                                (pacote.tipo === 'INTERMEDIARIO' &&
                                  item.intermediario) ||
                                (pacote.tipo === 'AVANCADO' && item.avancado)
                              }
                              type="checkbox"
                            />
                          </td>
                        ))}
                    </tr>
                  ))}

                <tr>
                  <td className="label-pacote">Preço</td>
                  {pacotes
                    .slice(0)
                    .reverse()
                    .map(pacote => (
                      <td key={pacote.id}>
                        <ValorTotal>
                          <p>
                            {formatarValor(
                              Number(pacote.preco) +
                                (Number(pacote.preco) / (1 - 0.12) -
                                  Number(pacote.preco) >
                                14
                                  ? Number(pacote.preco) / (1 - 0.12) -
                                    Number(pacote.preco)
                                  : 14),
                            )}
                          </p>
                        </ValorTotal>
                      </td>
                    ))}
                </tr>

                {servicoInfo.id_pessoa !== user.id_pessoa && (
                  <tr>
                    <td></td>
                    {pacotes
                      .slice(0)
                      .reverse()
                      .map(pacote => {
                        let cor = AZUL;
                        if (pacote.tipo === 'INTERMEDIARIO') cor = VERDE;
                        if (pacote.tipo === 'AVANCADO') cor = LARANJA;
                        return (
                          <td className="center" key={pacote.id}>
                            <Button
                              onClick={() => {
                                if (!user.id_pessoa) {
                                  history.push('/cadastro-basico');
                                  return;
                                }
                                if (user.denuncias.length) {
                                  handleShowDenuncedAvatar();
                                  return;
                                }

                                if (
                                  user.percentageRegisterConsumer &&
                                  user.percentageRegisterConsumer < 66
                                ) {
                                  handleShowAvatarCadastroIncompleto();
                                  return;
                                }
                                if (user && user.id === undefined) {
                                  history.push('/login');
                                } else {
                                  history.push('/consumidor/detalhes-oferta', {
                                    pacoteId: pacote.id,
                                    servicoInfo: servicoInfo,
                                  });
                                }
                              }}
                              cor={cor}
                            >
                              Comprar
                            </Button>
                          </td>
                        );
                      })}
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Content>
  );
}
