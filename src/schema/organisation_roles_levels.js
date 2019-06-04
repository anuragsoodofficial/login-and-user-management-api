const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const organisation_Roles_LevelsSchema = new Schema({
    organisationId: {
        type: String,
        required: [true, "Question is required"],
        trim: true
    },
    roleId: {
        type: String,
        required:[true, "Role Id is required"],
        trim: true
    },
    levelId: {
        type: String,
        required: [true, "LevelId is required"],
        trim: true,
    }
});

module.exports = mongoose.model('Organisation_Roles_Levels', organisation_Roles_LevelsSchema);