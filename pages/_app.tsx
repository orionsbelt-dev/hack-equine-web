import Head from "next/head"
import "../styles/globals.css"
import { AppProps } from "next/app"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="application-name" content="Hack Equine" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Hack Equine" />
        <meta name="keywords" content="equine" />
        {/* <title>Hack</title> */}

        <link rel="manifest" href="/manifest.json" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#465462" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
