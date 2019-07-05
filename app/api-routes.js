var express = require("express");

var router = express.Router();

var userRoster = require("../models/userRoster.js");
var searchCompare = require("../models/searchCompare.js");

var isAuthenticated = require("../config/middleware/isAuthenticated");

var passport = require("passport");
require("../config/passport.js")(passport);

module.exports = function(app, passport) {
    // add player to roster
    app.post("/profile/api/players/:player", isAuthenticated, function(
        req,
        res
    ) {
        var user_id = req.user.id;
        console.log(user_id);
        var player_id = req.params.player;
        console.log(player_id);

        // add player to roster
        app.post("/profile/api/players/:player", isAuthenticated, function(
            req,
            res
        ) {
            //
            var user_id = req.user.id;
            console.log(user_id);
            var player_id = req.params.player;
            console.log(player_id);

            userRoster.addPlayer(
                ["user_id, player_id"],
                [user_id, player_id],
                function(result) {
                    res.json({ id: result.insertId });
                }
            );
        });

        // delete player from roster
        app.delete("/profile/api/players/:player", isAuthenticated, function(
            req,
            res
        ) {
            var user_id = req.user.id;
            console.log(user_id);
            var player_id = req.params.player;
            console.log(player_id);

            var condition =
                "user_id = " + user_id + " AND player_id = " + player_id;
            console.log(condition);

            userRoster.deletePlayer(condition, function(result) {
                console.log(req);
                if (result.affectedRows === 0) {
                    return res.status(404).end();
                } else {
                    res.status(200).end();
                }
            });
        });

        app.get("/compare/api/players/:player", isAuthenticated, function(
            req,
            res
        ) {
            var player_id = req.params.player;
            console.log(player_id);

            searchCompare.returnPlayerData(player_id, function(result) {
                res.json(result);
            });
        });

        userRoster.deletePlayer(condition, function(result) {
            if (result.affectedRows === 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        });
    });

    app.get("/compare/api/players/:player", function(req, res) {
        // var user_id = req.user.id;

        var player_id = req.params.player;
        console.log(player_id);

        searchCompare.returnPlayerData(player_id, function(result) {
            res.json(result);
        });
    });
};
