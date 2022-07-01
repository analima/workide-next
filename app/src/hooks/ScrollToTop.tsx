import { useEffect, ReactNode } from 'react';
import { withRouter } from 'react-router-dom';

type ScrollToTopProps = {
  history: any;
  children?: ReactNode;
};

function ScrollToTopHOC({ history, children }: ScrollToTopProps): JSX.Element {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return <>{children}</>;
}

export const ScrollToTop = withRouter(ScrollToTopHOC);
