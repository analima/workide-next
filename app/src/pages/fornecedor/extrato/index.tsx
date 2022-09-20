import { GetStaticPaths, GetStaticProps } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { hotjar } from 'react-hotjar';
import Extrato from 'src/Containers/Extrato';
import { ID_TOKEN, useAuth } from 'src/contexts/auth';
import { consultas_api } from 'src/services/consultas_api';

export default function Extratos() {
  const { user } = useAuth();

  console.log(user);

  useEffect(() => {
    async function load() {
      if (user.id_pessoa) {
        const newIdToken = localStorage.getItem(ID_TOKEN);
        console.log(newIdToken);

        if (newIdToken) {
          const res = await consultas_api.post<any>(
            `/consulta/extrato/fornecedor/${user?.id_pessoa}`,
            {
              headers: {
                Authorization: `Bearer ${newIdToken}`,
              },
            },
          );
          console.log(res);
        }
      }
    }
    load();
  }, [user.id_pessoa]);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/fornecedor/perfil');
  }, []);

  return <Extrato type="provider" />;
}
