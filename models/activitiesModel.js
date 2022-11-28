const mongoose = require('mongoose');

const activitiesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pointers: {
        type: [],
        required: true
    },
    presenters: {
        type: [],
        required: true
    },
    date: {
        type: String,
        required: true
    },
    cid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Activities', activitiesSchema);