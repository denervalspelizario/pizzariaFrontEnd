import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

import { Authprovider } from '../contexts/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Authprovider> {/* Adicionando contexto com todos os dados a todos components */}
      <Component {...pageProps} />
    </Authprovider>
  
  )
}
