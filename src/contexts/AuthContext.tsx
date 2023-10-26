import { createContext, ReactNode, useState } from "react";

import { destroyCookie } from 'nookies'; // import usado para deslogar
import Router from 'next/router';

type AuthContextData = {
  user: UserProps; // dados do usuario
  isAuthenticated: boolean; // indicando se user esta logado ou não
  signIn: (credentials: SignInProps) => Promise<void> // função devolve uma promise pq vai acessar la o backend e void(nao vai ter retorno)
  signOut: () => void;  // devolve nada
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


// tipagem do children
type AuthProviderProps = {
  children: ReactNode // indica que elemento pode renderizar qualquer coisa que um componente React possa renderizar
}


type useSinGn = {
  email: string;
  password: string;
}


// contexto tipado com authcontextdata(user, isauthenticated e sigIn) 
export const AuthContext = createContext({} as AuthContextData) 


// Função para deslogar
export function signOut(){
  try {
   
    // usando para limpar os cookies e deslogar ** não esquecer token tem que ser igual de api.ts
    destroyCookie(undefined, '@pizzaria.token')  

    // deslogou agora ir para Tela inicial
    Router.push('/')

  }catch{
    console.log('erro ao deslogar')
  }
}



export function Authprovider({ children }: AuthProviderProps){

  // tipando state com userprops(vai ter id, user  e email)
  const [user, setUser] = useState<UserProps>() // é nela que tera os dados de usuario

  // !! transforma a state user em um boolean se receber dados true senão false
  const isAuthenticated = !!user

  async function signIn({email, password}: useSinGn){
    console.log("Dado email: " + email)
    console.log("Dado email: " + password)
  }

  return(
    <AuthContext.Provider 
      value={{ user, isAuthenticated, signIn, signOut}} // respasando todos os dados para todos componentes da aplicação 
    >
      {children}
    </AuthContext.Provider>
  )
}