const { GraphQLServer } = require("graphql-yoga");

const Mutation = require("./resolvers/mutation");
const Query = require("./resolvers/query");
const db = require("./db");

// Create the Graphql Yoga Server

// context
const context = req => ({
  ...req,
  userId: req.request.userId,
  db
});

const createServer = () => {
  return new GraphQLServer({
    typeDefs: "./src/scheme.graphql",
    resolvers: {
      Mutation,
      Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context
  });
};

module.exports = createServer;
