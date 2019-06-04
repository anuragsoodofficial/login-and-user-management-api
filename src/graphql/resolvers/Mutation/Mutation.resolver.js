const Employee = require('../../../schema/Employee.Schema');
const Note = require('../../../schema/Note.Schema');
const User = require('../../../schema/User.Schema');
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
                    let userDetails = await User.findOne({ 'email': req.email }, 'email password role');
                    if (userDetails === null || userDetails['email'] !== req.email) {
                        bcrypt.hash(req.password, 12, function (err, password) {
                            let email = req.email;
                            let role = req.role;
                            const newUser = new User({ email, password, role });
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
            })
        }
    }
}