import { Menu } from '../Menu';
import { Rodape } from '../Rodape';

export function Template({
  children,
  hiddenCenterMenu,
  hiddenBackground,
}: any) {
  return (
    <>
      <Menu
        hiddenBackground={hiddenBackground}
        hiddenCenterMenu={hiddenCenterMenu}
      />
      {children}
      <Rodape />
    </>
  );
}
