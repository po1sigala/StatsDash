// code for handling form inputs, etc.
$(document).ready(function() {
    console.log("logic running");
    $(document).on("click", ".search-Btn", function() {
        console.log("clicked");
        var player = $("input").val();
        console.log(`you searched ${player}`);
        searchPlayer(player);
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
            // return getPlayer(name).then(function(playerObj) {
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
            // });
        });
    }
    //this function takes a giflink from our giphy query and playerinfo JSON from hitting our own api to dynamically create a card with player stats
    function buildCard(gifLink, playerInfo) {
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
                "<a class='waves-effect waves-light btn-large'>add to Roster</a>"
            );
            //create delete button
            var deleteButton = $(
                "<a class='waves-effect waves-light btn-large'>delete</a>"
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
            ).text(playerInfo.full_name);
            //create div to hold the name and general stats
            var generalInfoDiv = $("<div class='card-content'>");
            //append the name and table that will have stats
            generalInfoDiv.append(playerName).append(table);
            //---------------------------------------UPDTAE LIST INSIDE STATS----------------------------------------------
            //set up switches for the different general player stats based on position g, f, c, f-c, c-f, g-f, f-g
            switch (playerInfo.position) {
                //if they are a guard or guard-forward
                case "G" || "G-F":
                    //first element is the stat we are grabbing from the object. second element is the title we will give it
                    var importantStats = [
                        [playerInfo.three_points_pct, "3pt%"],
                        [playerInfo.two_points_pct, "2p%"],
                        [playerInfo.free_throws_pct, "FT%"],
                        [playerInfo.assists_turnover_ratio, "assists to T.O."],
                        [playerInfo.plus + "/" + playerInfo.minus, "plus/minus"]
                    ];

                    //loop through the array
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
            //---------------------------------------------------------------
            //collapsable to hold defensive stats
            var defensiveStats = $("<p>").text("WOOO DEFENSE");
            var defenseCollapseDiv = $("<div>");
            defenseCollapseDiv.append(defensiveStats);
            var offensiveStats = $("<p>").text("WOOO OFFENSE");
            //collapsable to hold offensive stats
            var offenseCollapseDiv = $("<div>");
            offenseCollapseDiv.append(offensiveStats);
            var otherStats = $("<p>").text("WOOO OTHER??");
            var otherStatsDiv = $("<div>");
            otherStatsDiv.append(otherStats);
            // collapsable that holds player details
            var playerDetailsCollapseDiv = $("<div class='card-reveal'>");
            playerDetailsCollapseDiv
                .append(offenseCollapseDiv)
                .append(defenseCollapseDiv)
                .append(otherStatsDiv);
            //collapsable row to hold offense/defense stats and player details
            var collapseRow = $("<div class='row col 12'>");
            //append the three divs into one big collapsable
            collapseRow.append(playerDetailsCollapseDiv);
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
        } else {
            alert("Too many players. please delete one :)");
        }
    }
});
