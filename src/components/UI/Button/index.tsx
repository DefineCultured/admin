import { ButtonHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import { UIButtonProps } from '@/interfaces'
import styles from './Button.module.css'

const { btn, redNormal, blackNormal, blueNormal, redGlow, blackGlow, blueGlow, fw } = styles

const Button = ({ children, className, variant, glow, fullWidth, href, as, type = 'submit', ...rest }: UIButtonProps) => {
  const classes = clsx(btn, className, {
    [redNormal]: !glow && variant === 'red',
    [blackNormal]: !glow && variant === 'black',
    [blueNormal]: !glow && variant === 'blue',
    [redGlow]: glow && variant === 'red',
    [blackGlow]: glow && variant === 'black',
    [blueGlow]: glow && variant === 'blue',
    [fw]: fullWidth
  })

  const MyButton = () => (
    <button className={classes} type={type} {...rest}>
      <span>{children}</span>
    </button>
  )

  return (
    <>
      {href ? (
        <Link href={href} as={as}>
          <a>
            <MyButton />
          </a>
        </Link>
      ) : (
        <MyButton />
      )}
    </>
  )
}

export default Button
