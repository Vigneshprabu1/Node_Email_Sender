const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.post('/send-email', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL, // Replace with your email address
      pass: process.env.PASSWORD // Replace with your email password
    }
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: process.env.SENDER_EMAIL, // Replace with recipient email address
    subject: 'New Contact Form Submission',
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});