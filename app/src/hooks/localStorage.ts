const GYAN_PREFIX = '@freelas_town';

export const getLocalStorage = (key: string): string | null => {
  return localStorage.getItem(`${GYAN_PREFIX}:${key}`);
};

export const setLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(`${GYAN_PREFIX}:${key}`, value);
};
