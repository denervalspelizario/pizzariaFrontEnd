import Head from "next/head" // responsável pelo cabeçalho na aba
import Image from "next/image" // trabalhando com imagem no next
import Logo from '../../public/logoPizza.png'
import styles from '../../styles/home.module.scss'
import { Input } from "../components/ui/input"



export default function Home() {
  return (
   <>
   <Head>
    <title>
      SuperPizza - Faça seu login
    </title>
   </Head>
   <div className={styles.containerCenter}>
      <Image src={Logo} alt="Logo Pizzaria"/>

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
        </form>
      </div>
   </div>
   </>
  )
}
