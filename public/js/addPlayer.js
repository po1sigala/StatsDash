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
