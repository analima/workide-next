import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CadastroServicoProvider } from '../../../../hooks/cadastroServico';
import { Layout } from '../../Layout';
import { ManterServicoContent } from './ManterServicoContent';
import { hotjar } from 'react-hotjar';

import { Content } from './style';

interface ILocationProps {
  aba?: number;
  id_servico?: number;
}

export function ManterServico() {
  const location = useLocation<ILocationProps>();

  const [isLoading, setIsLoading] = useState(true);
  const [aba, setAba] = useState<number>(0);
  const [titulo, setTitulo] = useState<string>('Novo Serviço');

  useEffect(() => {
    const valorAba = location.state?.aba ? aba : 0;
    if (location.state?.id_servico) {
      setTitulo('Editando Serviço');
    }
    setAba(valorAba);
    setIsLoading(false);
  }, [location, aba]);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/fornecedor/novo-servico');
  }, []);

  return (
    <Content>
      <Layout titulo={titulo}>
        <CadastroServicoProvider>
          {!isLoading && <ManterServicoContent aba={aba} />}
        </CadastroServicoProvider>
      </Layout>
    </Content>
  );
}
