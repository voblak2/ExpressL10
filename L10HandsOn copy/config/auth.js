const jwt = require('jsonwebtoken');
const models = require('../models/index');
const bcrypt = require("bcryptjs");


var authService = {
  signUser: function(user) {
    const token = jwt.sign(
      {
        Username: user.Username,
        UserId: user.UserId,
        Admin: user.Admin
      },
      "secretkey",
      {
        expiresIn: "1h"
      }
    );
    return token;
  },
  verifyUser: function(token) {
    try {
      let decoded = jwt.verify(token, "secretkey"); 
      return models.users.findByPk(decoded.UserId); 
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  hashPassword: function(plainTextPassword) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(plainTextPassword, salt);
    return hash;
  },
  comparePasswords: function(plainTextPassword, hashedPassword) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
  }
};

module.exports = authService;