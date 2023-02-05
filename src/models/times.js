const mongoose = require('mongoose');


const schema = new mongoose.Schema({
 emblema: String,
 nome: String,
 jogos: Number,
 vitoria: Number,
 derrota: Number

});

module.exports = mongoose.model('times', schema);

