import Head from "next/head" // responsável pelo cabeçalho na aba
import Image from "next/image" // trabalhando com imagem no next
import Link from "next/link" // navegação com o next

import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"

import Logo from '../../public/logoPizza.png'
import styles from '../../styles/home.module.scss'




export default function Home() {
  return (
   <>
   <Head>
    <title>
      SuperPizza - Faça seu login
    </title>
   </Head>
   <div className={styles.containerCenter}>
      <Image 
        src={Logo} 
        alt="Logo Pizzaria"
        className={styles.image}
      />

      <div className={styles.login}>
        <form>
          <Input
            placeholder="Digite seu email" 
            type="text"
          />

          <Input
            placeholder="Digite sua senha"
            type="password" 
          />

          <Button 
            type="submit"
            loading={true}
          >
            Acessar
          </Button>  
        </form>

        <Link 
          href="/signup" 
          legacyBehavior //no next 13 precisa senão da erro
        >
          <a className={styles.text}>Não possui uma conta? Cadastra-se</a>
        </Link>
        
      </div>
   </div>
   </>
  )
}
