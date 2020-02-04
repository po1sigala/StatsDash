$(document).ready(function() {
    //delete card from page
    $(document).on("click", ".deletePlayer", function() {
        $(this)
            .parent()
            .parent()
            .remove();
    });
});
