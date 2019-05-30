const { gql } = require('apollo-server-express');

const MutationDef = gql`
type Mutation {
    addUser(email: String!, password: String!, role: String): User
    updateUserRole(email: String!, role: String!): User
    deleteUser(email: String!): User

    addEmployee(employeeId: String!, email: String!, organisationId: String, firstName: String!, lastName: String!, levelId: String!, phoneNumber: String!): Employee
    updateEmployee(employeeId: String!, email: String!, firstName: String!, lastName: String!, levelId: String!, phoneNumber: String!): Employee
    deleteEmployee(employeeId: String!): Employee

    addNote(noteTitle: String!, employeeId: String!, forEmployeeId: String!, description: String!): Note
    updateNote(id: ID!, noteTitle: String!, forEmployeeId: String!, description: String!): Note
    deleteNote(id: ID!): Note
  }`;

module.exports = MutationDef;