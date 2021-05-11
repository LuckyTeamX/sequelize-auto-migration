const chai = require('chai');
chai.should();

const { Sequelize, Model, DataTypes } = require('sequelize');
let migrate = require("../lib/migrate");


describe("normalizing", () => {
    it("models", () => {

        let previousState = {
            "DrawUser": {
                "tableName": "DrawUser",
                "schema": {
                    "id": {
                        "allowNull": false,
                        "primaryKey": true,
                        "autoIncrement": true,
                        "seqType": "Sequelize.INTEGER"
                    },
                    "auto": {
                        "allowNull": true,
                        "defaultValue": {
                            "value": null
                        },
                        "seqType": "Sequelize.BOOLEAN"
                    },
                    "createdAt": {
                        "allowNull": false,
                        "seqType": "Sequelize.DATE"
                    },
                    "DrawId": {
                        "allowNull": false,
                        "references": {
                            "model": "Draw",
                            "key": "id"
                        },
                        "onDelete": "NO ACTION",
                        "onUpdate": "CASCADE",
                        "seqType": "Sequelize.INTEGER"
                    },
                    "UserId": {
                        "allowNull": false,
                        "references": {
                            "model": "User",
                            "key": "id"
                        },
                        "onDelete": "NO ACTION",
                        "onUpdate": "CASCADE",
                        "seqType": "Sequelize.INTEGER"
                    }
                },
                "indexes": {
                    "fbf43f0b50d24647bec04bad4b73d054a75c2391": {
                        "fields": [
                            "DrawId",
                            "UserId"
                        ],
                        "unique": true,
                        "options": {
                            "indicesType": "UNIQUE"
                        }
                    }
                }
            },
        };

        migrate.normalizeState(previousState);
    })
})

