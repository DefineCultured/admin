import { useSession } from 'next-auth/client'
import Router from 'next/router'

const Custom404 = () => {
  const [session, loading] = useSession()

  if (!loading && !session) {
    Router.push('/auth/signin')
  }

  if (!loading && session) {
    Router.push('/admin/dashboard')
  }

  return <h1>Loading...</h1>
}

export default Custom404
