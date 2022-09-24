import { ReactNode } from 'react';
import { useAuth } from 'src/contexts/auth';
import { Skeleton } from '../Skeleton';
import { Spinner } from '../Spinner';

type LoadingProps = {
  children: ReactNode;
};

export function Loading({ children }: LoadingProps) {
  const { isAuthDataLoading } = useAuth();
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
