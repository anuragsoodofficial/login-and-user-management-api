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

    addLevel(level: String!): Level
    deleteLevel(id: ID!): Level

    addOrganisation(organisationId: Int!, organisationName: String!, office: [OfficeInput]!): Organisation
    deleteOrganisation(id: ID!): Organisation

    addOrgRoleLevelId(organisationId: String!, roleId: String!, levelId: String!): OrgRoleLevelId
    deleteOrgRoleLevelId(id: ID!): OrgRoleLevelId

    addPossibleAnswers(questionId: String!, orgRoleLevelId: String!, possibleAnswers: String!, weightage:Int!): PossibleAnswer
    deletePossibleAnswers(id: ID!): PossibleAnswer

    addQuestion(question: String!): Question
    deleteQuestion(id: ID!): Question

    addRole(role: String!): Role
    deleteRole(id: ID!): Role

    addEmployeeResponse(employeeId: String!, questionId: String!, answerId: String!, explaination: String!): EmployeeResponse
  }`;

module.exports = MutationDef;