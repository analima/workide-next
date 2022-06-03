import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { pessoas_api } from '../services/pessoas_api';
import { useAuth } from '../contexts/auth';
import { GlobalLayoutProps } from '../interfaces/globalLayoutProps';

interface PlanLimits {
  id: number;
  idPlano: number;
  seloAssinatura: boolean;
  ilimitadoHabilidadesECompetencias: boolean;
  habilidadesECompetencias: number;
  ilimitadoAreasESubareasDeAtuacao: boolean;
  areasESubareasDeAtuacao: number;
  ilimitadoProjetosSimultaneos: boolean;
  projetosSimultaneos: number;
  ilimitadoFavoritarProjetos: boolean;
  favoritarProjetos: number;
  ilimitadoServicosPacotesECases: boolean;
  servicosPacotesECases: number;
  ilimitadoServicosVoluntarios: boolean;
  servicosVoluntarios: number;
  taxaAdministracao: number;
  horasParaDisponibilidadeDoProjeto: number;
}

interface ILimitsContextProps {
  limitacoesPlano: PlanLimits;
  buscarLimitacoes: () => Promise<void>;
}

const LimitacoesPlanosContext = createContext<ILimitsContextProps>(
  {} as ILimitsContextProps,
);

export const PlanLimitationsProvider: React.FC<GlobalLayoutProps> = ({ children }) => {
  const [limitacoesPlano, setLimitacoesPlano] = useState<PlanLimits>(
    {} as PlanLimits,
  );
  const { user } = useAuth();
  const buscarLimitacoes = useCallback(async () => {
    if (user.id_pessoa) {
      const response = await pessoas_api.get(
        `/pessoas/${user.id_pessoa}/regras-plano`,
      );
      setLimitacoesPlano(response.data);
    }
  }, [user.id_pessoa]);

  useEffect(() => {
    buscarLimitacoes();
  }, [buscarLimitacoes]);

  return (
    <LimitacoesPlanosContext.Provider
      value={{
        limitacoesPlano,
        buscarLimitacoes,
      }}
    >
      {children}
    </LimitacoesPlanosContext.Provider>
  );
};

export function useLimitacoesPlanos(): ILimitsContextProps {
  const context = useContext(LimitacoesPlanosContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
