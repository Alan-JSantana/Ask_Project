const sequelize = require("sequelize");
const connection = require("./database");

const Response = connection.define("responses", {
    body: {
        type: sequelize.TEXT,
        allowNull: false
    },
    inquireId: {
        type: sequelize.INTEGER,
        allowNull: false
    }   
});

Response.sync({force: false});

module.exports = Response;