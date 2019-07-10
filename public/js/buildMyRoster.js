$(document).ready(function() {
    console.log("building roster");
    buildRoster();

    function buildRoster() {
        console.log("build roster is running");
        var queryURL = "/api/userRoster";
        $.ajax({
            url: queryURL,
            mehtod: "GET"
        }).then(function(res) {
            console.log("the roster response is");
            console.log(res);
            for (i = 0; i < res.length; i++) {
                var id = res[i].id;
                var name = res[i].full_name;
                searchPlayer(name, id);
            }
        });
    }
});
