const mongoose = require('mongoose');
const topic1 = require('./topics.js');
questionSchema = new mongoose.Schema({name:{type:String},link:{type:String} , topic:{type:mongoose.Schema.Types.ObjectId,ref:'Topics'}
});

const question = mongoose.model('Question',questionSchema)
module.exports= question;
