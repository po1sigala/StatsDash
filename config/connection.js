var mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port
  port: 3000,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "teams"
});



  var connection = mysql.createConnection(process.env.MYSQL_CONNECTION);
  