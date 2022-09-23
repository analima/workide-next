import axios, { AxiosRequestConfig } from 'axios';
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { services } from 'src/services';
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
  setUser: React.Dispatch<React.SetStateAction<IPessoa>>;
}
interface IProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

export function AuthProvider({ children }: IProps) {
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

  useEffect(() => {
    services.forEach(service => {
      service.interceptors.response.use(
        response => {
          return response;
        },
        err => {
          return new Promise((resolve, reject) => {
            const originalReq: AxiosRequestConfig = err.config;
            if (
              err.response?.status !== 401 ||
              !err.config ||
              err.config.__isRetryRequest
            ) {
              reject(err);
              return;
            }
            const email = JSON.parse(localStorage.getItem(USER) || '{}').email;
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);

            const res = fetch(
              `${process.env.REACT_APP_SEGURANCA_API}/sessoes`,
              {
                method: 'PUT',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                  'Content-Type': 'application/json',
                },
                redirect: 'follow',
                referrer: 'no-referrer',
                body: JSON.stringify({
                  email,
                  refresh_token: refreshToken,
                }),
              },
            )
              .then(async refreshResponse => {
                const r = await refreshResponse.json();
                if (originalReq.headers)
                  originalReq.headers['Authorization'] = `Bearer ${r.id_token}`;
                service.defaults.headers.common[
                  'Authorization'
                ] = `Bearer ${r.id_token}`;
                localStorage.setItem(ID_TOKEN, r.id_token);
                localStorage.setItem(REFRESH_TOKEN, r.refresh_token);
                return axios(originalReq);
              })
              .catch(refreshError => {
                localStorage.removeItem(ID_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
                localStorage.removeItem(USER);
                reject(refreshError);
              });
            resolve(res);
          });
        },
      );
    });

    const updateToken = () => {
      const idToken = localStorage.getItem(ID_TOKEN);
      services.forEach(service => {
        if (ID_TOKEN) {
          service.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${idToken}`;
        }
      });
    };

    updateToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
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
}

export function useAuth(): IAuthContextProps {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
