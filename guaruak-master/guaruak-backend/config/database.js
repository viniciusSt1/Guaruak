const mongoose = require('mongoose');

const { mongoDB } = require('../../.env');

mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;