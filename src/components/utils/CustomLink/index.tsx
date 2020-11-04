import { withRouter } from 'next/router'
import Link from 'next/link'
import React, { Children } from 'react'

const CustomLink = ({ router, children, ...props }) => {
  const child = Children.only(children)
  let className = child.props.className || ''

  if (props.as) {
    if (router.asPath === props.as && props.activeClassName) {
      className = `${className} ${props.activeClassName}`.trim()
    }
  } else {
    if (router.pathname === props.href && props.activeClassName) {
      className = `${className} ${props.activeClassName}`.trim()
    }
  }

  delete props.activeClassName

  return (
    <Link href={props.href} {...props}>
      {React.cloneElement(child, { className })}
    </Link>
  )
}

export default withRouter(CustomLink)
