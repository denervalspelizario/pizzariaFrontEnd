import axios, { AxiosError} from 'axios'; // para se comunicar com api
import { parseCookies } from 'nookies'; 
import { AuthTokenError } from './errors/AuthTokenErrors'; // para tratar erro de token

import { signOut } from '../contexts/AuthContext';



export function setupAPIClient(context = undefined){ // sempre receberá um contexto se não fornecer será undefined

  let cookies = parseCookies(context); // pegando o contexto para usa-lo


  // ACESSANDO API
  const api = axios.create({

    // url base que não muda 
    baseURL: 'http://localhost:3333',

    // Passando o bearer que ficara dentro de cookies e token
    // ou seja se na rota tiver um bearer então será passado pelo cookies
    headers: {
      Authorization: `Bearer ${cookies['@pizzaria.token']}`
    }
  })

  // TRATAMENTO ERRO
  api.interceptors.response.use(response => {
    return response;
  },(error: AxiosError) => {
    if(error.response?.status === 401){

      // qualquer erro 401 (não autorizado) devemos deslogar o usuario
      if(typeof window !== undefined){

        //de um erro então chamar a função para deslogar o usuario não esquecer de importar
        signOut();
      } else {
        return Promise.reject(new AuthTokenError())
      }

      return Promise.reject(error)
    }
  })

  return api;
}