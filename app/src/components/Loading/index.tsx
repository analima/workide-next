// import { useRouter } from 'next/router';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useAuth } from 'src/contexts/auth';
import { Skeleton } from '../Skeleton';
import { Spinner } from '../Spinner';

type LoadingProps = {
  children: ReactNode;
};

export function Loading({ children }: LoadingProps) {
  const { isAuthDataLoading, setIdFiliate } = useAuth();
  const { query } = useRouter();
  useEffect(() => {
    const idFilicateLocalStorage = localStorage.getItem('@freelas_idFiliate');

    if (query.affiliate_id) {
      setIdFiliate(query.affiliate_id as string);
      localStorage.setItem('@freelas_idFiliate', query.affiliate_id as string);
    }

    if (idFilicateLocalStorage && !query.affiliate_id) {
      setIdFiliate(idFilicateLocalStorage);
    }
  }, [query.affiliate_id, setIdFiliate]);

  if (isAuthDataLoading)
    return (
      <>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '32px',
          }}
        >
          <Spinner type="info" size="40px"></Spinner>
        </div>
      </>
    );
  return <>{children}</>;
}
