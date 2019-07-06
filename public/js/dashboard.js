//compare search route /compare/api/players/:player
// code for handling form inputs, etc.
$(document).ready(function() {
    console.log("getting roster");
    buildRoster();

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

    console.log("logic running");

    //-------------------------------------------------CLICK EVENTS---------------------------------------------------
    // $(document).on("keypress", function(enter) {
    //     if (enter.which == 13) {
    //         event.preventDefault();
    //         getSearchInfo();
    //     }
    // });


//     $('#playerName').autocomplete({
//             source: function (req,res){
//                 $.ajax({
//                     url:"/compare/api/players/" + req.player,
//                     dataType:"jsonp",
//                     type: "GET", 
//                     data: {
//                         term: req.player
//                     },
//                     success: function(data){
//                         res (data);
//                         }));
//                     },
//                     error: console.log('error')
//                 });
//             },
//             minLength: 2,
//             select: function (event, ui){
//                 log("Selected: " + ui.result.value + "aka" + ui.result.id);
//             }
//     });


    $(document).on("click", ".search-Btn", function() {
        getSearchInfo();
    });
    $(document).on("click", ".addPlayer", function() {
        //make put request
        var addId = $(this).attr("id");
        console.log("id is: " + addId);
        var newPlayer = {
            player_id: addId
        };
        var queryURL = `/profile/api/players/${addId}`;
        $.ajax({
            type: "POST",
            url: queryURL,
            data: newPlayer
        }).then(function() {
            console.log("new post req made");
        });
    });
    $(document).on("click", ".deletePlayer", function() {
        //delete card from page
        $(this)
            .parent()
            .parent()
            .remove();
    });
    //-------------------------------------------------END CLICK EVENTS---------------------------------------------------
    //-----------------------------------------------------------FUNCTIONS------------------------------------------------------------
    function buildRoster() {
        var queryURL = "";
    }
    function getSearchInfo() {
        console.log("clicked");
        var player = $("input").val();
        console.log(`you searched ${player}`);

        var id = autcompleteArray.indexOf(player) + 1;
        console.log("id is: " + id);

        searchPlayer(player, id);
    }
    function searchPlayer(name, id) {
        var queryURL =
            "https://api.giphy.com/v1/gifs/search?q=" +
            //-----------------------------------------------------------!!!!!!!!!!!!!!!!------------------------------------
            //--------------------------------------CHANGE LATER THIS IS TO TEST UNTIL AUTOCOMPLETE WORKS-------------------------------------------------------
            name +
            //--------------------------------------------------------------------------------------------------
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
        }).then(function(player) {
            console.log("url is " + queryURL);
            console.log("hitting API");
            console.log(player);
            console.log("got player");
            console.log(player[0].full_name);

            buildCard(playergif, player);
        });
    }
    //this function takes a giflink from our giphy query and playerinfo JSON from hitting our own api to dynamically create a card with player stats
    function buildCard(gifLink, playerInfo) {
        var p = playerInfo[0];
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
            )
                //give it an id eqiual to player id for put reqs
                .attr("id", playerInfo[0].id);
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
            console.log(playerInfo[0]);
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
            ).text(playerInfo[0].position + ": " + playerInfo[0].full_name);
            //create p tag to hold header
            var generalHeader = $("<p>").text("General Stats");
            //create div to hold the name and general stats
            var generalInfoDiv = $("<div class='card-content'>");
            //append the name and table that will have stats
            generalInfoDiv
                .append(playerName)
                .append(generalHeader)
                .append(table);
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
                        [
                            playerInfo[0].assists_turnover_ratio,
                            "assists to T.O."
                        ],
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
                "Other: fouls, Double Doubles, etc."
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
                "Defense: Blocks, Steals, etc"
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
                "Offense: scoring, assists, etc"
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
            var detailsHeader = $("<p>").text("In Depth Stats");
            //collapsable row to hold offense/defense stats and player details
            var collapseRow = $("<div class='row col 12'>");
            //append the three divs into one big collapsable
            collapseRow.append(detailsHeader).append(playerDetailsCollapse);
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
    //-------------------------------------------------END FUNCTIONS---------------------------------------------------
});
//------------------------------OLD CODE-------------------
// $("#playerName").autocomplete(
//     {
//         // source: ["klay thompson"]
//         source: function(req, res) {
//             console.log(req);
//             $.ajax(
//                 {
//                     url: "/compare/api/players/" + req.player,
//                     dataType: "jsonp",
//                     type: "GET",
//                     data: {
//                         term: req.player
//                     }
//                 },
//                 {
//                     success: function(data) {
//                         res($.map
//                             (data, function(player){
//                             return {
//                                 label: player.label,
//                                 value: player.value
//                             };
//                             })
//                         );
//                     }
//                 },
//                 {
//                     error: function(err) {
//                         console.log(err);
//                     }
//                 }
//             );
//         }
//     },
//     {
//         minLength: 2
//     },
//     {
//         select: function(event, ui) {
//             event.preventDefault();
//             $("#playerName").val(ui.player.label)
//             console.log(
//                 "Selected: " + ui.result.value + "aka" + ui.result.id
//             );
//         }
//     }
// );
