//Import ORM to create functions
const orm = require("../config/orm.js");

const burger = {
    read: (cb) => {
        orm.selectAll("burgers", (results) => {
            cb(results);
        });
    },
    // The variables cols and vals are arrays.
    create: (cols, vals, cb) => {
        orm.insertOne("burgers", cols, vals, (result) => {
            cb(result);
        });
    },
    update: (objColVals, condition, cb) => {
        orm.updateOne("burgers", objColVals, condition, (result) => {
            cb(result);
        });
    },
    delete: (condition, cb) => {
        orm.deleteOne("burgers", objColVals, conditions, (result) => {
            cb(result);
        });
    }
}


// Export the database functions for the controller 
module.exports = burger;