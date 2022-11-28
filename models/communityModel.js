const mongoose = require('mongoose');

const communitySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    membersCount: {
        default: 0,
        type: Number,
    },
    fileLink: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Communities', communitySchema);