const express = require('express');
const mongoose = require('mongoose');
const app = express();  
const bodyparser = require('body-parser')
app.use(bodyparser.json())
const cors = require("cors")
app.use(cors());

//routes
app.get('/',(req, res) => {

});
//Import Route ตัวหน้าถูกเรียก
 
const false1 = require('./routes/False1');
app.use('/False1',False1);


//ConnectDB
mongoose.connect('mongodb+srv://tttoktak:7825241239@cluster0-ppy9d.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,userMongoClient:true}) 
console.log('HI connected DB')

app.listen(8000);