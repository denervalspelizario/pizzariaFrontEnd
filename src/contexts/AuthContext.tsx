import { createContext, ReactNode, useState } from "react";

import { api } from "../services/apiClient"; // importando a api de fato

import { destroyCookie, setCookie, parseCookies } from 'nookies'; // destroyCookie usado para deslogar
import Router from 'next/router';

import { toast } from 'react-toastify'; // importando o alerta


// TIPAGENS
type AuthContextData = {
  user: UserProps; // dados do usuario
  isAuthenticated: boolean; // indicando se user esta logado ou não
  signIn: (credentials: SignInProps) => Promise<void> // função devolve uma promise pq vai acessar la o backend e void(nao vai ter retorno)
  signOut: () => void;  // deslogar devolve nada
  signUp: (credentials: SignUpProps) => Promise<void>  // cadastrar não esquecer  a tipagem
}

// tipagem de user(dados do usuario)
type UserProps = {
  id: string;
  name: string;
  email: string;
}

// tipagem  de sign(dados para fazer login)
type SignInProps = {
  email: string;
  password: string;
}

// tipagem de singUp(dados para fazer o cadastro)
type SignUpProps = {
  name: string;
  email: string;
  password: string;
}

// tipagem do children
type AuthProviderProps = {
  children: ReactNode // indica que elemento pode renderizar qualquer coisa que um componente React possa renderizar
}






// contexto tipado com authcontextdata(user, isauthenticated e sigIn) 
// será usado no AuthContext.Provider
export const AuthContext = createContext({} as AuthContextData) 


// Função para deslogar
export function signOut(){
  try {
   
    // usando para limpar os cookies e deslogar ** não esquecer token tem que ser igual de api.ts
    // undefine pq essa rota não vai receber parametro de context e segundo parametro será o token 
    // adicionando la no api.ts
    destroyCookie(undefined, '@pizzaria.token')  

    // deslogou agora ir para Tela inicial
    Router.push('/')

  }catch{
    toast.error("Erro ao deslogar!")

  }
}


export function Authprovider({ children }: AuthProviderProps){

  // tipando state com userprops(vai ter id, user  e email)
  const [user, setUser] = useState<UserProps>() // é nela que tera os dados de usuario

  // !! transforma a state user em um boolean se receber dados true senão false
  const isAuthenticated = !!user

  // função para LOGAR e ir para pagina de logado
  async function signIn({email, password}: SignInProps){
    try {
      // fazendo a requisição tipo post, rota session, passando os dados email e password
      const response = await api.post('/session', {
        email: email,
        password: password
      })

      // pegando por desestruturação os dados da requisição feita
      const {id, name, token } = response.data 

      // Pegando o token do usuario(token que gera ao logar) e autenticando com token da aplicação(@pizzaria api.ts)
      setCookie(undefined, '@pizzaria.token', token, {
        maxAge: 60 * 60 * 24 * 30, // token expira em 1 mes
        path: "/" // Quais caminhos terão acesso ao token neste caso todos
      })

      // Fez a autenticação do token
      // adicionando a state user os dados ** obs lembrando que ela está tipada para receber id, name, email
      setUser({
        id: id,
        name: name,
        email: email
      })
      
      // passar para as proximas requisições o nosso token
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      toast.success('Logado com sucesso!')

      // Redirecionar o user para /dashboard
      Router.push('/dashboard')

    }catch(error){

      toast.error("Erro ao acessar!")
      console.log("Erro ao Acessar ", error)
    }
  }


  // função para CADASTRAR 
  async function signUp({name, email, password}: SignUpProps){
    
    // fazendo a requisição tipo post, rota session, passando os dados name, email e password
    const response = await api.post('/users', {
      name: name,
      email: email,
      password: password
    })

    // alerta de sucesso ao cadastrar
    toast.success("Cadastrado com sucesso")


    // Redirecionar o user para '/'  pagian de login
    Router.push('/')

    try {
      

    }catch(error){
      console.log("Erro ao Cadastrar ", error)
    }
  }


  return(
    <AuthContext.Provider 
      value={{ user, isAuthenticated, signIn, signOut, signUp}} // respasando todos os dados para todos componentes da aplicação 
    >
      {children}
    </AuthContext.Provider>
  )
}