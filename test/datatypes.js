const chai = require('chai');
chai.should();

const { Sequelize, Model, DataTypes } = require('sequelize');
let migrate = require("../lib/migrate");



function createSequelize() {
    const sequelize = new Sequelize('sqlite::memory:');


    class Foo extends Model {
    }

    Foo.init({
        test: DataTypes.TEXT('medium'),
    }, {
        sequelize,
    });
    return {sequelize};
}

let goodMigration = '{ fn: "createTable", params: [\n' +
    '    "Foos",\n' +
    '     { \n' +
    '      "id": { "type": Sequelize.INTEGER, "autoIncrement":true, "primaryKey":true, "allowNull":false }, \n' +
    '      "test": { "type": Sequelize.TEXT(\'medium\') }, \n' +
    '      "createdAt": { "type": Sequelize.DATE, "allowNull":false }, \n' +
    '      "updatedAt": { "type": Sequelize.DATE, "allowNull":false }\n' +
    '     },\n' +
    '    {}\n' +
    '] }'

describe("serializing data types", () => {
    it("text", () => {
        const {sequelize} = createSequelize();
        const currentState = {
            tables: {}
        };
        let previousState = {
            revision: 0,
            version: 1,
            tables: {}
        }
        currentState.tables = migrate.reverseModels(sequelize, sequelize.models);

        let actions = migrate.parseDifference(previousState.tables, currentState.tables);
        migrate.sortActions(actions);
        let migration = migrate.getMigration(actions);
        migration.commandsUp[0].should.equal(goodMigration)

    })
})

