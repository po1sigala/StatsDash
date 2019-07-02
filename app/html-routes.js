
module.exports = function(app) {
    app.get("/", (req, res)=> {
        res.render("index", {title: "Home Page"});
    });

    app.get("/register", (req,res)=> {
        res.render("register", {title: "Register"});
    });

    app.get("/profile", (req, res)=> {
        res.render("dashboard");
    });
    app.get("/compare", (req, res)=> {
        res.render("compare");
    });

    app.get("/login", (req, res)=> {
        res.render("login");
    });
    app.get("/signup", (req, res)=> {
        res.render("register");
    });
    // If anything else is typed this will show
    app.get("*", (req, res)=> {
        res.render("index");
    });

};