const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const levelSchema = new Schema({
    level: {
        type: String,
        required: [true, "Level is required"],
        trim: true
    }
});

module.exports = mongoose.model('Level', levelSchema);