const sgMail = require("@sendgrid/mail");

const {TOKEN_SEND_GRID} = process.env;

sgMail.setApiKey(TOKEN_SEND_GRID);

const sendEmail = async (data) => {
    const mail = {...data, from: "natalia.mail@meta.ua"};
    await sgMail.send(mail);
    return true
}

module.exports = sendEmail;