const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
require('dotenv').config()

const app = express()


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//mongoose.connect("mongodb+srv://"+process.env.USER+":"+process.env.PASSWORD+"@personalblog.rvcwuw4.mongodb.net/?retryWrites=true&w=majority/blogDB").then(() => console.log('Connected!')).catch((err)=>{console.log(err)});
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB").then(() => console.log('Connected!'));

const articleSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    }
});

const Article =  mongoose.model("Article",articleSchema);



app.listen(process.env.PORT || 3000 , function () {
    console.log("Server started on port 3000");
  });