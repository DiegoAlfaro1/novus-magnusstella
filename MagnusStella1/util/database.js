const mysql = require("mysql2");
require("dotenv").config();

// usar la conexion a la base de datos que vayamos a utilizar
const conection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});

module.exports = conection.promise();
