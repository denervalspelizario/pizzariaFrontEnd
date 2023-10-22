import Head from "next/head" // responsável pelo cabeçalho na aba
import Image from "next/image" // trabalhando com imagem no next
import Link from "next/link" // navegação com o next

import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"

import Logo from '../../../public/logoPizza.png'
import styles from '../../../styles/home.module.scss'


export default function SignUp() {
  return (
   <>
   <Head>
    <title>
      SuperPizza - Faça seu cadastro agora!
    </title>
   </Head>
   <div className={styles.containerCenter}>
      <Image 
        src={Logo} 
        alt="Logo Pizzaria"
        className={styles.image}
      />

      <div className={styles.login}>

        <h1>Criando sua conta</h1>
        <form>

          <Input
            placeholder="Digite seu nome" 
            type="text"
          />

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
            loading={false}
          >
            Acessar
          </Button>  
        </form>

        <Link href="/" legacyBehavior>
          <a className={styles.text}>Já possui uma conta? Faça seu login!</a>
        </Link>
        
      </div>
   </div>
   </>
  )
}
