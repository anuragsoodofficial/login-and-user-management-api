const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const roleSchema = new Schema({
    role: {
        type: String,
        required: [true, "Role is required"],
        trim: true
    }
});

module.exports = mongoose.model('Role', roleSchema);