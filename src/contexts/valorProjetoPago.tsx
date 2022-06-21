import React, { createContext, useState, useContext, useEffect } from 'react';
import { GlobalLayoutProps } from '../interfaces/globalLayoutProps';

export interface Projeto {
  id: number;
  valorComTaxa: number;
  valorSemTaxa: number;
}

interface Statusfatura {
  [status: string]: string;
}

interface ValorProjetoPagoContextProps {
  buscarProjeto: (id: number) => Projeto | null;
  adicinarProjeto: (projeto: Projeto) => void;
  apagarLocalStorage: () => void;
  jaFoiPago: (status: string) => boolean;
}

const ValorProjetoPagoContext = createContext<ValorProjetoPagoContextProps>(
  {} as ValorProjetoPagoContextProps,
);

export const ValorProjetoPagoProvider: React.FC<GlobalLayoutProps>  = ({ children }) => {
  const [projetos, setProjetos] = useState<Projeto[]>([] as Projeto[]);
  const statusFaturasPagas: Statusfatura = {
    pagamentoEfetuada: 'PAGAMENTO_EFETUADO',
    aguardandoInicio: 'AGUARDANDO_INICIO',
    iniciado: 'INICIADO',
    concluido: 'CONCLUIDO',
    conslusaoSolicitada: 'CONCLUSAO_SOLICITADA',
    revisaoSolicitada: 'REVISAO_SOLICITADA',
    cancelado: 'CANCELADO',
    desistenciaIniciada: 'DESISTENCIA_INICIADA',
    concluidoParcialmente: 'CONCLUIDO_PARCIALMENTE',
  };

  useEffect(() => {
    carregarLocalStorage();
  }, []);

  function adicinarProjeto(projeto: Projeto) {
    const projetosAux = projetos;
    projetosAux.push(projeto);
    setProjetos(projetosAux);
    salvarLocalStorage();
  }

  function buscarProjeto(id: number): Projeto | null {
    return projetos.find(projeto => projeto.id === id) || null;
  }

  function salvarLocalStorage() {
    localStorage.setItem('projetosPagos', JSON.stringify(projetos));
  }

  function carregarLocalStorage() {
    const projetosPagos = localStorage.getItem('projetosPagos');
    if (projetosPagos) {
      setProjetos(JSON.parse(projetosPagos));
    }
  }

  function apagarLocalStorage() {
    localStorage.removeItem('projetosPagos');
  }

  function jaFoiPago(status: string): boolean {
    let pago = false;
    Object.keys(statusFaturasPagas).forEach(key => {
      if (status === statusFaturasPagas[key]) pago = true;
    });
    return pago;
  }

  return (
    <ValorProjetoPagoContext.Provider
      value={{
        jaFoiPago,
        adicinarProjeto,
        buscarProjeto,
        apagarLocalStorage,
      }}
    >
      {children}
    </ValorProjetoPagoContext.Provider>
  );
};

export function useValorProjetoPago(): ValorProjetoPagoContextProps {
  const context = useContext(ValorProjetoPagoContext);

  if (!context) {
    throw new Error(
      'useValorProjetoPago must be used within an ValorProjetoPagoProvider',
    );
  }

  return context;
}
