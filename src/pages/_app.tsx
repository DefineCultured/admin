import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { SidebarProvider } from '../context/SidebarContext'
import { Windmill } from '@windmill/react-ui'

import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SidebarProvider>
      <Windmill usePreferences>
        <Provider session={pageProps.session}>
          <Component {...pageProps} />
        </Provider>
      </Windmill>
    </SidebarProvider>
  )
}

export default MyApp
