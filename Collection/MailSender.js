const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

async function SendConfirmationMail(toEmail, vkey) {
  let transporter = nodemailer.createTransport({ host: 'badregplc.com', port: 465, secure: true, auth: { user: 'badreg_info@badregplc.com', pass: '@#B@dreg123' } });

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log('Server is ready to take our messages');
        resolve(success);
      }
    });
  });

  let Mailinfo = await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(
      {
        from: 'badreg_info@badregplc.com',
        to: [toEmail],
        subject: 'BADREG PLC',
        text: 'Dear all Dermatologists?',
        html: `<div> <h3> Than you for Registering </h3> 
             <Image src="https://static.callbell.eu/uploads/widget_configuration/brand_image/91080/Logo.jpg" /> </div>`,
      },
      (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      }
    );
  });

  // let info = await transporter.sendMail({
  //   from: 'badreg_info@badregplc.com',
  //   to: [toEmail],
  //   subject: 'Confirm Registration',
  //   text: 'a company you will like forever?',
  //   html: `<div> <h3> Confirm Your Account </h3> <p> Thanks for signing up to BadregPLC! You must follow this link within 3 days of registration to activate your account. <p/>
  //            <a href="https://newweb.badregplc.com/verify/${vkey}">Click this link to verify</a>
  //            <p> Have fun, and don't hesitate to contact us with your feedback. </p>
  //            <Image src="https://static.callbell.eu/uploads/widget_configuration/brand_image/91080/Logo.jpg" />
  //            <p> The Badreg PLC IT Department! https://www.badregplc.com </p>
  //        </div>`,
  // });

  console.log('Message sent: %s', Mailinfo.messageId);
}

module.exports = SendConfirmationMail;
