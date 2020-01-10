const mongoose = require('mongoose');

const TranslationSchema = mongoose.Schema({
    translation: {
        type: String,
        required: true
    },
    language: {
        type: String,
        enum: ['guarani', 'terena'],
        required: true
    },
    audio: {
        type: String,
        required: true
    },
});

module.exports = TranslationSchema;