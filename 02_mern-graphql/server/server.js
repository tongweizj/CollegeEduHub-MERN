// server.js is the entry point for the GraphQL server. 
// It connects to MongoDB, creates an Apollo Server, and starts
// the server on port 4000.
const express = require('express');
const  {ApolloServer}  = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { expressMiddleware } = require('@apollo/server/express4');
const  cors  = require('cors');
const bodyParser  = require('body-parser');
const  cookieParser  = require('cookie-parser');
const   jwt  = require('jsonwebtoken');

const configureMongoose = require('./config/mongoose');
require('dotenv').config(); // Load environment variables

const typeDefs = require('./graphql/typeDefs');



const studentResolvers = require('./graphql/studentResolvers');
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

// Start the Apollo Server
await server.start();

// Initialize Express
const app = express();

// Middleware to parse cookies
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // React app's origin
  credentials: true,              // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

// Middleware to handle JSON bodies
app.use(bodyParser.json());

// Middleware to handle URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// JWT authentication middleware
app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const user = jwt.verify(token, 'your_super_secret_key_123');
      req.user = user;
    } catch (err) {
      console.error('JWT verification failed:', err.message);
      req.user = null;
    }
  }
  next();
});

// Apply Apollo Server middleware to Express
app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req, res }) => ({ req, res, user: req.user }),
  })
);

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});
};

// Start the server
startServer();

