import Script from 'next/script';

export function GTag() {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-6BGQ8L6H1J" />
      <Script id="gtag">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-6BGQ8L6H1J');`}
      </Script>
    </>
  );
}
