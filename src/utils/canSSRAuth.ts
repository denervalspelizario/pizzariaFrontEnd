import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies, destroyCookie } from 'nookies'; // importando os cookies que neste caso será o tolen que vai indicar que user esta logado
import { AuthTokenError } from '../services/errors/AuthTokenErrors';
 

// função para paginas que só users podem ter acesso
export function canSSRAuth<P>(fn: GetServerSideProps<P>){
  return async (contexto: GetServerSidePropsContext ): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(contexto); // pegando os cokkies que neste caso é o token para indicar que user está logado

    const token = cookies['@pizzaria.token']


    // Se o cara tentar acessar a pagina porem tendo já um login salvo redirecionamos
    if(!token){ // se o cokkie for o token ou sej a usuario está logado 
      return {
        redirect: {
          destination: '/', // redireciona para pagina de login
          permanent: false,
        }
      }
    }

    // deu certo
    try{

      return await fn(contexto); // retorna o contexto

    }catch(error){ // deu erro desloga usuario
      
      if(error instanceof AuthTokenError){ // se erro for de autenticação
        destroyCookie(contexto, '@pizzaria.token') // limpa os cookies então  faz o logout
           
        // limpado o cookie
        return {
          redirect: {
            destination: '/', // redireciona para pagina de login
            permanent: false,
          }
        }
      }

    }

   
  }
}