const chai = require('chai');
chai.should();

const { Sequelize, Model, DataTypes } = require('sequelize');
let migrate = require("../lib/migrate");


function createSequelize() {
    const sequelize = new Sequelize('sqlite::memory:');


    class User extends Model {
    }

    User.init({
        username: {
            type: DataTypes.STRING(10),
            unique: true,
            allowNull: false
        },
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
    }, {
        sequelize, modelName: 'user', indexes: [{
            fields: ['username']
        }]
    });
    return {sequelize};
}

let Migrations = [
    [
        {
            "actionType": "addColumn",
            "attributeName": "part2",
            "depends": [
                "users"
            ],
            "options": {
                "seqType": "Sequelize.DATE"
            },
            "tableName": "users"
        },
        {
            "actionType": "addColumn",
            "attributeName": "part1",
            "depends": [
                "users"
            ],
            "options": {
                "seqType": "Sequelize.DATE"
            },
            "tableName": "users"
        },
        {
            "actionType": "changeColumn",
            "attributeName": "birthday",
            "depends": [
                "users"
            ],
            "options": {
                "seqType": "Sequelize.DATE",
                "unique": true,
            },
            "tableName": "users",
            "touchedProperty": "unique"
        },
        {
            "actionType": "changeColumn",
            "attributeName": "username",
            "depends": [
                "users"
            ],
            "options": {
                "allowNull": false,
                "seqType": "Sequelize.STRING(10)",
                "unique": true
            },
            "tableName": "users",
            "touchedProperty": "allowNull"
        },
        {
            "actionType": "changeColumn",
            "attributeName": "username",
            "depends": [
                "users"
            ],
            "options": {
                "allowNull": false,
                "seqType": "Sequelize.STRING(10)",
                "unique": true
            },
            "tableName": "users",
            "touchedProperty": "unique",
        },
        {
            "actionType": "changeColumn",
            "attributeName": "username",
            "depends": [
                "users",
            ],
            "options": {
                "allowNull": false,
                "seqType": "Sequelize.STRING(10)",
                "unique": true,
            },
            "tableName": "users",
            "touchedProperty": "seqType",
        },
        {
            "actionType": "addIndex",
            "depends": [
                "users"
            ],
            "fields": [
                "part1",
                "part2",
            ],
            "name": "partial",
            "options": {
                "name": "partial",
                "type": "UNIQUE"
            },
            "tableName": "users",
        },
        {
            "actionType": "addIndex",
            "depends": [
                "users"
            ],
            "fields": [
                {
                    "name": "username",
                }
            ],
            "name": "users_username",
            "options": {
                "name": "users_username",
            },
            "tableName": "users",
        }
    ]
]

describe("deduplicated changeColumn", () => {
    it("username", () => {
        const {sequelize} = createSequelize();
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
        let migration = migrate.getMigration(actions);

        actions.should.deep.equal(Migrations[0])


        //let migration = migrate.getMigration(actions);
    });
})

