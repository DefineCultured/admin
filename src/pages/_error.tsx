import { GetServerSideProps } from 'next'
import { getSession, Session } from 'next-auth/client'
import Layout from '@/components/Layout'
import Button from '@/UI/Button'

const ErrorPage = () => (
  <Layout>
    <section className='flex flex-col items-center justify-center mt-8 space-y-4'>
      <h1 className='flex items-center justify-center'>404 - Page Not Found</h1>
      <Button variant='blue' href='/admin/dashboard' glow>
        Go back
      </Button>
    </section>
  </Layout>
)

export default ErrorPage

export const getServerSideProps: GetServerSideProps = async context => {
  const session: Session = await getSession(context)
  const { res } = context

  if (res && !session) {
    res.writeHead(302, {
      Location: '/auth/signin'
    })
    res.end()
  }

  return {
    props: {}
  }
}
