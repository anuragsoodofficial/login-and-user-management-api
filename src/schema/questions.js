const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const questionSchema = new Schema({
    question: {
        type: String,
        required: [true, "Question is required"],
        trim: true
    },
    createdOn: Date
});

module.exports = mongoose.model('Question', questionSchema);