import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';
import Layout from 'src/components/AreaConsumidor/Layout';
import Extrato from 'src/Containers/Extrato';
import { ID_TOKEN } from 'src/contexts/auth';

export default function Extratos() {
  const router = useRouter();
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/contratante/extrato');
  }, []);

  return (
    <>
      {localStorage.getItem(ID_TOKEN) ? (
        <Layout titulo="" activeMenu={true} maisSolucoesIsNotVisible={true}>
          <Extrato type="consumer" />;
        </Layout>
      ) : (
        router.push('/contratante/home')
      )}
    </>
  );
}
