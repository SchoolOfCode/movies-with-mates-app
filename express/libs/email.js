const nodemailer = require("nodemailer");
const config = require("../config/config");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const transporter = nodemailer.createTransport(config.email, {
  tls: { rejectUnauthorized: false }
});

const sendEmail = ({
  from = "movies.with.mates@gmail.com",
  to,
  subject,
  text
}) => {
  const mailOptions = {
    from,
    to,
    subject,
    text: `Hello there from Team MwM,
      ${text}
      Bye`
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent: " + info.response);
  });
};
module.exports = sendEmail;
