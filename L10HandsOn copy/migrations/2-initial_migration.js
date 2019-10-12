'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "id" from table "users"
 * createTable "posts", deps: []
 * changeColumn "Admin" on table "users"
 * changeColumn "Username" on table "users"
 * changeColumn "Email" on table "users"
 * changeColumn "UserId" on table "users"
 * changeColumn "UserId" on table "users"
 * changeColumn "UserId" on table "users"
 *
 **/

var info = {
    "revision": 2,
    "name": "initial_migration",
    "created": "2019-10-06T01:32:53.908Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["users", "id"]
    },
    {
        fn: "createTable",
        params: [
            "posts",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "PostId": {
                    "type": Sequelize.INTEGER,
                    "field": "PostId"
                },
                "PostTitle": {
                    "type": Sequelize.STRING,
                    "field": "PostTitle"
                },
                "PostBody": {
                    "type": Sequelize.STRING,
                    "field": "PostBody"
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt"
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt"
                }
            },
            {}
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
                "defaultValue": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "Username",
            {
                "type": Sequelize.STRING,
                "field": "Username",
                "unique": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "Email",
            {
                "type": Sequelize.STRING,
                "field": "Email",
                "unique": true
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
                "autoIncrement": true,
                "allowNull": false
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
                "autoIncrement": true,
                "allowNull": false
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
                "autoIncrement": true,
                "allowNull": false
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
