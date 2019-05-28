const { gql } = require('apollo-server-express');

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
`;
module.exports = CommonTypeDefs;