$(document).ready(function() {
    $(document).on("click", ".deletePlayer", function() {
        //delete card from page
        $(this)
            .parent()
            .parent()
            .remove();
    });
});
