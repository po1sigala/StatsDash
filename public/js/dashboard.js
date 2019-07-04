//compare search route /compare/api/players/:player
// code for handling form inputs, etc.
$(document).ready(function() {
    console.log("logic running");
    $(document).on("click", ".search-Btn", function() {
        console.log("clicked");
        var player = $("input").val();
        console.log(`you searched ${player}`);
        searchPlayer(player);
    });
    $(document).on("click", ".addPlayer", function() {
        //make put request
    });
    $(document).on("click", ".deletePlayer", function() {
        //delete card from page
        $(this)
            .parent()
            .parent()
            .remove();
    });
    function searchPlayer(name) {
        var queryURL =
            "https://api.giphy.com/v1/gifs/search?q=" +
            name +
            "&api_key=3QGN2O8Bws9dO6cv6z5FmzS3twWYL4ZZ&limit=10&offset=0&rating=PG-13&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(res) {
            console.log("you searched giphy");
            console.log(res);
            var playergif = res.data[0].images.fixed_height.url;
            //get player performs ajax req to get player info
            // return getPlayer(name).then(function(playerInfo) {
            //     console.log("got player");
            // console.log(playerObj);

            //delete this player info later it is just fake info that overrides player info until it is built from a response
            var playerInfo = {
                name: "lino",
                full_name: "lino ornelas",
                position: "G",
                three_points_pct: 1,
                two_points_pct: 0.24,
                free_throws_pct: 0.6,
                assists_turnover_ratio: 2,
                plus: 11,
                minus: 4
            };
            buildCard(playergif, playerInfo);
        });
        // });
    }
    function getPlayer(name) {
        var queryURL = "/compare/api/players/:" + name;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(res) {
            console.log("url is " + queryURL);
            console.log("hitting API");
            console.log(res);
        });
    }
    //this function takes a giflink from our giphy query and playerinfo JSON from hitting our own api to dynamically create a card with player stats
    function buildCard(gifLink, playerInfo) {
        var p = playerInfo;
        var offensiveStats = [
            [p.field_goals_made, "FG Made"],
            [p.field_goals_att, "FG Attempted"],
            [p.field_goals_pct, "FG %"],
            [p.two_points_made, "Two's Made"],
            [p.two_points_att, "Two's Attempts"],
            [p.two_points_pct, "Two's %"],
            [p.three_points_made, "Three's Made"],
            [p.three_points_att, "Three's Attempted"],
            [p.three_points_pct, "Three's %"],
            [p.free_throws_made, "FT Made"],
            [p.free_throws_att, "FT Attempted"],
            [p.free_throws_pct, "FT pct"],
            [p.assists, "Assists"],
            [p.points, "Points"],
            [p.true_shooting_att, "True Shot Attempts"],
            [p.true_shooting_pct, "True Shot %"],
            [p.points_off_turnovers, "Points off turnovers"],
            [p.points_in_paint, "Points From Paint"],
            [p.points_in_paint_made, "Shots From the Paint"],
            [p.points_in_paint_att, "Shots Attempted from Paint"],
            [p.points_in_paint_pct, "Shots From Paint %"],
            [p.effective_fg_pct, "Effective Shot %"],
            [p.fast_break_pts, "Fast Break Points "],
            [p.fast_break_att, "Fast Break Attempts"],
            [p.fast_break_made, "Fast Breaks Made"],
            [p.fast_break_pct, "Fast Break Make %"],
            [p.second_chance_pct, "Second Chance %"],
            [p.second_chance_pts, "Second Chance Points"],
            [p.second_chance_att, "Second Chance Attempts"],
            [p.second_chance_made, "Second Chance Makes"]
        ];
        var defensiveStats = [
            [p.blocked_att, "Block Attempts"],
            [p.offensive_rebounds, "Offensive Rebounds"],
            [p.defensive_rebounds, "Defensive Rebounds"],
            [p.rebounds, "Total Rebounds"],
            [p.steals, "Steals"],
            [p.blocks, "blocks"]
        ];
        var otherStats = [
            [p.double_doubles, "Double Doubles"],
            [p.triple_doubles, "Triple Doubles"],
            [p.turnovers, "Turnovers"],
            [p.fouls_drawn, "fouls drawn"],
            [p.assists_turnover_ratio, "assists/turnover %"],
            [p.personal_fouls, "Personal Fouls"],
            [p.tech_fouls, "Techs"],
            [p.flagrant_fouls, "Flagrants"],
            [p.ejections, "Ejections"],
            [p.coach_ejections, "Coach Ejections"],
            [p.foulouts, "Foulouts"],
            [p.efficiency, "efficiency"],
            [p.offensive_fouls, "offensive Fouls"],
            [p.minus, "minus"],
            [p.plus, "plus"]
        ];

        console.log("building card");
        //find out how many cards are on the page
        var cards = $(".playerCard").length;
        //only four players searchable at once
        if (cards < 4) {
            //----------------------------CREATE IMAGE------------------------------------------
            //create link from gphy req
            var imageLink = $("<img src='" + gifLink + "'>");
            //create div to hold link
            var imageDiv = $("<div class='card-image'>");
            //append link to div
            imageDiv.append(imageLink);
            //create row to hold div
            var imageRow = $("<div class='row'>");
            //append div with image to row
            imageRow.append(imageDiv);

            //---------------------------------CREATE BUTTONS-------------------------------------
            //create add button
            var addButton = $(
                "<a class='waves-effect waves-light btn-large addPlayer'>add to Roster</a>"
            );
            //create delete button
            var deleteButton = $(
                "<a class='waves-effect waves-light btn-large deletePlayer'>delete</a>"
            );
            //create row to hold buttons
            var buttonsRow = $("<div class='row col 12'>");
            //append buttons to the row
            buttonsRow.append(addButton).append(deleteButton);

            //-------------------------------------CREATE general STATS Section---------------------------------

            // contain all the keys in an array which we can loop through
            // should be an object from the get req with all stats

            //------------------------------------------------------FIX KEYS AND REPLACE LATER OCCURANCES OF PLAYER INFO ONCE GET REQ IS DONE---------------------------------------------------------------------------
            // var keys = Object.keys(playerInfo);
            // console.log(keys[0]);
            //--------------------------------------------------------------------------------------------------------------------------
            console.log(playerInfo);
            //------------------------------------------------DIV TO HOLD GENERAL stats-------------------------------------------------------
            //create tags to hold list items
            var trHead = $("<tr>");
            var trBody = $("<tr>");
            //creat tag that defines list items as headers
            var header = $("<thead>");
            //append list items to head
            header.append(trHead);
            //create tag to hold body items
            var body = $("<tbody>");
            //append a tr here to hold other list items
            body.append(trBody);
            //create tag that defines the table with header and body
            var table = $("<table>");
            //append header and body
            table.append(header).append(body);
            //create a span class for styling
            var span = $("<span class='card-title grey-text text-darken-4'>");
            //append the table to span tag
            span.append(table);
            //create span tag holding player name
            var playerName = $(
                "<span class= 'card-title activator grey-text text-darken-4'>"
            ).text(playerInfo.position + ": " + playerInfo.full_name);
            //create div to hold the name and general stats
            var generalInfoDiv = $("<div class='card-content'>");
            //append the name and table that will have stats
            generalInfoDiv.append(playerName).append(table);
            //---------------------------------------UPDTAE LIST INSIDE STATS----------------------------------------------
            //set up switches for the different general player stats based on position g, f, c, f-c, c-f, g-f, f-g
            switch (playerInfo.position) {
                //if they are a guard or guard-forward
                case "G" || "G-F":
                    console.log("making a guard");
                    //first element is the stat we are grabbing from the object. second element is the title we will give it
                    var importantStats = [
                        //guards need to shoot well, assist, make ft, make the team function better so plus minus
                        [
                            playerInfo.true_shooting_pct,
                            "True shooting percentage"
                        ],
                        [playerInfo.free_throws_pct, "FT%"],
                        [playerInfo.assists_turnover_ratio, "assists to T.O."],
                        [playerInfo.plus + "/" + playerInfo.minus, "plus/minus"]
                    ];
                    for (i = 0; i < importantStats.length; i++) {
                        //store the stat title
                        var statTitle = $("<th>").text(importantStats[i][1]);
                        //append the title to the tag holding all headers
                        trHead.append(statTitle);
                        //creat tag to hold the stat value
                        var statValue = $("<td>").text(importantStats[i][0]);
                        trBody.append(statValue);
                    }
                    break;
                case "F" || "F_C":
                    console.log("making a Forward");
                    var importantStats = [
                        //forwards need to shoot well, make ft's, play defense, get rebounds
                        [
                            playerInfo.true_shooting_pct,
                            "True shooting percentage"
                        ],
                        [playerInfo.free_throws_pct, "FT%"],
                        [playerInfo.blocks, "Blocks for " + playerInfo.seasson],
                        [playerInfo.rebounds, "Boards"]
                    ];
                    for (i = 0; i < importantStats.length; i++) {
                        //store the stat title
                        var statTitle = $("<th>").text(importantStats[i][1]);
                        //append the title to the tag holding all headers
                        trHead.append(statTitle);
                        //creat tag to hold the stat value
                        var statValue = $("<td>").text(importantStats[i][0]);
                        trBody.append(statValue);
                    }
                    break;
                case "C" || "C-F":
                    console.log("making a center");
                    var importantStats = [
                        //points in paint
                        //blocks
                        //rebounds
                        //double double
                        //ft
                    ];
                    for (i = 0; i < importantStats.length; i++) {
                        //store the stat title
                        var statTitle = $("<th>").text(importantStats[i][1]);
                        //append the title to the tag holding all headers
                        trHead.append(statTitle);
                        //creat tag to hold the stat value
                        var statValue = $("<td>").text(importantStats[i][0]);
                        trBody.append(statValue);
                    }
            }

            //---------------------------------CREATE DETAILED COLLAPSABLE-------------------------------------

            //-------------------------------------OTHER SECTION----------------------------------------------------------------
            var otherListItems = $("<ul>");
            for (i = 0; i < otherStats.length; i++) {
                var bodyText = $("<li>").text(
                    otherStats[i][1] + ": " + otherStats[i][0]
                );
                otherListItems.append(bodyText);
            }

            var otherStatsBody = $("<div class='collapsible-body'>");
            otherStatsBody.append(otherListItems);
            var otherStatsHeader = $("<div class='collapsible-header'>").text(
                "In Depth Other:"
            );
            var otherCollapse = $("<li>");
            otherCollapse.append(otherStatsHeader).append(otherStatsBody);
            //------------------------------------------END OTHER---------------------
            //-------------------------------------Defense SECTION----------------------------------------------------------------
            var defenseListItems = $("<ul>");
            for (i = 0; i < defensiveStats.length; i++) {
                bodyText = $("<li>").text(
                    defensiveStats[i][1] + ": " + defensiveStats[i][0]
                );
                defenseListItems.append(bodyText);
            }
            var defenseStatsBody = $("<div class='collapsible-body'>");
            defenseStatsBody.append(defenseListItems);
            var defenseStatsHeader = $("<div class='collapsible-header'>").text(
                "In Depth Defense:"
            );
            var defenseCollapse = $("<li>");
            defenseCollapse.append(defenseStatsHeader).append(defenseStatsBody);
            //------------------------------------------END Defense---------------------

            //-------------------------------------OFFENSE SECTION----------------------------------------------------------------
            var offenseListItems = $("<ul>");
            console.log("ofensive stats" + offensiveStats);

            for (i = 0; i < offensiveStats.length; i++) {
                bodyText = $("<li>").text(
                    offensiveStats[i][1] + ": " + offensiveStats[i][0]
                );
                offenseListItems.append(bodyText);
            }

            //create div to hold body of all the stats
            var offensStatsBody = $("<div class='collapsible-body'>");
            offensStatsBody.append(offenseListItems);
            //create div with title for offense stats
            var offenseStatsHeader = $("<div class='collapsible-header'>").text(
                "In Depth Offense:"
            );
            //append header to li
            var offenseCollapse = $("<li>");
            //append li to our big list of collapasbles
            offenseCollapse.append(offenseStatsHeader).append(offensStatsBody);
            //------------------------------------------END offense---------------------

            // collapsable that holds player details
            var playerDetailsCollapse = $("<ul class='collapsible'>");
            playerDetailsCollapse
                .append(offenseCollapse)
                .append(defenseCollapse)
                .append(otherCollapse);
            //collapsable row to hold offense/defense stats and player details
            var collapseRow = $("<div class='row col 12'>");
            //append the three divs into one big collapsable
            collapseRow.append(playerDetailsCollapse);
            //------------------------------------CREATE CARD WITH ALL NEW ELEMENTS----------------------------------
            //create card div to hold all new elements
            var cardDiv = $("<div class='card playerCard col s12 m2 l3'>");
            //append image, buttons, general stats, and detailed stats
            cardDiv
                //first an image of the player shows
                .append(imageRow)
                //below the image is the general info specific to postion
                .append(generalInfoDiv)
                //belwo general stats is a collapasable with the detailed stats
                .append(collapseRow)
                //then the buttons to add and delete
                .append(buttonsRow);

            //append the final card div to our page
            $(".searchRow").append(cardDiv);
            $(".collapsible").collapsible();
        } else {
            alert("Too many players. please delete one :)");
        }
    }
});
