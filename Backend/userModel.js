const dbconnect = require("../Config/config.db");

const User = function(user){
    this.user_firstname = user.user_firstname;
    this.user_lastname = user.user_lastname;
    this.user_email = user.user_email;
    this.user_password = user.user_password;
    this.created_at = newDate();
    this.updated_at = newDate();
};

module.exports = User;