const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const { randomUUID } = require('node:crypto')
const jwt = require('jsonwebtoken')
const resolvers = require('./resolversDB.cjs')
const typeDefs = require('./schema.cjs')
const User = require('./models/user.cjs')

const startServer = (port) => {
  if (!typeDefs) {
    throw new Error('`typeDefs` is not defined — check ./schema export')
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  // return promise so callers can handle errors
  return startStandaloneServer(server, {
    listen: { port },
    context: async ({ req }) => {
      const auth = req.headers.authorization
      const currentUser = await getUserFromAuthHeader(auth)
      return { currentUser }
    },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`)
    return url
  })
}

const getUserFromAuthHeader = async (auth) => {
  if (!auth || !auth.startsWith('Bearer ')) {
    return null
  }
 
  const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
  return User.findById(decodedToken.id).populate('friends')
}

module.exports = startServer
