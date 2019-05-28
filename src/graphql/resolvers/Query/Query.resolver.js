const Employee = require('../../../schema/Employee.Schema');
const User = require('../../../schema/User.Schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const readSecretKey = () => fs.readFileSync(`jwt.secret.pk`, 'utf8')

module.exports = {
    Query: {
        user: (root, req, args) => {
            if (!args.isAuth) {
                throw new Error('User is not authenticated.')
            }

            return new Promise((resolve, reject) => {
                User.findOne({ email: req.email }).exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },
        users: (root, req, args) => {
            if (!args.isAuth && (args.role !== 'Admin')) {
                throw new Error('User is not authenticated.')
            }

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
            if (!user) {
                throw new Error('User does not exist!');
            }
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                throw new Error('Password is incorrect!');
            }
            const token = jwt.sign(
                { email: user.email, role: user.role },
                readSecretKey(),
                {
                    expiresIn: '1d'
                }
            );
            return { email: email, token: token, tokenExpiration: 86400 };
        },
        employee: (root, req, args) => {
            if (!args.isAuth) {
                throw new Error('User is not authenticated.')
            }

            return new Promise((resolve, reject) => {
                Employee.findOne(req).exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            })
        },
        employees: (root, req, args) => {
            if (!args.isAuth) {
                throw new Error('User is not authenticated.')
            }

            return new Promise((resolve, reject) => {
                Employee.find({})
                    .populate()
                    .exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
            });
        }
    }
};