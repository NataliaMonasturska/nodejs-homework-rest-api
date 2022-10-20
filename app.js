const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();

const authRouter = require('./routes/api/auth');
const usersRouter = require('./routes/api/users');
const contactsRouter = require('./routes/api/contacts');
const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';




app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// для дз переименовать примерно так 
// app.use("/api/users", authRouter )
app.use("/api/auth", authRouter );
app.use("/api/users", usersRouter )
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  const { status = 500, message = "server error" } = err;
  console.log(err);
  res.status(status).json({ message: message })
});

module.exports = app;




// 6дЗ

const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const {TOKEN_SEND_GRID} = process.env;

sgMail.setApiKey(TOKEN_SEND_GRID);

const mail = {
  to:"tjomamon@meta.ua",
  from: "natalia.mail@meta.ua",
  subject: "Привет! Это тестовое письмо.",
  html: "А это тестовый html"
}

sgMail.send(mail)
.then(()=> console.log("Mail send success"))
.catch(error => console.log(error.message))


