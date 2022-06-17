const sequelize = require("sequelize");

const connection = new sequelize("ask_project", "root", "@lanMySQL1988",{
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;
