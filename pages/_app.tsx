import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import '../styles.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <main>
        <div className="container">
          <Component {...pageProps} />
        </div>
      </main>
    </>
  )
}
