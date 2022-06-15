import { useEffect } from 'react';
import { useAuth } from '../../contexts/auth';
import { useHistory } from 'react-router-dom';
import { useValorProjetoPago } from '../../contexts/valorProjetoPago';

export function Logout() {
  const { signOut } = useAuth();
  const history = useHistory();
  const { apagarLocalStorage } = useValorProjetoPago();

  useEffect(() => {
    signOut();
    apagarLocalStorage();

    history.push({
      pathname: '/',
    });
  }, [history, signOut, apagarLocalStorage]);

  return <></>;
}
