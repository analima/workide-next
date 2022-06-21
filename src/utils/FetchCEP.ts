import axios from 'axios';

export interface Address {
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean;
}

export async function fetchCEP(cep: string): Promise<Address> {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  const response = await axios.get(url);

  return response.data;
}
