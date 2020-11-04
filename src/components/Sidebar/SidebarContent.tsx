import { useRouter } from 'next/router'
import routes from '../../routes/sidebar'
import CustomLink from '@/components/utils/CustomLink'
import * as Icons from '../../icons'
// import SidebarSubmenu from './SidebarSubmenu'

import Logo from '@/UI/Logo'

const Icon = ({ icon, ...props }) => {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

const SidebarContent = () => {
  const { pathname } = useRouter()

  return (
    <div className='py-4 text-gray-500 dark:text-gray-400'>
      <Logo href='/admin/dashboard' className='ml-6' size='small' />
      <ul className='mt-4'>
        {routes.map(
          route => (
            // route.routes ? (
            //   <SidebarSubmenu route={route} key={route.name} />
            // ) : (
            <li className='relative flex items-center px-6 py-4' key={route.name}>
              <CustomLink href={route.path} activeClassName='text-gray-800 dark:text-gray-100 font-semibold '>
                <a className='inline-flex items-center w-full text-sm transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200'>
                  {pathname === route.path && (
                    <span className='absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg' aria-hidden='true'></span>
                  )}
                  <Icon className='w-5 h-5' aria-hidden='true' icon={route.icon} />
                  <span className='ml-4'>{route.name}</span>
                </a>
              </CustomLink>
            </li>
          )
          // )
        )}
      </ul>
    </div>
  )
}

export default SidebarContent
