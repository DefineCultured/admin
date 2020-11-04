import React, { useContext } from 'react'
import clsx from 'clsx'
import { WindmillContext } from '@windmill/react-ui'
import { signOut, useSession } from 'next-auth/client'
import { Transition, Menu } from '@headlessui/react'

import { SidebarContext } from '../../context/SidebarContext'
import { MoonIcon, SunIcon, MenuIcon } from '../../icons'

import styles from './Styles.module.css'
const { user_userText } = styles

const Header = () => {
  const { mode, toggleMode } = useContext(WindmillContext)
  const { toggleSidebar } = useContext(SidebarContext)

  const [session, loading] = useSession()

  const usernameStyles = clsx(user_userText, {
    ['text-gray-300']: mode === 'dark',
    ['text-gray-800']: mode !== 'dark'
  })

  return (
    <header className='z-40 py-4 bg-white shadow-bottom dark:bg-gray-800'>
      <div className='container flex items-center justify-between h-full px-6 mx-auto text-purple-600 lg:justify-end dark:text-purple-300'>
        {/* <!-- Mobile hamburger --> */}
        <button
          className='p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple'
          onClick={toggleSidebar}
          aria-label='Menu'
        >
          <MenuIcon className='w-6 h-6' aria-hidden='true' />
        </button>
        <ul className='flex items-center flex-shrink-0 space-x-6'>
          {/* <!-- Theme toggler --> */}
          <li className='flex'>
            <button
              className='rounded-md focus:outline-none focus:shadow-outline-purple'
              onClick={toggleMode}
              aria-label='Toggle color mode'
            >
              {mode === 'dark' ? <SunIcon className='w-5 h-5' aria-hidden='true' /> : <MoonIcon className='w-5 h-5' aria-hidden='true' />}
            </button>
          </li>
          {/* <!-- Profile menu --> */}
          {!loading && session && (
            <li className='relative'>
              <div className='flex items-center justify-center'>
                <div className='relative inline-block text-left'>
                  <Menu>
                    {({ open }) => (
                      <>
                        <span className='rounded-md shadow-sm'>
                          <Menu.Button
                            className='flex items-center rounded-full focus:shadow-outline-purple focus:outline-none'
                            aria-label='Account'
                            aria-haspopup='true'
                          >
                            <img
                              className='inline-block w-8 h-8 align-middle rounded-full'
                              src={session.user.image}
                              alt=''
                              aria-hidden='true'
                            ></img>
                            <span className={usernameStyles}>{session.user.name}</span>
                          </Menu.Button>
                        </span>

                        <Transition
                          show={open}
                          enter='transition ease-out duration-100'
                          enterFrom='transform opacity-0 scale-95'
                          enterTo='transform opacity-100 scale-100'
                          leave='transition ease-in duration-75'
                          leaveFrom='transform opacity-100 scale-100'
                          leaveTo='transform opacity-0 scale-95'
                        >
                          <Menu.Items
                            static
                            className='absolute right-0 w-56 mt-2 text-gray-600 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400'
                          >
                            {session.user.name && (
                              <div className='px-4 py-3 select-none'>
                                <p className='text-xs leading-5 text-gray-400 dark:text-gray-500'>Signed in as</p>
                                <p className='text-sm font-medium leading-5 text-gray-700 truncate dark:text-gray-300'>
                                  {session.user.name}
                                </p>
                              </div>
                            )}
                            <div className='py-1'>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    onClick={() => signOut()}
                                    className={`${
                                      active ? 'bg-gray-100  dark:bg-gray-700' : 'text-gray-700'
                                    } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer dark:text-gray-300`}
                                  >
                                    Sign out
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </header>
  )
}

export default Header
