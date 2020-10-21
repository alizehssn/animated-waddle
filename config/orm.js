// Import MySQL connection.
const connection = require("./connection");


function printQuestionMarks(num) {
    let arr = [];

    for (let i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(obj) {
    let arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (let key in obj) {
        let value = obj[key];
        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = `'${value}'`;
            }
            arr.push(`${key}=${value}`);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}
//Object for SQL Functions
const orm = {
    //SelectAll Function
    selectAll: (table, cb) => {
        const queryString = `SELECT * FROM ${table};`;
        console.log(queryString);
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        })
    },
    //insertOne Function
    insertOne: (table, cols, vals, cb) => {
        let queryString = `INSERT INTO ${table}`;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        })
    },
    //UpdateOne Function

    updateOne: (table, objColVals, condition, cb) => {
        let queryString = `UPDATE ${table}`;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        })

    },

    deleteOne: (table, condition, cb) => {
        let queryString = `DELETE FROM ${table}`;
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        })
    }

}



// Export orm object so models can use it
module.exports = orm;