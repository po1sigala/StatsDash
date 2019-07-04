var isAuthenticated = require('../config/middleware/isAuthenticated');


module.exports = function(app) {

    app.get("/", (req, res) => {
        res.render("index", {title: "Home Page"});
    });
    app.get("/register", (req,res) => {
        res.render("register", {title: "Register"});
    });
    app.get("/compare", isAuthenticated, (req, res) => {
        // console.log()
        res.render("compare");
    });
//         TEST VERSION OF ABOVE - ABOVE SHOULD NOW PRODUCE DATA OBJECT
//         app.get("/compare", (req, res)=> {
//             var obj = { lino: null }
//             res.render("compare", {obj: JSON.stringify(obj)});
//         });
    app.get("/login", (req, res) => {
        res.render("login");
    });
    app.get("/signup", (req, res) => {
        res.render("register");
    });

};