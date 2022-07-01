export function handleFormatDocument(document: string) {
  let formatedDocument = (document = document.replaceAll('.', ''));
  formatedDocument = formatedDocument.replaceAll('-', '');
  formatedDocument = formatedDocument.replaceAll('/', '');
  return formatedDocument;
}

export function handleGetNumberOfAddress(endereco: string) {
  const arrayEndereco = endereco.split(',');
  let formatedNumber = arrayEndereco[arrayEndereco.length - 1];
  return formatedNumber.replaceAll(' ', '');
}

export function handleGetDddOfPhone(phone: string) {
  let formatedPhone = phone.replace('(', '');
  formatedPhone = formatedPhone.replace(')', '');
  formatedPhone = formatedPhone.replaceAll(' ', '').trim();
  return `${formatedPhone[0]}${phone[1]}`;
}

export function handleGetFormatedPhone(phone: string) {
  let formatedPhone = phone.replaceAll('(', '');
  formatedPhone = formatedPhone.replaceAll(')', '');
  formatedPhone = formatedPhone.replaceAll(' ', '');
  formatedPhone = formatedPhone.replaceAll('-', '');
  return formatedPhone.slice(2, formatedPhone.length).trim();
}

export function handleGetFormatedCep(cep: string) {
  return cep.replaceAll('-', '');
}

export function handleSplit(string: string) {
  if (string !== undefined) {
    return string.split('|');
  }
}

export function handleSplitAt(string: string) {
  if (string !== undefined) {
    return string.split('-')[3];
  }
}

export function formatToPrice(price: any) {
  let priceAsNumber = 0;
  if (typeof price === 'string') {
    if (price.indexOf('R$') !== -1) {
      return price;
    } else {
      priceAsNumber = Number(price);
    }
  } else if (typeof price === 'number') {
    priceAsNumber = price;
  }
  return priceAsNumber.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
}
