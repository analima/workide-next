import Script from 'next/script';

export function GTag() {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=UA-244663367-1" />
      <Script id="gtag">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-244663367-1');`}
      </Script>
    </>
  );
}
