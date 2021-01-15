const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require('./middleware/authMiddleware');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const user = require('./models/User.js');
const topic = require('./models/topics.js');
const question =require('./models/questions.js')
const mainroutes = require('./routes/mainroutes.js');
const addqRoutes = require('./routes/addqRoutes');

const app = express();

//Admin Bro adapter
AdminBro.registerAdapter(AdminBroMongoose);


app.use(express.json());
app.use(cookieParser());

//middleware
app.use(express.static('public'));

//view engine
app.set('view engine','ejs');

//database connection and admin bro setup
const run = async () => {
    const dbURI ='mongodb+srv://abhishek:test1234@cluster0.j4tsp.mongodb.net/node-auth' ;
    const mongooseDb = await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true} );
    app.listen(3000);
    const AdminBroOptions = {
        rootPath: '/admin',
       resources: [user,topic,question]
    }
    const adminBro = new AdminBro(AdminBroOptions);
    const router = AdminBroExpress.buildRouter(adminBro);
    app.use(adminBro.options.rootPath, router);
}

run().catch(err => console.log(err));

//routes
app.get('*',checkUser);

run2 = async(req,res)=>{
    const rest = await topic.find();
    //res.render('addq',{b:result});
    app.locals.rest = rest;
}
run2();

app.get('/',(req,res)=>res.render('home'));  
app.use(authRoutes);

app.use(requireAuth);

app.use(mainroutes);
app.use(addqRoutes);






