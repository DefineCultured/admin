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
      <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800'>
        <div className='flex flex-col overflow-y-auto md:flex-row'>
          <div className='h-32 md:h-auto md:w-1/2'>
            <img aria-hidden='true' className='object-cover w-full h-full dark:hidden' src='/images/login-office.jpeg' alt='Office' />
            <img
              aria-hidden='true'
              className='hidden object-cover w-full h-full dark:block'
              src='/images/login-office-dark.jpeg'
              alt='Office'
            />
          </div>
          <main className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
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

              {/* <Button className='mt-4' block layout='outline'>
                <TwitterIcon className='w-4 h-4 mr-2' aria-hidden='true' />
                Twitter
              </Button> */}
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
