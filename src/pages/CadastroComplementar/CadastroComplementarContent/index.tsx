import { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { Andre } from '../../../components/Andre';
import { Antonio } from '../../../components/Antonio';
import { BarraProgresso } from '../../../components/BarraProgresso';
import { Spacer } from '../../../components/Spacer';
import { useCadastroComplementar } from '../../../hooks/cadastroComplementar';
import ComplementarForm from '../ComplementarForm';
import CondicaoGeralForm from '../CondicaoGeralForm';
import FinanceiroForm from '../FinanceiroForm';
import Layout from '../Layout';
import TurbineForm from '../TurbineForm';
import { useAuth } from '../../../contexts/auth';

import { NavButton, Content } from './style';
import Container from './style';

interface IProps {
  turbineSeuPotencial?: boolean;
  selectAba: number;
  cadastroCompleto: boolean;
  progresso: number;
  isConsumidor?: boolean;
}

export default function CadastroComplementarContent({
  turbineSeuPotencial,
  selectAba,
  cadastroCompleto,
  progresso,
  isConsumidor,
}: IProps) {
  const {
    setIsConsumer,
    abaSelecionada,
    setAbaSelecionada,
    mensagemAvatar,
    handleShowAvatar,
    mostrarAvatar,
    porcentagem,
    setPorcentagem,
  } = useCadastroComplementar();
  const { user } = useAuth();

  useEffect(() => {
    (async function () {
      const percentageRegister = isConsumidor
        ? user.percentageRegisterConsumer
        : user.percentageRegisterProvider;
      setPorcentagem(percentageRegister || 0);
    })();
  }, [user, isConsumidor, setPorcentagem, abaSelecionada]);

  useEffect(() => {
    setIsConsumer(isConsumidor || false);
  });

  useEffect(() => {
    if (turbineSeuPotencial)
      setAbaSelecionada({ indice: 2, porcentagem: porcentagem });
    if (abaSelecionada)
      setAbaSelecionada({ indice: selectAba, porcentagem: porcentagem });
    if (selectAba)
      setAbaSelecionada({ indice: selectAba, porcentagem: porcentagem });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAba]);

  const handleClassName = (indiceAba: number) => {
    if (indiceAba < abaSelecionada.indice) {
      return 'aba-ja-preenchida';
    } else if (indiceAba > abaSelecionada.indice) {
      return 'aba-nao-selecionada';
    } else {
      return 'aba-selecionada';
    }
  };

  const componenteCadastroCompleto = (
    <Layout active={true} isConsumidor={isConsumidor}>
      <Container>
        <BarraProgresso porcentagem={porcentagem} />

        <Nav className="nav-itens" defaultActiveKey="#cadastro-complementar">
          <Nav.Item className={handleClassName(0)}>
            <NavButton
              selected={abaSelecionada.indice === 0}
              onClick={() =>
                setAbaSelecionada({ indice: 0, porcentagem: porcentagem })
              }
            >
              CADASTRO COMPLEMENTAR
            </NavButton>
          </Nav.Item>

          <Nav.Item className={handleClassName(1)}>
            <NavButton
              selected={abaSelecionada.indice === 1}
              onClick={() =>
                setAbaSelecionada({ indice: 1, porcentagem: porcentagem })
              }
            >
              CONDIÇÕES GERAIS
            </NavButton>
          </Nav.Item>

          {cadastroCompleto && (
            <>
              {!isConsumidor && (
                <Nav.Item className={handleClassName(2)}>
                  <NavButton
                    selected={abaSelecionada.indice === 2}
                    onClick={() =>
                      setAbaSelecionada({ indice: 2, porcentagem: porcentagem })
                    }
                  >
                    TURBINE SEU POTENCIAL
                  </NavButton>
                </Nav.Item>
              )}

              <Nav.Item className={handleClassName(3)}>
                <NavButton
                  selected={abaSelecionada.indice === 3}
                  onClick={() =>
                    setAbaSelecionada({ indice: 3, porcentagem: porcentagem })
                  }
                >
                  INFORMAÇÕES FINANCEIRAS
                </NavButton>
              </Nav.Item>
            </>
          )}
        </Nav>
        <Spacer size={16} />

        {abaSelecionada.indice !== 1 ? (
          <Antonio
            mensagem={mensagemAvatar}
            dica={mostrarAvatar}
            setDica={handleShowAvatar}
          />
        ) : (
          <Andre
            mensagem={mensagemAvatar}
            dica={mostrarAvatar}
            setDica={handleShowAvatar}
          />
        )}
        {abaSelecionada.indice === 0 && <ComplementarForm />}
        {abaSelecionada.indice === 1 && (
          <CondicaoGeralForm
            isConsumidor={isConsumidor || false}
            cadastroCompleto={cadastroCompleto || false}
          />
        )}
        {abaSelecionada.indice === 2 && cadastroCompleto && !isConsumidor && (
          <TurbineForm />
        )}
        {abaSelecionada.indice === 3 && cadastroCompleto && <FinanceiroForm />}
        <Spacer size={64} />
      </Container>
    </Layout>
  );

  const componenteCadastroBasico = (
    <Content>
      <Container style={{ width: '90%' }}>
        <BarraProgresso porcentagem={porcentagem} />

        <Nav className="nav-itens" defaultActiveKey="#cadastro-complementar">
          <Nav.Item className={handleClassName(0)}>
            <NavButton
              selected={abaSelecionada.indice === 0}
              onClick={() =>
                setAbaSelecionada({ indice: 0, porcentagem: porcentagem })
              }
            >
              CADASTRO COMPLEMENTAR
            </NavButton>
          </Nav.Item>

          <Nav.Item className={handleClassName(1)}>
            <NavButton
              selected={abaSelecionada.indice === 1}
              onClick={() =>
                setAbaSelecionada({ indice: 1, porcentagem: porcentagem })
              }
            >
              CONDIÇÕES GERAIS
            </NavButton>
          </Nav.Item>

          {cadastroCompleto && (
            <>
              {!isConsumidor && (
                <Nav.Item className={handleClassName(2)}>
                  <NavButton
                    selected={abaSelecionada.indice === 2}
                    onClick={() =>
                      setAbaSelecionada({ indice: 2, porcentagem: porcentagem })
                    }
                  >
                    TURBINE SEU POTENCIAL
                  </NavButton>
                </Nav.Item>
              )}

              <Nav.Item className={handleClassName(3)}>
                <NavButton
                  selected={abaSelecionada.indice === 3}
                  onClick={() =>
                    setAbaSelecionada({ indice: 3, porcentagem: porcentagem })
                  }
                >
                  INFORMAÇÕES FINANCEIRAS
                </NavButton>
              </Nav.Item>
            </>
          )}
        </Nav>
        <Spacer size={16} />

        {abaSelecionada.indice !== 1 ? (
          <Antonio
            mensagem={mensagemAvatar}
            dica={mostrarAvatar}
            setDica={handleShowAvatar}
          />
        ) : (
          <Andre
            mensagem={mensagemAvatar}
            dica={mostrarAvatar}
            setDica={handleShowAvatar}
          />
        )}
        {abaSelecionada.indice === 0 && <ComplementarForm />}
        {abaSelecionada.indice === 1 && (
          <CondicaoGeralForm
            isConsumidor={isConsumidor || false}
            cadastroCompleto={cadastroCompleto || false}
          />
        )}
        {abaSelecionada.indice === 2 && cadastroCompleto && !isConsumidor && (
          <TurbineForm />
        )}
        {abaSelecionada.indice === 3 && cadastroCompleto && <FinanceiroForm />}
        <Spacer size={64} />
      </Container>
    </Content>
  );

  return cadastroCompleto
    ? componenteCadastroCompleto
    : componenteCadastroBasico;
}
