// Emailer

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ryang20718@likelion.org',
    pass: 'Pass'
  }
});

var mailOptions = {
  from: 'ryang20718@likelion.org',
  to: 'siru@2ether.net',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
