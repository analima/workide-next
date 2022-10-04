import { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { Antonio } from '../../../../../components/Antonio';

import { BarraProgresso } from '../../../../../components/BarraProgresso';
import { Spacer } from '../../../../../components/Spacer';
import { useCadastroServico } from '../../../../../hooks/cadastroServico';
import { AZUL, CINZA_30, VERDE } from '../../../../../styles/variaveis';
// import { AdicionarExtras } from '../AdicionarExtras';
import CaseSucesso from '../CaseSucesso';
import Compartilhe from '../Compartilhe';
import OpcoesPacote from '../OpcoesPacote';
import Requisitos from '../Requisitos';

import { NavButton } from './style';
import Content from './style';

interface IManterServicoContentProps {
  aba?: number;
}

interface ILocationProps {
  id_servico?: number;
}

export default function ManterServicoContent({
  aba = 0,
}: IManterServicoContentProps) {
  const location = useLocation<ILocationProps>();

  const {
    setIdServico,
    abaSelecionada,
    setAbaSelecionada,
    dica,
    setDica,
    mensagemDica,
    idServico,
  } = useCadastroServico();

  useEffect(() => {
    if (location.state) setIdServico(location.state.id_servico);

    const dadosAba = {
      indice: aba,
      porcentagem: aba === 0 ? 0 : 25 * aba,
    };
    setAbaSelecionada(dadosAba);
  }, [aba, setAbaSelecionada, setIdServico, location]);

  const continuar = () => {
    const indice = abaSelecionada.indice < 3 ? abaSelecionada.indice + 1 : 3;
    const porcentagem =
      abaSelecionada.porcentagem < 100 ? abaSelecionada.porcentagem + 25 : 100;

    setAbaSelecionada({
      indice,
      porcentagem,
    });

    window.scrollTo(0, 180);

    setDica(false);
  };

  const voltar = () => {
    const indice = abaSelecionada.indice > 0 ? abaSelecionada.indice - 1 : 0;
    const porcentagem =
      abaSelecionada.porcentagem > 25 ? abaSelecionada.porcentagem - 25 : 25;

    setAbaSelecionada({
      indice,
      porcentagem,
    });
  };

  const handleSelectColorAba = (indiceAba: number): string => {
    if (indiceAba < abaSelecionada.indice) {
      return VERDE;
    } else if (indiceAba > abaSelecionada.indice) {
      return CINZA_30;
    } else {
      return AZUL;
    }
  };

  return (
    <Content>
      <Helmet>
        <title>Freelas.town - Crie ou edite um serviço</title>
      </Helmet>
      <Spacer size={32} />

      <BarraProgresso porcentagem={abaSelecionada.porcentagem} />
      <Nav variant="pills" defaultActiveKey="#cadastro-complementar">
        <Nav.Item>
          <NavButton
            color={handleSelectColorAba(0)}
            onClick={() => setAbaSelecionada({ indice: 0, porcentagem: 25 })}
          >
            OPÇÕES DE PACOTES
          </NavButton>
        </Nav.Item>
        <Nav.Item>
          <NavButton
            color={handleSelectColorAba(1)}
            onClick={() =>
              idServico && setAbaSelecionada({ indice: 1, porcentagem: 50 })
            }
          >
            REQUISITOS
          </NavButton>
        </Nav.Item>
        <Nav.Item>
          <NavButton
            color={handleSelectColorAba(2)}
            onClick={() =>
              idServico && setAbaSelecionada({ indice: 2, porcentagem: 75 })
            }
          >
            CASES DE SUCESSO
          </NavButton>
        </Nav.Item>
      </Nav>

      <Spacer size={88} />

      {abaSelecionada.indice === 0 && <OpcoesPacote continuar={continuar} />}
      {abaSelecionada.indice === 1 && (
        <Requisitos continuar={continuar} voltar={voltar} />
      )}
      {abaSelecionada.indice === 2 && (
        <CaseSucesso continuar={continuar} voltar={voltar} />
      )}
      {abaSelecionada.indice === 3 && <Compartilhe />}

      <Antonio mensagem={mensagemDica} dica={dica} setDica={setDica} />
    </Content>
  );
}
