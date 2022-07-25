import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import store from '../app/store'
import './styles.css'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <html lang={'en'} />
        <title>Cypress Migrator | Interactive Code Transformer</title>
        <meta property="og:title" content="Cypress Migrator | Interactive Code Transformer" key="title" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="shortcut icon" type="image/svg+xml" href="/public/images/svg/favicon.svg" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default CustomApp
