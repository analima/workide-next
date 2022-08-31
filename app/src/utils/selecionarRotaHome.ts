export function selecionarRotaHome(pessoa: any) {
  if (pessoa.tipoPerfil === 'FORNECEDOR') return '/fornecedor/home';
  if (pessoa.tipoPerfil === 'CONSUMIDOR') return '/consumidor/home';
  return '/persona';
}
