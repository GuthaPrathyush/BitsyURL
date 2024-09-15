const mongoose = require('mongoose');
const urlSchema = mongoose.Schema({
    mappedURL: {
        type: String,
        required: true
    },
    originalURL: {
        type: String,
        required: true
    }
});

const url = mongoose.model('urls', urlSchema);

module.exports = {
    url  
};