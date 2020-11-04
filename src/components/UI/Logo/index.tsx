import { useContext } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { WindmillContext } from '@windmill/react-ui'

import { LogoProps } from '@/interfaces'
import styles from './Logo.module.css'

const { logo, sizeSmall, sizeNormal, sizeLarge, sizeXLarge, size2XLarge } = styles

const Logo = ({ className, size, href, as, ...rest }: LogoProps) => {
  const { mode } = useContext(WindmillContext)

  const classes = clsx(logo, className, {
    [sizeSmall]: size === 'small',
    [sizeNormal]: !size || size === 'normal',
    [sizeLarge]: size === 'large',
    [sizeXLarge]: size === 'xlarge',
    [size2XLarge]: size === '2xlarge',
    ['text-gray-100']: mode === 'dark',
    ['text-gray-800']: mode !== 'dark'
  })

  const MyLogo = () => (
    <div className={classes} {...rest}>
      <span>Define</span>
      <span>Cultured</span>
    </div>
  )

  return (
    <>
      {href ? (
        <Link href={href} as={as}>
          <a>
            <MyLogo />
          </a>
        </Link>
      ) : (
        <MyLogo />
      )}
    </>
  )
}

export default Logo
