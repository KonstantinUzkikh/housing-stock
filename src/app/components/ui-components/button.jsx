import React from 'react'
import styles from '@ui/button.module.css'

const Button = ({ children, onClick, className, ...props }) => {
  return <button onClick={onClick} className={`${className} ${styles.button}`} {...props} >{children}</button>
}

export default Button
