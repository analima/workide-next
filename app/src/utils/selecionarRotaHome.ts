export function selecionarRotaHome(tipoPerfil: any) {
  if (tipoPerfil === 'FORNECEDOR') return '/fornecedor/home';
  if (tipoPerfil === 'CONSUMIDOR') return '/contratante/home';
  return '/persona';
}
