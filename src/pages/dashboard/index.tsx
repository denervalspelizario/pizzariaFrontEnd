import { canSSRAuth } from "@/src/utils/canSSRAuth";

export default function Dashboard(){
  return(
    <div>
       <h1>Bem vindo ao painel</h1>
    </div>
   
  )
}

// server side de usuario logado que sempre vai impedir que usuario logado vá para pagina de login
// ver src>util>canSSRAuth
export const getServerSideProps= canSSRAuth(async (contexto) => {

  return {
    props: {}
  }
}); 