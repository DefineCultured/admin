import { GetServerSideProps } from 'next'
import { getSession, providers, signIn, Session, SessionProvider } from 'next-auth/client'

import * as Icons from '../../icons'
import { Button } from '@windmill/react-ui'
import Logo from '@/UI/Logo'

// import styles from './Styles.module.css'

const Icon = ({ icon, ...props }) => {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

const SignInPage = ({ providers }) => {
  return (
    <div className='flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900'>
      <div className='flex-1 h-full max-w-xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800'>
        <div className='flex flex-col overflow-y-auto md:flex-row'>
          <main className='flex items-center justify-center w-full p-6 sm:p-12'>
            <div className='w-full'>
              <Logo size='large' className='mb-4' />
              {Object.values(providers).map((provider: SessionProvider) => (
                <div key={provider.name} onClick={() => signIn(provider.id)}>
                  <Button block className='mt-4'>
                    <Icon icon={provider.name} className='w-4 h-4 mr-2' aria-hidden='true' />
                    {provider.name}
                  </Button>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default SignInPage

export const getServerSideProps: GetServerSideProps = async context => {
  const prov = await providers()
  const session: Session = await getSession(context)
  const { res } = context

  if (res && session) {
    res.writeHead(302, {
      Location: '/admin/dashboard'
    })
    res.end()
  }

  return {
    props: {
      session,
      providers: prov
    }
  }
}
