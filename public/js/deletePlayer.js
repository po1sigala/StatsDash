$(document).ready(function() {
    $(".modal").modal();
    $(document).on("click", ".deletePlayer", function() {
        //make delete req
        var player = $(this).attr("id");
        console.log("player id is " + player);
        var queryURL = "/profile/api/players/" + player;
        $.ajax({
            url: queryURL,
            type: "DELETE"
        }).then(function() {
            console.log("deleted " + player + "from userRoster");
        });
    });
});
