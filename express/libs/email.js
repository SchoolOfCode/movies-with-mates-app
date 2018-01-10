const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport(config.email);

const sendEmail = ({from = 'movies.with.mates@gmail.com', to, subject, text}) => {

  const mailOptions = {
      from,
      to,
      subject,
      text: `Hello there from Team MwM,

      ${text}

      Bye`
  };

  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        return console.log(error);
      }
      console.log('Email sent: ' + info.response);
    });
}

export default sendEmail;
