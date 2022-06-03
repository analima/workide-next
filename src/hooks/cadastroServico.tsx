import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

interface AbaSelecionada {
  indice: number;
  porcentagem: number;
}

interface CadastroServicoContextProps {
  abaSelecionada: AbaSelecionada;
  setAbaSelecionada: Dispatch<SetStateAction<AbaSelecionada>>;
  idServico?: number;
  setIdServico: Dispatch<SetStateAction<number | undefined>>;
  mensagemDica: string;
  setMensagemDica: Dispatch<SetStateAction<string>>;
  dica: boolean;
  setDica: Dispatch<SetStateAction<boolean>>;
  mostrarDicaAntonio: (dica: string) => void;
  subareaOutras: boolean;
  setSubareaOutras: Dispatch<SetStateAction<boolean>>;
}

const CadastroServicoContext = createContext<CadastroServicoContextProps>(
  {} as CadastroServicoContextProps,
);

export const CadastroServicoProvider: React.FC = ({ children }) => {
  const [abaSelecionada, setAbaSelecionada] = useState<AbaSelecionada>({
    indice: 0,
    porcentagem: 0,
  });

  const [idServico, setIdServico] = useState<number | undefined>(undefined);
  const [mensagemDica, setMensagemDica] = useState('');
  const [dica, setDica] = useState(false);
  const [subareaOutras, setSubareaOutras] = useState<boolean>(false);

  const mostrarDicaAntonio = (dica: string) => {
    setDica(true);
    setMensagemDica(dica);
  };

  return (
    <CadastroServicoContext.Provider
      value={{
        abaSelecionada,
        setAbaSelecionada,
        idServico,
        setIdServico,
        mensagemDica,
        setMensagemDica,
        dica,
        setDica,
        mostrarDicaAntonio,
        subareaOutras,
        setSubareaOutras,
      }}
    >
      {children}
    </CadastroServicoContext.Provider>
  );
};

export function useCadastroServico(): CadastroServicoContextProps {
  const context = useContext(CadastroServicoContext);

  if (!context) {
    throw new Error(
      'useCadastroServico must be used within an CadastroServicoProvider',
    );
  }

  return context;
}
