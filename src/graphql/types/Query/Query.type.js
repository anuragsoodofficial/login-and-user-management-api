const { gql } = require('apollo-server-express');

const QueryDef = gql`
type Query {
    user(email: String!): User
    users: [User]
    login(email: String!, password: String!): AuthData!
    employee(employeeId: String!): Employee
    employees(limit: Int): [Employee]
    notes(forEmployeeId: String!, limit: Int, page: Int): [Note]
    notesByDateRange(forEmployeeId: String!, startDate: String!, endDate: String!, limit: Int, page: Int): [Note]
    notesByDate(forEmployeeId: String!, date: String!, limit: Int, page: Int): [Note]
    questionAndAnswers(orgRoleLevelId: String!): [PossibleAnswer]
  }
  `;

module.exports = QueryDef;