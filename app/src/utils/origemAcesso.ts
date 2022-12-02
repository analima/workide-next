import { setLocalStorage, getLocalStorage } from './../hooks/localStorage';

export function salvarOrigemAcesso(link?: string) {
  setLocalStorage(
    'origem_acesso',
    link ? gerarUrl(link) : window.location.href,
  );
}

export function obterOrigemAcesso() {
  return getLocalStorage('origem_acesso');
}

export function gerarUrl(url: string) {
  const urlAtual = window.location.href;
  const posicaoBarra = urlAtual.indexOf('/', 9);
  return `${urlAtual.slice(0, posicaoBarra)}/${url}`;
}

export function resetOrigemAcesso() {
  localStorage.removeItem('@freelas_town:origem_acesso');
}

export function obterDadosProjeto() {
  return getLocalStorage('primeiro-projeto');
}
