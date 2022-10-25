import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';
import { AuthProvider } from 'src/contexts/auth';
import { Loading } from 'src/components/Loading';
import { GlobalStyles } from 'src/styles/global';
import { InformacoesTipoUsuario } from 'src/hooks/informacoesTipoUsuario';

interface ThemeInterface {
  colors: {
    primary: string;
  };
}

const theme: ThemeInterface = {
  colors: {
    primary: '',
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />

        <link rel="preload" as="font" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />

        <meta property="title" content="Freelas town" />
        <meta property="og:title" content="Freelas town" />
        <meta name="twitter:title" content="Freelas town" />

        <meta
          name="description"
          content="Olá amigo(a), como vai? Gostaria de compartilhar com você essa ideia. Estou usando uma plataforma muito legal chamada freelas town. Lá você encontrará muita coisa legal que vai te ajudar. Se cuida, abraço!"
        />

        <meta
          name="twitter:description"
          content="Olá amigo(a), como vai? Gostaria de compartilhar com você essa ideia. Estou usando uma plataforma muito legal chamada freelas town. Lá você encontrará muita coisa legal que vai te ajudar. Se cuida, abraço!"
        />

        <meta
          name="og:description"
          content="Olá amigo(a), como vai? Gostaria de compartilhar com você essa ideia. Estou usando uma plataforma muito legal chamada freelas town. Lá você encontrará muita coisa legal que vai te ajudar. Se cuida, abraço!"
        />

        <meta
          itemProp="description"
          content="Olá amigo(a), como vai? Gostaria de compartilhar com você essa ideia. Estou usando uma plataforma muito legal chamada freelas town. Lá você encontrará muita coisa legal que vai te ajudar. Se cuida, abraço!"
        />

        <meta name="og:type" content="website" />

        <meta itemProp="name" content="Freelas town" />

        <meta
          name="image"
          content="https://static.freelas.town/Azul-Semfundo-3x.png"
        />
        <meta
          property="og:image"
          content="https://static.freelas.town/Azul-Semfundo-3x.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://static.freelas.town/Azul-Semfundo-3x.png"
        />
        <meta
          name="facebook-domain-verification"
          content="hvr9vw3njwc6wrgf4hscf2yu9fdq5l"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <InformacoesTipoUsuario>
            <Loading>
              <Component {...pageProps} />
            </Loading>
          </InformacoesTipoUsuario>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
