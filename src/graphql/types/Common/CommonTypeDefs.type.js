const { gql } = require('apollo-server-express');
const { GraphQLDateTime } = require('graphql-iso-date');

const CommonTypeDefs = gql`
input UserInput {
  email: String!
  password: String! 
  }

type User {
  email: String!
  password: String
  role: String
}

type AuthData {
  email: String!
  token: String!
  tokenExpiration: String!
}

type Employee {
    employeeId: String!
    email: String!
    organisationId: String!
    firstName: String!
    lastName: String!
    levelId: String!
    phoneNumber: String!
  }

type Note {
    id: ID!
    noteTitle: String!
    employeeId: String!
    forEmployeeId: String!
    description: String!
    createdOn: String!
    updatedOn: String!
}
`;
module.exports = CommonTypeDefs;