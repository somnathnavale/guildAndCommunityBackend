const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    polestar: {
        type: [{
            name: {
                type: String,
                required: true
            },
            designation: {
                type: String,
                required: true
            },
            imageUrl: {
                type: String,
                required: true
            }
        }],
    },
    torchBearer: [{
        type: String,
        required: true
    }],
    trendSetter: [{
        type: String,
        required: true
    }],
    purpose: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Guilds', guildSchema);