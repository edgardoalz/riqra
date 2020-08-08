import express from 'express'
import cors from 'cors'
import { ApolloServer, gql } from 'apollo-server-express'
import { jwt, noop, args, db, address, logger } from './libs'
import { user, product } from './resolver'
import { User } from './model'

const { port } = args

const typeDefs = gql`
  type User {
    email: String!
    password: String!
  }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Product {
    name: String!
    brand: String!
    image: String!
    price: Float!
    userId: String
  }
  type Query {
    productSearch(term: String!, page: Int!, limit: Int!): [Product!]
  }
  type Mutation {
    userLogin(email: String!, password: String!): String
    userSignup(email: String!, password: String!): String
    productCreate(
      name: String!
      image: Upload!
      brand: String!
      price: Float!
    ): String
  }
`

const resolvers = {
  Query: {
    productSearch: product.search
  },
  Mutation: {
    userLogin: user.login,
    userSignup: user.signup,
    productCreate: product.create
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    let user: User
    try {
      user = jwt.decode(req.headers.authorization)
    } catch (error) {
      logger.warn('auth', error)
    }

    return { user }
  }
})

const app = express()
app.use(cors())
server.applyMiddleware({ app })

export const start = (callback: () => void = noop): void => {
  db.connect(() => {
    app.listen({ port }, () => {
      logger.info(
        `GraphQL API is running waiting for incoming requests at http://${address}:${port}${server.graphqlPath}`
      )
      callback()
    })
  }).sync({ force: false })
}

export default { start }
