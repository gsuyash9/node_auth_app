const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://myfirstdb:993565@cluster0.i5wkz.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3005))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

app.get('/set-cookies', (req,res)=>{

  res.cookie('newUser',false);
  res.cookie('isEmployee',true,{ maxAge: 1000*60*60*24 ,httpOnly:true});

  res.send('you got the cookies');

})
app.get('/read-cookies', (req,res)=>{

    const cookies=req.cookies;
    console.log(cookies);
    res.json(cookies);
  
})