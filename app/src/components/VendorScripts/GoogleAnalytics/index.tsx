import Script from 'next/script';

export function GoogleAnalytics() {
  return (
    <>
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
      <Script id="gtag-event-conversion">
        {`gtag('event', 'conversion', {
        send_to: 'AW-10965470305/12ZuCMX4ntMDEOGY3-wo',
      });`}
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
    </>
  );
}
