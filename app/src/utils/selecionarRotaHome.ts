export function selecionarRotaHome(tipoPerfil: any) {
  if (tipoPerfil === 'FORNECEDOR') return '/fornecedor/home';
  if (tipoPerfil === 'CONSUMIDOR') return '/consumidor/home';
  return '/persona';
}
