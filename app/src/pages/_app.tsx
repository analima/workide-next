import type { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import '../styles/global.css'
import "bootstrap/dist/css/bootstrap.css";
import Head from 'next/head'

interface ThemeInterface {
  colors: {
    primary: string
  }
}

const Global = global

const theme: ThemeInterface = {
  colors: {
    primary: '',
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />

      </Head>
      <ThemeProvider theme={theme}><Component {...pageProps} />
      </ThemeProvider>
    </>
  ) ;
}

export default MyApp;
