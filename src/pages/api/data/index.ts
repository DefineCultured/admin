import { NextApiRequest, NextApiResponse } from 'next'
import { getSession, Session } from 'next-auth/client'
import { PrismaClient } from '@prisma/client'

import cache from '../../../utils/cache'

type SessionType = {
  success: boolean,
  data?: object,
  error?: object
}

export default async (req: NextApiRequest, res: NextApiResponse<SessionType>) => {
  const session: Session = await getSession({ req })

  if (session) {
    const prisma = new PrismaClient()

    try {
      let contacts: any
      const contactsFromCache = await cache.get('contacts')

      if (contactsFromCache === undefined) {
        contacts = await prisma.subscriptionEmail.findMany()
        await cache.set('contacts', contacts)
      } else {
        contacts = contactsFromCache
      }

      return res.status(200).json({
        success: true,
        data: {
          contacts
        }
      })
    } catch (err) {
      console.error(err)
      throw err
    } finally {
      await prisma.$disconnect()
    }
  } else {
    return res.status(404).json({
      success: false,
      error: {
        message: 'Invalid route'
      }
    })
  }
}
