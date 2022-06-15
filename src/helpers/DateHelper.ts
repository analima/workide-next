import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDate(date: string, dateFormat = 'dd/MM/yyyy') {
  if (date) {
    const parsedDate = parseISO(date);

    return format(parsedDate, dateFormat, { locale: ptBR });
  } else {
    return '';
  }
}

export function parseDate(date: string, format = 'yyyy-MM-dd') {
  if (date) {
    const [day, month, year] = date.split('/');

    return `${year}-${month}-${day}`;
  } else {
    return '';
  }
}

export function getFormattedCurrentDate() {
  const today = new Date();

  let year = today.getFullYear();

  let month = (today.getMonth() + 1).toString();
  month = `${month}`.padStart(2, '0');

  let day = today.getDate().toString();
  day = `${day}`.padStart(2, '0');

  const todayUnformatted = `${year}-${month}-${day}T00:00:00.000Z`;

  return formatDate(todayUnformatted);
}
