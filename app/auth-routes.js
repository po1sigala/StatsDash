// app/routes.js

var userRoster = require("../models/userRoster.js");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app, passport) {
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get("/", function(req, res) {
        res.render("index.handlebars"); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get("/login", function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render("login.handlebars", { message: req.flash("loginMessage") });
    });

    // process the login form
    app.post(
        "/login",
        passport.authenticate("local-login", {
            successRedirect: "/profile", // redirect to the secure profile section
            failureRedirect: "/login", // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect("/");
        }
    );

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get("/signup", function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render("register.handlebars", {
            message: req.flash("signupMessage")
        });
    });

    // process the signup form
    app.post(
        "/signup",
        passport.authenticate("local-signup", {
            successRedirect: "/profile", // redirect to the secure profile section
            failureRedirect: "/signup", // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        })
    );

    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isAuthenticated function)
    app.get("/profile", isAuthenticated, function(req, res) {
        var user_id = req.user.id;
        // make inner join query here
        userRoster.getRosterByUser(user_id, function(players) {
            var hbsObject = {
                team: players
            };

            console.log(hbsObject);
        });
        // then
        res.render("dashboard.handlebars", {
            user: req.user // get the user out of session and pass to template
        });
        console.log(req.user.id);
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });
};

// route middleware to make sure
// function isAuthenticated(req, res, next) {

// 	// if user is authenticated in the session, carry on
// 	if (req.isAuthenticated())
// 		return next();

// 	// if they aren't redirect them to the home page
// 	res.redirect('/');

// };
