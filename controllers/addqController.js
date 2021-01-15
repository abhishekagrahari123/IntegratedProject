const topicModel = require("../models/topics.js");
const question = require("../models/questions.js");

module.exports.addq_get = async(req,res)=>{
    const result = await topicModel.find();
    res.render('addq',{b:result});
}

module.exports.addq_post = async (req,res)=>{
    const {name, topic, link} = req.body;
    //console.log(topic);
    try{
        l2 = await topicModel.findOne({name:topic});

        console.log("ada",l2._id);
        const newq = await question.create({name : name, topic : l2._id, link : link});
        console.log(newq);
        res.status(201).json({newq:newq._id});
    }
    catch(err){ 
        console.log(err);
    }
}

