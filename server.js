// requires express
const express = require("express");
const connection = require('./config/connection.js');
// get all the tools we need for authentication 

var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var flash    = require('connect-flash');

// allows access to info in .env file
require("dotenv").config();

// configuration ===============================================================
// connect to our database

require('./config/passport.js')(passport); // pass passport for configuration

// sets port
const PORT = process.env.PORT;
// creating an express server
const app = express();

// requires handlebars
app.use(express.static("public"));
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// for css and images
app.use(express.static("public"));
app.use(express.static('views/images')); 


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routing
// app.get("/", (req, res)=> {
//     console.log(req.user);
// 	// console.log(isAuthenticated());
//     res.render("index", {title: "Home Page"});
// });

// app.get("/register", (req,res)=> {
//     console.log(req.user);
//     res.render("register", {title: "Register"});
// });

// app.get("/profile", (req, res)=> {
//     console.log(req.user);
//     res.render("dashboard");
// });
// app.get("/compare", (req, res)=> {
//     res.render("compare");
// });

// app.get("/login", (req, res)=> {
//     console.log(req.user);
//     res.render("login");
// });
// app.get("/signup", (req, res)=> {
//     res.render("register");
// });
// // If anything else is typed this will show
// app.get("*", (req, res)=> {
//     console.log(req.user);
//     res.render("index");
// });


require('./app/apiii-routes.js')(app, passport);

require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

connection.connect(function(err) {
    if (err) {
      throw err;
    }

    console.log("MySQL is connected as id " + connection.threadId);
    app.listen(PORT, function(){
        console.log("App listening on PORT: " + PORT);
    });
});
