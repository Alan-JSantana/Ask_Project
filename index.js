const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Ask = require("./database/Ask");
const Response = require("./database/Response");

//Database connection
connection
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });
//Setup EJS as View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
//BodyParser
app.use(bodyParser.urlencoded({extended: false}));  
app.use(bodyParser.json());
//Routes
app.get("/", (req, res) => {
    Ask.findAll({raw: true, order:[
        ['id', 'DESC'] // ASC = crescente, DESC = decrescente
    ]}).then(ask => {
        res.render("index", {ask: ask});
    });  
});

app.get("/ask", (req, res) => {
    res.render("ask");
});

app.post("/savequestion", (req, res) => {
    let title = req.body.title;
    let question = req.body.question;
    Ask.create({ 
        title: title,
        question: question 
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/inquire/:id", (req, res) => {
    let id = req.params.id;
    Ask.findOne({
        where: {id: id}
    }).then(inquire => {
        if (inquire != undefined) {
            Response.findAll({
                where: {inquireId: inquire.id},
                order:[ 
                    ['id', 'DESC']
                ]
            }).then(response => {
                res.render("inquire", {
                     inquire: inquire,
                     response: response
                });
            });
        } else {
            res.redirect("/");
        }  
    });    
});

app.post("/answer",(req, res) => {
    let body = req.body.body;
    let inquireId = req.body.inquire;
    Response.create({
        body: body,
        inquireId: inquireId
    }).then(() => {
        res.redirect("/inquire/" + inquireId);
    });
});


app.listen(8080,() => {console.log("App rodando")});