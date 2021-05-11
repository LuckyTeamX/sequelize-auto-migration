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
            "BotOrder": {
                "tableName": "BotOrder",
                "schema": {
                    "id": {
                        "allowNull": false,
                        "primaryKey": true,
                        "autoIncrement": true,
                        "seqType": "Sequelize.INTEGER"
                    },
                    "gold": {
                        "allowNull": true,
                        "seqType": "Sequelize.INTEGER"
                    },
                    "wgItemId": {
                        "allowNull": false,
                        "defaultValue": {
                            "value": 34
                        },
                        "seqType": "Sequelize.INTEGER"
                    },
                    "type": {
                        "allowNull": true,
                        "seqType": "Sequelize.STRING(20)"
                    },
                    "status": {
                        "allowNull": false,
                        "seqType": "Sequelize.STRING(24)"
                    },
                    "priceRub": {
                        "allowNull": false,
                        "seqType": "Sequelize.INTEGER"
                    },
                    "succeedAt": {
                        "allowNull": true,
                        "seqType": "Sequelize.DATE"
                    },
                    "createdAt": {
                        "allowNull": false,
                        "seqType": "Sequelize.DATE"
                    },
                    "updatedAt": {
                        "allowNull": false,
                        "seqType": "Sequelize.DATE"
                    },
                    "UserId": {
                        "allowNull": true,
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
                    "d103d5a36ecc9c6a593b5896130e9283f4d781f1": {
                        "fields": [
                            "status"
                        ],
                        "options": {}
                    }
                }
            },
        };

        let normalizedState = migrate.normalizeState(previousState);
        console.log(normalizedState);
    })
})

