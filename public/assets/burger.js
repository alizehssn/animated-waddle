$(function() {
    $(".submit").on("click", function(event) {
        const id = $(this).data("id");
        const newBurger = $(this).data("newBurger");

        const newBurgerToEat = {
            devoured: newBurger
        };
        $.ajax("/api/burgers" + id, {
            type: "PUT",
            data: newBurgerToEat
        }).then(
            function() {
                console.log("changed devoured", newBurger);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        const newBurger = {
            name: $("#userBurger").val().trim(),
            devoured: $("[name=devoured]:checked").val().trim()
        };


        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("created new burger");
                location.reload();
            }
        );
    });
})