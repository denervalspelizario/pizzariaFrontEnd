import Head from "next/head" // responsável pelo cabeçalho na aba
import Image from "next/image" // trabalhando com imagem no next
import Link from "next/link" // navegação com o next


import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"

import Logo from '../../public/logoPizza.png'
import styles from '../../styles/home.module.scss'

// imports para usar contexto
import { FormEvent, useContext } from "react" 
import { AuthContext } from "../contexts/AuthContext" // importando contexto



export default function Home() {

  // pegando função signIn la do contexto
  const { signIn } = useContext(AuthContext)

  async function handlelogin(event: FormEvent){
    event.preventDefault() // evitando recarregamento da pagina após clicar no btn de formulario

    let data = {
      email: "teste@teste.com",
      password: "teste123"
    }

    // Obs signIn foi tipado la no contexto que rpecisa receber email e password
    await signIn(data)
  }

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
        
        <form onSubmit={handlelogin}>
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
