var mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "boston"
});





// var connection = mysql.createConnection(process.env.MYSQL_CONNECTION || {
//     host: "localhost",
  
//     // Your port; if not 3306
//     port: 3306,
  
//     // Your username
//     user: "root",
  
//     // Your password
//     password: "",
//     database: "boston"
//   });

  var connection = mysql.createConnection(process.env.MYSQL_CONNECTION);