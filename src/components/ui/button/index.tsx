import { ReactNode, ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'

import { FaSpinner } from 'react-icons/fa'

// tipando o component
// tera 2 atributos e  também se comportará como botão
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  loading?: boolean, // opcional
  children: ReactNode,  // children é o conteudo do botão ou seja o texto dentro do botão 
}


// Component Button tipado com ButtonProps e terá comportamento de botão
// obs ...rest são as propriedades do botão
export function Button({loading, children, ...rest}: ButtonProps){ 
  return(
    <button 
      className={styles.button}
      disabled={loading}
      {...rest}
    >
      {
        loading ? ( // se loading estiver true ou seja carregando
          <FaSpinner color="#FFF"  size={16} />
        ) : (
          <a className={styles.buttonText}>{children}</a> 
        )
      }

      
    </button>
    
  )
}