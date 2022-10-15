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
        <title>freelas town</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Olá amigo(a), como vai? Gostaria de compartilhar com você essa ideia. Estou usando uma plataforma muito legal chamada freelas town. Lá você encontrará muita coisa legal que vai te ajudar. Se cuida, abraço!"
        />
        <meta
          property="og:title"
          content="freelas town - Contrate um freelancer em poucos cliques"
        />
        <meta name="image" content="https://static.freelas.town/logo.jpeg" />
        <meta
          property="og:image"
          content="https://static.freelas.town/logo.jpeg"
        />
        <meta name="keywords" content="sites, web, desenvolvimento"></meta>

        <link rel="preload" as="font" />
        <link rel="shortcut icon" type="image/png" href="./favicon.png" />
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
      </Head>
      <html lang="pt_br">
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
      </html>
    </>
  );
}

export default MyApp;
