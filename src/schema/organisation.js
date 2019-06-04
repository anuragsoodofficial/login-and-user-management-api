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
    },
    office: [{
        officeId: {
            type: String,
            required: [true, "Office id is required"],
            trim: true
        },
        
        officeLocation: {
            type: String,
            required: [true, "Office location is required"],
            trim: true
        }
    }]
});

module.exports = mongoose.model('Organisation', organisationSchema);