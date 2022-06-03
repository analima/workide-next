import { parseISO, isValid, differenceInYears } from 'date-fns';

export const isValidDate = (value: string) => {
  const parsedDate = parseISO(value);

  return isValid(parsedDate);
};

export const getDifferenceInYears = (value: string) => {
  const parsedDate = parseISO(value);
  if (isValid(parsedDate)) {
    const difference = differenceInYears(new Date(), parsedDate);

    return difference;
  } else {
    return 0;
  }
};

export const dataValidation = (value: string) => {
  if (value) {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(value));
  }
  return value;
};

export const dataValidationCurrent = (value: string) => {
  if (new Date() >= new Date(value)) {
    return 'Imediato';
  } else {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(value));
  }
};

export const formatarData = (d: string) => {
  return new Intl.DateTimeFormat('pt-BR', {
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  }).format(new Date(d));
};

// data no formato DD/MM/YYYY
export function check18YearsOld(date: string) {
  if (date.length < 10) return false;
  const today = Date.now();
  const splitedDate = date.split('/');
  let birthDate = new Date(
    `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`,
  ).getTime();
  // adicionando 4 dias dos 4 anos bissextos presentes em 18 anos
  birthDate = birthDate + 1000 * 60 * 60 * 24 * 4;
  //transformando milissegundos em anos
  return (today - birthDate) / 365 / 24 / 60 / 60 / 1000 >= 18;
}
