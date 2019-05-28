const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const EmployeeSchema = new Schema({
    employeeId: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required!'],
        trim: true,
        validate: {
            validator(email) {
                return validator.isEmail(email);
            },
            message: '{VALUE} is not a valid email!',
        },
    },
    organisationId: {
        type: String,
        default: "CVT"
    },
    firstName: {
        type: String,
        required: [true, 'Name is Required!'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Name is Required!'],
        trim: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    levelId: {
        type: String,
        required: [true, 'LevelId is required!'],
        trim: true
    },
}, { timestamps: true });

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
