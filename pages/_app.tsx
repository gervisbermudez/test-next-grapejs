import type { AppProps } from 'next/app'
import '../styles/globals.css'
import 'grapesjs/dist/css/grapes.min.css';
import '../styles/editor.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
