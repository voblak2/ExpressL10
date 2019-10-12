const bcrypt = require("bcryptjs");

("use strict");
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define(
    "users",
    {
      UserId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      FirstName: DataTypes.STRING,
      LastName: DataTypes.STRING,
      Username: {
        type: DataTypes.STRING,
        unique: true
      },
      Password: DataTypes.STRING,
      Email: {
        type: DataTypes.STRING,
        unique: true
      },
      Admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },

    {}
  );

  users.associate = function(models) {
    users.hasMany(models.posts, {
      foreignKey: "UserId"
    });
  };
  users.prototype.comparePassword = function(plainTextPassword) {
    let user = this;
    console.log("users/models comparePassword");
    return bcrypt.compareSync(plainTextPassword, user.Password);
  };

  return users;
};
