$(document).ready(function() {
    //this file will handle the creation of a detailed player card using gphy for the image and our db for the data
    console.log("logic running");
    console.log("autocomplete loaded");

    var autcompleteArray = [];
    $.ajax({
        url: "/search/api/players",
        method: "GET"
    }).then(function(res) {
        console.log(res);
        for (i = 0; i < res.length; i++) {
            autcompleteArray.push(res[i].full_name);
        }
        console.log("made autocomplete array");
        console.log(autcompleteArray);
    });
    $("#playerName").autocomplete(
        {
            source: autcompleteArray
        },
        {
            minLength: 2
        },

        {
            select: function(event, ui) {}
        }
    );
    //-------------------------------------------------CLICK EVENTS---------------------------------------------------
    // $(document).on("keypress", function(enter) {
    //     if (enter.which == 13) {
    //         event.preventDefault();
    //         getSearchInfo();
    //     }
    // });
    $(document).on("click", ".search-Btn", function() {
        //get the name of the player and his unique id

        getSearchInfo();
    });

    //-------------------------------------------------END CLICK EVENTS---------------------------------------------------
    //-----------------------------------------------------------FUNCTIONS------------------------------------------------------------
    function getSearchInfo() {
        console.log("clicked");
        var player = $("input").val();
        console.log(`you searched ${player}`);

        var id = autcompleteArray.indexOf(player) + 1;
        console.log("id is: " + id);
        //get the players picture via giphy
        searchPlayer(player, id);
    }
    function searchPlayer(name, id) {
        console.log("searching giphy for " + name);
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
            getPlayer(id, playergif);
        });
    }
    function getPlayer(id, playergif) {
        var queryURL = "/compare/api/players/" + id;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(playerInfo) {
            console.log("url is " + queryURL);
            console.log("hitting API");
            console.log(playerInfo);
            console.log("got player");
            console.log(playerInfo[0].full_name);

            //build the general structure of a card
            buildGeneral(playergif, playerInfo);
            //append the data from our query to the card
        });
    }
    function buildGeneral(gifLink, playerInfo) {
        console.log("building card");
        //find out how many cards are on the page
        var cards = $(".playerCard").length;
        //only four players searchable at once
        if (cards < 4) {
            console.log("making imagerow");
            //create row to hold div
            var imageRow = $("<div class='row'>");
            console.log("image row is " + imageRow);
            //----------------------------CREATE IMAGE------------------------------------------
            buildImageDiv(imageRow, gifLink);
            console.log("afterbuildimagediv");
            //---------------------------------CREATE BUTTONS-------------------------------------
            //create row to hold buttons
            var buttonsRow = $("<div class='row col 12'>");
            buildButtonsDiv(buttonsRow, playerInfo);
            //-------------------------------------CREATE general STATS Section---------------------------------

            // contain all the keys in an array which we can loop through
            // should be an object from the get req with all stats

            //------------------------------------------------------FIX KEYS AND REPLACE LATER OCCURANCES OF PLAYER INFO ONCE GET REQ IS DONE---------------------------------------------------------------------------
            // var keys = Object.keys(playerInfo);
            // console.log(keys[0]);
            //--------------------------------------------------------------------------------------------------------------------------
            console.log(playerInfo[0]);
            //------------------------------------------------DIV TO HOLD GENERAL stats-------------------------------------------------------
            //create tags to hold list items
            //create div to hold the name and general stats
            var generalRow = $("<div class='row col 12'>");
            var generalInfoDiv = $("<div class='card-content'>");
            console.log("before build general");
            buildGeneralDiv(generalInfoDiv, playerInfo);
            generalRow.append(generalInfoDiv);
            var collapseRow = $("<div class='row col 12'>");
            buildCollapse(playerInfo, collapseRow);
            buildCard(imageRow, generalRow, collapseRow, buttonsRow);
        } else {
            alert("Too many players. please delete one :)");
        }
    }
    function buildImageDiv(imageRow, gifLink, imageDiv) {
        //create link from gphy req
        var imageLink = $("<img src='" + gifLink + "'>");
        //create div to hold link
        var imageDiv = $("<div class='card-image'>");
        //append link to div
        imageDiv.append(imageLink);
        //append div with image to row
        imageRow.append(imageDiv);
    }
    function buildButtonsDiv(buttonsRow, playerInfo) {
        //create add button
        var addButton = $(
            "<a class='waves-effect waves-light btn-large addPlayer'>add to Roster</a>"
        )
            //give it an id eqiual to player id for put reqs
            .attr("id", playerInfo[0].id);
        //create delete button
        var deleteButton = $(
            "<a class='waves-effect waves-light btn-large deletePlayer'>delete</a>"
        ).attr("id", playerInfo[0].id);

        //append buttons to the row
        buttonsRow.append(addButton).append(deleteButton);
    }
    function buildGeneralDiv(generalInfoDiv, playerInfo) {
        var trHead = $("<tr>");
        var trBody = $("<tr>");
        appendGeneral(trHead, trBody, playerInfo);
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
        ).text(playerInfo[0].position + ": " + playerInfo[0].full_name);
        //create p tag to hold header
        var generalHeader = $("<p>").text("General Stats");

        //append the name and table that will have stats
        generalInfoDiv
            .append(playerName)
            .append(generalHeader)
            .append(table);
    }
    function appendGeneral(trHead, trBody, playerInfo) {
        //---------------------------------------UPDTAE LIST INSIDE STATS----------------------------------------------
        //set up switches for the different general player stats based on position g, f, c, f-c, c-f, g-f, f-g
        switch (playerInfo[0].position) {
            //if they are a guard or guard-forward
            case "G":
            case "G-F":
                console.log("making a guard");
                //first element is the stat we are grabbing from the object. second element is the title we will give it
                var importantStats = [
                    //guards need to shoot well, assist, make ft, make the team function better so plus minus

                    [
                        playerInfo[0].true_shooting_pct,
                        "True shooting percentage"
                    ],

                    [playerInfo[0].free_throws_pct, "FT%"],
                    [playerInfo[0].assists_turnover_ratio, "assists to T.O."],
                    [
                        playerInfo[0].plus + "/" + playerInfo[0].minus,
                        "plus/minus"
                    ]
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

            case "F":
            case "F-C":
            case "F-G":
                console.log("making a Forward");
                var importantStats = [
                    //forwards need to shoot well, make ft's, play defense, get rebounds
                    [
                        playerInfo[0].true_shooting_pct,
                        "True shooting percentage"
                    ],
                    [playerInfo[0].free_throws_pct, "FT%"],
                    [
                        playerInfo[0].blocks,
                        "Blocks for " + playerInfo[0].seasson
                    ],
                    [playerInfo[0].rebounds, "Boards"]
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
            case "C":
            case "C-F":
                console.log("making a center");
                var importantStats = [
                    //points in paint
                    //blocks
                    //rebounds
                    //double double
                    //ft
                    [playerInfo[0].points_in_paint, "Points From Paint"],
                    [playerInfo[0].blocks, "Blocks"],
                    [playerInfo[0].double_doubles, "Double Doubles"],
                    [playerInfo[0].free_throws_pct, "FT%"]
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
    }
    function buildCollapse(playerInfo, collapseRow) {
        //---------------------------------CREATE DETAILED COLLAPSABLE-------------------------------------
        // collapsable that holds player details
        var playerDetailsCollapse = $("<ul class='collapsible'>");
        buildOffenseDefenseOther(playerDetailsCollapse, playerInfo);
        var detailsHeader = $("<p>").text("In Depth Stats");

        //append the three divs into one big collapsable
        collapseRow.append(detailsHeader).append(playerDetailsCollapse);
        //------------------------------------CREATE CARD WITH ALL NEW ELEMENTS----------------------------------
        //create card div to hold all new elements
    }
    function buildOffenseDefenseOther(playerDetailsCollapse, playerInfo) {
        var otherCollapse = $("<li>");
        appendOtherDetailed(otherCollapse, playerInfo);
        var defenseCollapse = $("<li>");
        appendDefenseDetailed(defenseCollapse, playerInfo);
        var offenseCollapse = $("<li>");
        appendOffenseDetailed(offenseCollapse, playerInfo);
        playerDetailsCollapse
            .append(offenseCollapse)
            .append(defenseCollapse)
            .append(otherCollapse);
    }
    function appendOtherDetailed(otherCollapse, playerInfo) {
        var p = playerInfo[0];
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
            "Other: fouls, Double Doubles, etc."
        );

        otherCollapse.append(otherStatsHeader).append(otherStatsBody);
        //------------------------------------------END OTHER---------------------
    }
    function appendDefenseDetailed(defenseCollapse, playerInfo) {
        var p = playerInfo[0];
        var defensiveStats = [
            [p.blocked_att, "Block Attempts"],
            [p.offensive_rebounds, "Offensive Rebounds"],
            [p.defensive_rebounds, "Defensive Rebounds"],
            [p.rebounds, "Total Rebounds"],
            [p.steals, "Steals"],
            [p.blocks, "blocks"]
        ];
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
            "Defense: Blocks, Steals, etc"
        );

        defenseCollapse.append(defenseStatsHeader).append(defenseStatsBody);
        //------------------------------------------END Defense---------------------
    }
    function appendOffenseDetailed(offenseCollapse, playerInfo) {
        var p = playerInfo[0];
        //organize data
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
            "Offense: scoring, assists, etc"
        );
        //append header to li

        //append li to our big list of collapasbles
        offenseCollapse.append(offenseStatsHeader).append(offensStatsBody);
        //------------------------------------------END offense---------------------
    }
    function buildCard(imageRow, generalRow, collapseRow, buttonsRow) {
        var cardDiv = $("<div class='card playerCard col s12 m2 l3'>");
        //append image, buttons, general stats, and detailed stats
        cardDiv
            //first an image of the player shows
            .append(imageRow)
            //below the image is the general info specific to postion
            .append(generalRow)
            //belwo general stats is a collapasable with the detailed stats
            .append(collapseRow)
            //then the buttons to add and delete
            .append(buttonsRow);

        //append the final card div to our page
        $(".searchRow").append(cardDiv);
        $(".collapsible").collapsible();
    }
    //-------------------------------------------------END FUNCTIONS---------------------------------------------------
});
