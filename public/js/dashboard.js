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
            return getPlayer(name).then(function(playerObj) {
                buildCard(playergif, playerObj);
            });
        });
    }
    //function takes an obj
    function buildCard(gifLink, playerinfo) {
        var cards = $(".playerCard").length;
        if (cards < 4) {
            // create image
            var imageLink = $("<img src='" + gifLink + "'>");
            var imageDiv = $("<div class='card-image'>");
            imageDiv.append(imageLink);
            var imageRow = $("<div class='row'>");
            imageRow.append(imageDiv);

            //create delete and add buttons
            var addButton = $(
                "<a class='waves-effect waves-light btn-large'>add to Roster</a>"
            );
            var deleteButton = $(
                "<a class='waves-effect waves-light btn-large'>delete</a>"
            );
            var buttonsRow = $("<div class='row col 12'>");
            //create collapsable to hold stats
            // var obj = { name: 'lino', full_name: 'lino ornelas'};
            // var keys = Object.keys(playerinfo); // [ "name", "full_name" ]

            //---------------------------------WORK HERE----------------
            // for (i = 0; i < keys.length; i++) {
            //now loop through keys and create list items that contain stats
            // }
            //---------------------------------------------------------------
            var collapseDiv = $("<div class='card-reveal'>");
            var collapseRow = $("<div class='row col 12'>");
            collapseRow.append(collapseDiv);
            //create card div to hold the whole thing
            var cardDiv = $("<div class='card playerCard col s12 m2 l3'>");

            //append everything intp the div
            buttonsRow.append(addButton).append(deleteButton);
            cardDiv.append(imageRow).append(buttonsRow);
            // .append(collapseRow);
            //append the final card div to our page
            $(".searchRow").append(cardDiv);
        } else {
            alert("Too many players. please delete one :)");
        }
    }
});
