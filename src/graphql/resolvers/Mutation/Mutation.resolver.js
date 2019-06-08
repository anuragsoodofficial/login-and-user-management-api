const Employee = require('../../../schema/Employee.Schema');
const Note = require('../../../schema/Note.Schema');
const User = require('../../../schema/User.Schema');
const Question = require('../../../schema/Questions.Schema');
const Role = require('../../../schema/Role.Schema');
const Level = require('../../../schema/Level.Schema');
const Organisation = require('../../../schema/Organisation.Schema');
const OrgRoleLevelId = require('../../../schema/OrganisationRolesLevels.Schema');
const PossibleAnswer = require('../../../schema/PossibleAnswers.Schema');
const bcrypt = require('bcrypt');

module.exports = {

    Mutation: {
        // User Operations
        addUser: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            if (!args.isAdmin)
                throw new Error('You are not authorized to perform this action.');

            return new Promise(async (resolve, reject) => {
                try {
                    let userDetails = await User.findOne({ 'email': req.email }, 'email password role name employeeId');
                    if (userDetails === null || userDetails['email'] !== req.email) {
                        bcrypt.hash(req.password, 12, function (err, password) {
                            let email = req.email;
                            let role = req.role;
                            let name = req.name;
                            let employeeId = req.employeeId;
                            const newUser = new User({ email, password, role, name, employeeId });
                            newUser.save((err, res) => {
                                err ? reject(err) : resolve(newUser);
                            });
                        });
                    }
                    else
                        reject(new Error("User alreay exists!"));
                }
                catch (error) {
                    reject(error);
                }
            });
        },
        updateUserRole: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            return new Promise(async (resolve, reject) => {
                try {
                    let email = req.email;
                    let role = req.role;

                    await User.findOneAndUpdate({ email }, { $set: { role } }).exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
                }
                catch (error) {
                    reject(error)
                }
            });
        },
        deleteUser: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            if (!args.isAdmin)
                throw new Error('You are not authorized to perform this action.');

            return new Promise((resolve, reject) => {
                User.findOneAndRemove(req).exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },

        // Employee Operations
        addEmployee: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.')

            if (!args.isAdmin)
                throw new Error('You are not authorized to perform this action.');

            return new Promise(async (resolve, reject) => {
                try {
                    let email = req.email;
                    let employeeId = req.employeeId;

                    let employeeDetails = await Employee.findOne({ 'email': email }, 'email employeeId');

                    if (employeeDetails === null || employeeDetails['email'] !== email || employeeDetails['employeeId'] !== employeeId) {
                        let organisationId = req.organisationId;
                        let firstName = req.firstName;
                        let lastName = req.lastName;
                        let levelId = req.levelId;
                        let phoneNumber = req.phoneNumber;
                        const newEmployee = new Employee({ employeeId, email, organisationId, firstName, lastName, levelId, phoneNumber });
                        newEmployee.save((err, res) => {
                            err ? reject(err) : resolve(newEmployee);
                        });
                    }
                    else
                        reject(new Error('Employee already exists!'))
                }
                catch (error) {
                    reject(error);
                }
            });
        },
        updateEmployee: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.')

            if (!args.isAdmin)
                throw new Error('You are not authorized to perform this action.');

            return new Promise(async (resolve, reject) => {
                try {
                    let employeeId = req.employeeId;
                    let email = req.email;
                    let firstName = req.firstName;
                    let lastName = req.lastName;
                    let levelId = req.levelId;
                    let phoneNumber = req.phoneNumber;
                    const employeeDetails = new Employee({ email, employeeId, firstName, lastName, levelId, phoneNumber })
                    await Employee.findOneAndUpdate({ employeeId: employeeId }, { $set: { email: email, firstName: firstName, lastName: lastName, levelId: levelId, phoneNumber: phoneNumber } }).exec((err, res) => {
                        err ? reject(err) : resolve(employeeDetails);
                    });
                }
                catch (error) {
                    reject(error)
                }
            });
        },
        deleteEmployee: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.')

            if (!args.isAdmin)
                throw new Error('You are not authorized to perform this action.');

            return new Promise((resolve, reject) => {
                try {
                    Employee.findOneAndRemove({ employeeId: req.employeeId }).exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
                }
                catch (error) {
                    reject(error);
                }
            })
        },

        //Note operation
        addNote: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            return new Promise(async (resolve, reject) => {
                let noteTitle = req.noteTitle;
                let employeeId = req.employeeId;
                let forEmployeeId = req.forEmployeeId;
                let description = req.description;
                let createdOn = new Date().toISOString();
                let updatedOn = new Date().toISOString();
                const newNote = new Note({ noteTitle, employeeId, forEmployeeId, description, createdOn, updatedOn });
                newNote.save((err, res) => {
                    err ? reject(err) : resolve(newNote);
                });
            });
        },
        updateNote: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            return new Promise(async (resolve, reject) => {
                try {
                    let id = req.id;
                    let noteTitle = req.noteTitle;
                    let forEmployeeId = req.forEmployeeId;
                    let description = req.description;
                    let updatedOn = new Date().toISOString();
                    const noteDetails = new Note({ noteTitle, forEmployeeId, description, updatedOn });
                    await Note.findOneAndUpdate({ _id: id }, { $set: { noteTitle: noteTitle, forEmployeeId: forEmployeeId, description: description, updatedOn: updatedOn } }).exec((err, res) => {
                        err ? reject(err) : resolve(noteDetails);
                    });
                }
                catch (error) {
                    reject(error)
                }
            });
        },
        deleteNote: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            return new Promise((resolve, reject) => {
                try {
                    Note.findOneAndRemove({ _id: req.id }).exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
                }
                catch (error) {
                    reject(error);
                }
            });
        },

        //Question operation
        addQuestion: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            return new Promise(async (resolve, reject) => {
                let question = req.question;
                let createdOn = new Date().toISOString();
                const newQuestion = new Question({ question, createdOn });
                newQuestion.save((err, res) => {
                    err ? reject(err) : resolve(newQuestion);
                });
            });
        },
        deleteQuestion: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            return new Promise((resolve, reject) => {
                try {
                    Question.findOneAndRemove({ _id: req.id }).exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
                }
                catch (error) {
                    reject(error);
                }
            });
        },

        //Role operation
        addRole: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            return new Promise(async (resolve, reject) => {
                let role = req.role;
                const newRole = new Role({ role });
                newRole.save((err, res) => {
                    err ? reject(err) : resolve(newRole);
                });
            });
        },
        deleteRole: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            return new Promise((resolve, reject) => {
                try {
                    Role.findOneAndRemove({ _id: req.id }).exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
                }
                catch (error) {
                    reject(error);
                }
            });
        },

        //Level operations
        addLevel: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            return new Promise(async (resolve, reject) => {
                let level = req.level;
                const newLevel = new Level({ level });
                newLevel.save((err, res) => {
                    err ? reject(err) : resolve(newLevel);
                });
            });
        },
        deleteLevel: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            return new Promise((resolve, reject) => {
                try {
                    Level.findOneAndRemove({ _id: req.id }).exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
                }
                catch (error) {
                    reject(error);
                }
            });
        },

        //Organisation operation
        addOrganisation: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            return new Promise(async (resolve, reject) => {
                let organisationId = req.organisationId;
                let organisationName = req.organisationName;
                const newOrganisation = new Organisation({ organisationId, organisationName });
                newOrganisation.save((err, res) => {
                    err ? reject(err) : resolve(newOrganisation);
                });
            });
        },
        deleteOrganisation: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            return new Promise((resolve, reject) => {
                try {
                    Organisation.findOneAndRemove({ _id: req.id }).exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
                }
                catch (error) {
                    reject(error);
                }
            });
        },

         //OrgRoleLevelId operation
         addOrgRoleLevelId: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            return new Promise(async (resolve, reject) => {
                let organisationId = req.organisationId;
                let roleId = req.roleId;
                let levelId = req.levelId;
                const newOrgRoleLevelId = new OrgRoleLevelId({ organisationId, roleId, levelId });
                newOrgRoleLevelId.save((err, res) => {
                    err ? reject(err) : resolve(newOrgRoleLevelId);
                });
            });
        },
        deleteOrgRoleLevelId: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            return new Promise((resolve, reject) => {
                try {
                    OrgRoleLevelId.findOneAndRemove({ _id: req.id }).exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
                }
                catch (error) {
                    reject(error);
                }
            });
        },

         //PossibleAnswer operation
         addPossibleAnswers: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            return new Promise(async (resolve, reject) => {
                let questionId = req.questionId;
                let orgRoleLevelId = req.orgRoleLevelId;
                let possibleAnswers = req.possibleAnswers;
                let weightage = req.weightage;
                const newPossibleAnswer = new PossibleAnswer({ questionId, orgRoleLevelId, possibleAnswers, weightage });
                newPossibleAnswer.save((err, res) => {
                    err ? reject(err) : resolve(newPossibleAnswer);
                });
            });
        },
        deletePossibleAnswers: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            return new Promise((resolve, reject) => {
                try {
                    PossibleAnswer.findOneAndRemove({ _id: req.id }).exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    }
}