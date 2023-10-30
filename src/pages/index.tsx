import Head from "next/head" // responsável pelo cabeçalho na aba
import Image from "next/image" // trabalhando com imagem no next
import Link from "next/link" // navegação com o next


import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"

import Logo from '../../public/logoPizza.png'
import styles from '../../styles/home.module.scss'

// imports para usar contexto
import { FormEvent, useContext, useState } from "react" 
import { AuthContext } from "../contexts/AuthContext" // importando contexto



export default function Home() {

  // pegando função signIn la do contexto por desestruturação
  const { signIn } = useContext(AuthContext)

  // states que pegam os dados input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  // função que faz login
  async function handlelogin(event: FormEvent){ // como os dados vão vir de um formulário a tipagem será FormEvent
    event.preventDefault() // evitando recarregamento da pagina após clicar no btn de formulario

    // criando um objeto com os dados para se adequar a função la do context que esperá receber um objeto
    let data = {
      email: email, // state email que recebe dados do input
      password: password, // state password que recebe dados do password
    }

    // depois de adequar os dados de email e password chama a função signIn(logar) adicinando oo parametro dados tratado
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
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />

          <Input
            placeholder="Digite sua senha"
            type="password"
            value={password} 
            onChange={(e)=> setPassword(e.target.value)}
          />

          <Button 
            type="submit"
            loading={false}
          >
            Acessar
          </Button>  
        </form>

        <Link 
          href="/signup"  // criclou no link vai a rota /signup
          legacyBehavior //no next 13 precisa senão da erro
        >
          <a className={styles.text}>Não possui uma conta? Cadastra-se</a>
        </Link>
        
      </div>
   </div>
   </>
  )
}
