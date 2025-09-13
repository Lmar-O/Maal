import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../src/index.css'
import '../src/App.css'
import Navbar from '../src/components/Navbar'
import Footer from '../src/components/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Maal Finance - Halal Personal Finance Made Simple</title>
        <meta name="description" content="Your guide to halal personal finance. From investing to saving, we help Muslims build wealth without compromising faith." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  )
}
