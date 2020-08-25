const chai = require('chai');
chai.should();

const { Sequelize, Model, DataTypes } = require('sequelize');
let migrate = require("../lib/migrate");


const sequelize = new Sequelize('sqlite::memory:');


class User extends Model {}
User.init({
    username: DataTypes.STRING,
    birthday: {
        type: DataTypes.DATE,
        unique: true
    },
    part1: {
        type: DataTypes.DATE,
        unique: 'partial'
    },
    part2: {
        type: DataTypes.DATE,
        unique: 'partial'
    }
}, { sequelize, modelName: 'user', indexes: [{
    fields: ['username']
    }] });


let ResponseActions = [
    [
        {
            "actionType": "addColumn",
            "tableName": "users",
            "attributeName": "part1",
            "options": {
                "seqType": "Sequelize.DATE"
            },
            "depends": [
                "users"
            ]
        },
        {
            "actionType": "addColumn",
            "tableName": "users",
            "attributeName": "part2",
            "options": {
                "seqType": "Sequelize.DATE"
            },
            "depends": [
                "users"
            ]
        },
        {
            "actionType": "changeColumn",
            "tableName": "users",
            "attributeName": "birthday",
            "options": {
                "unique": true,
                "seqType": "Sequelize.DATE"
            },
            "depends": [
                "users"
            ]
        },
        {
            "fields": [
                "username"
            ],
            "name": "users_username",
            "options": {
                "name": "users_username"
            },
            "actionType": "addIndex",
            "tableName": "users",
            "depends": [
                "users"
            ]
        },
        {
            "fields": [
                "part1",
                "part2"
            ],
            "name": "partial",
            "options": {
                "name": "partial",
                "type": "UNIQUE"
            },
            "actionType": "addIndex",
            "tableName": "users",
            "depends": [
                "users"
            ]
        }
    ],
    [],
    []
]

describe("indexes", () => {
    it("test migration using unique attribute in definition of fields", () => {
        // current state
        const currentState = {
            tables: {}
        };
// load last state
        let previousState = {
            revision: 0,
            version: 1,
            tables: {
                "users": {
                    "tableName": "users",
                    "schema": {
                        "id": {
                            "allowNull": false,
                            "primaryKey": true,
                            "autoIncrement": true,
                            "seqType": "Sequelize.INTEGER"
                        },
                        "username": {
                            "seqType": "Sequelize.STRING"
                        },
                        "birthday": {
                            "seqType": "Sequelize.DATE"
                        },
                        "createdAt": {
                            "allowNull": false,
                            "seqType": "Sequelize.DATE"
                        },
                        "updatedAt": {
                            "allowNull": false,
                            "seqType": "Sequelize.DATE"
                        }
                    },
                    "indexes": {
                    }
                }
            }
        };


        currentState.tables = migrate.reverseModels(sequelize, sequelize.models);

        let actions = migrate.parseDifference(previousState.tables, currentState.tables);
        migrate.sortActions(actions);

        actions.should.deep.equal(ResponseActions[0])


        //let migration = migrate.getMigration(actions);
    });

    it("test migration without changes", () => {
        // current state
        const currentState = {
            tables: {}
        };
// load last state
        let previousState = {
            revision: 0,
            version: 1,
            tables: {
                "users": {
                    "tableName": "users",
                    "schema": {
                        "id": {
                            "allowNull": false,
                            "primaryKey": true,
                            "autoIncrement": true,
                            "seqType": "Sequelize.INTEGER"
                        },
                        "username": {
                            "seqType": "Sequelize.STRING"
                        },
                        "birthday": {
                            "unique": true,
                            "seqType": "Sequelize.DATE"
                        },
                        "part1": {
                            "seqType": "Sequelize.DATE"
                        },
                        "part2": {
                            "seqType": "Sequelize.DATE"
                        },
                        "createdAt": {
                            "allowNull": false,
                            "seqType": "Sequelize.DATE"
                        },
                        "updatedAt": {
                            "allowNull": false,
                            "seqType": "Sequelize.DATE"
                        }
                    },
                    "indexes": {
                        "69b83239992ad861444185c61487130f20d7bce4": {
                            "fields": [
                                {"name": "username"}
                            ],
                            "name": "users_username",
                            "options": {
                                "name": "users_username"
                            }
                        },
                        "7ba7ec00502d9755aee256a990ee5f542b7314ad": {
                            "fields": [
                                "part1",
                                "part2"
                            ],
                            "name": "partial",
                            "options": {
                                "name": "partial",
                                "type": "UNIQUE"
                            }
                        }
                    }
                }
            }
        };


        currentState.tables = migrate.reverseModels(sequelize, sequelize.models);

        let actions = migrate.parseDifference(previousState.tables, currentState.tables);
        migrate.sortActions(actions);

        actions.should.deep.equal(ResponseActions[2])


        //let migration = migrate.getMigration(actions);
    });
})

