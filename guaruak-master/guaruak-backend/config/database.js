const mongoose = require('mongoose');

const { mongoDB } = require('../.env');

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true }).then(() => {
    console.log("Banco de Dados conectado...")
}).catch((err) => {
    console.log("Erro ao conectar " + err)
});

module.exports = mongoose;