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

interface CadastroComplementarContextProps {
  abaSelecionada: AbaSelecionada;
  setAbaSelecionada: Dispatch<SetStateAction<AbaSelecionada>>;
  mostrarAvatar: boolean;
  handleShowAvatar: () => void;
  mensagemAvatar: string;
  setMensagemAvatar: Dispatch<SetStateAction<string>>;
  porcentagem: number;
  setPorcentagem: Dispatch<SetStateAction<number>>;
  isConsumer: boolean;
  setIsConsumer: Dispatch<SetStateAction<boolean>>;
  isEqual: boolean;
  setIsEqual: Dispatch<SetStateAction<boolean>>;
}

const CadastroComplementarContext =
  createContext<CadastroComplementarContextProps>(
    {} as CadastroComplementarContextProps,
  );

export const CadastroComplementarProvider: React.FC = ({ children }) => {
  const [abaSelecionada, setAbaSelecionada] = useState<AbaSelecionada>({
    indice: 0,
    porcentagem: 50,
  });
  const [isConsumer, setIsConsumer] = useState(false);
  const [mostrarAvatar, setMostarAvatar] = useState(false);
  const [mensagemAvatar, setMensagemAvatar] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus ac tortor vitae feugiat. Cras id risus vitae sem ornare pretium. Etiam convallis nulla ac imperdiet vulputate. Nulla vestibulum sapien in magna convallis, sit amet pharetra nisl mattis. Duis laoreet lacus eget mauris tempus rutrum.',
  );
  const [porcentagem, setPorcentagem] = useState(0);
  const handleShowAvatar = () => {
    setMostarAvatar(!mostrarAvatar);
  };
  const [isEqual, setIsEqual] = useState(false);

  return (
    <CadastroComplementarContext.Provider
      value={{
        abaSelecionada,
        setAbaSelecionada,
        mostrarAvatar,
        handleShowAvatar,
        mensagemAvatar,
        setMensagemAvatar,
        porcentagem,
        setPorcentagem,
        isConsumer,
        setIsConsumer,
        isEqual,
        setIsEqual,
      }}
    >
      {children}
    </CadastroComplementarContext.Provider>
  );
};

export function useCadastroComplementar(): CadastroComplementarContextProps {
  const context = useContext(CadastroComplementarContext);

  if (!context) {
    throw new Error(
      'useCadastroComplementar must be used within an CadastroComplementarProvider',
    );
  }

  return context;
}
