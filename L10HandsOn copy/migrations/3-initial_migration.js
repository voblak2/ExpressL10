'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "id" from table "posts"
 * changeColumn "PostId" on table "posts"
 * changeColumn "PostId" on table "posts"
 * changeColumn "PostId" on table "posts"
 * changeColumn "UserId" on table "posts"
 * changeColumn "UserId" on table "posts"
 * changeColumn "UserId" on table "posts"
 * changeColumn "UserId" on table "posts"
 * changeColumn "createdAt" on table "posts"
 * changeColumn "updatedAt" on table "posts"
 * changeColumn "Deleted" on table "posts"
 * changeColumn "UserId" on table "users"
 * changeColumn "Admin" on table "users"
 * changeColumn "Deleted" on table "users"
 * changeColumn "Deleted" on table "users"
 *
 **/

var info = {
    "revision": 3,
    "name": "initial_migration",
    "created": "2019-10-06T03:10:02.431Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["posts", "id"]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "PostId",
            {
                "type": Sequelize.INTEGER,
                "field": "PostId",
                "allowNull": false,
                "primaryKey": true,
                "autoIncrement": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "PostId",
            {
                "type": Sequelize.INTEGER,
                "field": "PostId",
                "allowNull": false,
                "primaryKey": true,
                "autoIncrement": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "PostId",
            {
                "type": Sequelize.INTEGER,
                "field": "PostId",
                "allowNull": false,
                "primaryKey": true,
                "autoIncrement": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "users",
                    "key": "UserId"
                },
                "allowNull": true,
                "field": "UserId"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "users",
                    "key": "UserId"
                },
                "allowNull": true,
                "field": "UserId"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "users",
                    "key": "UserId"
                },
                "allowNull": true,
                "field": "UserId"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "users",
                    "key": "UserId"
                },
                "allowNull": true,
                "field": "UserId"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "createdAt",
            {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "updatedAt",
            {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "Deleted",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Deleted"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "field": "UserId",
                "primaryKey": true,
                "autoIncrement": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "Admin",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Admin",
                "defaultValue": 0
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "Deleted",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Deleted",
                "defaultValue": false,
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "Deleted",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Deleted",
                "defaultValue": false,
                "allowNull": true
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
