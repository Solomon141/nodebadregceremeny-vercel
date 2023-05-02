const express = require("express");
const router = express.Router();

const con = require("../Conn");

router.get("/", function (req, res, next) {
  res.send("sol in lookup");
});


router.get("/getall", function (req, res, next) {
  var sql_get = "SELECT * FROM `lookups`";
  con.query(sql_get, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

router.get("/getone", function (req, res, next) {
  var sql_get = "SELECT * FROM `lookups`";
  con.query(sql_get, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

router.get("/update", function (req, res, next) {
  var sql_get = "SELECT * FROM `lookups`";
  con.query(sql_get, function (err, data) {
    if (err) throw err;
    console.log(data);
  });
});

router.get("/delete", function (req, res, next) {
  var sql_get = "SELECT * FROM `lookups`";
  con.query(sql_get, function (err, data) {
    if (err) throw err;
    console.log(data);
  });
});

// Get Specific
router.get("/Speciality", function (req, res, next) {
  var sql_get = "SELECT * FROM `lookups` WHERE `lookuptypeId` = 2";
  con.query(sql_get, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

module.exports = router;
