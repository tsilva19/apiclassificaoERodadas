const mongoose = require('mongoose');


const schema = new mongoose.Schema({
 time1: String,
 time2: String,
 placar1: Number,
 placar2: Number

});

module.exports = mongoose.model('rodadas', schema);

