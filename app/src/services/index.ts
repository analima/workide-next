import { arquivos_api } from './arquivos_api';
import { dicas_api } from './dicas_api';
import { geral_api } from './geral_api';
import { ofertas_api } from './ofertas_api';
import { pessoas_api } from './pessoas_api';
import { seguranca_api } from './seguranca_api';
import { consultas_api } from './consultas_api';
import { pagamentos_api } from './pagamentos_api';
import { oportunidades_api } from './oportunidades_api';
import axios, { AxiosRequestConfig } from 'axios';
import { ID_TOKEN, REFRESH_TOKEN, USER } from '../contexts/auth';
import { notificacoes_api } from './notificacoes_api';
import { useEffect } from 'react';

const ISSERVER = typeof window === 'undefined';

const services = [
  arquivos_api,
  dicas_api,
  geral_api,
  ofertas_api,
  pessoas_api,
  seguranca_api,
  consultas_api,
  pagamentos_api,
  oportunidades_api,
  notificacoes_api,
];

services.forEach(service => {
  if (!ISSERVER) {
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

          const res = fetch(`${process.env.REACT_APP_SEGURANCA_API}/sessoes`, {
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
          })
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
  }
});

const updateToken = () => {
  if (!ISSERVER) {
    const idToken = localStorage.getItem(ID_TOKEN);
    services.forEach(service => {
      if (ID_TOKEN) {
        service.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;
      }
    });
  }
};

updateToken();

export { services, updateToken };
