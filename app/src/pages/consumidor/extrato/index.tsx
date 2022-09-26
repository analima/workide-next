import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';
import Layout from 'src/components/AreaConsumidor/Layout';
import Extrato from 'src/Containers/Extrato';

export default function Extratos() {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/fornecedor/perfil');
  }, []);

  return (
    <Layout titulo="" activeMenu={true} maisSolucoesIsNotVisible={true}>
      <Extrato type="consumer" />;
    </Layout>
  );
}