import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Head from 'next/head';
import Script from 'next/script';

const Layout = ({children}: {children: React.ReactNode}) => {
  const googleAnalyticsID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

  return (
    <>
      <Head>
        <title>Gridbox</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content="Gridbox Website" />
        <link rel="icon" href="/favicon.ico" />
        {/* <Script src="./TW-ELEMENTS-PATH/dist/js/index.min.js"/> */}
      </Head>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsID}`}/>
      <Script
        id='google-analytics'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsID}', {
            page_path: window.location.pathname,
            });
            `,
        }}
      />
      <Header/>
      <main>{children}</main>
      <Footer/>
    </>
  )
};

export default Layout;
