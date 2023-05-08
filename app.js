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

app.route("/articles")
.get(
    (req,res)=>{
        Article.find({}).then((articles,err)=>{
            if(!err){
                console.log(articles)
                res.send(articles)
            }else{
                console.log(err)
                res.send(err)
            }
           
        }).catch((err)=>{
            console.log(err)
            res.send(err)
        });
        
    }
)
.post(
    (req,res)=>{
        const newArticle = new Article({
            title:req.body.title,
            content:req.body.content
        })
        newArticle.save().then((err)=>{
            if(!err){
                res.send("Succesfully added the new article")
            }else{
                res.send(err)
            }
        }).catch((err)=>{
            res.send(err)
        })
    }
)
.delete(
    (req,res)=>{
        Article.deleteMany({}).then( (err)=>{
            if(!err){
                res.send("Sucessfully deleted all articles")
            }else{
                res.send(err)
            }
        }).catch((err)=>{
            res.send(err)
        })
    }
)

app.route("/articles/:title")
.get(
    (req,res)=>{
        Article.findOne({title:req.params.title}).then((article,err)=>{
            if(article){
                res.send(article)
            }else{
                res.send("No articles with that title were found")
            }
        
        }).catch((err)=>{
            console.log(err)
            res.send(err)
        });
        
    }
)
.put(
    (req,res)=>{
        Article.findOneAndUpdate(
            {title:req.params.title},
            {title:req.body.title, content:req.body.content},
            {overwrite: true})
            .then((doc,err)=>{
            if(!err){
                res.send("Sucessfully updated the article")
            }else{
                res.send("No articles were updated")
            }
        
        }).catch((err)=>{
            console.log(err)
            res.send(err)
        });
        
    }
)
.patch(
    (req,res)=>{
        Article.findOneAndUpdate(
            {title:req.params.title},
            {$set:req.body})
            .then((doc,err)=>{
            if(!err){
                res.send("Sucessfully updated the article")
            }else{
                res.send("No articles were updated")
            }
        
        }).catch((err)=>{
            console.log(err)
            res.send(err)
        });
        
    }
)
.delete(
    (req,res)=>{
        Article.deleteOne({title:req.params.title}).then( (article,err)=>{
            if(!err){
                res.send("Sucessfully deleted one article")
            }else{
                res.send(err)
            }
        }).catch((err)=>{
            res.send(err)
        })
    }
)

// app.get('/articles',(req,res)=>{
//     Article.find({}).then((articles,err)=>{
//         if(!err){
//             console.log(articles)
//             res.send(articles)
//         }else{
//             console.log(err)
//             res.send(err)
//         }
       
//     }).catch((err)=>{
//         console.log(err)
//         res.send(err)
//     });
    
// })

// app.post("/articles", (req,res)=>{
//     const newArticle = new Article({
//         title:req.body.title,
//         content:req.body.content
//     })
//     newArticle.save().then((err)=>{
//         if(!err){
//             res.send("Succesfully added the new article")
//         }else{
//             res.send(err)
//         }
//     }).catch((err)=>{
//         res.send(err)
//     })
// })

// app.delete("/articles", (req,res)=>{
//     Article.deleteMany({}).then( (err)=>{
//         if(!err){
//             res.send("Sucessfully deleted all articles")
//         }else{
//             res.send(err)
//         }
//     }).catch((err)=>{
//         res.send(err)
//     })
// })


app.listen(process.env.PORT || 3000 , function () {
    console.log("Server started on port 3000");
  });

  /*
  [
    {
        "_id": "64581a4dd3d4e7100c4b6d41",
        "title": "REST",
        "content": "REST is short for REpresentational State Transfer. It's an architectural style for designing API's"
    },
    {
        "_id": "64581a4dd3d4e7100c4b6d42",
        "title": "API",
        "content": "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."
    },
    {
        "_id": "64581a4dd3d4e7100c4b6d43",
        "title": "Bootstrap",
        "content": "This is a framework developed by Twitter that contains pre-made front-end templates for web design"
    },
    {
        "_id": "64581a4dd3d4e7100c4b6d44",
        "title": "DOM",
        "content": "The Document Object Model is like an API for interacting with our HTML"
    },
    {
        "_id": "64582c9445149f42884bf567",
        "title": "Jack Bauier",
        "content": "Once stepped into quick sand and almost died.",
        "__v": 0
    },
    {
        "_id": "64582d4a6e4ba4976c4a0650",
        "title": "React",
        "content": "A reactive front end framework",
        "__v": 0
    }
]
  
  */ 