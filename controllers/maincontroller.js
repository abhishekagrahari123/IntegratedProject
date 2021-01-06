const topic = require("../models/topics.js");
const question = require("../models/questions.js");
const viewtopic = async (req,res) =>{
  const result = await topic.find();
res.render('main/topic.ejs',{b:result});

}
const viewquestion = async (req,res) => {
const id= req.params.id;
l1 = await question.find({topic:id});
res.render('main/question.ejs' , {list:l1});

}
module.exports = {viewtopic,viewquestion};
