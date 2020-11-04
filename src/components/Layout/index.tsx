import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
// import Footer from '@/components/Footer'
import { SidebarContext } from '../../context/SidebarContext'

import styles from './Styles.module.css'

const Layout = ({ children }) => {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
  const { pathname } = useRouter()

  useEffect(() => {
    closeSidebar()
  }, [pathname])

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}>
      <Sidebar />
      <div className='flex flex-col flex-1 w-full'>
        <Header />
        <main className={styles.main}>
          <div className='container grid px-6 mx-auto'>{children}</div>
        </main>
      </div>
    </div>
    // <div className={styles.container}>
    //   {/* <Header /> */}
    //   <main className={styles.main}>{children}</main>
    //   {/* <Footer /> */}
    // </div>
  )
}

export default Layout
