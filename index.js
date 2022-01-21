const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer }  = require('apollo-server-core')
const { graphqlUploadExpress } = require('graphql-upload')
const http = require('http')
const cors = require('cors')
require('dotenv').config()

const {typeDefs, resolvers} = require('./src/graphql')
const config = require('./src/config')

startApolloServer(typeDefs, resolvers)

async function startApolloServer(typeDefs, resolvers) {
    const app = express()
    const httpServer = http.createServer(app)
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      ...config,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    })
    
    await server.start()


  app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
      app.use(cors());
      next();
  })

  app.use(express.json({limit: '25mb'}));
  app.use(express.urlencoded({limit: '25mb', extended: true}))
  app.use(express.static('uploads'))
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))
  server.applyMiddleware({ app })
  await new Promise ((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  )
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

