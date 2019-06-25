// requires express
const express = require("express");
const connection = require('./config/connection');
// allows access to info in .env file
require("dotenv").config();
// sets port
const PORT = process.env.PORT;
// creating an express server
const app = express();
// requires handlebars
app.use(express.static("public"));
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.static("public"));

// routing
app.get("/", (req, res)=> {
    res.render("index", {title: "Home Page"});
});

app.get("/register", (req,res)=> {
    res.render("register", {title: "Register"});
});

app.get("/dashboard", (req, res)=> {
    res.render("dashboard");
});

app.get("*", (req, res)=> {
    res.render("index");
});

connection.connect(function(err) {
    if (err) {
      throw err;
    }

    console.log("MySQL is connected as id " + connection.threadId);
    app.listen(PORT, function(){
        console.log("App listening on PORT: " + PORT);
    });
});
// starts our server