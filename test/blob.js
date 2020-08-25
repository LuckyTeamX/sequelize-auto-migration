const chai = require('chai');
chai.should();

const { Sequelize, Model, DataTypes } = require('sequelize');
let migrate = require("../lib/migrate");


const sequelize = new Sequelize('sqlite::memory:');


class User extends Model {}
User.init({
    hash: {
        type: DataTypes.BLOB,
    }
}, { sequelize, modelName: 'user', indexes: [] });


let ResponseActions = [
    [
        {
            "actionType": "createTable",
            "attributes": {
                "createdAt": {
                    "allowNull": false,
                    "seqType": "Sequelize.DATE"
                },
                "hash": {
                    "seqType": "Sequelize.BLOB"
                },
                "id": {
                    "allowNull": false,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "seqType": "Sequelize.INTEGER"
                },
                "updatedAt": {
                    "allowNull": false,
                    "seqType": "Sequelize.DATE"
                }
            },
            "depends": [],
            "options": {},
            "tableName": "users"
        }
    ]
]

describe("blob type", () => {
    it("test migration when model include blob type", () => {
        // current state
        const currentState = {
            tables: {}
        };
// load last state
        let previousState = {
            revision: 0,
            version: 1,
            tables: {
            }
        };


        currentState.tables = migrate.reverseModels(sequelize, sequelize.models);

        let actions = migrate.parseDifference(previousState.tables, currentState.tables);
        migrate.sortActions(actions);

        actions.should.deep.equal(ResponseActions[0])


        //let migration = migrate.getMigration(actions);
    });
})

