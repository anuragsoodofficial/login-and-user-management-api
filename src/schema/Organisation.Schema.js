const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const organisationSchema = new Schema({
    organisationId: {
        type: Number,
        required: [true, "Organisation Id is required"],
        trim: true
    },
    organisationName: {
        type: String,
        required:[true, "Organisation name is required"],
        trim: true
    }
});

module.exports = mongoose.model('Organisation', organisationSchema);