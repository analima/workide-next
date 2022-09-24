import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';
import { AuthProvider } from 'src/contexts/auth';
import { Loading } from 'src/components/Loading';

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
        <title>Gyan</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Olá amigo(a), como vai? Gostaria de compartilhar com você essa ideia. Estou usando uma plataforma muito legal chamada Gyan. Lá você encontrará muita coisa legal que vai te ajudar. Se cuida, abraço!"
        />
        <meta
          property="og:title"
          content="Gyan - Contrate um freelancer em poucos cliques"
        />
        <meta name="image" content="https://static.gyan.com.br/logo.jpeg" />
        <meta
          property="og:image"
          content="https://static.gyan.com.br/logo.jpeg"
        />
        <meta name="keywords" content="sites, web, desenvolvimento"></meta>

        <link rel="preload" as="font" />
        <link rel="shortcut icon" type="image/png" href="./favicon.ico" />
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
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Loading>
              <Component {...pageProps} />
            </Loading>
          </AuthProvider>
        </ThemeProvider>
      </html>
    </>
  );
}

export default MyApp;
