import { useCallback, useEffect, useState } from 'react';
import { hotjar } from 'react-hotjar';
import Extrato from 'src/Containers/Extrato';
import { useAuth } from 'src/contexts/auth';
import { IPessoa } from 'src/interfaces/IPessoa';

export default function Extratos() {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/fornecedor/perfil');
  }, []);

  return <Extrato type="consumer" />;
}
