import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';
import { AuthProvider } from 'src/contexts/auth';
import { Loading } from 'src/components/Loading';
import { GlobalStyles } from 'src/styles/global';
import { InformacoesTipoUsuario } from 'src/hooks/informacoesTipoUsuario';
import { VendorScripts } from 'src/components/VendorScripts';
import { useEffect, useState } from 'react';

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
  const [loadVendorScripts, setLoadVendorScripts] = useState(false);
  useEffect(() => {
    setLoadVendorScripts(
      process.env.NEXT_PUBLIC_LOAD_VENDOR_SCRIPTS === 'true',
    );
  }, []);

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
        <title>Freelas town</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />

        <meta property="title" content="Freelas town" />
        <meta property="og:title" content="Freelas town" />
        <meta name="twitter:title" content="Freelas town" />
        <meta
          name="description"
          content="Conectamos pessoas e democratizamos o acesso aos talentos Somos uma plataforma que conecta pessoas incríveis a projetos apaixonantes para realizar sonhos em qualquer lugar do mundo."
        />

        <meta
          name="twitter:description"
          content="Conectamos pessoas e democratizamos o acesso aos talentos Somos uma plataforma que conecta pessoas incríveis a projetos apaixonantes para realizar sonhos em qualquer lugar do mundo."
        />

        <meta
          name="og:description"
          content="Conectamos pessoas e democratizamos o acesso aos talentos Somos uma plataforma que conecta pessoas incríveis a projetos apaixonantes para realizar sonhos em qualquer lugar do mundo."
        />

        <meta
          itemProp="description"
          content="Conectamos pessoas e democratizamos o acesso aos talentos Somos uma plataforma que conecta pessoas incríveis a projetos apaixonantes para realizar sonhos em qualquer lugar do mundo."
        />

        <meta name="og:type" content="website" />

        <meta itemProp="name" content="Freelas town" />

        <meta name="image" content="https://workide.com/freelas-town.png" />
        <meta
          property="og:image"
          content="https://workide.com/freelas-town.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://workide.com/freelas-town.png"
        />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
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
              {loadVendorScripts && <VendorScripts />}
              <Component {...pageProps} />
            </Loading>
          </InformacoesTipoUsuario>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
