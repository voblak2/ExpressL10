"use strict";
module.exports = (sequelize, DataTypes) => {
  var posts = sequelize.define(
    "posts",
    {
      PostId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      PostTitle: DataTypes.STRING,
      PostBody: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      Deleted: DataTypes.BOOLEAN,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {}
  );

  posts.associate = function(models) {
    posts.belongsTo(models.users, {
      foreignKey: "UserId"
    });

    // associations can be defined here
  };
  return posts;
};
