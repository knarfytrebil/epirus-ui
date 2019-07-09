import * as React from 'react';
import Head from 'next/head';

const META = {
  title: 'Epirus',
  description: 'Blockchain Explorer',
  url: 'https://review-beta.explorer.epirus.web3labs.com',
  logo: '/static/logo.png',
  facebookId: '',
};

export const CustomHead = () => (
  <Head>
    <meta charSet="utf-8" />
    <title>{`${META.title} | ${META.description}`}</title>
    <meta property="og:url" content={META.url} />
    <meta property="og:title" content={META.title} />
    <meta name="description" content={META.description} />
    <meta property="og:image" content={META.logo} />
    <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
    <link rel="manifest" href="/static/site.webmanifest" />
    <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#5bbad5" />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="theme-color" content="#ffffff" />
    {/*<link rel="manifest" href="/static/manifest.webmanifest" />*/}
    {/*<meta property="og:image" content="/static/logo.png" />*/}
    <meta property="og:title" content={META.title} />
    {/*<meta property="og:url" content="http://epirus.com" />*/}
    {/*<meta property="og:image" content="/static/logo.png" />*/}
    <meta property="og:description" content={META.description} />
    <meta property="og:site_name" content={META.title} />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_GB" />
    {/*<meta property="fb:app_id" content="" />*/}
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5.0" />
    <link rel="stylesheet" href="https://use.typekit.net/odh5jwh.css" />
    {/*<link rel="shortcut icon" href="/static/favicon.ico" />*/}
  </Head>
);
