const mongoose = require('../../config/database');
const TranslationSchema = require('./translation');

const WordSchema = mongoose.Schema({
    word: {
        type: String,
        required: true
    },
    translations: [ TranslationSchema ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Word', WordSchema);