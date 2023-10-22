import { createContext, ReactNode, useState } from "react";

type AuthContextData = {
  user: UserProps; // dados do usuario
  isAuthenticated: boolean; // indicando se user esta logado ou não
  signIn: (credentials: SignInProps) => Promise<void> // função devolve uma promise pq vai acessar la o backend
                                                      // e void(nao vai ter retorno)
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

// contexto tipado com authcontextdata(user, isauthenticated e sigIn) 
export const AuthContext = createContext({} as AuthContextData) 


export function Authprovider({ children }: AuthProviderProps){

  // tipando state com userprops(vai ter id, user  e email)
  const [user, setUser] = useState<UserProps>() // é nela que tera os dados de usuario

  // !! transforma a state user em um boolean se receber dados true senão false
  const isAuthenticated = !!user

  async function signIn(){
    alert("Clicou no login")  
  }

  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn}} >
      {children}
    </AuthContext.Provider>
  )
}