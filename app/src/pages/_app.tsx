import type { AppProps } from 'next/app';
import Script from 'next/script';
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

        <meta name="image" content="https://freelas.town/freelas-town.png" />
        <meta
          property="og:image"
          content="https://freelas.town/freelas-town.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://freelas.town/freelas-town.png"
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
              <Script src="https://www.googletagmanager.com/gtag/js?id=UA-244663367-1" />
              <Script id="gtag-js">
                {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-244663367-1');`}
              </Script>
              <Script id="gtm">
                {`(function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', 'GTM-5FBX5QL');`}
              </Script>
              <Script id="tiktok-script">
                {`!(function (w, d, t) {
        w.TiktokAnalyticsObject = t;
        var ttq = (w[t] = w[t] || []);
        (ttq.methods = [
          'page',
          'track',
          'identify',
          'instances',
          'debug',
          'on',
          'off',
          'once',
          'ready',
          'alias',
          'group',
          'enableCookie',
          'disableCookie',
        ]),
          (ttq.setAndDefer = function (t, e) {
            t[e] = function () {
              t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
            };
          });
        for (var i = 0; i < ttq.methods.length; i++)
          ttq.setAndDefer(ttq, ttq.methods[i]);
        (ttq.instance = function (t) {
          for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)
            ttq.setAndDefer(e, ttq.methods[n]);
          return e;
        }),
          (ttq.load = function (e, n) {
            var i = 'https://analytics.tiktok.com/i18n/pixel/events.js';
            (ttq._i = ttq._i || {}),
              (ttq._i[e] = []),
              (ttq._i[e]._u = i),
              (ttq._t = ttq._t || {}),
              (ttq._t[e] = +new Date()),
              (ttq._o = ttq._o || {}),
              (ttq._o[e] = n || {});
            var o = document.createElement('script');
            (o.type = 'text/javascript'),
              (o.async = !0),
              (o.src = i + '?sdkid=' + e + '&lib=' + t);
            var a = document.getElementsByTagName('script')[0];
            a.parentNode.insertBefore(o, a);
          });

        ttq.load('CDPABDBC77UEAU3QVDGG');
        ttq.page();
      })(window, document, 'ttq');`}
              </Script>
              <Script id="linkedin-partner">
                {`_linkedin_partner_id = '3976410';
      window._linkedin_data_partner_ids =
        window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(_linkedin_partner_id);`}
              </Script>
              <Script id="linkedin">
                {`(function (l) {
        if (!l) {
          window.lintrk = function (a, b) {
            window.lintrk.q.push([a, b]);
          };
          window.lintrk.q = [];
        }
        var s = document.getElementsByTagName('script')[0];
        var b = document.createElement('script');
        b.type = 'text/javascript';
        b.async = true;
        b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
        s.parentNode.insertBefore(b, s);
      })(window.lintrk);`}
              </Script>
              <Script id="gtag-event-conversion">
                {`gtag('event', 'conversion', {
        send_to: 'AW-10965470305/12ZuCMX4ntMDEOGY3-wo',
      });`}
              </Script>
              <Script id="clarity">
                {`(function (c, l, a, r, i, t, y) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        t = l.createElement(r);
        t.async = 1;
        t.src = 'https://www.clarity.ms/tag/' + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, 'clarity', 'script', 'e57gocg0mk');`}
              </Script>

              <Script id="gtag-report-conversion">
                {`function gtag_report_conversion(url) {
        var callback = function () {
          if (typeof url != 'undefined') {
            window.location = url;
          }
        };
        gtag('event', 'conversion', {
          send_to: 'AW-10929891244/_IhzCNHnlsgDEKzP49so',
          event_callback: callback,
        });
        return false;
      }`}
              </Script>
              <Script id="meta-pixel-code">
                {`!(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        'script',
        'https://connect.facebook.net/en_US/fbevents.js',
      );
      fbq('init', '1170608990543938');
      fbq('track', 'PageView');`}
              </Script>
              <Component {...pageProps} />
            </Loading>
          </InformacoesTipoUsuario>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
