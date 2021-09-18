import { useEffect } from 'react';

export default function useGoogleTagManager() {
  useEffect(() => {
    const SCRIPT_ID = 'google-tag-manager-injection';
    const existingScript = document.getElementById(SCRIPT_ID);

    if (! existingScript && process.env.NODE_ENV !== 'development') {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      const scriptText = document.createTextNode(`
        <!-- Google Tag Manager -->
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WWJ7CQ2');
        <!-- End Google Tag Manager -->
      `);

      script.appendChild(scriptText);
      document.head.appendChild(script);
    }
  }, []);
}
