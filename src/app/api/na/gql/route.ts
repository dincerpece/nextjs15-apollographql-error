import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginLandingPageProductionDefault, ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { NextApiRequest, NextApiResponse } from 'next'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { PrismaClient } from '@prisma/client'
import { prisma } from '@/lib/db/prisma'
import resolvers from '@/gql/server/resolvers'
import typeDefs from '@/gql/server/schemas'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
const app = express()
const httpServer = http.createServer(app)
import express from 'express'
import http from 'http'

export type Context = {
  prisma: PrismaClient
  token: any
  res: NextApiResponse
  cookies: any
  req: NextApiRequest
}


const apolloServer = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    process.env.NODE_ENV === 'production' ? ApolloServerPluginLandingPageProductionDefault({}) : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
})

const handleRequest = startServerAndCreateNextHandler(apolloServer, {
  context: async (req: NextApiRequest, res: NextApiResponse) => {
    const { cookies } = <any>req
    const token = cookies?.get('token')
    return {
      req,
      res,
      prisma,
      token,
      cookies,
    }
  },
})

export { handleRequest as POST }
