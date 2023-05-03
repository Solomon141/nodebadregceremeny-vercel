const express = require('express');
const router = express.Router();
const SendConfirmationMail = require('../Collection/MailSender');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const con = require('../Conn');

router.post('/', function (req, res) {
  const { email, phonenum, fullname, speciality, password, addresses } = req.body;
  var sql = 'SELECT * FROM `authuser` WHERE `email` = ?';

  con.query(sql, [email], function (error, result) {
    if (result.length >= 1) {
      res.send({
        error: true,
        message: 'Email Already Exists',
      });
    } else {
      const vkey = crypto.randomBytes(16).toString('hex');
      con.query('INSERT INTO `authuser`(`email`, `phonenum`, `fullname`, `vkey`, `speciality`, `password`, `addresses`) VALUES ( ?, ?, ?, ?, ?, ?, ? )', [email, phonenum, fullname, vkey, speciality, password, addresses], (error, result) => {
        if (error) return res.status(400).json(error);
        res.status(200).json(result);
        SendConfirmationMail(email, vkey);
      });
    }
  });
});

router.post('/login', function (request, response, next) {
  const { email, password } = request.body;
  if (email && password) {
    var sql = 'SELECT * FROM `authuser` WHERE `email` = ? AND `password` = ?';

    con.query(sql, [email, password], function (error, resdata) {
      if (resdata.length === 1) {
        let JWT_KEY = process.env.JWT_KEY;
        let userid = resdata[0].id;
        let fullname = resdata[0].fullname;

        let data = { userid, fullname, email };
        if (resdata[0].isactive) {
          // const token = jwt.sign(data, JWT_KEY);
          response.send({
            error: false,
            data: data,
            message: 'Login Successful',
          });
          // response.send(data);
        } else {
          response.send({
            error: true,
            message: 'Your account is not active',
          });
        }
      } else {
        response.send({
          error: true,
          message: 'Incorrect Email or Password',
        });
      }
      response.end();
    });
  } else {
    response.send({
      error: true,
      message: 'Email or Password missing',
    });
    response.end();
  }
});

router.get('/verify/:vkey', function (req, res) {
  const { vkey } = req.params;

  con.query(`UPDATE authuser SET is_active = '1', email_verified_at= NOW() WHERE vkey = '${vkey}' `, function (err, result) {
    if (err) {
      res.send({
        error: true,
        message: 'Error occured Please Contact us!',
      });
    }
    if (result.affectedRows === 0) {
      res.send({
        error: true,
        message: 'Account Not Activated Please Contact us!',
      });
    } else {
      res.send({
        error: false,
        message: 'Account Activated Successfuly',
      });
    }
  });
});

module.exports = router;
