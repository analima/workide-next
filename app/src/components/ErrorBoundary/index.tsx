import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorContainer } from './style';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erro não tratado:', error);
    console.error('Informação do erro:', errorInfo);
    // setTimeout(() => {
    //   window.location.replace('/');
    // }, 4000);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <h1>Ops! Ocorreu um erro na página</h1>
          <p>Não se preocupe, já estamos trabalhando para resolver isso.</p>
          <p>Se o erro persistir, entre em contato com nosso suporte.</p>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
