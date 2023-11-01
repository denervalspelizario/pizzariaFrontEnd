import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // importando globalmente a biblioteca


import { Authprovider } from '../contexts/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Authprovider> {/* Adicionando contexto com todos os dados a todos components */}
      <Component {...pageProps} />
      <ToastContainer autoClose={3000}/>  {/* importando parausar o alerta que fecha sozinho em 3000 milisegundos */}
    </Authprovider>
  
  )
}
