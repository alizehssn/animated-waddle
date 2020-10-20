const express = require("express");
const { end } = require("../config/connection");

//Specify Group of routes
const router = express.Router();

// Import the model to use its database functions.
const burger = require("../models/burger.js");

//Router Functions

router.get("/", (req, res) => {
    burger.read((data) => {
        const burgerData = {
            burgers: data
        };
        console.log(burgerData);
        res.render("index", burgerData);
    });
});

router.post("/api/burgers", (req, res) => {
    burger.create(["burger_name", "devoured"], [req.body.name, req.body.devoured], (result) => {
        res.json({ id: result.insertID });
    })
});


router.put("/api/burgers/:id", (req, res) => {
    const condition = `id = ${req.params.id}`;
    console.log("condition", condition);
    burger.update({
        devoured: req.body.devoured,
    }, condition, (result) => {
        if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();
    })
})


// Export routes for server.js to use.
module.exports = router;