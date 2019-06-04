const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const employeeResponseSchema = new Schema({
    employeeId: {
        type: String,
        required: [true, "Employee Id is required"],
        trim: true
    },
    questionId: {
        type: String,
        required: [true, "Question Id is required"],
        trim: true,
        unique: true
    },
    answerId: {
        type: String,
        required: [true, "Answer Id is required"],
        trim: true
    },
    explaination: {
        type: String,
        required: [true, "Explaination is required"],
        trim: true
    }
});

module.exports = mongoose.model('employeeResponse', employeeResponseSchema);