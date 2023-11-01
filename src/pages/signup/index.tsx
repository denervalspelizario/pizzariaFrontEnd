import { FormEvent, useContext, useState } from "react" 
import { AuthContext } from "../../contexts/AuthContext" // importando contexto

import Head from "next/head" // responsável pelo cabeçalho na aba
import Image from "next/image" // trabalhando com imagem no next
import Link from "next/link" // navegação com o next

import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"

import Logo from '../../../public/logoPizza.png'
import styles from '../../../styles/home.module.scss'
import { toast } from "react-toastify"




export default function SignUp() {

  // pegando função signIn la do contexto por desestruturação
  const { signUp } = useContext(AuthContext)


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);


  // função para cadastrar
  async function handleSignUp(event: FormEvent){
    event.preventDefault();

    // validando se usuarios enviou todos os dados
    if(name === '' || email === '' || password === ''){
      toast.warning("PREENCHA TODOS OS CAMPOS")
      return;
    }

    // ligando loading
    setLoading(true);


    // criando um objeto com os dados para se adequar a função la do context que esperá receber um objeto
    let data = {
      name: name, // state name que recebe dados do input
      email: email, // state email que recebe dados do input
      password: password, // state password que recebe dados do password
    }


    // depois de adequar os dados de email e password chama a função signIn(logar) adicinando oo parametro dados tratado
    await signUp(data)

    setLoading(false);

  }


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

        <form onSubmit={handleSignUp}>
          <Input
            placeholder="Digite seu nome" 
            type="text"
            value={name}
            onChange={(e)=> setName(e.target.value)}
          />

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
            loading={loading}
          >
            Acessar
          </Button>  
        </form>

        <Link href="/"  // ciclou no link vai a direção rota principal 
          legacyBehavior
        >
          <a className={styles.text}>Já possui uma conta? Faça seu login!</a>
        </Link>
        
      </div>
   </div>
   </>
  )
}
