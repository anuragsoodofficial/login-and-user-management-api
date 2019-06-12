const Employee = require('../../../schema/Employee.Schema');
const Note = require('../../../schema/Note.Schema');
const User = require('../../../schema/User.Schema');
const PossibleAnswer = require('../../../schema/PossibleAnswers.Schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const readSecretKey = () => fs.readFileSync(`jwt.secret.pk`, 'utf8')

module.exports = {
    Query: {
        user: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            return new Promise((resolve, reject) => {
                if (req.employeeId || req.name) {
                    User.findOne({ $or: [{ employeeId: req.employeeId }, { name: req.name }] }).exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
                }
                else
                    reject(new Error('Either employeeId or name is not mentioned. Please mention both to search for user details.'));
            });
        },
        users: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.')

            if (!args.isAdmin)
                throw new Error('You are not authorized to perform this action.');

            return new Promise((resolve, reject) => {
                User.find({})
                    .populate()
                    .exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
            });
        },
        login: async (root, { email, password }) => {
            const user = await User.findOne({ email: email });

            if (!user)
                throw new Error('User does not exist!');

            const isEqual = await bcrypt.compare(password, user.password);

            if (!isEqual)
                throw new Error('Password is incorrect!');

            const token = jwt.sign(
                { email: user.email, role: user.role, employeeId: user.employeeId, name: user.name },
                readSecretKey(),
                {
                    expiresIn: '1d'
                }
            );
            return { email: email, token: token, tokenExpiration: 86400 };
        },
        employee: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            return new Promise((resolve, reject) => {
                Employee.findOne(req).exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            })
        },
        employees: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            if (!args.isAdmin)
                throw new Error('You are not authorized to perform this action.');

            return new Promise((resolve, reject) => {
                Employee.find({})
                    .populate()
                    .exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
            });
        },
        notes: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            return new Promise((resolve, reject) => {
                Note.find({ forEmployeeId: req.forEmployeeId }).limit(req.limit).skip(req.page * req.limit).exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            })
        },
        notesByDateRange: (root, req, args) => {
            if (!args.isAuth) {
                throw new Error('You are not authenticated to perform this action.')
            }

            return new Promise((resolve, reject) => {
                Note.find({
                    employeeId: args.employeeId,
                    forEmployeeId: req.forEmployeeId,
                    createdOn: {
                        $gte: req.startDate,
                        $lte: req.endDate
                    }
                }).limit(req.limit).skip(req.page * req.limit).exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            })
        },
        notesByDate: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            return new Promise((resolve, reject) => {
                Note.find({
                    employeeId: args.employeeId,
                    forEmployeeId: req.forEmployeeId,
                    createdOn: {
                        $lte: req.date
                    }
                }).limit(req.limit).skip(req.page * req.limit).exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            })
        },
        questionAndAnswers: (root, req, args) => {
            if (!args.isAuth)
                throw new Error('You are not authenticated to perform this action.');

            return new Promise((resolve, reject) => {
                PossibleAnswer.find({ orgRoleLevelId: req.orgRoleLevelId }).limit(req.limit).skip(req.page * req.limit).exec((err, res) => {
                    err ? reject(err) : resolve(resolve);
                });
            })
        },
    }
};