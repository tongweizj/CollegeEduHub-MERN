// server.js is the entry point for the GraphQL server. 
// It connects to MongoDB, creates an Apollo Server, and starts
// the server on port 4000.
require('dotenv').config(); // Load environment variables
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const configureMongoose = require('./config/mongoose');
const typeDefs = require('./graphql/typeDefs');
const studentResolvers = require('./graphql/resolvers');
const courseResolvers = require('./graphql/courseResolvers');
// Initialize the application
const startServer = async () => {
  // Step 1: Connect to MongoDB
  await configureMongoose();

  // Step 2: Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers: [studentResolvers, courseResolvers],
  });

  // Step 3: Start Apollo Server
  // 包含了express 
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 GraphQL server ready at ${url}`);
};

// Start the server
startServer();

