import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';
import { NovoPerfilPublico } from 'src/components/AreaFornecedor/NovoPerfilPublico';

export default function NovoPerfilPublicos() {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/fornecedor/perfil');
  }, []);

  return <NovoPerfilPublico />;
}

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: 'blocking',
//   };
// }

// export async function getStaticProps() {
//   return {
//     props: { post: {} },
//   };
// }
