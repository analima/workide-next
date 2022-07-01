import { Container } from 'react-bootstrap';
import { Template } from '../../components/Template';
import Content from './style';
import { CadastroComplementarProvider } from '../../hooks/cadastroComplementar';
import CadastroComplementarContent from './CadastroComplementarContent';
import { InformacoesFinanceirasProvider } from '../../hooks/informacoesFinanceiras';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { pessoas_api } from '../../services/pessoas_api';
import { useAuth } from '../../contexts/auth';
import { Helmet } from 'react-helmet';

interface IProps {
  turbineSeuPotencial: boolean;
  selectAba: number;
  cadastroCompleto: boolean;
  progresso: number;
  isConsumidor: boolean;
}

export default function CadastroComplementar() {
  const location = useLocation<IProps>();
  const { user } = useAuth();
  const [percentage, setPercentage] = useState(0);
  const [defaultAba, setDefautAba] = useState(0);
  const getRegisterPercentage = async (user: any) => {
    const person = await pessoas_api.get(
      `/pessoas?id_usuario=${user.id_usuario}`,
    );
    const { percentageRegisterProvider } = person.data;
    return percentageRegisterProvider;
  };

  useEffect(() => {
    (async function () {
      const percentageRegister = await getRegisterPercentage(user);
      setPercentage(percentageRegister);
    })();
  }, [user, location]);

  useEffect(() => {
    if (!location.state?.selectAba) {
      if (percentage === 20) setDefautAba(0);
      else if (percentage === 40) setDefautAba(2);
      else if (percentage === 60) setDefautAba(2);
      else if (percentage === 80) setDefautAba(3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Gyan - Complete o seu cadastro</title>
      </Helmet>
      <Template>
        <Content>
          <Container style={{ margin: '0', padding: '0' }}>
            <CadastroComplementarProvider>
              <InformacoesFinanceirasProvider>
                <CadastroComplementarContent
                  progresso={percentage}
                  selectAba={location.state?.selectAba || defaultAba}
                  cadastroCompleto={location.state?.cadastroCompleto || false}
                  turbineSeuPotencial={
                    location.state?.turbineSeuPotencial || false
                  }
                  isConsumidor={location.state?.isConsumidor || false}
                />
              </InformacoesFinanceirasProvider>
            </CadastroComplementarProvider>
          </Container>
        </Content>
      </Template>
    </>
  );
}
