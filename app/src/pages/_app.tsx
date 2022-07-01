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
          
         
      </Head>
      <ThemeProvider theme={theme}><Component {...pageProps} />
      </ThemeProvider>
    </>
  ) ;
}

export default MyApp;
