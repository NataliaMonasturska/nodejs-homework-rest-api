const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
    const mail = {
        to: email,
        subject: "website registration confirmation",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Please click to complete registration.</a>`
    }
    return mail
}
module.exports = createVerifyEmail;