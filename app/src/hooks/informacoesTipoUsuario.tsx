import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { Control, FieldValues, useForm } from 'react-hook-form';
import { getLocalStorage, setLocalStorage } from './localStorage';

interface IOptionsType {
  value: string;
  label: string;
}

interface InformacoesTipoUsuarioProps {
  control: Control<FieldValues, object>;
  optionsType: Array<IOptionsType>;
  setOptionsType: Dispatch<SetStateAction<IOptionsType[]>>;
  typeSelected: string;
  setTypeSelected: Dispatch<SetStateAction<string>>;
  handleSelectedType: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
  returnTypeSelected: () => 'Contratante' | 'Profissional';
}

const InformacoesTipoUsuarioContext =
  createContext<InformacoesTipoUsuarioProps>({} as InformacoesTipoUsuarioProps);
interface IProps {
  children: React.ReactNode;
}

export function InformacoesTipoUsuario({ children }: IProps) {
  const [optionsType, setOptionsType] = useState<Array<IOptionsType>>(
    [] as Array<IOptionsType>,
  );
  const { control } = useForm({
    mode: 'all',
  });
  const [typeSelected, setTypeSelected] = useState<string>('Selecione...');
  const typeSelectedRef = useRef<string>(typeSelected);
  const redirection: any = {
    CONTRATANTE: () => {
      window.location.replace('/contratante/home');
    },
    PROFISSIONAL: () => {
      window.location.replace('/fornecedor/home');
    },
  };
  const handleSelectedType = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    if (evt.target.value === typeSelected) return;
    setTypeSelected(evt.target.value);
    setLocalStorage('typeUser', evt.target.value.toUpperCase());
    typeSelectedRef.current = evt.target.value;
    redirection[typeSelectedRef.current]();
  };

  const identifyUserType = useCallback(() => {
    const typeUser = getLocalStorage('typeUser');
    if (!typeUser) return setTypeSelected('Selecione...');
    if (typeUser === 'PROFISSIONAL') {
      setTypeSelected(typeUser);
      setOptionsType([
        {
          value: 'CONTRATANTE',
          label: 'Contratante',
        },
      ]);
      return;
    } else {
      setTypeSelected(typeUser);
      setOptionsType([
        {
          value: 'PROFISSIONAL',
          label: 'Profissional',
        },
      ]);
      return;
    }
  }, []);

  useEffect(() => {
    identifyUserType();
  }, [identifyUserType]);

  useEffect(() => {
    setOptionsType([
      {
        value: 'CONTRATANTE',
        label: 'Contratante',
      },
      {
        value: 'PROFISSIONAL',
        label: 'Profissional',
      },
    ]);
  }, []);

  const returnTypeSelected = () =>
    typeSelected === 'CONTRATANTE' ? 'Contratante' : 'Profissional';

  return (
    <InformacoesTipoUsuarioContext.Provider
      value={{
        control,
        optionsType,
        setOptionsType,
        typeSelected,
        setTypeSelected,
        handleSelectedType,
        returnTypeSelected,
      }}
    >
      {children}
    </InformacoesTipoUsuarioContext.Provider>
  );
}

export function useInformacoesTipoUsuario(): InformacoesTipoUsuarioProps {
  const context = useContext(InformacoesTipoUsuarioContext);

  if (!context) {
    throw new Error(
      'useInformacoesTipoUsuario must be used within an InformacoesTipoUsuario',
    );
  }

  return context;
}
