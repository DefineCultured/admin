import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import { PrismaClient } from '@prisma/client'

import { LoginTwitterProfile, LoginAccount, LoginUser } from '@/interfaces'

declare var global: any

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    providers: [
      Providers.Twitter({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET
      })
    ],
    secret: process.env.AUTH_SECRET,
    pages: {
      signIn: '/auth/signin',
      signOut: '/',
      error: '/',
      verifyRequest: '/',
      newUser: null
    },
    adapter: Adapters.Prisma.Adapter({ prisma }),
    callbacks: {
      signIn: async (_user: LoginUser, _account: LoginAccount, profile: LoginTwitterProfile) => {
        const allowedUsers = ['840610820', '705138242', '4341330254', '448654326', '890658068333199360', '632585610']

        if (allowedUsers.includes(profile.id_str)) {
          return Promise.resolve(true)
        } else {
          return Promise.reject('/?e=NotAllowed')
        }
      }
    }
  })
