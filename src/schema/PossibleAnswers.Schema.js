const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const possibleAnswerSchema = new Schema({
    questionId: {
        type: String,
        required: [true, "questionId is required"],
        trim: true
    },
    orgRoleLevelId: {
        type: String,
        required: [true, "orgRoleLevelId is required"],
        trim: true
    },
    possibleAnswers: {
        type: String,
        required: [true, "Possible Answer is required"],
        trim: true
    },
    weightage: {
        type: Number,
        required: [true, "Weightage is required"],
        trim: true
    }
});

module.exports = mongoose.model('PossibleAnswer', possibleAnswerSchema);