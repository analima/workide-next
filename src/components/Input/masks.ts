import { FormEvent } from 'react';

export function cep(event: FormEvent<HTMLInputElement>) {
  event.currentTarget.maxLength = 9;

  let value = event.currentTarget.value;
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{5})(\d{2})/, '$1-$2');

  event.currentTarget.value = value;

  return event;
}

export function cpf(event: FormEvent<HTMLInputElement>) {
  event.currentTarget.maxLength = 14;

  let value = event.currentTarget.value;
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

  event.currentTarget.value = value;

  return event;
}

interface IMaskProperties {
  value: string;
  mask: 'cep' | 'cpf' | 'cnpj';
}

interface IMaskOutput {
  maxLength: number;
  value: string;
}

export function maskValue({ value, mask }: IMaskProperties): IMaskOutput {
  let inputValue = value.replace(/\D/g, '');

  if (mask === 'cep') {
    inputValue = inputValue.replace(/^(\d{5})(\d{2})/, '$1-$2');

    return {
      maxLength: 9,
      value: inputValue,
    };
  }

  if (mask === 'cpf') {
    inputValue = inputValue.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4',
    );

    return {
      maxLength: 14,
      value: inputValue,
    };
  }

  if (mask === 'cnpj') {
    inputValue = inputValue.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    );

    return {
      maxLength: 18,
      value: inputValue,
    };
  }

  return {
    maxLength: 524288,
    value,
  };
}
