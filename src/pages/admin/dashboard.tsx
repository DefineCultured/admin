import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { getSession, Session } from 'next-auth/client'
import { formatNumber } from '@/utils/helpers'

import Button from '@/UI/Button'
import Layout from '@/components/Layout'
import InfoCard from '@/components/Cards/InfoCard'
import RoundIcon from '@/components/utils/RoundIcon'
import { PageTitle } from '@/components/Typography'
import { TableBody, TableContainer, Table, TableHeader, TableCell, TableRow, TableFooter, Pagination } from '@windmill/react-ui'
import {
  // ChatIcon,
  // CartIcon,
  // MoneyIcon,
  PeopleIcon
} from '../../icons'

import { toast } from 'react-toastify'

// import styles from '../styles/Contact.module.css'

const AdminDashboard = ({ session, content }) => {
  const { contacts } = content
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  const resultsPerPage = 10
  const totalResults = contacts.length

  const onPageChange = (page: any) => {
    setPage(page)
  }

  const exportData = () => toast('Some day this might work.')

  useEffect(() => {
    setData(contacts.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page])

  return (
    <>
      <Layout>
        <PageTitle>{session.user.name ? `Hello, ${session.user.name}` : 'Dashboard'}</PageTitle>

        <div className='grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4'>
          <InfoCard title='Total clients' value={formatNumber(totalResults)}>
            <RoundIcon
              icon={PeopleIcon}
              iconColorClass='text-orange-500 dark:text-orange-100'
              bgColorClass='bg-orange-100 dark:bg-orange-500'
              className='mr-4'
            />
          </InfoCard>

          {/* <InfoCard title='Account balance' value='$ 46,760.89'>
            <RoundIcon
              icon={MoneyIcon}
              iconColorClass='text-green-500 dark:text-green-100'
              bgColorClass='bg-green-100 dark:bg-green-500'
              className='mr-4'
            />
          </InfoCard> */}

          {/* <InfoCard title='New sales' value='376'>
            <RoundIcon
              icon={CartIcon}
              iconColorClass='text-blue-500 dark:text-blue-100'
              bgColorClass='bg-blue-100 dark:bg-blue-500'
              className='mr-4'
            />
          </InfoCard> */}

          {/* <InfoCard title='Pending contacts' value='35'>
            <RoundIcon
              icon={ChatIcon}
              iconColorClass='text-teal-500 dark:text-teal-100'
              bgColorClass='bg-teal-100 dark:bg-teal-500'
              className='mr-4'
            />
          </InfoCard> */}
        </div>

        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Client</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {data.map((user, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className='flex items-center text-sm'>
                      <div>
                        <p className='font-semibold'>
                          {user.firstName} {user.lastName}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className='text-sm'>{user.email}</span>
                  </TableCell>
                  <TableCell>
                    <span className='text-sm'>{new Date(user.createdAt).toLocaleDateString()}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
            <Pagination
              totalResults={formatNumber(totalResults)}
              resultsPerPage={resultsPerPage}
              label='Table navigation'
              onChange={onPageChange}
            />
          </TableFooter>
        </TableContainer>
        <div className='flex justify-end'>
          <div className='w-full my-4 md:w-1/2 lg:w-1/4'>
            <Button variant='blue' glow onClick={() => exportData()}>
              Export
            </Button>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default AdminDashboard

export const getServerSideProps: GetServerSideProps = async context => {
  const session: Session = await getSession(context)
  const { res } = context
  let content = null

  if (res && !session) {
    res.writeHead(302, {
      Location: '/auth/signin'
    })
    res.end()
  }

  if (session) {
    const hostname = process.env.NEXTAUTH_URL || 'http://localhost:3001'
    const options = { headers: { cookie: context.req.headers.cookie } }
    const res = await fetch(`${hostname}/api/data`, options)
    const json = await res.json()
    if (json.success && json.data) {
      content = json.data
    }
  }

  return {
    props: {
      session,
      content
    }
  }
}
