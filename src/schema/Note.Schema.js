const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const noteSchema = new Schema({
    noteTitle: {
        type: String,
        required: [true, "Note title is required"],
        trim: true
    },
    employeeId: {
        type: String,
        required: [true, "Employee ID is required"],
        trim: true
    },
    forEmployeeId: {
        type: String,
        required: [true, "For employee ID is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true
    },
    createdOn: Date,
    updatedOn: Date
});

module.exports = mongoose.model('Note', noteSchema);
