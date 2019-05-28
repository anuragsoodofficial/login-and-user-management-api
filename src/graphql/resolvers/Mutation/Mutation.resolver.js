const Employee = require('../../../schema/Employee.Schema');
const User = require('../../../schema/User.Schema');
const bcrypt = require('bcrypt');

module.exports = {

    Mutation: {
        // User Operations
        addUser: (root, req, args) => {
            if (!args.isAuth && (args.role !== 'Admin')) {
                throw new Error('You are not allowed to perform this action.')
            }
            else {
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
            }

        },
        updateUserRole: (root, req, args) => {
            if (!args.isAuth && (args.role !== 'Admin')) {
                throw new Error('You are not allowed to perform this action.')
            }
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
            if (!args.isAuth && (args.role !== 'Admin')) {
                throw new Error('You are not allowed to perform this action.')
            }
            return new Promise((resolve, reject) => {
                User.findOneAndRemove(req).exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },

        // Employee Operations
        addEmployee: (root, req, args) => {
            if (!args.isAuth && (args.role !== 'Admin')) {
                throw new Error('You are not allowed to perform this action.')
            }
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
            if (!args.isAuth && (args.role !== 'Admin')) {
                throw new Error('You are not allowed to perform this action.')
            }
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
            if (!args.isAuth && (args.role !== 'Admin')) {
                throw new Error('You are not allowed to perform this action.')
            }
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
        }
    }
}