const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const verify = require("./verify");
const resendVerify = require("./resendVerify");

module.exports = {
    register,
    login,
    logout,
    verify,
    resendVerify
}