import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import { PrismaClient } from '@prisma/client'

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
      }),
      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
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
    callbacks: {}
  })
