$(function() {
    $(".submit").on("click", function(event) {
        event.preventDefault();
        const id = $(this).data("id");
        const newBurger = $(this).data("devoured");

        const newBurgerToEat = {
            devoured: !newBurger
        };
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newBurgerToEat
        }).then(
            function() {
                console.log("changed devoured", newBurgerToEat);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        const newBurger = {
            burger_name: $("#userBurger").val().trim(),
            devoured: $("[name=devoured]:checked").val().trim()
        };

        console.log("this is new burger", newBurger)
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