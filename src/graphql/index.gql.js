const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = require("./types/index.type");
const resolvers = require('./resolvers/index.resolver');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;