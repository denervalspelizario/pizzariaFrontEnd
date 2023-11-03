import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies'; // importando os cookies que neste caso será o tolen que vai indicar que user esta logado
 

// função para paginas que só pode ser acessadas por visitantes impedindo que ele acesse login
export function canSSRGuest<P>(fn: GetServerSideProps<P>){
  return async (contexto: GetServerSidePropsContext ): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(contexto); // pegando os cokkies que neste caso é o token para indicar que user está logado

    // Se o cara tentar acessar a pagina porem tendo já um login salvo redirecionamos
    if(cookies['@pizzaria.token']){ // se o cokkie for o token ou sej a usuario está logado 
      return {
        redirect: {
          destination: '/dashboard', // redireciona para o dashboard
          permanent: false,
        }
      }
    }

    return await fn(contexto);
  }
}