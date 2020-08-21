let migrate = require("../lib/migrate");

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model {}
User.init({
    username: DataTypes.STRING,
    birthday: DataTypes.DATE
}, { sequelize, modelName: 'user', indexes: [{
    fields: ['username']
    }] });



// current state
const currentState = {
    tables: {}
};
// load last state
let previousState = {
    revision: 0,
    version: 1,
    tables: {}
};


currentState.tables = migrate.reverseModels(sequelize, sequelize.models);

let actions = migrate.parseDifference(previousState.tables, currentState.tables);

// sort actions
migrate.sortActions(actions);

let migration = migrate.getMigration(actions);

let test = 5;