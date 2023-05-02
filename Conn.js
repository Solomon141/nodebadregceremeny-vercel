const mysql = require('mysql2');
require('dotenv').config();

const con = mysql.createConnection({
  host: "localhost",
  user: "badregplccom_newweb",
  password: "P@55w0rdP@55w0rd",
  database: "badregplccom_newweb",

  // host: process.env.HOST,
  // user: process.env.USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DATABASE,

  // host: 'localhost',
  // user: 'root',
  // password: '',
  // database: 'ceremony',
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
});

module.exports = con;

// badregplccom_feb20;
