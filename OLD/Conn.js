const mysql = require('mysql2');
require('dotenv').config();

const con = mysql.createConnection({
  HOST: process.env.HOST,
  USER: process.env.USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DATABASE,
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
});

module.exports = con;

// badregplccom_feb20;
