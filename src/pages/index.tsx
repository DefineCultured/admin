import { useSession } from 'next-auth/client'
import Router from 'next/router'

const Home = () => {
  const [session, loading] = useSession()

  if (!loading && !session) {
    Router.push('/auth/signin')
  }

  if (!loading && session) {
    Router.push('/admin/dashboard')
  }

  return <h1>Loading...</h1>
}

export default Home

// import { GetServerSideProps } from 'next'
// import { getSession, Session } from 'next-auth/client'

// const Home = () => <h1>Loading...</h1>
// export default Home

// export const getServerSideProps: GetServerSideProps = async context => {
//   const session: Session = await getSession(context)
//   const { res } = context

//   if (res && !session) {
//     res.writeHead(302, {
//       Location: '/auth/signin'
//     })
//     res.end()
//     return { props: {} }
//   }
//   if (res && session) {
//     res.writeHead(302, {
//       Location: '/admin/dashboard'
//     })
//     res.end()
//     return { props: {} }
//   }

//   return {
//     props: {}
//   }
// }
