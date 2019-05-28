const { gql } = require('apollo-server-express');

const QueryDef = gql`
type Query {
    user(email: String!): User
    users: [User]
    login(email: String!, password: String!): AuthData!
    employee(employeeId: String!): Employee
    employees(limit: Int): [Employee]
  }
  `;

module.exports = QueryDef;