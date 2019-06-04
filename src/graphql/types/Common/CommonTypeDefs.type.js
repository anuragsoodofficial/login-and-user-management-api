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

type Question {
  id: ID!
  question: String!
  createdOn: String!
}

type Role {
  id: ID!
  role: String!
}

type Level {
  id: ID!
  level: String!
}

type Office {
  id: ID!
  officeId: String!
  officeLocation: String!
}

input OfficeInput {
  officeId: String!
  officeLocation: String!
}

type Organisation {
  id: ID!
  organisationId: Int!
  organisationName: String!
  office: Office!
}

type OrgRoleLevelId {
  id: ID!
  organisationId: String!
  roleId: String!
  levelId: String!
}

type PossibleAnswer {
  id: ID!
  possibleAnswers: String!
  weightage: String!
  associatedQuestion: Question!
  orgRoleLevelId: OrgRoleLevelId!
}

type EmployeeResponse {
  id: ID!
  employeeId: String!
  questionId: String!
  answerId: String!
  explaination: String!
}

`;
module.exports = CommonTypeDefs;