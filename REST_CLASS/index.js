const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');






app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.use(methodOverride('_method'));





let posts = [
    {
        id : uuidv4(),
        username : "shreyash",
        content : "What is Machine Learning?  Machine learning is an application of artificial intelligence that uses statistical techniques to enable computers to learn and make decisions without being explicitly programmed. It is predicated on the notion that computers can learn from data, spot patterns, and make judgments with little assistance from humans."
    },
    {
        id : uuidv4(),
        username : "piyush",
        content : "Why Should We Learn Machine Learning?Machine learning is a powerful tool that can be used to solve a wide range of problems. It allows computers to learn from data, without being explicitly programmed. This makes it possible to build systems that can automatically improve their performance over time by learning from their experiences."
    },
    {
        id : uuidv4(),
        username : "vai",
        content : "1) Supervised Learning Supervised learning is a type of machine learning method in which we provide sample labeled data to the machine learning system in order to train it, and on that basis, it predicts the output. 2) Unsupervised Learning Unsupervised learning is a learning method in which a machine learns without any supervision. The training is provided to the machine with the set of data that has not been labeled, classified, or categorized, and the algorithm needs to act on that data without any supervision. The goal of unsupervised learning is to restructure the input data into new features or a group of objects with similar patterns."
    },
];

app.get("/posts", (req,res) => {
    res.render("home.ejs",{posts});
});

app.get("/posts/new", (req,res) => {
    res.render("new.ejs");
});

app.post("/posts", (req,res) =>{
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts"); 
});

app.get("/posts/:id", (req,res) => {
    let {id} = req.params;
    console.log(id); 
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id", (req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post}); 
});

app.delete("/posts/:id", (req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, () =>{
    console.log(`Listening to ${port}`);
});