var mysql = require("mysql");

// allows access to info in .env file
require("dotenv").config();

// make the code refer to .env file in order to get the password


// create the connection information for the sql database
// var connection = mysql.createConnection({
//   host: "localhost",

//   // Your port
//   port: 3000,

//   // Your username
//   user: "root",

//   // Your password
//   password: password,
//   database: "teams"
// });



// var connection = mysql.createConnection(process.env.JAWSDB_URL) || mysql.createConnection(process.env.MYSQL_CONNECTION);
var connectionLink = process.env.JAWSDB_URL || process.env.MYSQL_CONNECTION;
var connection = mysql.createConnection(connectionLink);
module.exports = connection;
  