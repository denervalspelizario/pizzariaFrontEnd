import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import styles from './styles.module.scss'

// tipagem do input
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

//tipagem do textarea
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}


export function Input({...rest}: InputProps){
  return(
    <input  
      className={styles.input}
      {...rest} // passando via props todos as propriedades e elementos de um input
    />
  )
}

export function Textarea({...rest}: TextAreaProps){
  return(
    <textarea  
      className={styles.input}
      {...rest} // passando via props todos as propriedades e elementos de um textarea
    >
    </textarea>  
  )
}