import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { IPessoa } from '../interfaces/IPessoa';
import { pessoas_api } from '../services/pessoas_api';

export const ID_TOKEN = '@Gyan:id_token';
export const REFRESH_TOKEN = '@Gyan:refresh_token';
export const USER = '@Gyan:user';

interface IAuthProps {
  id_token: string;
  refresh_token: string;
  user: object;
}

interface IAuthContextProps {
  user: IPessoa;
  idToken: string;
  isAuthDataLoading: boolean;
  saveAuthData(data: IAuthProps): Promise<void>;
  refreshUserData(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

export const AuthProvider: React.FC = ({ children }: any) => {
  const [user, setUser] = useState({} as IPessoa);
  const [isAuthDataLoading, setIsAuthDataLoading] = useState(true);
  const [idToken, setIdToken] = useState('');

  const saveAuthData = useCallback(
    async ({ id_token, refresh_token, user }: IAuthProps) => {
      localStorage.setItem(ID_TOKEN, id_token);
      localStorage.setItem(REFRESH_TOKEN, refresh_token);
      localStorage.setItem(USER, JSON.stringify(user));
    },
    [],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem(ID_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(USER);
    setUser({} as IPessoa);
  }, []);

  const refreshUserData = useCallback(async () => {
    const newIdToken = localStorage.getItem(ID_TOKEN);
    setIdToken(newIdToken || '');
    if (newIdToken) {
      const res = await pessoas_api.get('/pessoas/me', {
        headers: {
          Authorization: `Bearer ${newIdToken}`,
        },
      });
      if (res) {
        const { data: newUser } = res;
        setUser({
          ...newUser,
          id_pessoa: newUser.id,
          email: newUser.usuario?.email,
          url_avatar: newUser.arquivo?.url,
          admin: newUser.usuario?.admin,
        });
      }
    }
  }, []);

  useEffect(() => {
    refreshUserData().then(() => setIsAuthDataLoading(false));
  }, [refreshUserData]);

  return (
    <AuthContext.Provider
      value={{
        user,
        idToken,
        isAuthDataLoading,
        saveAuthData,
        refreshUserData,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContextProps {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
